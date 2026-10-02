"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";

export function PercentageCalculatorTool() {
  const [valA1, setValA1] = useState<number>(15);
  const [valA2, setValA2] = useState<number>(200);

  const [valB1, setValB1] = useState<number>(30);
  const [valB2, setValB2] = useState<number>(150);

  const [valC1, setValC1] = useState<number>(50);
  const [valC2, setValC2] = useState<number>(80);

  const resA = (valA1 / 100) * valA2;
  const resB = valB2 !== 0 ? (valB1 / valB2) * 100 : 0;
  const resC = valC1 !== 0 ? ((valC2 - valC1) / valC1) * 100 : 0;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Formula 1 */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-3 shadow-md backdrop-blur-xl">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white">1. What is X% of Y?</h4>
        <div className="flex items-center gap-3 flex-wrap">
          <Input type="number" value={valA1} onChange={(e) => setValA1(parseFloat(e.target.value) || 0)} className="w-24 text-center" />
          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">% of</span>
          <Input type="number" value={valA2} onChange={(e) => setValA2(parseFloat(e.target.value) || 0)} className="w-32 text-center" />
          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">=</span>
          <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-indigo-200 dark:border-indigo-500/30 font-black text-indigo-600 dark:text-indigo-400 font-mono text-sm shadow-xs">
            {Number(resA.toFixed(4))}
          </div>
        </div>
      </div>

      {/* Formula 2 */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-3 shadow-md backdrop-blur-xl">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white">2. What percentage is X of Y?</h4>
        <div className="flex items-center gap-3 flex-wrap">
          <Input type="number" value={valB1} onChange={(e) => setValB1(parseFloat(e.target.value) || 0)} className="w-24 text-center" />
          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">is what % of</span>
          <Input type="number" value={valB2} onChange={(e) => setValB2(parseFloat(e.target.value) || 0)} className="w-32 text-center" />
          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">=</span>
          <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-indigo-200 dark:border-indigo-500/30 font-black text-indigo-600 dark:text-indigo-400 font-mono text-sm shadow-xs">
            {Number(resB.toFixed(2))}%
          </div>
        </div>
      </div>

      {/* Formula 3 */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-3 shadow-md backdrop-blur-xl">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white">3. Percentage Increase / Decrease from X to Y</h4>
        <div className="flex items-center gap-3 flex-wrap">
          <Input type="number" value={valC1} onChange={(e) => setValC1(parseFloat(e.target.value) || 0)} className="w-28 text-center" />
          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">to</span>
          <Input type="number" value={valC2} onChange={(e) => setValC2(parseFloat(e.target.value) || 0)} className="w-28 text-center" />
          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">=</span>
          <div className={`px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#090e1c] border font-black font-mono text-sm shadow-xs ${resC >= 0 ? "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30" : "text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/30"}`}>
            {resC >= 0 ? `+${resC.toFixed(2)}%` : `${resC.toFixed(2)}%`}
          </div>
        </div>
      </div>
    </div>
  );
}
