import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/radar-1Rt9qGf3.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function num(v, fallback = 0) {
	if (typeof v === "number" && Number.isFinite(v)) return v;
	if (typeof v === "string") {
		const n = Number(v);
		if (Number.isFinite(n)) return n;
	}
	return fallback;
}
function str(v, fallback = "") {
	return typeof v === "string" && v.trim() ? v.trim() : fallback;
}
async function getJson(url) {
	const res = await fetch(url, {
		headers: { Accept: "application/json" },
		signal: AbortSignal.timeout(3500)
	});
	if (!res.ok) throw new Error(`http ${res.status}`);
	return res.json();
}
function parsePump(data) {
	if (!Array.isArray(data)) return [];
	const rows = [];
	for (const item of data) {
		if (!item || typeof item !== "object") continue;
		const o = item;
		const mint = str(o.mint);
		if (!mint) continue;
		let created = num(o.created_timestamp);
		if (created > 0 && created < 0xe8d4a51000) created *= 1e3;
		const virtSol = num(o.virtual_sol_reserves);
		const virtTok = num(o.virtual_token_reserves);
		let priceSol = 0;
		if (virtSol > 0 && virtTok > 0) priceSol = virtSol / 1e9 / (virtTok / 1e6);
		const usdMcap = num(o.usd_market_cap);
		rows.push({
			id: `pump_${mint}`,
			name: str(o.name, str(o.symbol, "Unknown")),
			ticker: str(o.symbol, "NEW").slice(0, 10),
			priceSol,
			liquidityUsd: usdMcap > 0 ? usdMcap * .5 : virtSol / 1e9 * 280,
			createdAt: created,
			volume5m: usdMcap * .08,
			change5m: 0,
			buys: 0,
			sells: 0
		});
	}
	return rows;
}
function parseGecko(data) {
	if (!data || typeof data !== "object") return [];
	const root = data;
	if (!Array.isArray(root.data)) return [];
	const rows = [];
	for (const item of root.data) {
		if (!item || typeof item !== "object") continue;
		const node = item;
		const attr = node.attributes ?? {};
		const nameRaw = str(attr.name);
		const [base, quote] = nameRaw.split(" / ");
		if (quote && quote.toUpperCase() !== "SOL") continue;
		const createdIso = str(attr.pool_created_at);
		const createdAt = createdIso ? Date.parse(createdIso) : 0;
		const vol = attr.volume_usd;
		const chg = attr.price_change_percentage;
		const txn = attr.transactions;
		let volume5m = 0;
		let change5m = 0;
		let buys = 0;
		let sells = 0;
		if (vol && typeof vol === "object") volume5m = num(vol.m5);
		if (chg && typeof chg === "object") change5m = num(chg.m5);
		if (txn && typeof txn === "object") {
			const m5 = txn.m5;
			if (m5 && typeof m5 === "object") {
				const m = m5;
				buys = num(m.buys);
				sells = num(m.sells);
			}
		}
		rows.push({
			id: `gt_${str(node.id, Math.random().toString(36).slice(2))}`,
			name: (base || nameRaw || "Unknown").trim(),
			ticker: (base || "NEW").replace(/\s+/g, "").slice(0, 10).toUpperCase(),
			priceSol: num(attr.base_token_price_native_currency),
			liquidityUsd: num(attr.reserve_in_usd),
			createdAt: Number.isFinite(createdAt) ? createdAt : 0,
			volume5m,
			change5m,
			buys,
			sells
		});
	}
	return rows;
}
var fetchLiveRadar_createServerFn_handler = createServerRpc({
	id: "0aa61bdbaa7f5bec5dc0dc41c08cff5959898c51dd30793b3e3c206a2876d06a",
	name: "fetchLiveRadar",
	filename: "src/lib/engine/radar.ts"
}, (opts) => fetchLiveRadar.__executeServer(opts));
var fetchLiveRadar = createServerFn({ method: "POST" }).handler(fetchLiveRadar_createServerFn_handler, async () => {
	const tasks = [getJson("https://frontend-api-v3.pump.fun/coins?offset=0&limit=24&sort=created_timestamp&order=DESC&includeNsfw=false").then(parsePump), getJson("https://api.geckoterminal.com/api/v2/networks/solana/new_pools?page=1").then(parseGecko)];
	const settled = await Promise.allSettled(tasks);
	const merged = [];
	const seen = /* @__PURE__ */ new Set();
	const now = Date.now();
	for (const item of settled) {
		if (item.status !== "fulfilled") continue;
		for (const row of item.value) {
			if (seen.has(row.id) || seen.has(row.ticker)) continue;
			if ((row.createdAt > 0 ? now - row.createdAt : 0) > 72e4) continue;
			seen.add(row.id);
			seen.add(row.ticker);
			merged.push(row);
		}
	}
	return merged.slice(0, 14);
});
//#endregion
export { fetchLiveRadar_createServerFn_handler };
