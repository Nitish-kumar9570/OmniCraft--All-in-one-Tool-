"use client";

import React, { useState } from "react";
import { ArrowLeftRight, Copy } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

type UnitCategory = "length" | "weight" | "temperature" | "data" | "speed" | "area" | "time";


interface UnitDef {
  id: string;
  name: string;
  factor: number; // relative to base unit
}

const UNIT_DATA: Record<UnitCategory, { name: string; base: string; units: UnitDef[] }> = {
  length: {
    name: "Length",
    base: "m",
    units: [
      { id: "m", name: "Meters (m)", factor: 1 },
      { id: "km", name: "Kilometers (km)", factor: 1000 },
      { id: "cm", name: "Centimeters (cm)", factor: 0.01 },
      { id: "mm", name: "Millimeters (mm)", factor: 0.001 },
      { id: "in", name: "Inches (in)", factor: 0.0254 },
      { id: "ft", name: "Feet (ft)", factor: 0.3048 },
      { id: "yd", name: "Yards (yd)", factor: 0.9144 },
      { id: "mi", name: "Miles (mi)", factor: 1609.344 },
    ],
  },
  weight: {
    name: "Weight & Mass",
    base: "kg",
    units: [
      { id: "kg", name: "Kilograms (kg)", factor: 1 },
      { id: "g", name: "Grams (g)", factor: 0.001 },
      { id: "mg", name: "Milligrams (mg)", factor: 0.000001 },
      { id: "lb", name: "Pounds (lb)", factor: 0.45359237 },
      { id: "oz", name: "Ounces (oz)", factor: 0.02834952 },
      { id: "ton", name: "Metric Ton (t)", factor: 1000 },
    ],
  },
  temperature: {
    name: "Temperature",
    base: "c",
    units: [
      { id: "c", name: "Celsius (°C)", factor: 1 },
      { id: "f", name: "Fahrenheit (°F)", factor: 1 },
      { id: "k", name: "Kelvin (K)", factor: 1 },
    ],
  },
  data: {
    name: "Digital Data Storage",
    base: "mb",
    units: [
      { id: "b", name: "Bytes (B)", factor: 0.000001 },
      { id: "kb", name: "Kilobytes (KB)", factor: 0.001 },
      { id: "mb", name: "Megabytes (MB)", factor: 1 },
      { id: "gb", name: "Gigabytes (GB)", factor: 1000 },
      { id: "tb", name: "Terabytes (TB)", factor: 1000000 },
    ],
  },
  speed: {
    name: "Speed",
    base: "kmh",
    units: [
      { id: "kmh", name: "Kilometers/hour (km/h)", factor: 1 },
      { id: "mph", name: "Miles/hour (mph)", factor: 1.60934 },
      { id: "ms", name: "Meters/second (m/s)", factor: 3.6 },
      { id: "knot", name: "Knots (kn)", factor: 1.852 },
    ],
  },
  area: {
    name: "Area",
    base: "sqm",
    units: [
      { id: "sqm", name: "Square Meters (m²)", factor: 1 },
      { id: "sqkm", name: "Square Kilometers (km²)", factor: 1000000 },
      { id: "sqft", name: "Square Feet (ft²)", factor: 0.092903 },
      { id: "acre", name: "Acres", factor: 4046.86 },
      { id: "hectare", name: "Hectares", factor: 10000 },
    ],
  },
  time: {
    name: "Time",
    base: "s",
    units: [
      { id: "ms", name: "Milliseconds (ms)", factor: 0.001 },
      { id: "s", name: "Seconds (s)", factor: 1 },
      { id: "min", name: "Minutes (min)", factor: 60 },
      { id: "hr", name: "Hours (hr)", factor: 3600 },
      { id: "day", name: "Days", factor: 86400 },
      { id: "wk", name: "Weeks", factor: 604800 },
      { id: "yr", name: "Years (365d)", factor: 31536000 },
    ],
  },
};

export function UnitConverterTool() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("ft");
  const [inputValue, setInputValue] = useState<number>(1);
  const { success } = useToast();

  const currentCategory = UNIT_DATA[category];

  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const units = UNIT_DATA[newCat].units;
    setFromUnit(units[0].id);
    setToUnit(units[1] ? units[1].id : units[0].id);
  };

  const convertValue = (): number => {
    if (category === "temperature") {
      let tempC = inputValue;
      if (fromUnit === "f") tempC = ((inputValue - 32) * 5) / 9;
      if (fromUnit === "k") tempC = inputValue - 273.15;

      if (toUnit === "c") return tempC;
      if (toUnit === "f") return (tempC * 9) / 5 + 32;
      if (toUnit === "k") return tempC + 273.15;
      return tempC;
    }

    const uFrom = currentCategory.units.find((u) => u.id === fromUnit);
    const uTo = currentCategory.units.find((u) => u.id === toUnit);

    if (!uFrom || !uTo) return 0;
    const baseValue = inputValue * uFrom.factor;
    return baseValue / uTo.factor;
  };

  const result = convertValue();
  const formattedResult = Number(result.toFixed(6));

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none touch-manipulation">
        {(Object.keys(UNIT_DATA) as UnitCategory[]).map((catKey) => (
          <button
            type="button"
            key={catKey}
            onClick={() => handleCategoryChange(catKey)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer touch-manipulation active:scale-95 ${
              category === catKey
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {UNIT_DATA[catKey].name}
          </button>
        ))}
      </div>

      {/* Converter Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* From Box */}
        <div className="md:col-span-5 p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-3 shadow-md backdrop-blur-xl">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
            From Unit
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full h-10 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs px-3 font-medium focus:outline-none focus:border-indigo-500"
          >
            {currentCategory.units.map((u) => (
              <option key={u.id} value={u.id} className="bg-white dark:bg-[#090e1c] text-slate-900 dark:text-white">
                {u.name}
              </option>
            ))}
          </select>
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            className="p-3 rounded-2xl bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300 shadow-md hover:scale-110 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer active:scale-95 touch-manipulation"
            title="Swap units"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* To Box */}
        <div className="md:col-span-5 p-6 rounded-3xl bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/30 space-y-3 shadow-md backdrop-blur-xl">
          <label className="text-xs font-bold text-indigo-700 dark:text-indigo-300 block">
            To Unit
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full h-10 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-white dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs px-3 font-medium focus:outline-none focus:border-indigo-500"
          >
            {currentCategory.units.map((u) => (
              <option key={u.id} value={u.id} className="bg-white dark:bg-[#090e1c] text-slate-900 dark:text-white">
                {u.name}
              </option>
            ))}
          </select>
          <div className="h-10 px-4 flex items-center justify-between rounded-xl bg-white dark:bg-[#090e1c] border border-indigo-200 dark:border-indigo-500/30 text-base font-black text-indigo-600 dark:text-indigo-400 font-mono shadow-inner">
            <span>{formattedResult}</span>
            <button
              type="button"
              onClick={async () => {
                const ok = await copyToClipboard(String(formattedResult));
                if (ok) success("Copied to clipboard");
              }}
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer touch-manipulation active:scale-90 p-1"
              title="Copy"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>


      <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 text-center font-mono shadow-sm">
        {inputValue} {fromUnit} = <strong className="text-slate-900 dark:text-white">{formattedResult}</strong> {toUnit}
      </div>
    </div>
  );
}
