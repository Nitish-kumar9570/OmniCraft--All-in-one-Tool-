"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle2,
  Calendar,
  Shuffle,
  Dice1,
  User,
  Plus,
  Trash2,
  Globe,
  RotateCcw,
  Sparkles,
  Award,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. 3D Multi-Dice Roller Tool (D6, D20, D12, D10)
// ==========================================
export function DiceRollerTool() {
  const [diceType, setDiceType] = useState<number>(6);
  const [diceCount, setDiceCount] = useState<number>(2);
  const [results, setResults] = useState<number[]>([4, 6]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const rolls = Array.from({ length: diceCount }).map(() => Math.floor(Math.random() * diceType) + 1);
      setResults(rolls);
      setIsRolling(false);
    }, 300);
  };

  const totalSum = results.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {[6, 10, 12, 20, 100].map((d) => (
          <button
            key={d}
            onClick={() => setDiceType(d)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${
              diceType === d ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400" : "border-slate-200 dark:border-white/10"
            }`}
          >
            D{d}
          </button>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {results.map((r, idx) => (
            <div
              key={idx}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500 text-slate-950 font-mono font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-xl transition-all ${
                isRolling ? "rotate-45 scale-90" : "rotate-0 scale-100"
              }`}
            >
              {r}
            </div>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Total Sum: <strong className="text-amber-400 text-base">{totalSum}</strong>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-xs font-bold block mb-1">Number of Dice (1-6)</label>
          <input
            type="number"
            min={1}
            max={6}
            value={diceCount}
            onChange={(e) => setDiceCount(Math.min(6, Math.max(1, parseInt(e.target.value, 10) || 1)))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <button
          onClick={rollDice}
          className="mt-5 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs cursor-pointer"
        >
          Roll {diceCount}× D{diceType}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. Heads or Tails Realistic Coin Flipper
// ==========================================
export function CoinFlipperTool() {
  const [result, setResult] = useState<"Heads" | "Tails">("Heads");
  const [stats, setStats] = useState({ heads: 0, tails: 0, total: 0 });
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCoin = () => {
    setIsFlipping(true);
    setTimeout(() => {
      const isHeads = Math.random() > 0.5;
      const res = isHeads ? "Heads" : "Tails";
      setResult(res);
      setStats((prev) => ({
        heads: prev.heads + (isHeads ? 1 : 0),
        tails: prev.tails + (!isHeads ? 1 : 0),
        total: prev.total + 1,
      }));
      setIsFlipping(false);
    }, 400);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center p-8">
        <div
          onClick={flipCoin}
          className={`w-36 h-36 rounded-full border-4 border-amber-400 bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-900 font-extrabold text-xl flex items-center justify-center shadow-2xl cursor-pointer select-none transition-all ${
            isFlipping ? "scale-90 rotate-180" : "scale-100 rotate-0"
          }`}
        >
          {result}
        </div>
      </div>

      <button
        onClick={flipCoin}
        className="px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm cursor-pointer shadow-lg"
      >
        Flip Coin
      </button>

      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-slate-400 block">Heads</span>
          <span className="font-bold font-mono text-sm">{stats.heads}</span>
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-slate-400 block">Tails</span>
          <span className="font-bold font-mono text-sm">{stats.tails}</span>
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-slate-400 block">Total Flips</span>
          <span className="font-bold font-mono text-sm">{stats.total}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. World Clock & Timezone Explorer
// ==========================================
export function WorldClockTimezoneTool() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timezones = [
    { city: "UTC / GMT", zone: "UTC" },
    { city: "New York (EST)", zone: "America/New_York" },
    { city: "San Francisco (PST)", zone: "America/Los_Angeles" },
    { city: "London (GMT)", zone: "Europe/London" },
    { city: "Tokyo (JST)", zone: "Asia/Tokyo" },
    { city: "Sydney (AEDT)", zone: "Australia/Sydney" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {timezones.map((tz) => (
          <div key={tz.city} className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-1">
            <span className="text-xs font-bold text-slate-500">{tz.city}</span>
            <div className="text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
              {time.toLocaleTimeString("en-US", { timeZone: tz.zone, hour12: true })}
            </div>
            <span className="text-[10px] text-slate-400 block">
              {time.toLocaleDateString("en-US", { timeZone: tz.zone, month: "short", day: "numeric", weekday: "short" })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
