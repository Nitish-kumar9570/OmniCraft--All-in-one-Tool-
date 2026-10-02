"use client";

import React, { useState } from "react";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";

export function BmiCalculatorTool() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightInches, setHeightInches] = useState<number>(69); // 5ft 9in
  const [weightLbs, setWeightLbs] = useState<number>(154);

  const calculateBmi = (): number => {
    if (unit === "metric") {
      const hM = heightCm / 100;
      return hM > 0 ? weightKg / (hM * hM) : 0;
    } else {
      return heightInches > 0 ? (703 * weightLbs) / (heightInches * heightInches) : 0;
    }
  };

  const bmi = calculateBmi();
  const formattedBmi = Number(bmi.toFixed(1));

  const getBmiCategory = (score: number) => {
    if (score < 18.5) return { label: "Underweight", color: "text-amber-600 dark:text-amber-400" };
    if (score < 25) return { label: "Normal Weight", color: "text-emerald-600 dark:text-emerald-400" };
    if (score < 30) return { label: "Overweight", color: "text-orange-600 dark:text-orange-400" };
    return { label: "Obese", color: "text-rose-600 dark:text-rose-400" };
  };

  const cat = getBmiCategory(formattedBmi);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-2xl bg-slate-200/80 dark:bg-[#0f172a] border border-slate-300/80 dark:border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => setUnit("metric")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${unit === "metric" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
          >
            Metric (kg, cm)
          </button>
          <button
            type="button"
            onClick={() => setUnit("imperial")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${unit === "imperial" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
          >
            Imperial (lbs, in)
          </button>
        </div>

      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-6 shadow-lg dark:shadow-xl backdrop-blur-xl">
        {unit === "metric" ? (
          <div className="space-y-4">
            <ManualNumberInput
              label="Height"
              value={heightCm}
              onChange={setHeightCm}
              min={50}
              max={260}
              step={1}
              suffix=" cm"
              placeholder="175"
              presets={[
                { label: "155 cm", value: 155 },
                { label: "165 cm", value: 165 },
                { label: "175 cm", value: 175 },
                { label: "185 cm", value: 185 },
              ]}
            />
            <ManualNumberInput
              label="Weight"
              value={weightKg}
              onChange={setWeightKg}
              min={20}
              max={300}
              step={0.5}
              suffix=" kg"
              decimalPlaces={1}
              placeholder="70"
              presets={[
                { label: "55 kg", value: 55 },
                { label: "65 kg", value: 65 },
                { label: "75 kg", value: 75 },
                { label: "85 kg", value: 85 },
              ]}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <ManualNumberInput
              label={`Height (${Math.floor(heightInches / 12)}' ${heightInches % 12}")`}
              value={heightInches}
              onChange={setHeightInches}
              min={20}
              max={100}
              step={1}
              suffix=" inches"
              placeholder="69"
              presets={[
                { label: "5'4\"", value: 64 },
                { label: "5'8\"", value: 68 },
                { label: "5'10\"", value: 70 },
                { label: "6'0\"", value: 72 },
              ]}
            />
            <ManualNumberInput
              label="Weight"
              value={weightLbs}
              onChange={setWeightLbs}
              min={40}
              max={600}
              step={1}
              suffix=" lbs"
              placeholder="154"
              presets={[
                { label: "120 lbs", value: 120 },
                { label: "150 lbs", value: 150 },
                { label: "180 lbs", value: 180 },
                { label: "200 lbs", value: 200 },
              ]}
            />
          </div>
        )}

        {/* BMI Score Output */}
        <div className="text-center pt-5 border-t border-slate-200/80 dark:border-white/10">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Your Body Mass Index</span>
          <div className="text-4xl font-black text-slate-900 dark:text-white font-mono mt-1">
            {formattedBmi}
          </div>
          <div className={`text-sm font-bold mt-1 ${cat.color}`}>{cat.label}</div>
        </div>
      </div>
    </div>
  );
}
