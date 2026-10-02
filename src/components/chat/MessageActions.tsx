"use client";

import React, { useState } from "react";
import { Copy, Check, ThumbsUp, ThumbsDown, RotateCcw, Volume2, VolumeX, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

interface MessageActionsProps {
  content: string;
  onRegenerate?: () => void;
  showRegenerate?: boolean;
}

export function MessageActions({
  content,
  onRegenerate,
  showRegenerate = false,
}: MessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { success, info } = useToast();

  const handleCopy = async () => {
    const ok = await copyToClipboard(content);
    if (ok) {
      setCopied(true);
      success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };


  const handleLike = (isLike: boolean) => {
    if (liked === isLike) {
      setLiked(null);
    } else {
      setLiked(isLike);
      info(isLike ? "Thanks for your feedback!" : "Feedback recorded.");
    }
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Strip markdown tags roughly for clean TTS audio
    const plainText = content.replace(/[#*`_~[\]()]/g, "").trim();
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "OmniCraft AI Response",
          text: content,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 pt-2 select-none">
      <button
        type="button"
        onClick={handleCopy}
        title="Copy response"
        className="p-1.5 rounded-lg hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer touch-manipulation active:scale-95"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
      </button>

      <button
        type="button"
        onClick={handleSpeak}
        title={isSpeaking ? "Stop reading" : "Read aloud"}
        className="p-1.5 rounded-lg hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer touch-manipulation active:scale-95"
      >
        {isSpeaking ? <VolumeX className="w-4 h-4 text-indigo-500" /> : <Volume2 className="w-4 h-4" />}
      </button>

      <button
        type="button"
        onClick={() => handleLike(true)}
        title="Good response"
        className={`p-1.5 rounded-lg hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer touch-manipulation active:scale-95 ${
          liked === true ? "text-emerald-500 hover:text-emerald-600 bg-emerald-500/10" : ""
        }`}
      >
        <ThumbsUp className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => handleLike(false)}
        title="Bad response"
        className={`p-1.5 rounded-lg hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer touch-manipulation active:scale-95 ${
          liked === false ? "text-rose-500 hover:text-rose-600 bg-rose-500/10" : ""
        }`}
      >
        <ThumbsDown className="w-4 h-4" />
      </button>

      {showRegenerate && onRegenerate && (
        <button
          type="button"
          onClick={onRegenerate}
          title="Regenerate response"
          className="p-1.5 rounded-lg hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer touch-manipulation active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}

      <button
        type="button"
        onClick={handleShare}
        title="Share"
        className="p-1.5 rounded-lg hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer touch-manipulation active:scale-95"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}

