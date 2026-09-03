import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchLiveRadar } from "./radar";
import {
  changePct,
  scoreToken,
  spawnSimToken,
  tickToken,
  tokenFromLive,
  waveIdAt,
} from "./sim";
import {
  DEFAULT_SETTINGS,
  DEFAULT_STATS,
  type EquityPoint,
  type ExitReason,
  type FeedKind,
  type Position,
  type Settings,
  type Stats,
  type TapeItem,
  type Token,
} from "./types";
import { clamp } from "@/lib/utils";

const BUY_SLIP = 1.003;
const SELL_SLIP = 0.996;
const TAPE_CAP = 100;
const MARKET_CAP = 18;

type DeskState = {
  settings: Settings;
  cash: number;
  realized: number;
  armed: boolean;
  market: Token[];
  positions: Position[];
  tape: TapeItem[];
  stats: Stats;
  equityHistory: EquityPoint[];
  cooldown: Record<string, number>;
  feed: FeedKind;
  pulling: boolean;
  introSeen: boolean;
  lastTick: number;
  lastSpawnAt: number;
  nextSpawnMs: number;
  lastSprayAt: number;
  lastEquityAt: number;
  setArmed: (armed: boolean) => void;
  setIntroSeen: () => void;
  patchSettings: (patch: Partial<Settings>) => void;
  tick: () => void;
  pullLive: () => Promise<void>;
  buyManual: (tokenId: string) => void;
  sellOne: (positionId: string) => void;
  sellAll: () => void;
  resetPaper: () => void;
};

