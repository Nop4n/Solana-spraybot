import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as Settings2, c as Pause, i as Trash2, l as Activity, n as X, o as Radio, s as Play, t as Zap } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as Area, r as ResponsiveContainer, t as AreaChart } from "../_libs/recharts+[...].mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BT7a0aOv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}
function formatSol(n) {
	const abs = Math.abs(n);
	if (abs >= 100) return n.toFixed(2);
	if (abs >= 1) return n.toFixed(3);
	if (abs >= .01) return n.toFixed(4);
	return n.toFixed(6);
}
function formatPct(n) {
	return `${n > 0 ? "+" : ""}${n.toFixed(1)}%`;
}
function formatAge(ms) {
	const s = Math.max(0, Math.floor(ms / 1e3));
	if (s < 60) return `${s}s`;
	return `${Math.floor(s / 60)}m ${s % 60}s`;
}
function formatTime(ts) {
	const d = new Date(ts);
	return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
}
var tones = {
	paper: "bg-accent text-accent-fg",
	muted: "bg-elevated text-muted",
	up: "bg-up/15 text-up",
	down: "bg-down/15 text-down",
	live: "shadow-border text-fg"
};
function Badge({ className, tone = "muted", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tracking-wide", tones[tone], className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color,opacity,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-95 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			outline: "bg-transparent text-fg shadow-border hover:bg-elevated hover:shadow-border-hover",
			ghost: "text-fg hover:bg-elevated",
			danger: "bg-down text-bg hover:bg-down/90",
			quiet: "text-muted hover:bg-elevated hover:text-fg"
		},
		size: {
			default: "h-11 min-h-11 px-4",
			sm: "h-9 min-h-9 px-3 text-xs",
			lg: "h-12 min-h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Sheet({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-slot": "sheet",
		...props
	});
}
function SheetTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
		"data-slot": "sheet-trigger",
		...props
	});
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, { ...props });
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		className: cn("fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function SheetContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-surface shadow-border", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", "duration-300", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "absolute top-3 right-3",
				"aria-label": "Tutup",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			})
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("border-b border-border px-6 py-5 pr-14", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-sans text-lg font-medium tracking-tight text-fg", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		className: cn("mt-1 text-sm text-muted", className),
		...props
	});
}
function SheetBody({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("min-h-0 flex-1 overflow-y-auto px-6 py-5", className),
		...props
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex h-11 w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1 w-full grow overflow-hidden rounded-full bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "relative block size-4 rounded-full bg-accent shadow-border after:absolute after:top-1/2 after:left-1/2 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70" })]
	});
}
function TooltipProvider({ delayDuration = 180, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration,
		...props
	});
}
function Tooltip({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, { ...props });
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, { ...props });
}
function TooltipContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 max-w-xs rounded-md bg-elevated px-2.5 py-1.5 text-xs text-fg shadow-border", className),
		...props
	}) });
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var fetchLiveRadar = createServerFn({ method: "POST" }).handler(createSsrRpc("0aa61bdbaa7f5bec5dc0dc41c08cff5959898c51dd30793b3e3c206a2876d06a"));
var HEADS = [
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
	"Mekar"
];
var TAILS = [
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
	"Zed"
];
var PREFIX = [
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
	"SUR"
];
var SUFFIX = [
	"AI",
	"ON",
	"EX",
	"IQ",
	"US",
	"OH",
	"IX",
	"AY",
	"ER",
	"OL",
	"IN",
	"OK",
	"UV",
	"AZ"
];
function pick(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function waveIdAt(now) {
	return `w${Math.floor(now / 7e3)}`;
}
function spawnSimToken(now, waveId) {
	const ticker = `${pick(PREFIX)}${pick(SUFFIX)}`;
	const name = `${pick(HEADS)} ${pick(TAILS)}`;
	const price = 2e-6 + Math.random() * 9e-5;
	const ignite = Math.random() < .42;
	return {
		id: `sim_${now.toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
		name,
		ticker,
		waveId,
		spawnedAt: now,
		price,
		startPrice: price,
		liquidityUsd: 2200 + Math.random() * 48e3,
		volume5m: Math.random() * 400,
		buys5m: Math.floor(Math.random() * 6),
		sells5m: Math.floor(Math.random() * 4),
		heat: ignite ? .5 + Math.random() * .5 : Math.random() * .18,
		dumpBias: 0,
		source: "sim"
	};
}
function tokenFromLive(now, row) {
	const price = row.priceSol > 0 ? row.priceSol : 1e-5 + Math.random() * 4e-5;
	const heat = clamp(.15 + row.change5m / 80, .05, .95);
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
		dumpBias: row.change5m < -8 ? .3 : 0,
		source: "live"
	};
}
function tickToken(t, dt, now) {
	let { price, heat, dumpBias, volume5m, buys5m, sells5m, liquidityUsd } = t;
	const age = (now - t.spawnedAt) / 1e3;
	if (heat < .2 && age < 22 && Math.random() < .22 * dt) heat = .55 + Math.random() * .42;
	let ret = (Math.random() - .48) * .85 * .18 * dt;
	if (heat > .05) {
		ret += heat * .62 * dt;
		heat *= Math.exp(-1.55 * dt);
		if (Math.random() < .85 * dt) buys5m += 1;
		volume5m += Math.abs(price) * (180 + Math.random() * 900);
	}
	if (heat < .2 && age > 5 && Math.random() < .18 * dt) dumpBias = Math.max(dumpBias, .28 + Math.random() * .55);
	if (dumpBias > 0) {
		ret -= dumpBias * .78 * dt;
		dumpBias *= Math.exp(-.85 * dt);
		if (Math.random() < .7 * dt) sells5m += 1;
	}
	const chg = (price - t.startPrice) / t.startPrice;
	ret -= chg * .035 * dt;
	price = Math.max(price * (1 + ret), t.startPrice * .04);
	liquidityUsd = Math.max(350, liquidityUsd * (1 + ret * .18));
	return {
		...t,
		price,
		heat,
		dumpBias,
		volume5m,
		buys5m,
		sells5m,
		liquidityUsd
	};
}
function scoreToken(t, now, settings) {
	const age = (now - t.spawnedAt) / 1e3;
	if (age > settings.maxAgeSec) return 0;
	const recency = clamp(1 - age / settings.maxAgeSec, 0, 1) * 30;
	const heat = clamp(t.heat, 0, 1) * 26;
	const chg = (t.price - t.startPrice) / t.startPrice * 100;
	let chgScore = 0;
	if (chg > 90) chgScore = 4;
	else if (chg > 0) chgScore = clamp(chg * .55, 0, 20);
	else chgScore = clamp(chg * .25, -12, 0);
	const flow = t.buys5m + t.sells5m;
	const flowScore = ((flow > 0 ? t.buys5m / flow : .5) - .45) * 28 + clamp(flow / 6, 0, 10);
	const liq = t.liquidityUsd < settings.minLiqUsd ? -10 : clamp(t.liquidityUsd / 12e3, 0, 8);
	return clamp(Math.round(recency + heat + chgScore + flowScore + liq), 0, 100);
}
function changePct(t) {
	if (t.startPrice <= 0) return 0;
	return (t.price - t.startPrice) / t.startPrice * 100;
}
var DEFAULT_SETTINGS = {
	startingSol: 10,
	spraySize: .25,
	sprayWidth: 3,
	maxPositions: 6,
	holdMaxSec: 25,
	minScore: 50,
	maxAgeSec: 90,
	tpPct: 22,
	slPct: 14,
	minLiqUsd: 2500
};
var DEFAULT_STATS = {
	wins: 0,
	losses: 0,
	trades: 0,
	holdMsSum: 0,
	sprays: 0,
	peakEquity: 10
};
var BUY_SLIP = 1.003;
var SELL_SLIP = .996;
var TAPE_CAP = 100;
var MARKET_CAP = 18;
function nid(prefix) {
	return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}
function sysTape(text, at) {
	return {
		id: nid("t"),
		kind: "sys",
		text,
		at
	};
}
function markEquity(cash, positions, market) {
	let u = 0;
	for (const p of positions) {
		const px = (market.find((x) => x.id === p.tokenId)?.price ?? p.entryPrice) * SELL_SLIP;
		u += p.qty * px;
	}
	return cash + u;
}
function closeOne(p, token, now, reason) {
	const px = (token?.price ?? p.entryPrice) * SELL_SLIP;
	const proceeds = p.qty * px;
	const pnlSol = proceeds - p.sizeSol;
	const pnlPct = p.sizeSol > 0 ? pnlSol / p.sizeSol * 100 : 0;
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
			at: now
		}
	};
}
function openBuy(token, sizeSol, now, settings, reason) {
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
			holdMaxMs: settings.holdMaxSec * 1e3,
			tpPct: settings.tpPct,
			slPct: settings.slPct
		},
		item: {
			id: nid("t"),
			kind: "buy",
			ticker: token.ticker,
			name: token.name,
			sizeSol: spend,
			price: px,
			reason,
			at: now
		}
	};
}
var useDesk = create()(persist((set, get) => ({
	settings: { ...DEFAULT_SETTINGS },
	cash: DEFAULT_SETTINGS.startingSol,
	realized: 0,
	armed: false,
	market: [],
	positions: [],
	tape: [],
	stats: { ...DEFAULT_STATS },
	equityHistory: [{
		t: Date.now(),
		v: DEFAULT_SETTINGS.startingSol
	}],
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
			tape: [sysTape(armed ? "Bot SIAP — spray momentum, hold max, jual semua" : "Bot JEDA", now), ...s.tape].slice(0, TAPE_CAP)
		}));
	},
	setIntroSeen: () => set({ introSeen: true }),
	patchSettings: (patch) => set((s) => ({ settings: {
		...s.settings,
		...patch,
		sprayWidth: clamp(patch.sprayWidth ?? s.settings.sprayWidth, 1, 5),
		maxPositions: clamp(patch.maxPositions ?? s.settings.maxPositions, 1, 10),
		holdMaxSec: clamp(patch.holdMaxSec ?? s.settings.holdMaxSec, 8, 60),
		minScore: clamp(patch.minScore ?? s.settings.minScore, 30, 90),
		maxAgeSec: clamp(patch.maxAgeSec ?? s.settings.maxAgeSec, 20, 240),
		tpPct: clamp(patch.tpPct ?? s.settings.tpPct, 4, 80),
		slPct: clamp(patch.slPct ?? s.settings.slPct, 4, 60),
		spraySize: clamp(patch.spraySize ?? s.settings.spraySize, .05, 2),
		startingSol: clamp(patch.startingSol ?? s.settings.startingSol, 1, 100),
		minLiqUsd: clamp(patch.minLiqUsd ?? s.settings.minLiqUsd, 0, 5e4)
	} })),
	tick: () => {
		const now = Date.now();
		const s = get();
		const dt = s.lastTick === 0 ? .25 : clamp((now - s.lastTick) / 1e3, .05, .6);
		let market = s.market.map((t) => tickToken(t, dt, now));
		const held = new Set(s.positions.map((p) => p.tokenId));
		market = market.filter((t) => held.has(t.id) || now - t.spawnedAt < 36e4);
		if (now - s.lastSpawnAt >= s.nextSpawnMs) {
			const wave = waveIdAt(now);
			const n = Math.random() < .32 ? 3 : Math.random() < .5 ? 2 : 1;
			for (let i = 0; i < n; i += 1) market.unshift(spawnSimToken(now + i, wave));
		}
		market = market.slice(0, MARKET_CAP);
		let cash = s.cash;
		let realized = s.realized;
		let positions = [...s.positions];
		let tape = s.tape;
		let stats = { ...s.stats };
		const cooldown = { ...s.cooldown };
		const still = [];
		for (const p of positions) {
			const token = market.find((t) => t.id === p.tokenId);
			const pnlPct = ((token?.price ?? p.entryPrice) - p.entryPrice) / p.entryPrice * 100;
			const age = now - p.openedAt;
			let reason = null;
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
			cooldown[p.tokenId] = now + 25e3;
		}
		positions = still;
		let lastSprayAt = s.lastSprayAt;
		if (s.armed && now - lastSprayAt >= 1400 && positions.length < s.settings.maxPositions && cash >= Math.min(s.settings.spraySize, .05)) {
			const ranked = market.map((t) => ({
				t,
				score: scoreToken(t, now, s.settings)
			})).filter(({ t, score }) => {
				if (score < s.settings.minScore) return false;
				if (positions.some((p) => p.tokenId === t.id)) return false;
				if (cooldown[t.id] && now < cooldown[t.id]) return false;
				if (t.liquidityUsd < s.settings.minLiqUsd) return false;
				return true;
			}).sort((a, b) => b.score - a.score);
			const room = s.settings.maxPositions - positions.length;
			const picks = ranked.slice(0, Math.min(s.settings.sprayWidth, room));
			if (picks.length) {
				const bought = [];
				for (const { t } of picks) {
					const size = Math.min(s.settings.spraySize, cash);
					if (size < .04) break;
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
		if (now - lastEquityAt >= 1e3) {
			equityHistory = [...equityHistory, {
				t: now,
				v: equity
			}].slice(-180);
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
			nextSpawnMs: spawned ? 4200 + Math.random() * 3800 : s.nextSpawnMs
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
					pulling: false
				};
			});
		} catch {
			set({
				pulling: false,
				feed: "sim"
			});
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
			if (size < .04) return s;
			const opened = openBuy(token, size, now, s.settings, "manual");
			return {
				cash: s.cash - opened.spend,
				positions: [opened.position, ...s.positions],
				tape: [opened.item, ...s.tape].slice(0, TAPE_CAP)
			};
		});
	},
	sellOne: (positionId) => {
		const now = Date.now();
		set((s) => {
			const p = s.positions.find((x) => x.id === positionId);
			if (!p) return s;
			const closed = closeOne(p, s.market.find((t) => t.id === p.tokenId), now, "manual");
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
				cooldown: {
					...s.cooldown,
					[p.tokenId]: now + 25e3
				}
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
				const closed = closeOne(p, s.market.find((t) => t.id === p.tokenId), now, "manual");
				cash += closed.proceeds;
				realized += closed.pnlSol;
				tape = [closed.item, ...tape];
				stats.trades += 1;
				stats.holdMsSum += now - p.openedAt;
				if (closed.pnlSol >= 0) stats.wins += 1;
				else stats.losses += 1;
				cooldown[p.tokenId] = now + 25e3;
			}
			tape = [sysTape(`Jual semua · ${s.positions.length} posisi`, now), ...tape].slice(0, TAPE_CAP);
			return {
				cash,
				realized,
				positions: [],
				tape,
				stats,
				cooldown
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
			stats: {
				...DEFAULT_STATS,
				peakEquity: start
			},
			equityHistory: [{
				t: now,
				v: start
			}],
			cooldown: {},
			lastSprayAt: 0,
			lastEquityAt: now
		});
	}
}), {
	name: "kilat-paper-v1",
	skipHydration: true,
	partialize: (s) => ({
		settings: s.settings,
		cash: s.cash,
		realized: s.realized,
		tape: s.tape.slice(0, 80),
		stats: s.stats,
		equityHistory: s.equityHistory.slice(-120),
		introSeen: s.introSeen
	}),
	merge: (persisted, current) => {
		const p = persisted ?? {};
		return {
			...current,
			...p,
			settings: {
				...current.settings,
				...p.settings
			},
			stats: {
				...current.stats,
				...p.stats
			},
			armed: false,
			positions: [],
			market: current.market,
			cooldown: {}
		};
	}
}));
var loop = null;
var liveLoop = null;
function startEngine() {
	if (loop) return;
	useDesk.setState({ lastTick: Date.now() });
	if (useDesk.getState().market.length === 0) {
		const now = Date.now();
		const wave = waveIdAt(now);
		const seed = [];
		for (let i = 0; i < 6; i += 1) {
			const t = spawnSimToken(now - i * 4e3, wave);
			t.heat = Math.random() * .7;
			seed.push(t);
		}
		useDesk.setState({
			market: seed,
			lastSpawnAt: now
		});
	}
	loop = setInterval(() => {
		useDesk.getState().tick();
	}, 250);
	liveLoop = setInterval(() => {
		useDesk.getState().pullLive();
	}, 28e3);
	useDesk.getState().pullLive();
}
function stopEngine() {
	if (loop) {
		clearInterval(loop);
		loop = null;
	}
	if (liveLoop) {
		clearInterval(liveLoop);
		liveLoop = null;
	}
}
function positionMark(p, market) {
	const token = market.find((t) => t.id === p.tokenId);
	const px = token?.price ?? p.entryPrice;
	const pnlSol = p.qty * px * SELL_SLIP - p.sizeSol;
	return {
		token,
		px,
		pnlSol,
		pnlPct: p.sizeSol > 0 ? pnlSol / p.sizeSol * 100 : 0,
		remainMs: Math.max(0, p.holdMaxMs - (Date.now() - p.openedAt)),
		chg: token ? changePct(token) : 0
	};
}
function deskEquity() {
	const s = useDesk.getState();
	return markEquity(s.cash, s.positions, s.market);
}
var REASON = {
	tp: "TP",
	sl: "SL",
	time: "waktu",
	manual: "manual",
	spray: "spray"
};
function Desk() {
	const [tab, setTab] = (0, import_react.useState)("radar");
	const introSeen = useDesk((s) => s.introSeen);
	const armed = useDesk((s) => s.armed);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			await useDesk.persist.rehydrate();
			if (cancelled) return;
			startEngine();
		})();
		return () => {
			cancelled = true;
			stopEngine();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-h-dvh flex-col bg-bg text-fg border-l-2", armed ? "border-accent" : "border-transparent"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			!introSeen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsStrip, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col px-3 pb-3 md:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
							tab,
							onTab: setTab
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("min-h-0 gap-3 lg:grid lg:flex-1 lg:grid-cols-12", tab === "tape" ? "hidden lg:grid" : "flex flex-1"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: cn("min-h-0 lg:col-span-4", tab === "radar" ? "flex flex-1" : "hidden lg:flex"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadarPanel, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: cn("min-h-0 lg:col-span-8", tab === "posisi" ? "flex flex-1" : "hidden lg:flex"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PositionsPanel, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: cn("mt-3 lg:h-64", tab === "tape" ? "flex min-h-0 flex-1 lg:flex-none" : "hidden lg:flex"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TapePanel, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "px-4 pb-4 text-center text-xs text-faint md:px-5",
				children: "Paper trading. Bukan nasihat keuangan. Tidak ada transaksi Solana on-chain."
			})
		]
	}) });
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
	const sessionPct = settings.startingSol > 0 ? (equity - settings.startingSol) / settings.startingSol * 100 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-col gap-4 px-3 py-4 md:flex-row md:items-end md:justify-between md:px-5 md:py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3 md:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
						className: "size-4 text-accent",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-medium tracking-widest text-fg",
						children: "KILAT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "paper",
						children: "PAPER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: feed === "mixed" ? "live" : "muted",
						children: feed === "mixed" ? "CAMPURAN" : "SIM"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					"Spray token baru · hold max ",
					settings.holdMaxSec,
					"s · jual semua"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsButton, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end gap-4 md:gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquitySpark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-muted uppercase",
						children: "Ekuitas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-3xl leading-none font-medium tracking-tight text-fg tabular-nums",
						children: [formatSol(equity), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 text-sm text-muted",
							children: "SOL"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("mt-1 font-mono text-sm tabular-nums", sessionPct >= 0 ? "text-up" : "text-down"),
						children: [
							formatPct(sessionPct),
							" sesi · tunai ",
							formatSol(cash),
							" · real ",
							formatSol(realized)
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full gap-2 md:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "flex-1 md:flex-none",
							variant: armed ? "default" : "outline",
							"aria-pressed": armed,
							onClick: () => useDesk.getState().setArmed(!armed),
							children: armed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "arm-dot size-2 rounded-full bg-accent-fg",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}),
								"Jeda"
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), "Siapkan bot"] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "flex-1 md:flex-none",
							disabled: !positions.length,
							onClick: () => useDesk.getState().sellAll(),
							children: "Jual semua"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden md:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsButton, {})
						})
					]
				})
			]
		})]
	});
}
function deskEquityFrom(cash, positions, market) {
	return deskEquity();
}
function EquitySpark() {
	const data = useDesk((s) => s.equityHistory);
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setOn(true), []);
	if (!on || data.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden h-12 w-32 md:block" });
	const up = data[data.length - 1].v >= data[0].v;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden h-12 w-36 md:block",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaChart, {
				data,
				margin: {
					top: 4,
					right: 0,
					left: 0,
					bottom: 0
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					type: "monotone",
					dataKey: "v",
					stroke: up ? "var(--color-up)" : "var(--color-down)",
					fill: up ? "var(--color-up)" : "var(--color-down)",
					fillOpacity: .14,
					strokeWidth: 1.5,
					isAnimationActive: false
				})
			})
		})
	});
}
function Intro() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-3 mb-3 rounded-2xl bg-surface p-2 shadow-border md:mx-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 rounded-xl bg-elevated px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-fg",
				children: "Mode paper. Spray beli token baru yang momentum, hold maksimal 25 detik, lalu jual semua. Nama bisa dari pasar nyata — pergerakan 25 detik disimulasikan. Tidak ada SOL asli."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => useDesk.getState().setIntroSeen(),
				children: "Mengerti"
			})]
		})
	});
}
function StatsStrip() {
	const stats = useDesk((s) => s.stats);
	const positions = useDesk((s) => s.positions);
	const wr = stats.trades > 0 ? stats.wins / stats.trades * 100 : 0;
	const avgHold = stats.trades > 0 ? stats.holdMsSum / stats.trades / 1e3 : 0;
	const items = [
		{
			k: "Posisi",
			v: String(positions.length)
		},
		{
			k: "Trade",
			v: String(stats.trades)
		},
		{
			k: "Menang",
			v: `${stats.wins}/${stats.losses}`
		},
		{
			k: "Winrate",
			v: `${wr.toFixed(0)}%`
		},
		{
			k: "Avg hold",
			v: `${avgHold.toFixed(1)}s`
		},
		{
			k: "Spray",
			v: String(stats.sprays)
		},
		{
			k: "Puncak",
			v: `${formatSol(stats.peakEquity)} SOL`
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-3 flex gap-2 overflow-x-auto px-3 md:px-5",
		children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-24 shrink-0 rounded-xl bg-surface px-3 py-2 shadow-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: it.k
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-sm font-medium tabular-nums text-fg",
				children: it.v
			})]
		}, it.k))
	});
}
function Segmented({ tab, onTab }) {
	const pos = useDesk((s) => s.positions.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex rounded-xl bg-surface p-1 shadow-border",
		children: [
			{
				id: "radar",
				label: "Radar"
			},
			{
				id: "posisi",
				label: "Posisi",
				extra: pos ? String(pos) : void 0
			},
			{
				id: "tape",
				label: "Tape"
			}
		].map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onTab(it.id),
			className: cn("flex h-11 flex-1 items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors duration-150", tab === it.id ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
			children: [it.label, it.extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: "paper",
				children: it.extra
			}) : null]
		}, it.id))
	});
}
function Panel({ title, icon, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 w-full flex-col rounded-2xl bg-surface p-2 shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm font-medium text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: icon
				}), title]
			}), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto rounded-xl bg-bg p-2",
			children
		})]
	});
}
function RadarPanel() {
	const market = useDesk((s) => s.market);
	const settings = useDesk((s) => s.settings);
	const positions = useDesk((s) => s.positions);
	const now = Date.now();
	const rows = [...market].map((t) => ({
		t,
		score: scoreToken(t, now, settings)
	})).sort((a, b) => b.score - a.score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Radar token baru",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4" }),
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-xs text-muted",
			children: [rows.length, " live"]
		}),
		children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-3 py-8 text-center text-sm text-muted",
			children: "Memuat radar…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-1",
			children: rows.map(({ t, score }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadarRow, {
				token: t,
				score,
				threshold: settings.minScore,
				held: positions.some((p) => p.tokenId === t.id)
			}, t.id))
		})
	});
}
function RadarRow({ token, score, threshold, held }) {
	const chg = changePct(token);
	const hot = score >= threshold;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex min-h-11 items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-elevated",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm font-medium text-fg",
							children: token.ticker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-xs text-muted",
							children: token.name
						}),
						token.source === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs tracking-wide text-faint",
							children: "LIVE"
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1 flex-1 rounded-full bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-full rounded-full", hot ? "bg-accent" : "bg-faint"),
							style: { width: `${score}%` }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-8 font-mono text-xs tabular-nums text-muted",
						children: score
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("font-mono text-xs tabular-nums", chg >= 0 ? "text-up" : "text-down"),
					children: formatPct(chg)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-faint tabular-nums",
					children: formatAge(Date.now() - token.spawnedAt)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: hot ? "default" : "outline",
				disabled: held,
				onClick: () => useDesk.getState().buyManual(token.id),
				children: held ? "Hold" : "Beli"
			})
		]
	});
}
function PositionsPanel() {
	const positions = useDesk((s) => s.positions);
	const market = useDesk((s) => s.market);
	const armed = useDesk((s) => s.armed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Posisi terbuka",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4" }),
		action: armed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1.5 text-xs text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "arm-dot size-1.5 rounded-full bg-up" }), "auto spray"]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted",
			children: "jeda"
		}),
		children: positions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex h-full min-h-52 flex-col items-center justify-center px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pointer-events-none absolute text-6xl font-medium tracking-widest text-fg/5",
					children: "PAPER"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg",
					children: "Tidak ada posisi."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-sm text-sm text-muted",
					children: "Tekan Siapkan bot untuk spray otomatis, atau beli manual dari radar. Hold maksimal lalu jual semua."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
			children: positions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PositionCard, {
				position: p,
				market
			}, p.id))
		})
	});
}
function PositionCard({ position, market }) {
	const mark = positionMark(position, market);
	const progress = position.holdMaxMs > 0 ? mark.remainMs / position.holdMaxMs : 0;
	const sec = Math.ceil(mark.remainMs / 1e3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl bg-surface p-3 shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-sm font-medium text-fg",
					children: position.ticker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-muted",
					children: position.name
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldRing, {
				progress,
				urgent: mark.remainMs < 5e3,
				label: `${sec}s`
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-end justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("font-mono text-lg font-medium tabular-nums", mark.pnlSol >= 0 ? "text-up" : "text-down"),
				children: formatPct(mark.pnlPct)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs text-muted tabular-nums",
				children: [
					mark.pnlSol >= 0 ? "+" : "",
					formatSol(mark.pnlSol),
					" SOL · ",
					formatSol(position.sizeSol),
					" in"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: () => useDesk.getState().sellOne(position.id),
				children: "Jual"
			})]
		})]
	});
}
function HoldRing({ progress, urgent, label }) {
	const r = 16;
	const c = 2 * Math.PI * r;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative size-11 shrink-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 40 40",
			className: "size-11 -rotate-90",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "20",
				cy: "20",
				r,
				className: "fill-none stroke-elevated",
				strokeWidth: "3"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "20",
				cy: "20",
				r,
				className: urgent ? "fill-none stroke-down" : "fill-none stroke-accent",
				strokeWidth: "3",
				strokeDasharray: c,
				strokeDashoffset: c * (1 - progress),
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute inset-0 flex items-center justify-center font-mono text-xs tabular-nums text-fg",
			children: label
		})]
	});
}
function TapePanel() {
	const tape = useDesk((s) => s.tape);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Tape",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4" }),
		children: tape.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-3 py-8 text-center text-sm text-muted",
			children: "Belum ada isi. Arm bot untuk mulai."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col",
			children: tape.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TapeRow, { row }, row.id))
		})
	});
}
function TapeRow({ row }) {
	if (row.kind === "sys") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex min-h-9 items-center gap-3 px-2 py-1 text-xs text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-faint tabular-nums",
			children: formatTime(row.at)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.text })]
	});
	const sellUp = row.kind === "sell" && (row.pnlSol ?? 0) >= 0;
	const sellDown = row.kind === "sell" && (row.pnlSol ?? 0) < 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex min-h-10 items-center gap-3 border-b border-border px-2 py-1.5 last:border-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-16 font-mono text-xs text-faint tabular-nums",
				children: formatTime(row.at)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("w-10 font-mono text-xs font-medium", row.kind === "buy" ? "text-fg" : sellUp ? "text-up" : "text-down"),
				children: row.kind === "buy" ? "BUY" : "SELL"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-16 font-mono text-sm text-fg",
				children: row.ticker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden flex-1 truncate text-xs text-muted sm:block",
				children: row.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-xs text-muted tabular-nums",
				children: [formatSol(row.sizeSol ?? 0), " SOL"]
			}),
			row.kind === "sell" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("w-16 text-right font-mono text-xs tabular-nums", sellUp ? "text-up" : sellDown ? "text-down" : "text-muted"),
				children: formatPct(row.pnlPct ?? 0)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-16 text-right font-mono text-xs text-faint",
				children: row.reason ? REASON[row.reason] : ""
			}),
			row.kind === "sell" && row.reason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden w-12 text-right text-xs text-faint sm:block",
				children: REASON[row.reason]
			}) : null
		]
	});
}
function SettingsButton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			size: "icon",
			"aria-label": "Pengaturan",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Strategi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Spray beli token baru di atas ambang skor, hold terbatas, lalu jual semua. Paper only." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsForm, {}) })] })] });
}
function SettingsForm() {
	const settings = useDesk((s) => s.settings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "SOL per spray",
				value: `${formatSol(settings.spraySize)} SOL`,
				hint: "Ukuran beli tiap token dalam satu gelombang",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: .05,
					max: 1,
					step: .05,
					value: [settings.spraySize],
					onValueChange: ([v]) => useDesk.getState().patchSettings({ spraySize: v })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Lebar spray",
				value: `${settings.sprayWidth} token`,
				hint: "Berapa token dibeli sekaligus",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 1,
					max: 5,
					step: 1,
					value: [settings.sprayWidth],
					onValueChange: ([v]) => useDesk.getState().patchSettings({ sprayWidth: v })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Max posisi",
				value: String(settings.maxPositions),
				hint: "Kapasitas hold bersamaan",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 1,
					max: 10,
					step: 1,
					value: [settings.maxPositions],
					onValueChange: ([v]) => useDesk.getState().patchSettings({ maxPositions: v })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hold maksimal",
				value: `${settings.holdMaxSec}s`,
				hint: "Setelah ini, jual semua sisa posisi token itu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 8,
					max: 60,
					step: 1,
					value: [settings.holdMaxSec],
					onValueChange: ([v]) => useDesk.getState().patchSettings({ holdMaxSec: v })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Ambang skor",
				value: String(settings.minScore),
				hint: "Momentum 0–100 dari umur, heat, arus beli, likuiditas",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 30,
					max: 85,
					step: 1,
					value: [settings.minScore],
					onValueChange: ([v]) => useDesk.getState().patchSettings({ minScore: v })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Umur max token",
				value: `${settings.maxAgeSec}s`,
				hint: "Hanya token lebih muda dari ini yang di-spray",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 20,
					max: 180,
					step: 5,
					value: [settings.maxAgeSec],
					onValueChange: ([v]) => useDesk.getState().patchSettings({ maxAgeSec: v })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Take profit",
				value: formatPct(settings.tpPct),
				hint: "Jual jika naik segini",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 6,
					max: 60,
					step: 1,
					value: [settings.tpPct],
					onValueChange: ([v]) => useDesk.getState().patchSettings({ tpPct: v })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Stop loss",
				value: formatPct(settings.slPct),
				hint: "Jual jika turun segini",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 6,
					max: 40,
					step: 1,
					value: [settings.slPct],
					onValueChange: ([v]) => useDesk.getState().patchSettings({ slPct: v })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Min likuiditas",
				value: `$${Math.round(settings.minLiqUsd / 100) * 100}`,
				hint: "Filter kolam terlalu tipis",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 0,
					max: 2e4,
					step: 500,
					value: [settings.minLiqUsd],
					onValueChange: ([v]) => useDesk.getState().patchSettings({ minLiqUsd: v })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Modal paper",
				value: `${formatSol(settings.startingSol)} SOL`,
				hint: "Berlaku saat reset",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 2,
					max: 50,
					step: 1,
					value: [settings.startingSol],
					onValueChange: ([v]) => useDesk.getState().patchSettings({ startingSol: v })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: () => useDesk.getState().resetPaper(),
				className: "mt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "Reset paper"]
			})
		]
	});
}
function Field({ label, value, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-fg",
				children: label
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: hint })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-sm tabular-nums text-muted",
			children: value
		})]
	}), children] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Desk, {});
}
//#endregion
export { Home as component };
