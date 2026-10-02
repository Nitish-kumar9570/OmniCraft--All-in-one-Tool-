"use client";

import React, { useState } from "react";
import { Calculator, DollarSign, Calendar, Flame, Percent, Users, ArrowRight } from "lucide-react";

// ==========================================
// 1. SIP & Wealth Calculator Tool
// ==========================================
export function SipCalculatorTool() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(500);
  const [expectedRate, setExpectedRate] = useState<number>(12);
  const [tenureYears, setTenureYears] = useState<number>(10);

  const months = tenureYears * 12;
  const monthlyRate = expectedRate / 12 / 100;

  // FV = P × [((1 + i)^n - 1) / i] × (1 + i)
  const totalInvestment = monthlyInvestment * months;
  const futureValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate);
  const estimatedReturns = futureValue - totalInvestment;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            Monthly Investment ($)
          </label>
          <input
            type="number"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Math.max(1, Number(e.target.value)))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-bold font-mono"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            Expected Annual Return (%)
          </label>
          <input
            type="number"
            value={expectedRate}
            step="0.5"
            onChange={(e) => setExpectedRate(Math.max(0.1, Number(e.target.value)))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-bold font-mono"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            Time Period (Years): {tenureYears} yrs
          </label>
          <input
            type="range"
            min="1"
            max="40"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium">Total Invested Amount</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
            ${totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium">Estimated Wealth Gained</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            +${estimatedReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 space-y-1">
          <span className="text-[11px] text-indigo-600 dark:text-indigo-300 font-bold">Total Expected Value</span>
          <div className="text-2xl font-black text-indigo-700 dark:text-indigo-200 font-mono">
            ${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. GST & Sales Tax Calculator Tool
// ==========================================
export function GstTaxTool() {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(18);
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");

  const taxAmount = mode === "exclusive" ? (amount * rate) / 100 : amount - amount / (1 + rate / 100);
  const totalAmount = mode === "exclusive" ? amount + taxAmount : amount;
  const netAmount = mode === "exclusive" ? amount : amount - taxAmount;

  return (
    <div className="space-y-6">
      <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05]">
        <button
          type="button"
          onClick={() => setMode("exclusive")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            mode === "exclusive" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xs" : "text-slate-600 dark:text-slate-400"
          }`}
        >
          Add GST / Tax (Exclusive)
        </button>
        <button
          type="button"
          onClick={() => setMode("inclusive")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            mode === "inclusive" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xs" : "text-slate-600 dark:text-slate-400"
          }`}
        >
          Remove GST / Tax (Inclusive)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            {mode === "exclusive" ? "Net / Initial Amount ($)" : "Total Gross Amount ($)"}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-bold font-mono"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            Tax Rate (%): {rate}%
          </label>
          <div className="flex gap-2">
            {[5, 12, 18, 28].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRate(r)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  rate === r ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300"
                }`}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium">Net Price</span>
          <div className="text-lg font-black text-slate-900 dark:text-white font-mono">${netAmount.toFixed(2)}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium">Calculated Tax ({rate}%)</span>
          <div className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">${taxAmount.toFixed(2)}</div>
        </div>
        <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 space-y-1">
          <span className="text-[11px] text-indigo-600 dark:text-indigo-300 font-bold">Total Final Amount</span>
          <div className="text-xl font-black text-indigo-700 dark:text-indigo-200 font-mono">${totalAmount.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Tip & Bill Split Calculator Tool
// ==========================================
export function TipCalculatorTool() {
  const [bill, setBill] = useState<number>(85.5);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [people, setPeople] = useState<number>(3);

  const totalTip = (bill * tipPercent) / 100;
  const totalBill = bill + totalTip;
  const tipPerPerson = totalTip / people;
  const totalPerPerson = totalBill / people;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Bill Amount ($)</label>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(Math.max(0, Number(e.target.value)))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-bold font-mono"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Tip Percentage: {tipPercent}%</label>
          <div className="flex gap-1.5">
            {[10, 15, 18, 20, 25].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipPercent(t)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  tipPercent === t ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300"
                }`}
              >
                {t}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Number of People: {people}</label>
          <input
            type="range"
            min="1"
            max="20"
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium">Total Tip</span>
          <div className="text-lg font-black text-amber-600 font-mono">${totalTip.toFixed(2)}</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium">Total Bill</span>
          <div className="text-lg font-black text-slate-900 dark:text-white font-mono">${totalBill.toFixed(2)}</div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 space-y-1">
          <span className="text-[11px] text-indigo-600 dark:text-indigo-300 font-bold">Tip per Person</span>
          <div className="text-lg font-black text-indigo-600 dark:text-indigo-300 font-mono">${tipPerPerson.toFixed(2)}</div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 space-y-1">
          <span className="text-[11px] text-emerald-600 dark:text-emerald-300 font-bold">Total per Person</span>
          <div className="text-xl font-black text-emerald-700 dark:text-emerald-300 font-mono">${totalPerPerson.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. Date Difference Calculator Tool
// ==========================================
export function DateDifferenceTool() {
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

  const calculateDiff = () => {
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    const hours = totalDays * 24;

    return { totalDays, weeks, remainingDays, hours };
  };

  const diff = calculateDiff();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
          />
        </div>
      </div>

      {diff && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Total Days</span>
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{diff.totalDays}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Weeks &amp; Days</span>
            <div className="text-lg font-black text-purple-600 dark:text-purple-400 font-mono">{diff.weeks}w {diff.remainingDays}d</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Total Hours</span>
            <div className="text-lg font-black text-slate-900 dark:text-white font-mono">{diff.hours.toLocaleString()} hrs</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Approx. Months</span>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">{(diff.totalDays / 30.4).toFixed(1)} mo</div>
          </div>
        </div>
      )}
    </div>
  );
}
