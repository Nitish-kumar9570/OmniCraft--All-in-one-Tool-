"use client";

import React, { useState, useEffect } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { User, ShieldCheck, Check } from "lucide-react";

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
];

const PROFILE_KEY = "omnicraft_user_profile";

export default function ProfilePage() {
  const { success } = useToast();
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem(PROFILE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setFullName(parsed.fullName || "Local User");
          setAvatarUrl(parsed.avatarUrl || "");
        } else {
          setFullName("Local User");
        }
      } catch {
        setFullName("Local User");
      }
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setIsSaving(true);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          PROFILE_KEY,
          JSON.stringify({
            fullName: fullName.trim(),
            avatarUrl: avatarUrl.trim(),
            updatedAt: new Date().toISOString(),
          })
        );
      }
      success("Profile updated successfully");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardShell title="Profile">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Workspace Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage your local display name and custom avatar for OmniCraft.
          </p>
        </div>

        {/* Profile Card Form */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <Avatar
              src={avatarUrl}
              name={fullName}
              size="xl"
              className="ring-4 ring-indigo-500/20"
            />
            <div className="space-y-2 flex-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Profile Avatar
              </h3>
              <p className="text-xs text-slate-500">
                Choose one of our preset avatars or paste a custom image URL.
              </p>

              {/* Preset Avatars */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarUrl(preset)}
                    className={`relative w-8 h-8 rounded-full overflow-hidden border-2 transition-transform hover:scale-105 ${
                      avatarUrl === preset
                        ? "border-indigo-500 ring-2 ring-indigo-500/30"
                        : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img src={preset} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                    {avatarUrl === preset && (
                      <div className="absolute inset-0 bg-indigo-600/40 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl("")}
                    className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline ml-2"
                  >
                    Reset to monogram
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-6">
            <Input
              label="Display Name"
              placeholder="Your display name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Custom Avatar URL"
              placeholder="https://example.com/avatar.jpg"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              helperText="Direct image URL for your workspace profile picture"
            />

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                variant="gradient"
                size="md"
                isLoading={isSaving}
              >
                Save Profile Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Local Storage Privacy Information */}
        <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Client-Side Workspace
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            OmniCraft operates 100% in your browser. All preferences and favorite tools are stored locally on your device without server-side account requirements.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
