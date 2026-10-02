"use client";

import React, { useState } from "react";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";

export function EmiCalculatorTool() {
  const [loanAmount, setLoanAmount] = useState<number>(2500000); // 25 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const monthlyEmi =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmount / totalMonths;

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const principalPercent = Math.round((loanAmount / totalPayment) * 100);
  const interestPercent = 100 - principalPercent;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Manual Inputs Only - No Sliders */}
        <div className="lg:col-span-7 space-y-5">
          <ManualNumberInput
            label="Loan Amount (Principal)"
            value={loanAmount}
            onChange={setLoanAmount}
            min={10000}
            max={50000000}
            step={25000}
            prefix="₹"
            placeholder="2500000"
            presets={[
              { label: "₹10L", value: 1000000 },
              { label: "₹25L", value: 2500000 },
              { label: "₹50L", value: 5000000 },
              { label: "₹1Cr", value: 10000000 },
              { label: "₹2Cr", value: 20000000 },
            ]}
          />

          <ManualNumberInput
            label="Annual Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
            min={0.1}
            max={35}
            step={0.1}
            suffix="%"
            decimalPlaces={1}
            placeholder="8.5"
            presets={[
              { label: "8.5%", value: 8.5 },
              { label: "9.0%", value: 9.0 },
              { label: "10.5%", value: 10.5 },
              { label: "12.0%", value: 12.0 },
            ]}
          />

          <ManualNumberInput
            label="Loan Tenure (Duration)"
            value={tenureYears}
            onChange={setTenureYears}
            min={1}
            max={40}
            step={1}
            suffix=" Years"
            placeholder="20"
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
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monthly Loan EMI</span>
            <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400 mt-1 font-mono">
              ₹{Math.round(monthlyEmi).toLocaleString("en-IN")}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">{totalMonths} Monthly Installments</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Principal Amount:</span>
              <strong className="font-mono text-slate-900 dark:text-white">₹{loanAmount.toLocaleString("en-IN")}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Total Interest Payable:</span>
              <strong className="font-mono text-slate-900 dark:text-white">₹{Math.round(totalInterest).toLocaleString("en-IN")}</strong>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-white/10 font-bold">
              <span className="text-slate-700 dark:text-slate-200">Total Amount Payable:</span>
              <strong className="font-mono text-indigo-600 dark:text-indigo-400 text-sm">₹{Math.round(totalPayment).toLocaleString("en-IN")}</strong>
            </div>
          </div>

          {/* Visual Ratio Bar */}
          <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-white/10">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Breakup of Total Payment</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-white/10 flex overflow-hidden">
              <div className="bg-indigo-600 transition-all duration-300" style={{ width: `${principalPercent}%` }} />
              <div className="bg-amber-500 transition-all duration-300" style={{ width: `${interestPercent}%` }} />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                Principal ({principalPercent}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Interest ({interestPercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
