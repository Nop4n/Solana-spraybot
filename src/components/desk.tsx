import { useEffect, useState, type ReactNode } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import {
  Activity,
  Pause,
  Play,
  Radio,
  Settings2,
  Trash2,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  deskEquity,
  positionMark,
  startEngine,
  stopEngine,
  useDesk,
} from "@/lib/engine/store";
import { changePct, scoreToken } from "@/lib/engine/sim";
import type { ExitReason, Position, TapeItem, Token } from "@/lib/engine/types";
import { cn, formatAge, formatPct, formatSol, formatTime } from "@/lib/utils";

type Tab = "radar" | "posisi" | "tape";

const REASON: Record<ExitReason, string> = {
  tp: "TP",
  sl: "SL",
  time: "waktu",
  manual: "manual",
  spray: "spray",
};

export function Desk() {
  const [tab, setTab] = useState<Tab>("radar");
  const introSeen = useDesk((s) => s.introSeen);
  const armed = useDesk((s) => s.armed);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await useDesk.persist.rehydrate();
      if (cancelled) return;
      startEngine();
    })();
    return () => {
      cancelled = true;
      stopEngine();
    };
  }, []);

  return (
    <TooltipProvider>
      <div
        className={cn(
          "flex min-h-dvh flex-col bg-bg text-fg border-l-2",
          armed ? "border-accent" : "border-transparent",
        )}
      >
        <Header />
        {!introSeen ? <Intro /> : null}
        <StatsStrip />
        <div className="flex min-h-0 flex-1 flex-col px-3 pb-3 md:px-5">
          <div className="mb-3 lg:hidden">
            <Segmented tab={tab} onTab={setTab} />
          </div>
          <div
            className={cn(
              "min-h-0 gap-3 lg:grid lg:flex-1 lg:grid-cols-12",
              tab === "tape" ? "hidden lg:grid" : "flex flex-1",
            )}
          >
            <section
              className={cn(
                "min-h-0 lg:col-span-4",
                tab === "radar" ? "flex flex-1" : "hidden lg:flex",
              )}
            >
              <RadarPanel />
            </section>
            <section
              className={cn(
                "min-h-0 lg:col-span-8",
                tab === "posisi" ? "flex flex-1" : "hidden lg:flex",
              )}
            >
              <PositionsPanel />
            </section>
          </div>
          <section
            className={cn(
              "mt-3 lg:h-64",
              tab === "tape" ? "flex min-h-0 flex-1 lg:flex-none" : "hidden lg:flex",
            )}
          >
            <TapePanel />
          </section>
        </div>
        <footer className="px-4 pb-4 text-center text-xs text-faint md:px-5">
          Paper trading. Bukan nasihat keuangan. Tidak ada transaksi Solana on-chain.
        </footer>
      </div>
    </TooltipProvider>
  );
}

