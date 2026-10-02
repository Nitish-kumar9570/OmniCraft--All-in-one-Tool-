"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import confetti from "canvas-confetti";

export function PomodoroTimerTool() {
  const [mode, setMode] = useState<"work" | "short" | "long">("work");
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  const getDuration = (m: "work" | "short" | "long") => {
    switch (m) {
      case "work": return 25 * 60;
      case "short": return 5 * 60;
      case "long": return 15 * 60;
    }
  };

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      try {
        confetti({ particleCount: 60, spread: 70 });
      } catch {}
      if (mode === "work") {
        setCompletedCycles((c) => c + 1);
        setMode("short");
        setTimeLeft(5 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (m: "work" | "short" | "long") => {
    setMode(m);
    setTimeLeft(getDuration(m));
    setIsRunning(false);
  };

  const formatMinutes = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      {/* Mode Switches */}
      <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 dark:bg-[#0f172a] border border-slate-300/80 dark:border-white/10 shadow-inner touch-manipulation">
        <button
          type="button"
          onClick={() => switchMode("work")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer touch-manipulation active:scale-95 ${mode === "work" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
        >
          Pomodoro (25m)
        </button>
        <button
          type="button"
          onClick={() => switchMode("short")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer touch-manipulation active:scale-95 ${mode === "short" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
        >
          Short Break (5m)
        </button>
        <button
          type="button"
          onClick={() => switchMode("long")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer touch-manipulation active:scale-95 ${mode === "long" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
        >
          Long Break (15m)
        </button>
      </div>


      {/* Big Timer Clock */}
      <div className="p-10 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl">
        <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
          {formatMinutes(timeLeft)}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 capitalize font-medium">
          {mode === "work" ? "🎯 Focus Session" : "☕ Rest & Recharge"}
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="gradient"
          size="lg"
          onClick={() => setIsRunning(!isRunning)}
          leftIcon={isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        >
          {isRunning ? "Pause" : "Start Focus"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(getDuration(mode));
          }}
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Reset
        </Button>
      </div>

      {/* Completed streak counter */}
      <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
        <span>Completed Focus Sessions Today: <strong className="text-slate-900 dark:text-white">{completedCycles}</strong></span>
      </div>
    </div>
  );
}
