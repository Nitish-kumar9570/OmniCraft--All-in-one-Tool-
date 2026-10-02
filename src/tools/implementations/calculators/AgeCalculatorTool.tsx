"use client";

import React, { useState } from "react";
import { Cake } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = useState<string>("2000-01-15");

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const now = new Date();
    if (isNaN(birth.getTime())) return null;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 3600 * 24));
    const totalHours = totalDays * 24;

    // Next birthday calculation
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const daysToBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 3600 * 24));

    return { years, months, days, totalDays, totalHours, daysToBirthday };
  };

  const age = calculateAge();

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-4 shadow-lg dark:shadow-xl backdrop-blur-xl">
        <Input
          label="Date of Birth"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        {age && (
          <div className="space-y-4 pt-2">
            <div className="text-center p-5 rounded-2xl bg-indigo-50/80 dark:bg-[#0f172a]/80 border border-indigo-200 dark:border-indigo-500/30 shadow-xs">
              <span className="text-xs text-slate-600 dark:text-slate-400">Your Exact Age</span>
              <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1 font-mono">
                {age.years} Years, {age.months} Months, {age.days} Days
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f172a]/70 border border-slate-200 dark:border-white/10">
                <span className="text-slate-500 dark:text-slate-400">Total Days Lived:</span>
                <p className="font-bold text-sm font-mono text-slate-900 dark:text-white mt-1">
                  {age.totalDays.toLocaleString()} Days
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f172a]/70 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Next Birthday:</span>
                  <p className="font-bold text-sm font-mono text-pink-600 dark:text-pink-400 mt-1">
                    in {age.daysToBirthday} Days
                  </p>
                </div>
                <Cake className="w-5 h-5 text-pink-500 dark:text-pink-400 opacity-80" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