function Header() {
  const armed = useDesk((s) => s.armed);
  const cash = useDesk((s) => s.cash);
  const realized = useDesk((s) => s.realized);
  const positions = useDesk((s) => s.positions);
  const market = useDesk((s) => s.market);
  const settings = useDesk((s) => s.settings);
  const feed = useDesk((s) => s.feed);
  const equity = deskEquityFrom(cash, positions, market);
  const sessionPct =
    settings.startingSol > 0 ? ((equity - settings.startingSol) / settings.startingSol) * 100 : 0;

  return (
    <header className="flex flex-col gap-4 px-3 py-4 md:flex-row md:items-end md:justify-between md:px-5 md:py-5">
      <div className="flex items-start justify-between gap-3 md:items-end">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-accent" aria-hidden />
            <h1 className="text-xl font-medium tracking-widest text-fg">KILAT</h1>
            <Badge tone="paper">PAPER</Badge>
            <Badge tone={feed === "mixed" ? "live" : "muted"}>
              {feed === "mixed" ? "CAMPURAN" : "SIM"}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted">
            Spray token baru · hold max {settings.holdMaxSec}s · jual semua
          </p>
        </div>
        <div className="md:hidden">
          <SettingsButton />
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-4 md:gap-6">
        <EquitySpark />
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Ekuitas</p>
          <p className="font-mono text-3xl leading-none font-medium tracking-tight text-fg tabular-nums">
            {formatSol(equity)}
            <span className="ml-1 text-sm text-muted">SOL</span>
          </p>
          <p
            className={cn(
              "mt-1 font-mono text-sm tabular-nums",
              sessionPct >= 0 ? "text-up" : "text-down",
            )}
          >
            {formatPct(sessionPct)} sesi · tunai {formatSol(cash)} · real {formatSol(realized)}
          </p>
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          <Button
            className="flex-1 md:flex-none"
            variant={armed ? "default" : "outline"}
            aria-pressed={armed}
            onClick={() => useDesk.getState().setArmed(!armed)}
          >
            {armed ? (
              <>
                <span className="arm-dot size-2 rounded-full bg-accent-fg" aria-hidden />
                <Pause />
                Jeda
              </>
            ) : (
              <>
                <Play />
                Siapkan bot
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="flex-1 md:flex-none"
            disabled={!positions.length}
            onClick={() => useDesk.getState().sellAll()}
          >
            Jual semua
          </Button>
          <div className="hidden md:block">
            <SettingsButton />
          </div>
        </div>
      </div>
    </header>
  );
}

function deskEquityFrom(cash: number, positions: Position[], market: Token[]): number {
  void cash;
  void positions;
  void market;
  return deskEquity();
}

function EquitySpark() {
  const data = useDesk((s) => s.equityHistory);
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);
  if (!on || data.length < 2) return <div className="hidden h-12 w-32 md:block" />;
  const up = data[data.length - 1].v >= data[0].v;
  return (
    <div className="hidden h-12 w-36 md:block" aria-hidden>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <Area
            type="monotone"
            dataKey="v"
            stroke={up ? "var(--color-up)" : "var(--color-down)"}
            fill={up ? "var(--color-up)" : "var(--color-down)"}
            fillOpacity={0.14}
            strokeWidth={1.5}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function Intro() {
  return (
    <div className="mx-3 mb-3 rounded-2xl bg-surface p-2 shadow-border md:mx-5">
      <div className="flex flex-col gap-3 rounded-xl bg-elevated px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg">
          Mode paper. Spray beli token baru yang momentum, hold maksimal 25 detik, lalu jual
          semua. Nama bisa dari pasar nyata — pergerakan 25 detik disimulasikan. Tidak ada SOL
          asli.
        </p>
        <Button size="sm" onClick={() => useDesk.getState().setIntroSeen()}>
          Mengerti
        </Button>
      </div>
    </div>
  );
}

function StatsStrip() {
  const stats = useDesk((s) => s.stats);
  const positions = useDesk((s) => s.positions);
  const wr = stats.trades > 0 ? (stats.wins / stats.trades) * 100 : 0;
  const avgHold = stats.trades > 0 ? stats.holdMsSum / stats.trades / 1000 : 0;
  const items = [
    { k: "Posisi", v: String(positions.length) },
    { k: "Trade", v: String(stats.trades) },
    { k: "Menang", v: `${stats.wins}/${stats.losses}` },
    { k: "Winrate", v: `${wr.toFixed(0)}%` },
    { k: "Avg hold", v: `${avgHold.toFixed(1)}s` },
    { k: "Spray", v: String(stats.sprays) },
    { k: "Puncak", v: `${formatSol(stats.peakEquity)} SOL` },
  ];
  return (
    <div className="mb-3 flex gap-2 overflow-x-auto px-3 md:px-5">
      {items.map((it) => (
        <div
          key={it.k}
          className="min-w-24 shrink-0 rounded-xl bg-surface px-3 py-2 shadow-border"
        >
          <p className="text-xs text-muted">{it.k}</p>
          <p className="font-mono text-sm font-medium tabular-nums text-fg">{it.v}</p>
        </div>
      ))}
    </div>
  );
}

function Segmented({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const pos = useDesk((s) => s.positions.length);
  const items: { id: Tab; label: string; extra?: string }[] = [
    { id: "radar", label: "Radar" },
    { id: "posisi", label: "Posisi", extra: pos ? String(pos) : undefined },
    { id: "tape", label: "Tape" },
  ];
  return (
    <div className="flex rounded-xl bg-surface p-1 shadow-border">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={() => onTab(it.id)}
          className={cn(
            "flex h-11 flex-1 items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors duration-150",
            tab === it.id ? "bg-elevated text-fg" : "text-muted hover:text-fg",
          )}
        >
          {it.label}
          {it.extra ? <Badge tone="paper">{it.extra}</Badge> : null}
        </button>
      ))}
    </div>
  );
}

function Panel({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-0 w-full flex-col rounded-2xl bg-surface p-2 shadow-border">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2 text-sm font-medium text-fg">
          <span className="text-muted">{icon}</span>
          {title}
        </div>
        {action}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto rounded-xl bg-bg p-2">{children}</div>
    </div>
  );
}

function RadarPanel() {
  const market = useDesk((s) => s.market);
  const settings = useDesk((s) => s.settings);
  const positions = useDesk((s) => s.positions);
  const now = Date.now();
  const rows = [...market]
    .map((t) => ({ t, score: scoreToken(t, now, settings) }))
    .sort((a, b) => b.score - a.score);

  return (
    <Panel
      title="Radar token baru"
      icon={<Radio className="size-4" />}
      action={<span className="text-xs text-muted">{rows.length} live</span>}
    >
      {rows.length === 0 ? (
        <p className="px-3 py-8 text-center text-sm text-muted">Memuat radar…</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {rows.map(({ t, score }) => (
            <RadarRow
              key={t.id}
              token={t}
              score={score}
              threshold={settings.minScore}
              held={positions.some((p) => p.tokenId === t.id)}
            />
          ))}
        </ul>
      )}
    </Panel>
  );
}

function RadarRow({
  token,
  score,
  threshold,
  held,
}: {
  token: Token;
  score: number;
  threshold: number;
  held: boolean;
}) {
  const chg = changePct(token);
  const hot = score >= threshold;
  return (
    <li className="flex min-h-11 items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-elevated">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-sm font-medium text-fg">{token.ticker}</span>
          <span className="truncate text-xs text-muted">{token.name}</span>
          {token.source === "live" ? (
            <span className="text-xs tracking-wide text-faint">LIVE</span>
          ) : null}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-1 flex-1 rounded-full bg-elevated">
            <div
              className={cn("h-full rounded-full", hot ? "bg-accent" : "bg-faint")}
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="w-8 font-mono text-xs tabular-nums text-muted">{score}</span>
        </div>
      </div>
      <div className="text-right">
        <p className={cn("font-mono text-xs tabular-nums", chg >= 0 ? "text-up" : "text-down")}>
          {formatPct(chg)}
        </p>
        <p className="font-mono text-xs text-faint tabular-nums">
          {formatAge(Date.now() - token.spawnedAt)}
        </p>
      </div>
      <Button
        size="sm"
        variant={hot ? "default" : "outline"}
        disabled={held}
        onClick={() => useDesk.getState().buyManual(token.id)}
      >
        {held ? "Hold" : "Beli"}
      </Button>
    </li>
  );
}

function PositionsPanel() {
  const positions = useDesk((s) => s.positions);
  const market = useDesk((s) => s.market);
  const armed = useDesk((s) => s.armed);

  return (
    <Panel
      title="Posisi terbuka"
      icon={<Activity className="size-4" />}
      action={
        armed ? (
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <span className="arm-dot size-1.5 rounded-full bg-up" />
            auto spray
          </span>
        ) : (
          <span className="text-xs text-muted">jeda</span>
        )
      }
    >
      {positions.length === 0 ? (
        <div className="relative flex h-full min-h-52 flex-col items-center justify-center px-6 text-center">
          <p className="pointer-events-none absolute text-6xl font-medium tracking-widest text-fg/5">
            PAPER
          </p>
          <p className="text-sm text-fg">Tidak ada posisi.</p>
          <p className="mt-1 max-w-sm text-sm text-muted">
            Tekan Siapkan bot untuk spray otomatis, atau beli manual dari radar. Hold maksimal
            lalu jual semua.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {positions.map((p) => (
            <PositionCard key={p.id} position={p} market={market} />
          ))}
        </div>
      )}
    </Panel>
  );
}

function PositionCard({ position, market }: { position: Position; market: Token[] }) {
  const mark = positionMark(position, market);
  const progress = position.holdMaxMs > 0 ? mark.remainMs / position.holdMaxMs : 0;
  const sec = Math.ceil(mark.remainMs / 1000);
  return (
    <article className="rounded-xl bg-surface p-3 shadow-border">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-sm font-medium text-fg">{position.ticker}</p>
          <p className="truncate text-xs text-muted">{position.name}</p>
        </div>
        <HoldRing progress={progress} urgent={mark.remainMs < 5000} label={`${sec}s`} />
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p
            className={cn(
              "font-mono text-lg font-medium tabular-nums",
              mark.pnlSol >= 0 ? "text-up" : "text-down",
            )}
          >
            {formatPct(mark.pnlPct)}
          </p>
          <p className="font-mono text-xs text-muted tabular-nums">
            {mark.pnlSol >= 0 ? "+" : ""}
            {formatSol(mark.pnlSol)} SOL · {formatSol(position.sizeSol)} in
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => useDesk.getState().sellOne(position.id)}>
          Jual
        </Button>
      </div>
    </article>
  );
}

