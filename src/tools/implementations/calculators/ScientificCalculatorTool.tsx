"use client";

import React, { useState } from "react";
import { Delete, History } from "lucide-react";

export function ScientificCalculatorTool() {
  const [display, setDisplay] = useState<string>("0");
  const [equation, setEquation] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  const handleDigit = (digit: string) => {
    setDisplay((prev) => (prev === "0" ? digit : prev + digit));
  };

  const handleOp = (op: string) => {
    setEquation(`${display} ${op} `);
    setDisplay("0");
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
  };

  const handleBackspace = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const handleEquals = () => {
    if (!equation) return;
    try {
      const fullExp = (equation + display)
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/sqrt\(/g, "Math.sqrt(");

      // Safe evaluation using Function
      const evaluated = new Function(`return ${fullExp}`)();
      const formatted = Number(Number(evaluated).toFixed(8)).toString();

      setHistory((prev) => [`${equation + display} = ${formatted}`, ...prev].slice(0, 8));
      setDisplay(formatted);
      setEquation("");
    } catch {
      setDisplay("Error");
    }
  };

  const handleScientific = (fn: string) => {
    const val = parseFloat(display);
    if (isNaN(val)) return;

    let res = 0;
    switch (fn) {
      case "sin": res = Math.sin((val * Math.PI) / 180); break;
      case "cos": res = Math.cos((val * Math.PI) / 180); break;
      case "tan": res = Math.tan((val * Math.PI) / 180); break;
      case "sqrt": res = Math.sqrt(val); break;
      case "sq": res = Math.pow(val, 2); break;
      case "cube": res = Math.pow(val, 3); break;
      case "log": res = Math.log10(val); break;
      case "ln": res = Math.log(val); break;
      case "reciprocal": res = 1 / val; break;
      case "negate": res = -val; break;
      default: return;
    }
    setDisplay(Number(res.toFixed(8)).toString());
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Display Screen */}
      <div className="p-6 rounded-3xl bg-slate-900 dark:bg-[#060a14] text-white font-mono text-right shadow-inner border border-slate-700 dark:border-white/10 space-y-1">
        <div className="text-xs text-slate-400 h-5 overflow-hidden truncate font-mono">
          {equation}
        </div>
        <div className="text-3xl sm:text-4xl font-black tracking-tight overflow-x-auto">
          {display}
        </div>
      </div>

      {/* Button Keypad */}
      <div className="grid grid-cols-5 gap-2 select-none text-xs sm:text-sm font-semibold touch-manipulation">
        {/* Row 1: Sci Functions */}
        <button type="button" onClick={() => handleScientific("sin")} className="p-3 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-transform cursor-pointer touch-manipulation">sin</button>
        <button type="button" onClick={() => handleScientific("cos")} className="p-3 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-transform cursor-pointer touch-manipulation">cos</button>
        <button type="button" onClick={() => handleScientific("tan")} className="p-3 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-transform cursor-pointer touch-manipulation">tan</button>
        <button type="button" onClick={handleClear} className="p-3 rounded-xl bg-rose-100 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900 active:scale-95 transition-transform cursor-pointer touch-manipulation">C</button>
        <button type="button" onClick={handleBackspace} className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center active:scale-95 transition-transform cursor-pointer touch-manipulation"><Delete className="w-4 h-4" /></button>

        {/* Row 2 */}
        <button type="button" onClick={() => handleScientific("sqrt")} className="p-3 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-transform cursor-pointer touch-manipulation">√x</button>
        <button type="button" onClick={() => handleScientific("sq")} className="p-3 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-transform cursor-pointer touch-manipulation">x²</button>
        <button type="button" onClick={() => handleScientific("cube")} className="p-3 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-transform cursor-pointer touch-manipulation">x³</button>
        <button type="button" onClick={() => handleOp("÷")} className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900 active:scale-95 transition-transform cursor-pointer touch-manipulation">÷</button>
        <button type="button" onClick={() => handleOp("×")} className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900 active:scale-95 transition-transform cursor-pointer touch-manipulation">×</button>

        {/* Row 3 */}
        <button type="button" onClick={() => handleScientific("log")} className="p-3 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-transform cursor-pointer touch-manipulation">log</button>
        <button type="button" onClick={() => handleDigit("7")} className="p-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/[0.08] active:scale-95 transition-transform cursor-pointer shadow-xs touch-manipulation">7</button>
        <button type="button" onClick={() => handleDigit("8")} className="p-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/[0.08] active:scale-95 transition-transform cursor-pointer shadow-xs touch-manipulation">8</button>
        <button type="button" onClick={() => handleDigit("9")} className="p-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/[0.08] active:scale-95 transition-transform cursor-pointer shadow-xs touch-manipulation">9</button>
        <button type="button" onClick={() => handleOp("-")} className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900 active:scale-95 transition-transform cursor-pointer touch-manipulation">-</button>

        {/* Row 4 */}
        <button type="button" onClick={() => handleScientific("ln")} className="p-3 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-transform cursor-pointer touch-manipulation">ln</button>
        <button type="button" onClick={() => handleDigit("4")} className="p-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/[0.08] active:scale-95 transition-transform cursor-pointer shadow-xs touch-manipulation">4</button>
        <button type="button" onClick={() => handleDigit("5")} className="p-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/[0.08] active:scale-95 transition-transform cursor-pointer shadow-xs touch-manipulation">5</button>
        <button type="button" onClick={() => handleDigit("6")} className="p-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/[0.08] active:scale-95 transition-transform cursor-pointer shadow-xs touch-manipulation">6</button>
        <button type="button" onClick={() => handleOp("+")} className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900 active:scale-95 transition-transform cursor-pointer touch-manipulation">+</button>

        {/* Row 5 */}
        <button type="button" onClick={() => handleDigit(String(Math.PI.toFixed(4)))} className="p-3 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-transform cursor-pointer touch-manipulation">π</button>
        <button type="button" onClick={() => handleDigit("1")} className="p-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/[0.08] active:scale-95 transition-transform cursor-pointer shadow-xs touch-manipulation">1</button>
        <button type="button" onClick={() => handleDigit("2")} className="p-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/[0.08] active:scale-95 transition-transform cursor-pointer shadow-xs touch-manipulation">2</button>
        <button type="button" onClick={() => handleDigit("3")} className="p-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/[0.08] active:scale-95 transition-transform cursor-pointer shadow-xs touch-manipulation">3</button>
        <button type="button" onClick={handleEquals} className="row-span-2 p-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 active:scale-95 transition-transform shadow-md flex items-center justify-center text-lg cursor-pointer touch-manipulation">=</button>

        {/* Row 6 */}
        <button type="button" onClick={() => handleScientific("negate")} className="p-3 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-transform cursor-pointer touch-manipulation">±</button>
        <button type="button" onClick={() => handleDigit("0")} className="col-span-2 p-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/[0.08] text-center active:scale-95 transition-transform cursor-pointer shadow-xs touch-manipulation">0</button>
        <button type="button" onClick={() => handleDigit(".")} className="p-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/[0.08] active:scale-95 transition-transform cursor-pointer shadow-xs touch-manipulation">.</button>
      </div>



      {/* Calculation History */}
      {history.length > 0 && (
        <div className="p-4.5 rounded-2xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-1.5 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
            <History className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Recent Calculations:
          </div>
          {history.map((h, i) => (
            <div key={i} className="text-xs font-mono text-slate-600 dark:text-slate-400">
              {h}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
