"use client";

import React, { useState } from "react";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Percent,
  Activity,
  Heart,
  Calendar,
  Clock,
  Zap,
  Flame,
  Droplets,
  Scale,
  PieChart,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

// ==========================================
// 1. Mortgage & Home Loan Calculator
// ==========================================
export function MortgageCalculatorTool() {
  const [homePrice, setHomePrice] = useState<number>(450000);
  const [downPayment, setDownPayment] = useState<number>(90000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  const principal = Math.max(0, homePrice - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTermYears * 12;

  const monthlyPrincipalInterest =
    monthlyRate > 0
      ? (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : principal / numPayments;

  const totalPayment = monthlyPrincipalInterest * numPayments;
  const totalInterest = totalPayment - principal;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Home Price ($)</label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Down Payment ($)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Loan Term (Years)</label>
          <select
            value={loanTermYears}
            onChange={(e) => setLoanTermYears(parseInt(e.target.value, 10))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          >
            <option value={15}>15 Years</option>
            <option value={20}>20 Years</option>
            <option value={30}>30 Years</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
          <span className="text-xs text-amber-700 dark:text-amber-300 block mb-1">Monthly Payment</span>
          <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
            ${Math.round(monthlyPrincipalInterest).toLocaleString()}/mo
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-center">
          <span className="text-xs text-slate-400 block mb-1">Total Loan Principal</span>
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">${Math.round(principal).toLocaleString()}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-center">
          <span className="text-xs text-slate-400 block mb-1">Total Interest Paid</span>
          <span className="text-xl font-bold text-rose-600 dark:text-rose-400">${Math.round(totalInterest).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Salary to Hourly Wage Calculator
// ==========================================
export function SalaryToHourlyCalculatorTool() {
  const [annualSalary, setAnnualSalary] = useState<number>(120000);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);

  const totalHours = hoursPerWeek * weeksPerYear;
  const hourlyRate = totalHours > 0 ? (annualSalary / totalHours).toFixed(2) : "0.00";
  const monthlySalary = (annualSalary / 12).toFixed(2);
  const biweeklySalary = (annualSalary / 26).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Annual Salary ($)</label>
          <input
            type="number"
            value={annualSalary}
            onChange={(e) => setAnnualSalary(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Hours Per Week</label>
          <input
            type="number"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Weeks Per Year</label>
          <input
            type="number"
            value={weeksPerYear}
            onChange={(e) => setWeeksPerYear(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <span className="text-xs text-amber-700 dark:text-amber-300 block mb-1">Hourly Equivalent</span>
          <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400">${hourlyRate}/hr</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Monthly Gross</span>
          <span className="text-lg font-bold">${parseFloat(monthlySalary).toLocaleString()}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Bi-Weekly Pay</span>
          <span className="text-lg font-bold">${parseFloat(biweeklySalary).toLocaleString()}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Annual Working Hours</span>
          <span className="text-lg font-bold font-mono">{totalHours} hrs</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Discount & Sale Savings Calculator
// ==========================================
export function DiscountSaleCalculatorTool() {
  const [price, setPrice] = useState<number>(149.99);
  const [discountPercent, setDiscountPercent] = useState<number>(25);

  const savings = (price * (discountPercent / 100)).toFixed(2);
  const finalPrice = Math.max(0, price - parseFloat(savings)).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Original Price ($)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Discount (% Off)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={discountPercent}
            onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-xs text-emerald-700 dark:text-emerald-300 block mb-1">Final Price</span>
          <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">${finalPrice}</span>
        </div>
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <span className="text-xs text-amber-700 dark:text-amber-300 block mb-1">You Save</span>
          <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">${savings}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. BMR & TDEE Calorie Calculator
// ==========================================
export function BmrTdeeCalculatorTool() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(28);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [activity, setActivity] = useState<number>(1.375); // Light exercise

  // Mifflin-St Jeor Formula
  const bmr =
    gender === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = Math.round(bmr * activity);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="text-xs font-bold block mb-1">Biological Gender</label>
          <select
            value={gender}
            onChange={(e: any) => setGender(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs capitalize"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Age (Years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Height (cm)</label>
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Basal Metabolic Rate (BMR)</span>
          <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{Math.round(bmr)} kcal/day</span>
        </div>
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <span className="text-xs text-amber-700 dark:text-amber-300 block mb-1">Daily Maintenance (TDEE)</span>
          <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{tdee} kcal/day</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. Ohm's Law Electrical Calculator
// ==========================================
export function OhmsLawCalculatorTool() {
  const [voltage, setVoltage] = useState<number>(12); // Volts
  const [current, setCurrent] = useState<number>(2); // Amperes

  const resistance = current > 0 ? (voltage / current).toFixed(2) : "0";
  const power = (voltage * current).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Voltage (V - Volts)</label>
          <input
            type="number"
            value={voltage}
            onChange={(e) => setVoltage(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Current (I - Amperes)</label>
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Resistance (R = V / I)</span>
          <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{resistance} Ω (Ohms)</span>
        </div>
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <span className="text-xs text-amber-700 dark:text-amber-300 block mb-1">Electrical Power (P = V × I)</span>
          <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{power} W (Watts)</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. Electricity Appliance Cost Calculator
// ==========================================
export function ElectricityCostCalculatorTool() {
  const [watts, setWatts] = useState<number>(1500); // 1.5kW appliance
  const [hoursPerDay, setHoursPerDay] = useState<number>(4);
  const [costPerKwh, setCostPerKwh] = useState<number>(0.15); // $0.15 / kWh

  const dailyKwh = (watts * hoursPerDay) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const monthlyCost = (monthlyKwh * costPerKwh).toFixed(2);
  const yearlyCost = (monthlyKwh * 12 * costPerKwh).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Power Rating (Watts)</label>
          <input
            type="number"
            value={watts}
            onChange={(e) => setWatts(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Hours Used Per Day</label>
          <input
            type="number"
            max={24}
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Cost Per kWh ($)</label>
          <input
            type="number"
            step="0.01"
            value={costPerKwh}
            onChange={(e) => setCostPerKwh(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <span className="text-xs text-amber-700 dark:text-amber-300 block mb-1">Estimated Monthly Cost</span>
          <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">${monthlyCost}/month</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Estimated Yearly Cost</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">${yearlyCost}/year</span>
        </div>
      </div>
    </div>
  );
}
