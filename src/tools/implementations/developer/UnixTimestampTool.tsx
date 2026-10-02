"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";

export function UnixTimestampTool() {
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [inputEpoch, setInputEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().slice(0, 16));

  useEffect(() => {
    const timer = setInterval(() => setCurrentEpoch(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const convertedDate = new Date(inputEpoch * 1000);

  return (
    <div className="space-y-8">
      {/* Current Live Epoch */}
      <div className="text-center p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/30 space-y-1 shadow-sm">
        <span className="text-xs text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider">
          Current Unix Epoch Timestamp
        </span>
        <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
          {currentEpoch}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Epoch to Date */}
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-3 shadow-md backdrop-blur-xl">
          <Input
            label="Epoch Timestamp (seconds)"
            type="number"
            value={inputEpoch}
            onChange={(e) => setInputEpoch(parseInt(e.target.value, 10) || 0)}
          />
          <div className="space-y-1.5 text-xs font-mono text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200/80 dark:border-white/10">
            <p><strong className="text-slate-900 dark:text-slate-100">GMT/UTC:</strong> {convertedDate.toUTCString()}</p>
            <p><strong className="text-slate-900 dark:text-slate-100">Local:</strong> {convertedDate.toLocaleString()}</p>
            <p><strong className="text-slate-900 dark:text-slate-100">ISO 8601:</strong> {convertedDate.toISOString()}</p>
          </div>
        </div>

        {/* Date to Epoch */}
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-3 shadow-md backdrop-blur-xl">
          <Input
            label="Pick Date & Time"
            type="datetime-local"
            value={inputDate}
            onChange={(e) => {
              setInputDate(e.target.value);
              const epoch = Math.floor(new Date(e.target.value).getTime() / 1000);
              setInputEpoch(epoch);
            }}
          />
          <div className="text-xs font-mono text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200/80 dark:border-white/10">
            <p>Calculated Timestamp: <strong className="text-indigo-600 dark:text-indigo-400">{Math.floor(new Date(inputDate).getTime() / 1000)}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
