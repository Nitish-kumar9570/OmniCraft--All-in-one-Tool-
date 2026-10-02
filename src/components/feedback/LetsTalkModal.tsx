"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Star,
  AlertCircle,
  Lightbulb,
  Wrench,
  Bug,
  Heart,
  Handshake,
} from "lucide-react";
import { sendFeedbackEmail, isEmailJSConfigured } from "@/lib/emailjs";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

interface LetsTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

const CATEGORIES = [
  { id: "tool_idea", label: "Tool Suggestion", icon: Lightbulb },
  { id: "feature_request", label: "Feature Request", icon: Wrench },
  { id: "bug_report", label: "Bug Report", icon: Bug },
  { id: "general_feedback", label: "General Feedback", icon: Heart },
  { id: "partnership", label: "Let's Talk / Business", icon: Handshake },
];

const RATING_LABELS: Record<number, string> = {
  1: "Needs Work",
  2: "Could Be Better",
  3: "Good",
  4: "Great Experience",
  5: "Loved It! 🚀",
};

export function LetsTalkModal({ isOpen, onClose, defaultCategory = "tool_idea" }: LetsTalkModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const { success: toastSuccess } = useToast();

  const emailJsActive = isEmailJSConfigured();

  // Helper to completely reset the form to a fresh blank state
  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setCategory(defaultCategory);
    setRating(5);
    setHoverRating(0);
    setMessage("");
    setErrorMessage("");
    setIsSubmitting(false);
  }, [defaultCategory]);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  // Lock body scroll, focus, and reset form on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        resetForm();
        firstInputRef.current?.focus();
      }, 30);
      return () => {
        document.body.style.overflow = "unset";
        clearTimeout(timer);
      };
    }
  }, [isOpen, resetForm]);

  // Global ESC key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) {
      setErrorMessage("Please provide both your email address and feedback message.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const selectedCategoryObj = CATEGORIES.find((c) => c.id === category);
      const categoryName = selectedCategoryObj?.label || category;

      const result = await sendFeedbackEmail({
        name: name.trim() || "Anonymous Friend",
        email: email.trim(),
        category: categoryName,
        rating,
        message: message.trim(),
      });

      if (result.success) {
        // Show clean success toast and close modal immediately
        toastSuccess("Your message has been sent successfully!", "Thank you for reaching out to us.");
        handleClose();
      } else {
        setErrorMessage(result.message || "Failed to submit feedback. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setErrorMessage(msg);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lets-talk-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-3xl bg-white/95 dark:bg-[#0c1322]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.7)] animate-in zoom-in-95 duration-200 select-none text-slate-900 dark:text-slate-100 touch-manipulation"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Top Gradient Glow Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-200/70 dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-indigo-50 dark:bg-white/[0.07] text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-white/[0.05]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="lets-talk-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Let&apos;s talk
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                  Feedback
                </span>
                {emailJsActive && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    EmailJS Ready
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Share ideas, tool suggestions, or report any issue.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          {/* Category Selector Pills */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              What would you like to discuss?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all cursor-pointer text-left",
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:border-indigo-400"
                    )}
                  >
                    <Icon className={cn("w-3.5 h-3.5 shrink-0", isSelected ? "text-white" : "text-indigo-500")} />
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience Rating */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                How is your experience with OmniCraft?
              </label>
              <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                {RATING_LABELS[hoverRating || rating]}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= (hoverRating || rating);
                return (
                  <button
                    type="button"
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    aria-label={`Rate ${star} stars out of 5`}
                  >
                    <Star
                      className={cn(
                        "w-5 h-5",
                        isFilled ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & Email Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Your Name <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                ref={firstInputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#090e1c] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#090e1c] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Message Area */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Your Thoughts & Suggestions <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] text-slate-400">{message.length}/1000</span>
            </div>
            <textarea
              required
              maxLength={1000}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your idea, what tools you'd love to see next, or any issues you experienced..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#090e1c] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Footer / Submit Button */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>EmailJS {emailJsActive ? "Active" : "Enabled"}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !email.trim() || !message.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                {isSubmitting ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{isSubmitting ? "Sending..." : "Send Feedback"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
