"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, Heart, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "warning" | "favorite";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (options: { type?: ToastType; title: string; message?: string; duration?: number }) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  favorite: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  const duration = toast.duration ?? 3500;

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto relative overflow-hidden flex items-start gap-3.5 p-4 rounded-2xl border shadow-2xl transition-all duration-300",
        "bg-white/95 dark:bg-[#090e1c]/95 text-slate-900 dark:text-white backdrop-blur-2xl",
        "border-slate-200/90 dark:border-white/10",
        "animate-in slide-in-from-top-3 fade-in zoom-in-95 ease-out",
        toast.type === "favorite" && "border-rose-500/40 shadow-rose-500/10",
        toast.type === "success" && "border-emerald-500/40 shadow-emerald-500/10",
        toast.type === "error" && "border-red-500/40 shadow-red-500/10",
        toast.type === "warning" && "border-amber-500/40 shadow-amber-500/10",
        toast.type === "info" && "border-indigo-500/40 shadow-indigo-500/10"
      )}
    >
      {/* Glow aura */}
      <div
        className={cn(
          "absolute -top-12 -left-12 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-40",
          toast.type === "favorite" && "bg-rose-500",
          toast.type === "success" && "bg-emerald-500",
          toast.type === "error" && "bg-red-500",
          toast.type === "warning" && "bg-amber-500",
          toast.type === "info" && "bg-indigo-500"
        )}
      />

      {/* Icon Badge */}
      <div
        className={cn(
          "shrink-0 p-2 rounded-xl border flex items-center justify-center shadow-xs",
          toast.type === "favorite" && "bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400 animate-pulse",
          toast.type === "success" && "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
          toast.type === "error" && "bg-red-500/15 border-red-500/30 text-red-600 dark:text-red-400",
          toast.type === "warning" && "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400",
          toast.type === "info" && "bg-indigo-500/15 border-indigo-500/30 text-indigo-600 dark:text-indigo-400"
        )}
      >
        {toast.type === "favorite" && <Heart className="w-4 h-4 fill-current" />}
        {toast.type === "success" && <CheckCircle2 className="w-4 h-4" />}
        {toast.type === "error" && <AlertCircle className="w-4 h-4" />}
        {toast.type === "warning" && <AlertTriangle className="w-4 h-4" />}
        {toast.type === "info" && <Sparkles className="w-4 h-4" />}
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0 pr-1">
        <h4 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
          <span>{toast.title}</span>
        </h4>
        {toast.message && (
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed break-words font-sans">
            {toast.message}
          </p>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer shrink-0 active:scale-90"
        aria-label="Dismiss toast"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Progress countdown bar */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-[2px] w-full",
          toast.type === "favorite" && "bg-rose-500/80",
          toast.type === "success" && "bg-emerald-500/80",
          toast.type === "error" && "bg-red-500/80",
          toast.type === "warning" && "bg-amber-500/80",
          toast.type === "info" && "bg-indigo-500/80"
        )}
        style={{
          animation: `toast-progress ${duration}ms linear forwards`,
        }}
      />
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({
      type = "info",
      title,
      message,
      duration = 3500,
    }: {
      type?: ToastType;
      title: string;
      message?: string;
      duration?: number;
    }) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, type, title, message, duration };
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback((title: string, message?: string) => addToast({ type: "success", title, message }), [addToast]);
  const error = useCallback((title: string, message?: string) => addToast({ type: "error", title, message }), [addToast]);
  const info = useCallback((title: string, message?: string) => addToast({ type: "info", title, message }), [addToast]);
  const warning = useCallback((title: string, message?: string) => addToast({ type: "warning", title, message }), [addToast]);
  const favorite = useCallback((title: string, message?: string) => addToast({ type: "favorite", title, message }), [addToast]);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info, warning, favorite }}>
      {children}
      {/* Toast Notification Container */}
      <aside
        aria-live="polite"
        className="fixed top-4 sm:top-5 left-4 right-4 sm:left-auto sm:right-5 z-[9999] flex flex-col gap-2.5 max-w-sm pointer-events-none select-none"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={removeToast} />
        ))}
      </aside>

    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
