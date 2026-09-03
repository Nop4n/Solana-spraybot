export type FeedKind = "sim" | "mixed";

export type Token = {
  id: string;
  name: string;
  ticker: string;
  waveId: string;
  spawnedAt: number;
  price: number;
  startPrice: number;
  liquidityUsd: number;
  volume5m: number;
  buys5m: number;
  sells5m: number;
  heat: number;
  dumpBias: number;
  source: "live" | "sim";
};

export type Position = {
  id: string;
  tokenId: string;
  ticker: string;
  name: string;
  waveId: string;
  entryPrice: number;
  sizeSol: number;
  qty: number;
  openedAt: number;
  holdMaxMs: number;
  tpPct: number;
  slPct: number;
};

export type ExitReason = "tp" | "sl" | "time" | "manual" | "spray";

export type TapeItem = {
  id: string;
  kind: "buy" | "sell" | "sys";
  ticker?: string;
  name?: string;
  sizeSol?: number;
  price?: number;
  pnlSol?: number;
  pnlPct?: number;
  reason?: ExitReason;
  text?: string;
  at: number;
};

export type Settings = {
  startingSol: number;
  spraySize: number;
  sprayWidth: number;
  maxPositions: number;
  holdMaxSec: number;
  minScore: number;
  maxAgeSec: number;
  tpPct: number;
  slPct: number;
  minLiqUsd: number;
};

export type Stats = {
  wins: number;
  losses: number;
  trades: number;
  holdMsSum: number;
  sprays: number;
  peakEquity: number;
};

export type EquityPoint = { t: number; v: number };

export const DEFAULT_SETTINGS: Settings = {
  startingSol: 10,
  spraySize: 0.25,
  sprayWidth: 3,
  maxPositions: 6,
  holdMaxSec: 25,
  minScore: 50,
  maxAgeSec: 90,
  tpPct: 22,
  slPct: 14,
  minLiqUsd: 2500,
};

export const DEFAULT_STATS: Stats = {
  wins: 0,
  losses: 0,
  trades: 0,
  holdMsSum: 0,
  sprays: 0,
  peakEquity: 10,
};