function nid(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function sysTape(text: string, at: number): TapeItem {
  return { id: nid("t"), kind: "sys", text, at };
}

function markEquity(cash: number, positions: Position[], market: Token[]): number {
  let u = 0;
  for (const p of positions) {
    const t = market.find((x) => x.id === p.tokenId);
    const px = (t?.price ?? p.entryPrice) * SELL_SLIP;
    u += p.qty * px;
  }
  return cash + u;
}

function closeOne(
  p: Position,
  token: Token | undefined,
  now: number,
  reason: ExitReason,
): { proceeds: number; pnlSol: number; pnlPct: number; item: TapeItem } {
  const px = (token?.price ?? p.entryPrice) * SELL_SLIP;
  const proceeds = p.qty * px;
  const pnlSol = proceeds - p.sizeSol;
  const pnlPct = p.sizeSol > 0 ? (pnlSol / p.sizeSol) * 100 : 0;
  return {
    proceeds,
    pnlSol,
    pnlPct,
    item: {
      id: nid("t"),
      kind: "sell",
      ticker: p.ticker,
      name: p.name,
      sizeSol: proceeds,
      price: px,
      pnlSol,
      pnlPct,
      reason,
      at: now,
    },
  };
}

function openBuy(
  token: Token,
  sizeSol: number,
  now: number,
  settings: Settings,
  reason: ExitReason,
): { position: Position; spend: number; item: TapeItem } {
  const px = token.price * BUY_SLIP;
  const spend = sizeSol;
  const qty = spend / px;
  return {
    spend,
    position: {
      id: nid("p"),
      tokenId: token.id,
      ticker: token.ticker,
      name: token.name,
      waveId: token.waveId,
      entryPrice: px,
      sizeSol: spend,
      qty,
      openedAt: now,
      holdMaxMs: settings.holdMaxSec * 1000,
      tpPct: settings.tpPct,
      slPct: settings.slPct,
    },
    item: {
      id: nid("t"),
      kind: "buy",
      ticker: token.ticker,
      name: token.name,
      sizeSol: spend,
      price: px,
      reason,
      at: now,
    },
  };
}

export const useDesk = create<DeskState>()(
  persist(
    (set, get) => ({
      settings: { ...DEFAULT_SETTINGS },
      cash: DEFAULT_SETTINGS.startingSol,
      realized: 0,
      armed: false,
      market: [],
      positions: [],
      tape: [],
      stats: { ...DEFAULT_STATS },
      equityHistory: [{ t: Date.now(), v: DEFAULT_SETTINGS.startingSol }],
      cooldown: {},
      feed: "sim",
      pulling: false,
      introSeen: false,
      lastTick: 0,
      lastSpawnAt: 0,
      nextSpawnMs: 800,
      lastSprayAt: 0,
      lastEquityAt: 0,

      setArmed: (armed) => {
        const now = Date.now();
        set((s) => ({
          armed,
          tape: [
            sysTape(
              armed
                ? "Bot SIAP — spray momentum, hold max, jual semua"
                : "Bot JEDA",
              now,
            ),
            ...s.tape,
          ].slice(0, TAPE_CAP),
        }));
      },

      setIntroSeen: () => set({ introSeen: true }),

      patchSettings: (patch) =>
        set((s) => ({
          settings: {
            ...s.settings,
            ...patch,
            sprayWidth: clamp(patch.sprayWidth ?? s.settings.sprayWidth, 1, 5),
            maxPositions: clamp(patch.maxPositions ?? s.settings.maxPositions, 1, 10),
            holdMaxSec: clamp(patch.holdMaxSec ?? s.settings.holdMaxSec, 8, 60),
            minScore: clamp(patch.minScore ?? s.settings.minScore, 30, 90),
            maxAgeSec: clamp(patch.maxAgeSec ?? s.settings.maxAgeSec, 20, 240),
            tpPct: clamp(patch.tpPct ?? s.settings.tpPct, 4, 80),
            slPct: clamp(patch.slPct ?? s.settings.slPct, 4, 60),
            spraySize: clamp(patch.spraySize ?? s.settings.spraySize, 0.05, 2),
            startingSol: clamp(patch.startingSol ?? s.settings.startingSol, 1, 100),
            minLiqUsd: clamp(patch.minLiqUsd ?? s.settings.minLiqUsd, 0, 50000),
          },
        })),

      tick: () => {
        const now = Date.now();
        const s = get();
        const dt = s.lastTick === 0 ? 0.25 : clamp((now - s.lastTick) / 1000, 0.05, 0.6);

        let market = s.market.map((t) => tickToken(t, dt, now));
        const held = new Set(s.positions.map((p) => p.tokenId));
        market = market.filter((t) => held.has(t.id) || now - t.spawnedAt < 6 * 60 * 1000);

        if (now - s.lastSpawnAt >= s.nextSpawnMs) {
          const wave = waveIdAt(now);
          const n = Math.random() < 0.32 ? 3 : Math.random() < 0.5 ? 2 : 1;
          for (let i = 0; i < n; i += 1) {
            market.unshift(spawnSimToken(now + i, wave));
          }
        }

        market = market.slice(0, MARKET_CAP);

        let cash = s.cash;
        let realized = s.realized;
        let positions = [...s.positions];
        let tape = s.tape;
        let stats = { ...s.stats };
        const cooldown = { ...s.cooldown };

        const still: Position[] = [];
        for (const p of positions) {
          const token = market.find((t) => t.id === p.tokenId);
          const px = token?.price ?? p.entryPrice;
          const pnlPct = ((px - p.entryPrice) / p.entryPrice) * 100;
          const age = now - p.openedAt;
          let reason: ExitReason | null = null;
          if (pnlPct >= p.tpPct) reason = "tp";
          else if (pnlPct <= -p.slPct) reason = "sl";
          else if (age >= p.holdMaxMs) reason = "time";
          if (!reason) {
            still.push(p);
            continue;
          }
          const closed = closeOne(p, token, now, reason);
          cash += closed.proceeds;
          realized += closed.pnlSol;
          tape = [closed.item, ...tape];
          stats.trades += 1;
          stats.holdMsSum += age;
          if (closed.pnlSol >= 0) stats.wins += 1;
          else stats.losses += 1;
          cooldown[p.tokenId] = now + 25000;
        }
        positions = still;

        let lastSprayAt = s.lastSprayAt;
        if (
          s.armed &&
          now - lastSprayAt >= 1400 &&
          positions.length < s.settings.maxPositions &&
          cash >= Math.min(s.settings.spraySize, 0.05)
        ) {
          const ranked = market
            .map((t) => ({ t, score: scoreToken(t, now, s.settings) }))
            .filter(({ t, score }) => {
              if (score < s.settings.minScore) return false;
              if (positions.some((p) => p.tokenId === t.id)) return false;
              if (cooldown[t.id] && now < cooldown[t.id]) return false;
              if (t.liquidityUsd < s.settings.minLiqUsd) return false;
              return true;
            })
            .sort((a, b) => b.score - a.score);

          const room = s.settings.maxPositions - positions.length;
          const picks = ranked.slice(0, Math.min(s.settings.sprayWidth, room));
          if (picks.length) {
            const bought: string[] = [];
            for (const { t } of picks) {
              const size = Math.min(s.settings.spraySize, cash);
              if (size < 0.04) break;
              const opened = openBuy(t, size, now, s.settings, "spray");
              cash -= opened.spend;
              positions = [opened.position, ...positions];
              tape = [opened.item, ...tape];
              bought.push(t.ticker);
            }
            if (bought.length) {
              lastSprayAt = now;
              stats.sprays += 1;
              tape = [sysTape(`Spray ×${bought.length} · ${bought.join(" · ")}`, now), ...tape];
            }
          }
        }

        tape = tape.slice(0, TAPE_CAP);
        const equity = markEquity(cash, positions, market);
        stats.peakEquity = Math.max(stats.peakEquity, equity);

        let equityHistory = s.equityHistory;
        let lastEquityAt = s.lastEquityAt;
        if (now - lastEquityAt >= 1000) {
          equityHistory = [...equityHistory, { t: now, v: equity }].slice(-180);
          lastEquityAt = now;
        }

        const spawned = now - s.lastSpawnAt >= s.nextSpawnMs;
        set({
          lastTick: now,
          market,
          positions,
          cash,
          realized,
          tape,
          stats,
          cooldown,
          lastSprayAt,
          equityHistory,
          lastEquityAt,
          lastSpawnAt: spawned ? now : s.lastSpawnAt,
          nextSpawnMs: spawned ? 4200 + Math.random() * 3800 : s.nextSpawnMs,
        });
      },

      pullLive: async () => {
        if (get().pulling) return;
        set({ pulling: true });
        try {
          const rows = await fetchLiveRadar();
          const now = Date.now();
          set((s) => {
            const market = [...s.market];
            const tickers = new Set(market.map((t) => t.ticker));
            const ids = new Set(market.map((t) => t.id));
            let added = 0;
            for (const row of rows) {
              if (ids.has(row.id) || tickers.has(row.ticker.toUpperCase())) continue;
              const token = tokenFromLive(now, row);
              market.unshift(token);
              ids.add(token.id);
              tickers.add(token.ticker);
              added += 1;
            }
            return {
              market: market.slice(0, MARKET_CAP),
              feed: added > 0 || rows.length > 0 ? "mixed" : s.feed,
              pulling: false,
            };
          });
        } catch {
          set({ pulling: false, feed: "sim" });
        }
      },

      buyManual: (tokenId) => {
        const now = Date.now();
        set((s) => {
          if (s.positions.length >= s.settings.maxPositions) return s;
          const token = s.market.find((t) => t.id === tokenId);
          if (!token) return s;
          if (s.positions.some((p) => p.tokenId === tokenId)) return s;
          const size = Math.min(s.settings.spraySize, s.cash);
          if (size < 0.04) return s;
          const opened = openBuy(token, size, now, s.settings, "manual");
          return {
            cash: s.cash - opened.spend,
            positions: [opened.position, ...s.positions],
            tape: [opened.item, ...s.tape].slice(0, TAPE_CAP),
          };
        });
      },

      sellOne: (positionId) => {
        const now = Date.now();
        set((s) => {
          const p = s.positions.find((x) => x.id === positionId);
          if (!p) return s;
          const token = s.market.find((t) => t.id === p.tokenId);
          const closed = closeOne(p, token, now, "manual");
          const stats = { ...s.stats };
          stats.trades += 1;
          stats.holdMsSum += now - p.openedAt;
          if (closed.pnlSol >= 0) stats.wins += 1;
          else stats.losses += 1;
          return {
            cash: s.cash + closed.proceeds,
            realized: s.realized + closed.pnlSol,
            positions: s.positions.filter((x) => x.id !== positionId),
            tape: [closed.item, ...s.tape].slice(0, TAPE_CAP),
            stats,
            cooldown: { ...s.cooldown, [p.tokenId]: now + 25000 },
          };
        });
      },

      sellAll: () => {
        const now = Date.now();
        set((s) => {
          if (!s.positions.length) return s;
          let cash = s.cash;
          let realized = s.realized;
          let tape = s.tape;
          const stats = { ...s.stats };
          const cooldown = { ...s.cooldown };
          for (const p of s.positions) {
            const token = s.market.find((t) => t.id === p.tokenId);
            const closed = closeOne(p, token, now, "manual");
            cash += closed.proceeds;
            realized += closed.pnlSol;
            tape = [closed.item, ...tape];
            stats.trades += 1;
            stats.holdMsSum += now - p.openedAt;
            if (closed.pnlSol >= 0) stats.wins += 1;
            else stats.losses += 1;
            cooldown[p.tokenId] = now + 25000;
          }
          tape = [sysTape(`Jual semua · ${s.positions.length} posisi`, now), ...tape].slice(
            0,
            TAPE_CAP,
          );
          return {
            cash,
            realized,
            positions: [],
            tape,
            stats,
            cooldown,
          };
        });
      },

      resetPaper: () => {
        const now = Date.now();
        const start = get().settings.startingSol;
        set({
          cash: start,
          realized: 0,
          armed: false,
          positions: [],
          tape: [sysTape(`Paper direset · modal ${start} SOL`, now)],
          stats: { ...DEFAULT_STATS, peakEquity: start },
          equityHistory: [{ t: now, v: start }],
          cooldown: {},
          lastSprayAt: 0,
          lastEquityAt: now,
        });
      },
    }),
    {
      name: "kilat-paper-v1",
      skipHydration: true,
      partialize: (s) => ({
        settings: s.settings,
        cash: s.cash,
        realized: s.realized,
        tape: s.tape.slice(0, 80),
        stats: s.stats,
        equityHistory: s.equityHistory.slice(-120),
        introSeen: s.introSeen,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<DeskState>;
        return {
          ...current,
          ...p,
          settings: { ...current.settings, ...p.settings },
          stats: { ...current.stats, ...p.stats },
          armed: false,
          positions: [],
          market: current.market,
          cooldown: {},
        };
      },
    },
  ),
);

let loop: ReturnType<typeof setInterval> | null = null;
let liveLoop: ReturnType<typeof setInterval> | null = null;

export function startEngine() {
  if (loop) return;
  useDesk.setState({ lastTick: Date.now() });
  const s = useDesk.getState();
  if (s.market.length === 0) {
    const now = Date.now();
    const wave = waveIdAt(now);
    const seed: Token[] = [];
    for (let i = 0; i < 6; i += 1) {
      const t = spawnSimToken(now - i * 4000, wave);
      t.heat = Math.random() * 0.7;
      seed.push(t);
    }
    useDesk.setState({ market: seed, lastSpawnAt: now });
  }
  loop = setInterval(() => {
    useDesk.getState().tick();
  }, 250);
  liveLoop = setInterval(() => {
    void useDesk.getState().pullLive();
  }, 28000);
  void useDesk.getState().pullLive();
}

export function stopEngine() {
  if (loop) {
    clearInterval(loop);
    loop = null;
  }
  if (liveLoop) {
    clearInterval(liveLoop);
    liveLoop = null;
  }
}

export function positionMark(p: Position, market: Token[]) {
  const token = market.find((t) => t.id === p.tokenId);
  const px = token?.price ?? p.entryPrice;
  const pnlSol = p.qty * px * SELL_SLIP - p.sizeSol;
  const pnlPct = p.sizeSol > 0 ? (pnlSol / p.sizeSol) * 100 : 0;
  const remainMs = Math.max(0, p.holdMaxMs - (Date.now() - p.openedAt));
  return { token, px, pnlSol, pnlPct, remainMs, chg: token ? changePct(token) : 0 };
}

export function deskEquity() {
  const s = useDesk.getState();
  return markEquity(s.cash, s.positions, s.market);
}
