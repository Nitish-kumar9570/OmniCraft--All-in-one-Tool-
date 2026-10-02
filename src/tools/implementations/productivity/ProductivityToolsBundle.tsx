"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dices, Copy, Download, Play, Pause, RotateCcw, Check, Sparkles, User, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. Random Number & Dice Generator Tool
// ==========================================
export function RandomNumberTool() {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [count, setCount] = useState<number>(5);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const generate = () => {
    if (min >= max) {
      error("Minimum must be less than maximum");
      return;
    }
    const range = max - min + 1;
    if (!allowDuplicates && count > range) {
      error(`Cannot generate ${count} unique numbers in a range of ${range}`);
      return;
    }

    const nums: number[] = [];
    const used = new Set<number>();

    while (nums.length < count) {
      const randomVal = Math.floor(Math.random() * (max - min + 1)) + min;
      if (allowDuplicates || !used.has(randomVal)) {
        used.add(randomVal);
        nums.push(randomVal);
      }
    }

    setResults(nums);
    success(`Generated ${count} random numbers`);
  };

  const handleCopy = async () => {
    if (results.length === 0) return;
    const ok = await copyToClipboard(results.join(", "));
    if (ok) {
      setCopied(true);
      success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Minimum Value</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Maximum Value</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Quantity: {count}</label>
          <input
            type="range"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={allowDuplicates}
            onChange={(e) => setAllowDuplicates(e.target.checked)}
            className="rounded border-slate-300 text-indigo-600"
          />
          <span>Allow Duplicate Numbers</span>
        </label>

        <button
          type="button"
          onClick={generate}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          <Dices className="w-4 h-4" />
          <span>Generate Numbers</span>
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Generated Results ({results.length})</label>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy List"}</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            {results.map((n, idx) => (
              <span
                key={idx}
                className="w-12 h-12 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 flex items-center justify-center font-mono font-black text-sm text-indigo-600 dark:text-indigo-400 shadow-xs"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. Stopwatch & Lap Timer Tool
// ==========================================
export function StopwatchTool() {
  const [timeMs, setTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - timeMs;
      timerRef.current = setInterval(() => {
        setTimeMs(Date.now() - startTime);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([timeMs, ...laps]);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeMs(0);
    setLaps([]);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center space-y-4">
        <div className="font-mono text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
          {formatTime(timeMs)}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white shadow-md transition-all cursor-pointer flex items-center gap-2 ${
              isRunning ? "bg-amber-600 hover:bg-amber-700" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? "Pause" : "Start"}</span>
          </button>

          <button
            type="button"
            onClick={handleLap}
            disabled={!isRunning}
            className="px-5 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-semibold text-xs text-slate-700 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
          >
            Lap
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {laps.length > 0 && (
        <div className="space-y-2 max-w-md mx-auto text-left">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Recorded Laps ({laps.length})</span>
          <div className="max-h-48 overflow-y-auto space-y-1.5 font-mono text-xs">
            {laps.map((lap, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                <span className="text-slate-500">Lap {laps.length - idx}</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{formatTime(lap)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
