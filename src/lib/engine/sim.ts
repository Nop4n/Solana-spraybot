import { clamp } from "@/lib/utils";
import type { Settings, Token } from "./types";

const HEADS = [
  "Bakso",
  "Bebek",
  "Cepat",
  "Gado",
  "Kucing",
  "Komodo",
  "Listrik",
  "Nasi",
  "Orbit",
  "Pulsa",
  "Sambal",
  "Sate",
  "Surya",
  "Turbo",
  "Wira",
  "Silent",
  "Pixel",
  "Frost",
  "Bolt",
  "Mekar",
];

const TAILS = [
  "Cat",
  "Coin",
  "Dog",
  "Fi",
  "Guy",
  "Hop",
  "Inu",
  "Labs",
  "Max",
  "Pad",
  "Pop",
  "Sol",
  "Tap",
  "Vin",
  "Xyz",
  "Zed",
];

const PREFIX = [
  "ZOR",
  "KIL",
  "NUS",
  "BAK",
  "MEK",
  "GIG",
  "PUL",
  "DAU",
  "CRO",
  "VOR",
  "NIM",
  "JAM",
  "SAT",
  "KOP",
  "BLI",
  "FRO",
  "LUN",
  "NEK",
  "RAJ",
  "TIK",
  "GOP",
  "WIR",
  "CEP",
  "SUR",
];

const SUFFIX = ["AI", "ON", "EX", "IQ", "US", "OH", "IX", "AY", "ER", "OL", "IN", "OK", "UV", "AZ"];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

export function waveIdAt(now: number): string {
  return `w${Math.floor(now / 7000)}`;
}

export function spawnSimToken(now: number, waveId: string): Token {
  const ticker = `${pick(PREFIX)}${pick(SUFFIX)}`;
  const name = `${pick(HEADS)} ${pick(TAILS)}`;
  const price = 0.000002 + Math.random() * 0.00009;
  const ignite = Math.random() < 0.42;
  return {
    id: `sim_${now.toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    ticker,
    waveId,
    spawnedAt: now,
    price,
    startPrice: price,
    liquidityUsd: 2200 + Math.random() * 48000,
    volume5m: Math.random() * 400,
    buys5m: Math.floor(Math.random() * 6),
    sells5m: Math.floor(Math.random() * 4),
    heat: ignite ? 0.5 + Math.random() * 0.5 : Math.random() * 0.18,
    dumpBias: 0,
    source: "sim",
  };
}

export function tokenFromLive(
  now: number,
  row: {
    id: string;
    name: string;
    ticker: string;
    priceSol: number;
    liquidityUsd: number;
    createdAt: number;
    volume5m: number;
    change5m: number;
    buys: number;
    sells: number;
  },
): Token {
  const price = row.priceSol > 0 ? row.priceSol : 0.00001 + Math.random() * 0.00004;
  const heat = clamp(0.15 + row.change5m / 80, 0.05, 0.95);
  return {
    id: row.id,
    name: row.name || row.ticker,
    ticker: (row.ticker || "NEW").slice(0, 10).toUpperCase(),
    waveId: waveIdAt(row.createdAt || now),
    spawnedAt: row.createdAt > 0 ? row.createdAt : now,
    price,
    startPrice: price / (1 + row.change5m / 100 || 1),
    liquidityUsd: Math.max(400, row.liquidityUsd),
    volume5m: row.volume5m,
    buys5m: row.buys,
    sells5m: row.sells,
    heat,
    dumpBias: row.change5m < -8 ? 0.3 : 0,
    source: "live",
  };
}

export function tickToken(t: Token, dt: number, now: number): Token {
  let { price, heat, dumpBias, volume5m, buys5m, sells5m, liquidityUsd } = t;
  const age = (now - t.spawnedAt) / 1000;

  if (heat < 0.2 && age < 22 && Math.random() < 0.22 * dt) {
    heat = 0.55 + Math.random() * 0.42;
  }

  const noise = (Math.random() - 0.48) * 0.85;
  let ret = noise * 0.18 * dt;

  if (heat > 0.05) {
    ret += heat * 0.62 * dt;
    heat *= Math.exp(-1.55 * dt);
    if (Math.random() < 0.85 * dt) buys5m += 1;
    volume5m += Math.abs(price) * (180 + Math.random() * 900);
  }

  if (heat < 0.2 && age > 5 && Math.random() < 0.18 * dt) {
    dumpBias = Math.max(dumpBias, 0.28 + Math.random() * 0.55);
  }

  if (dumpBias > 0) {
    ret -= dumpBias * 0.78 * dt;
    dumpBias *= Math.exp(-0.85 * dt);
    if (Math.random() < 0.7 * dt) sells5m += 1;
  }

  const chg = (price - t.startPrice) / t.startPrice;
  ret -= chg * 0.035 * dt;

  price = Math.max(price * (1 + ret), t.startPrice * 0.04);
  liquidityUsd = Math.max(350, liquidityUsd * (1 + ret * 0.18));

  return { ...t, price, heat, dumpBias, volume5m, buys5m, sells5m, liquidityUsd };
}

export function scoreToken(t: Token, now: number, settings: Settings): number {
  const age = (now - t.spawnedAt) / 1000;
  if (age > settings.maxAgeSec) return 0;
  const recency = clamp(1 - age / settings.maxAgeSec, 0, 1) * 30;
  const heat = clamp(t.heat, 0, 1) * 26;
  const chg = ((t.price - t.startPrice) / t.startPrice) * 100;
  let chgScore = 0;
  if (chg > 90) chgScore = 4;
  else if (chg > 0) chgScore = clamp(chg * 0.55, 0, 20);
  else chgScore = clamp(chg * 0.25, -12, 0);
  const flow = t.buys5m + t.sells5m;
  const bias = flow > 0 ? t.buys5m / flow : 0.5;
  const flowScore = (bias - 0.45) * 28 + clamp(flow / 6, 0, 10);
  const liq =
    t.liquidityUsd < settings.minLiqUsd ? -10 : clamp(t.liquidityUsd / 12000, 0, 8);
  return clamp(Math.round(recency + heat + chgScore + flowScore + liq), 0, 100);
}

export function changePct(t: Token): number {
  if (t.startPrice <= 0) return 0;
  return ((t.price - t.startPrice) / t.startPrice) * 100;
}
