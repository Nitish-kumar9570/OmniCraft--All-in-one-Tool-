"use client";

import React, { useState } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Share2, Video, Globe, MessageSquare, Heart, MessageCircle, Bookmark, Sparkles } from "lucide-react";

export function SocialPostPreviewTool() {
  const [platform, setPlatform] = useState<"instagram" | "twitter" | "youtube" | "linkedin">("instagram");
  const [authorName, setAuthorName] = useState<string>("OmniCraft Creator");
  const [authorHandle, setAuthorHandle] = useState<string>("omnicraft_app");
  const [postText, setPostText] = useState<string>("Building high-speed developer utilities directly in your browser! 🚀 No backend uploads needed, 100% private and instant. Check out our suite! #developer #tools #webdev");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [likesCount, setLikesCount] = useState<string>("1,420");

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    setImageSrc(URL.createObjectURL(files[0]));
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Platform Switcher */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Select Target Social Platform
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: "instagram", label: "Instagram", icon: Share2, color: "text-pink-500" },
            { id: "twitter", label: "X / Twitter", icon: MessageSquare, color: "text-sky-500" },
            { id: "youtube", label: "YouTube", icon: Video, color: "text-red-500" },
            { id: "linkedin", label: "LinkedIn", icon: Globe, color: "text-blue-600" },
          ].map((p) => {
            const Icon = p.icon;
            const isSelected = platform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id as any)}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 shadow-sm"
                    : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090e1c] text-slate-700 dark:text-slate-300 hover:border-indigo-300"
                }`}
              >
                <Icon className={`w-4 h-4 ${p.color}`} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl">
        <Input
          label="Display Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Display Name"
        />
        <Input
          label="Handle / Username"
          value={authorHandle}
          onChange={(e) => setAuthorHandle(e.target.value)}
          placeholder="handle"
        />
        <div className="sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
            Post Caption / Content
          </label>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-inner"
          />
        </div>

        <div className="sm:col-span-2">
          {!imageSrc ? (
            <DropZone
              onFilesSelected={handleFile}
              accept="image/*"
              maxFiles={1}
              label="Upload Post Image"
              subLabel="JPG, PNG, WEBP"
            />
          ) : (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Image Attached</span>
              <Button variant="ghost" size="sm" onClick={() => setImageSrc(null)}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Live Realistic Preview Card */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Live Mockup Preview ({platform.toUpperCase()})
        </h4>

        {/* Instagram Mockup */}
        {platform === "instagram" && (
          <div className="max-w-md mx-auto rounded-3xl bg-white dark:bg-black border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden text-slate-900 dark:text-white">
            <div className="flex items-center gap-3 p-3.5 border-b border-slate-100 dark:border-slate-900">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5">
                <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center text-xs font-bold">
                  {authorName.charAt(0)}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">{authorHandle}</p>
                <p className="text-[10px] text-slate-500">Sponsored • Original</p>
              </div>
            </div>

            {imageSrc ? (
              <img src={imageSrc} alt="Post content" className="w-full aspect-square object-cover" />
            ) : (
              <div className="w-full aspect-square bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-xs text-slate-400">
                Upload image to view preview
              </div>
            )}

            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 cursor-pointer hover:text-rose-500" />
                  <MessageCircle className="w-5 h-5 cursor-pointer" />
                  <Share2 className="w-5 h-5 cursor-pointer" />
                </div>
                <Bookmark className="w-5 h-5 cursor-pointer" />
              </div>
              <p className="text-xs font-bold">{likesCount} likes</p>
              <p className="text-xs leading-relaxed">
                <strong className="font-bold mr-1.5">{authorHandle}</strong>
                {postText}
              </p>
            </div>
          </div>
        )}

        {/* Twitter Mockup */}
        {platform === "twitter" && (
          <div className="max-w-md mx-auto p-4 rounded-3xl bg-white dark:bg-black border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 text-slate-900 dark:text-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {authorName.charAt(0)}
              </div>
              <div className="space-y-1.5 w-full">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold">{authorName}</span>
                  <span className="text-xs text-slate-500">@{authorHandle} • Just now</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-800 dark:text-slate-200">{postText}</p>
                {imageSrc && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 mt-2">
                    <img src={imageSrc} alt="Tweet media" className="w-full max-h-64 object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* YouTube / LinkedIn fallback */}
        {(platform === "youtube" || platform === "linkedin") && (
          <div className="max-w-md mx-auto p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 text-slate-900 dark:text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                {authorName.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold">{authorName}</p>
                <p className="text-[10px] text-slate-500">{platform === "youtube" ? "120K subscribers" : "OmniCraft Developer"}</p>
              </div>
            </div>
            {imageSrc && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <img src={imageSrc} alt="Media" className="w-full aspect-video object-cover" />
              </div>
            )}
            <p className="text-xs leading-relaxed text-slate-800 dark:text-slate-200">{postText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
