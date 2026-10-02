"use client";

import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Check, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface FeedbackWidgetProps {
  toolId: string;
}

export function FeedbackWidget({ toolId }: FeedbackWidgetProps) {
  const [voted, setVoted] = useState<"yes" | "no" | null>(null);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { success } = useToast();

  const handleVote = async (isHelpful: boolean) => {
    setVoted(isHelpful ? "yes" : "no");
    if (!isHelpful) setCommentOpen(true);
    success("Thank you for your feedback!");

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId, isHelpful }),
      });
    } catch {}
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId, isHelpful: voted === "yes", message: comment.trim() }),
      });
      success("Feedback submitted!");
      setCommentOpen(false);
      setComment("");
    } catch {}
  };

  return (
    <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl text-center space-y-3 shadow-sm dark:shadow-xl">
      <p className="text-xs font-bold text-slate-900 dark:text-white">
        Was this tool helpful to you?
      </p>

      {voted === null ? (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleVote(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0f172a]/70 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-500/40 transition-colors cursor-pointer"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Yes</span>
          </button>
          <button
            onClick={() => handleVote(false)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0f172a]/70 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-700 dark:hover:text-rose-300 hover:border-rose-500/40 transition-colors cursor-pointer"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>No</span>
          </button>
        </div>
      ) : (
        <div className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
          <Check className="w-4 h-4" />
          <span>Thanks for your feedback!</span>
        </div>
      )}

      {commentOpen && (
        <form onSubmit={handleCommentSubmit} className="max-w-md mx-auto space-y-2 pt-2 text-left">
          <label className="text-[11px] text-slate-500 dark:text-slate-400">
            How can we improve this tool? (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us what went wrong or what feature you'd like added..."
            rows={2}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0f1d] text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setCommentOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
            >
              Skip
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