function HoldRing({
  progress,
  urgent,
  label,
}: {
  progress: number;
  urgent: boolean;
  label: string;
}) {
  const r = 16;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-11 shrink-0">
      <svg viewBox="0 0 40 40" className="size-11 -rotate-90" aria-hidden>
        <circle cx="20" cy="20" r={r} className="fill-none stroke-elevated" strokeWidth="3" />
        <circle
          cx="20"
          cy="20"
          r={r}
          className={urgent ? "fill-none stroke-down" : "fill-none stroke-accent"}
          strokeWidth="3"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-xs tabular-nums text-fg">
        {label}
      </span>
    </div>
  );
}

function TapePanel() {
  const tape = useDesk((s) => s.tape);
  return (
    <Panel title="Tape" icon={<Activity className="size-4" />}>
      {tape.length === 0 ? (
        <p className="px-3 py-8 text-center text-sm text-muted">Belum ada isi. Arm bot untuk mulai.</p>
      ) : (
        <ul className="flex flex-col">
          {tape.map((row) => (
            <TapeRow key={row.id} row={row} />
          ))}
        </ul>
      )}
    </Panel>
  );
}

function TapeRow({ row }: { row: TapeItem }) {
  if (row.kind === "sys") {
    return (
      <li className="flex min-h-9 items-center gap-3 px-2 py-1 text-xs text-muted">
        <span className="font-mono text-faint tabular-nums">{formatTime(row.at)}</span>
        <span>{row.text}</span>
      </li>
    );
  }
  const sellUp = row.kind === "sell" && (row.pnlSol ?? 0) >= 0;
  const sellDown = row.kind === "sell" && (row.pnlSol ?? 0) < 0;
  return (
    <li className="flex min-h-10 items-center gap-3 border-b border-border px-2 py-1.5 last:border-0">
      <span className="w-16 font-mono text-xs text-faint tabular-nums">{formatTime(row.at)}</span>
      <span
        className={cn(
          "w-10 font-mono text-xs font-medium",
          row.kind === "buy" ? "text-fg" : sellUp ? "text-up" : "text-down",
        )}
      >
        {row.kind === "buy" ? "BUY" : "SELL"}
      </span>
      <span className="w-16 font-mono text-sm text-fg">{row.ticker}</span>
      <span className="hidden flex-1 truncate text-xs text-muted sm:block">{row.name}</span>
      <span className="font-mono text-xs text-muted tabular-nums">
        {formatSol(row.sizeSol ?? 0)} SOL
      </span>
      {row.kind === "sell" ? (
        <span
          className={cn(
            "w-16 text-right font-mono text-xs tabular-nums",
            sellUp ? "text-up" : sellDown ? "text-down" : "text-muted",
          )}
        >
          {formatPct(row.pnlPct ?? 0)}
        </span>
      ) : (
        <span className="w-16 text-right font-mono text-xs text-faint">
          {row.reason ? REASON[row.reason] : ""}
        </span>
      )}
      {row.kind === "sell" && row.reason ? (
        <span className="hidden w-12 text-right text-xs text-faint sm:block">
          {REASON[row.reason]}
        </span>
      ) : null}
    </li>
  );
}

function SettingsButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Pengaturan">
          <Settings2 />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Strategi</SheetTitle>
          <SheetDescription>
            Spray beli token baru di atas ambang skor, hold terbatas, lalu jual semua. Paper
            only.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <SettingsForm />
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}

function SettingsForm() {
  const settings = useDesk((s) => s.settings);
  return (
    <div className="flex flex-col gap-6">
      <Field
        label="SOL per spray"
        value={`${formatSol(settings.spraySize)} SOL`}
        hint="Ukuran beli tiap token dalam satu gelombang"
      >
        <Slider
          min={0.05}
          max={1}
          step={0.05}
          value={[settings.spraySize]}
          onValueChange={([v]) => useDesk.getState().patchSettings({ spraySize: v })}
        />
      </Field>
      <Field label="Lebar spray" value={`${settings.sprayWidth} token`} hint="Berapa token dibeli sekaligus">
        <Slider
          min={1}
          max={5}
          step={1}
          value={[settings.sprayWidth]}
          onValueChange={([v]) => useDesk.getState().patchSettings({ sprayWidth: v })}
        />
      </Field>
      <Field label="Max posisi" value={String(settings.maxPositions)} hint="Kapasitas hold bersamaan">
        <Slider
          min={1}
          max={10}
          step={1}
          value={[settings.maxPositions]}
          onValueChange={([v]) => useDesk.getState().patchSettings({ maxPositions: v })}
        />
      </Field>
      <Field
        label="Hold maksimal"
        value={`${settings.holdMaxSec}s`}
        hint="Setelah ini, jual semua sisa posisi token itu"
      >
        <Slider
          min={8}
          max={60}
          step={1}
          value={[settings.holdMaxSec]}
          onValueChange={([v]) => useDesk.getState().patchSettings({ holdMaxSec: v })}
        />
      </Field>
      <Field
        label="Ambang skor"
        value={String(settings.minScore)}
        hint="Momentum 0–100 dari umur, heat, arus beli, likuiditas"
      >
        <Slider
          min={30}
          max={85}
          step={1}
          value={[settings.minScore]}
          onValueChange={([v]) => useDesk.getState().patchSettings({ minScore: v })}
        />
      </Field>
      <Field
        label="Umur max token"
        value={`${settings.maxAgeSec}s`}
        hint="Hanya token lebih muda dari ini yang di-spray"
      >
        <Slider
          min={20}
          max={180}
          step={5}
          value={[settings.maxAgeSec]}
          onValueChange={([v]) => useDesk.getState().patchSettings({ maxAgeSec: v })}
        />
      </Field>
      <Field label="Take profit" value={formatPct(settings.tpPct)} hint="Jual jika naik segini">
        <Slider
          min={6}
          max={60}
          step={1}
          value={[settings.tpPct]}
          onValueChange={([v]) => useDesk.getState().patchSettings({ tpPct: v })}
        />
      </Field>
      <Field label="Stop loss" value={formatPct(settings.slPct)} hint="Jual jika turun segini">
        <Slider
          min={6}
          max={40}
          step={1}
          value={[settings.slPct]}
          onValueChange={([v]) => useDesk.getState().patchSettings({ slPct: v })}
        />
      </Field>
      <Field
        label="Min likuiditas"
        value={`$${Math.round(settings.minLiqUsd / 100) * 100}`}
        hint="Filter kolam terlalu tipis"
      >
        <Slider
          min={0}
          max={20000}
          step={500}
          value={[settings.minLiqUsd]}
          onValueChange={([v]) => useDesk.getState().patchSettings({ minLiqUsd: v })}
        />
      </Field>
      <Field
        label="Modal paper"
        value={`${formatSol(settings.startingSol)} SOL`}
        hint="Berlaku saat reset"
      >
        <Slider
          min={2}
          max={50}
          step={1}
          value={[settings.startingSol]}
          onValueChange={([v]) => useDesk.getState().patchSettings({ startingSol: v })}
        />
      </Field>
      <Button variant="outline" onClick={() => useDesk.getState().resetPaper()} className="mt-2">
        <Trash2 />
        Reset paper
      </Button>
    </div>
  );
}

function Field({
  label,
  value,
  hint,
  children,
}: {
  label: string;
  value: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-sm font-medium text-fg">{label}</span>
          </TooltipTrigger>
          <TooltipContent>{hint}</TooltipContent>
        </Tooltip>
        <span className="font-mono text-sm tabular-nums text-muted">{value}</span>
      </div>
      {children}
    </div>
  );
}
