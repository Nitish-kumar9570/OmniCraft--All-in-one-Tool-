"use client";

import React, { useState } from "react";
import {
  ArrowLeftRight,
  Scale,
  Thermometer,
  Gauge,
  Maximize2,
  Zap,
  Flame,
  Clock,
  Compass,
  Palette,
  Type,
  Utensils,
  Globe,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

// ==========================================
// 1. Length & Distance Converter Tool
// ==========================================
export function LengthConverterTool() {
  const [val, setVal] = useState<number>(100);
  const [unit, setUnit] = useState<"m" | "km" | "cm" | "mm" | "miles" | "yards" | "feet" | "inches">("m");

  const toMeters: Record<string, number> = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    miles: 1609.344,
    yards: 0.9144,
    feet: 0.3048,
    inches: 0.0254,
  };

  const meters = val * (toMeters[unit] || 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
          className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-sm font-bold"
        />
        <select
          value={unit}
          onChange={(e: any) => setUnit(e.target.value)}
          className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-bold capitalize"
        >
          <option value="m">Meters (m)</option>
          <option value="km">Kilometers (km)</option>
          <option value="cm">Centimeters (cm)</option>
          <option value="mm">Millimeters (mm)</option>
          <option value="miles">Miles (mi)</option>
          <option value="yards">Yards (yd)</option>
          <option value="feet">Feet (ft)</option>
          <option value="inches">Inches (in)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {Object.keys(toMeters).map((u) => (
          <div key={u} className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
            <span className="text-xs text-slate-400 block mb-1 uppercase">{u}</span>
            <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {(meters / toMeters[u]).toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 2. Weight & Mass Converter Tool
// ==========================================
export function WeightConverterTool() {
  const [val, setVal] = useState<number>(75);
  const [unit, setUnit] = useState<"kg" | "g" | "mg" | "lbs" | "oz" | "stones">("kg");

  const toKg: Record<string, number> = {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lbs: 0.45359237,
    oz: 0.0283495,
    stones: 6.35029,
  };

  const kg = val * (toKg[unit] || 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
          className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-sm font-bold"
        />
        <select
          value={unit}
          onChange={(e: any) => setUnit(e.target.value)}
          className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-bold capitalize"
        >
          <option value="kg">Kilograms (kg)</option>
          <option value="lbs">Pounds (lbs)</option>
          <option value="g">Grams (g)</option>
          <option value="oz">Ounces (oz)</option>
          <option value="stones">Stones (st)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
        {Object.keys(toKg).map((u) => (
          <div key={u} className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
            <span className="text-xs text-slate-400 block mb-1 uppercase">{u}</span>
            <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {(kg / toKg[u]).toLocaleString(undefined, { maximumFractionDigits: 3 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. Temperature Converter Tool
// ==========================================
export function TemperatureConverterTool() {
  const [val, setVal] = useState<number>(25);
  const [unit, setUnit] = useState<"C" | "F" | "K">("C");

  let celsius = val;
  if (unit === "F") celsius = ((val - 32) * 5) / 9;
  if (unit === "K") celsius = val - 273.15;

  const fahrenheit = (celsius * 9) / 5 + 32;
  const kelvin = celsius + 273.15;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
          className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-sm font-bold"
        />
        <select
          value={unit}
          onChange={(e: any) => setUnit(e.target.value)}
          className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-bold"
        >
          <option value="C">°C Celsius</option>
          <option value="F">°F Fahrenheit</option>
          <option value="K">K Kelvin</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Celsius</span>
          <span className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">{celsius.toFixed(2)} °C</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Fahrenheit</span>
          <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">{fahrenheit.toFixed(2)} °F</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Kelvin</span>
          <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{kelvin.toFixed(2)} K</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. Typography Px to Rem & Em Converter
// ==========================================
export function TypographyPxToRemConverterTool() {
  const [pixels, setPixels] = useState<number>(16);
  const [rootBase, setRootBase] = useState<number>(16);

  const rem = (pixels / rootBase).toFixed(4).replace(/\.?0+$/, "");
  const em = rem;
  const pt = (pixels * 0.75).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Pixel Value (px)</label>
          <input
            type="number"
            value={pixels}
            onChange={(e) => setPixels(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Root Base Font Size (Default 16px)</label>
          <input
            type="number"
            value={rootBase}
            onChange={(e) => setRootBase(parseFloat(e.target.value) || 16)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-xs text-emerald-700 dark:text-emerald-300 block mb-1">REM Equivalent</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{rem} rem</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">EM Equivalent</span>
          <span className="text-xl font-bold">{em} em</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Points (pt)</span>
          <span className="text-xl font-bold">{pt} pt</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. GPS Coordinate Converter (DD to DMS)
// ==========================================
export function CoordinateConverterTool() {
  const [latDd, setLatDd] = useState<number>(37.7749);
  const [lngDd, setLngDd] = useState<number>(-122.4194);

  const ddToDms = (dd: number, isLat: boolean) => {
    const dir = dd < 0 ? (isLat ? "S" : "W") : isLat ? "N" : "E";
    const abs = Math.abs(dd);
    const deg = Math.floor(abs);
    const minFloat = (abs - deg) * 60;
    const min = Math.floor(minFloat);
    const sec = ((minFloat - min) * 60).toFixed(2);
    return `${deg}° ${min}′ ${sec}″ ${dir}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Latitude Decimal Degrees (DD)</label>
          <input
            type="number"
            step="0.0001"
            value={latDd}
            onChange={(e) => setLatDd(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Longitude Decimal Degrees (DD)</label>
          <input
            type="number"
            step="0.0001"
            value={lngDd}
            onChange={(e) => setLngDd(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Latitude (DMS)</span>
          <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400">
            {ddToDms(latDd, true)}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Longitude (DMS)</span>
          <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {ddToDms(lngDd, false)}
          </span>
        </div>
      </div>
    </div>
  );
}
