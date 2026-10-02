"use client";

import React, { useState } from "react";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";

export function CompoundInterestTool() {
  const [principal, setPrincipal] = useState<number>(100000); // 1 Lakh initial
  const [rate, setRate] = useState<number>(12); // 12% equity average
  const [years, setYears] = useState<number>(15);
  const [monthlyAddition, setMonthlyAddition] = useState<number>(10000); // 10k/mo SIP
  const compoundFreq = 12; // monthly compounding

  // Compound Interest with monthly deposit
  const r = rate / 100;
  const n = compoundFreq;
  const t = years;

  // Principal compound: P * (1 + r/n)^(nt)
  const principalFuture = principal * Math.pow(1 + r / n, n * t);

  // Monthly deposit compound: PMT * [ ( (1 + r/n)^(nt) - 1 ) / (r/n) ]
  const periodicRate = r / 12;
  const totalPeriods = 12 * t;
  const additionsFuture =
    periodicRate > 0
      ? monthlyAddition * ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate)
      : monthlyAddition * totalPeriods;

  const totalFutureValue = principalFuture + additionsFuture;
  const totalDeposited = principal + monthlyAddition * 12 * years;
  const totalInterestEarned = Math.max(0, totalFutureValue - totalDeposited);

  const depositedPercent = Math.max(1, Math.round((totalDeposited / totalFutureValue) * 100));
  const returnsPercent = 100 - depositedPercent;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Manual Inputs Only - No Sliders */}
        <div className="lg:col-span-7 space-y-5">
          <ManualNumberInput
            label="Initial Lumpsum Investment"
            value={principal}
            onChange={setPrincipal}
            min={0}
            max={100000000}
            step={5000}
            prefix="₹"
            placeholder="100000"
            presets={[
              { label: "₹0", value: 0 },
              { label: "₹50K", value: 50000 },
              { label: "₹1L", value: 100000 },
              { label: "₹5L", value: 500000 },
              { label: "₹10L", value: 1000000 },
            ]}
          />

          <ManualNumberInput
            label="Monthly SIP / Contribution"
            value={monthlyAddition}
            onChange={setMonthlyAddition}
            min={0}
            max={1000000}
            step={500}
            prefix="₹"
            placeholder="10000"
            presets={[
              { label: "₹2.5K", value: 2500 },
              { label: "₹5K", value: 5000 },
              { label: "₹10K", value: 10000 },
              { label: "₹25K", value: 25000 },
              { label: "₹50K", value: 50000 },
            ]}
          />

          <ManualNumberInput
            label="Expected Annual Return Rate"
            value={rate}
            onChange={setRate}
            min={0.1}
            max={40}
            step={0.1}
            suffix="%"
            decimalPlaces={1}
            placeholder="12.0"
            presets={[
              { label: "8% (FD/Debt)", value: 8 },
              { label: "12% (Index/MF)", value: 12 },
              { label: "15% (Growth)", value: 15 },
              { label: "18% (Equity)", value: 18 },
            ]}
          />

          <ManualNumberInput
            label="Investment Time Horizon"
            value={years}
            onChange={setYears}
            min={1}
            max={50}
            step={1}
            suffix=" Years"
            placeholder="15"
            presets={[
              { label: "5 Yrs", value: 5 },
              { label: "10 Yrs", value: 10 },
              { label: "15 Yrs", value: 15 },
              { label: "20 Yrs", value: 20 },
              { label: "30 Yrs", value: 30 },
            ]}
          />
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-5 shadow-lg dark:shadow-xl backdrop-blur-xl">
          <div className="text-center pb-4 border-b border-slate-200/80 dark:border-white/10">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Expected Future Portfolio Value</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
              ₹{Math.round(totalFutureValue).toLocaleString("en-IN")}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
              After {years} years ({years * 12} monthly investments)
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Total Money Deposited:</span>
              <strong className="font-mono text-slate-900 dark:text-white">₹{Math.round(totalDeposited).toLocaleString("en-IN")}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Wealth Gain (Est. Returns):</span>
              <strong className="font-mono text-emerald-600 dark:text-emerald-400">
                +₹{Math.round(totalInterestEarned).toLocaleString("en-IN")}
              </strong>
            </div>
          </div>

          {/* Visual Ratio Bar */}
          <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-white/10">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Investment Breakdown</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-white/10 flex overflow-hidden">
              <div className="bg-indigo-600 transition-all duration-300" style={{ width: `${depositedPercent}%` }} />
              <div className="bg-emerald-500 transition-all duration-300" style={{ width: `${returnsPercent}%` }} />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                Invested ({depositedPercent}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Growth ({returnsPercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
