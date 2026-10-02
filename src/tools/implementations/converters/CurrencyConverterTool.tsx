"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeftRight, RefreshCw, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/Input";

const POPULAR_CURRENCIES = [
  { code: "USD", name: "United States Dollar ($)" },
  { code: "EUR", name: "Euro (€)" },
  { code: "INR", name: "Indian Rupee (₹)" },
  { code: "GBP", name: "British Pound (£)" },
  { code: "JPY", name: "Japanese Yen (¥)" },
  { code: "CAD", name: "Canadian Dollar (C$)" },
  { code: "AUD", name: "Australian Dollar (A$)" },
  { code: "CHF", name: "Swiss Franc (CHF)" },
  { code: "CNY", name: "Chinese Yuan (¥)" },
  { code: "SGD", name: "Singapore Dollar (S$)" },
  { code: "AED", name: "UAE Dirham (AED)" },
  { code: "BRL", name: "Brazilian Real (R$)" },
];

export function CurrencyConverterTool() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCode, setFromCode] = useState<string>("USD");
  const [toCode, setToCode] = useState<string>("INR");
  const [rate, setRate] = useState<number>(86.5);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${fromCode}`);
      if (res.ok) {
        const data = await res.json();
        if (data.rates && data.rates[toCode]) {
          setRate(data.rates[toCode]);
          setLastUpdated(new Date(data.time_last_update_utc || Date.now()).toLocaleTimeString());
        }
      }
    } catch {
      const fallbackRates: Record<string, number> = {
        "USD-INR": 86.5, "EUR-INR": 93.8, "GBP-INR": 110.2, "INR-USD": 0.0115, "EUR-USD": 1.08, "GBP-USD": 1.28
      };
      const key = `${fromCode}-${toCode}`;
      setRate(fallbackRates[key] || 1.0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [fromCode, toCode]);

  const convertedAmount = Number((amount * rate).toFixed(2));

  const handleSwap = () => {
    const temp = fromCode;
    setFromCode(toCode);
    setToCode(temp);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* From Currency */}
        <div className="md:col-span-5 p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-3 shadow-md backdrop-blur-xl">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
            From Currency
          </label>
          <select
            value={fromCode}
            onChange={(e) => setFromCode(e.target.value)}
            className="w-full h-10 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs px-3 font-semibold focus:outline-none focus:border-indigo-500"
          >
            {POPULAR_CURRENCIES.map((c) => (
              <option key={c.code} value={c.code} className="bg-white dark:bg-[#090e1c] text-slate-900 dark:text-white">
                {c.code} — {c.name}
              </option>
            ))}
          </select>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            placeholder="Amount"
          />
        </div>

        {/* Swap */}
        <div className="md:col-span-1 flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            className="p-3 rounded-2xl bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300 shadow-md hover:scale-110 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer active:scale-95"
            title="Swap currencies"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* To Currency */}
        <div className="md:col-span-5 p-6 rounded-3xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-3 shadow-md backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
              To Currency
            </label>
            <button
              type="button"
              onClick={fetchRates}
              className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline cursor-pointer touch-manipulation"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} /> Refresh
            </button>

          </div>
          <select
            value={toCode}
            onChange={(e) => setToCode(e.target.value)}
            className="w-full h-10 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-white dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs px-3 font-semibold focus:outline-none focus:border-emerald-500"
          >
            {POPULAR_CURRENCIES.map((c) => (
              <option key={c.code} value={c.code} className="bg-white dark:bg-[#090e1c] text-slate-900 dark:text-white">
                {c.code} — {c.name}
              </option>
            ))}
          </select>
          <div className="h-10 px-4 flex items-center rounded-xl bg-white dark:bg-[#090e1c] border border-emerald-200 dark:border-emerald-500/30 text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono shadow-inner">
            {toCode === "INR" ? `₹${convertedAmount.toLocaleString("en-IN")}` : `${convertedAmount.toLocaleString()} ${toCode}`}
          </div>
        </div>
      </div>

      {/* Exchange Rate Badge */}
      <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 shadow-sm">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>
            1 {fromCode} = <strong className="text-slate-900 dark:text-white">{rate.toFixed(4)}</strong> {toCode}
          </span>
        </div>
        {lastUpdated && <span className="text-slate-500 dark:text-slate-400">Market updated: {lastUpdated}</span>}
      </div>
    </div>
  );
}
