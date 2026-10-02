"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PrivacyDashboard } from "@/components/settings/PrivacyDashboard";
import { useTheme } from "@/hooks/useTheme";
import {
  Palette,
  Sliders,
  Shield,
  Sun,
  Moon,
  Monitor,
  Check,
} from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"appearance" | "privacy" | "general">("appearance");

  // General Settings state
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoGenerateTitles, setAutoGenerateTitles] = useState(true);

  return (
    <DashboardShell title="Settings">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Configure appearance, privacy controls, and client-side preferences for OmniCraft.
          </p>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-px mb-8 overflow-x-auto select-none">
          {[
            { id: "appearance", label: "Appearance", icon: Palette },
            { id: "privacy", label: "Privacy & Data", icon: Shield },
            { id: "general", label: "General", icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* TAB 1: APPEARANCE */}
          {activeTab === "appearance" && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Theme Preference
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Choose how OmniCraft looks to you. Select a light, dark, or system-synchronized theme.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "dark", label: "Dark Mode", desc: "Cosmic deep blues and high contrast", icon: Moon },
                  { id: "light", label: "Light Mode", desc: "Crisp and bright workspace aesthetic", icon: Sun },
                  { id: "system", label: "System Sync", desc: "Automatically match OS color preferences", icon: Monitor },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = theme === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setTheme(item.id as any)}
                      className={`relative flex flex-col p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-850/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-slate-800 text-indigo-500 shadow-xs">
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                      </div>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: PRIVACY & DATA */}
          {activeTab === "privacy" && <PrivacyDashboard />}

          {/* TAB 3: GENERAL */}
          {activeTab === "general" && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  General Preferences
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust default parameters for browser interactions and tool feedback.
                </p>
              </div>

              <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="flex items-center justify-between pt-4 first:pt-0">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Automatic Tool History Recording
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Record recently used tools in local browser storage for quick access.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoGenerateTitles}
                    onChange={(e) => setAutoGenerateTitles(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Sound Effects & Haptics
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Play subtle audible feedback upon action completion.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundEffects}
                    onChange={(e) => setSoundEffects(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
