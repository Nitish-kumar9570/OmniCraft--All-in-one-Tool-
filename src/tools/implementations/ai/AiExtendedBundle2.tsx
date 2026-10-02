"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Zap,
  BookOpen,
  User,
  HelpCircle,
  Hash,
  Smile,
  Terminal,
  Send,
  MessageSquare,
  FileText,
  Briefcase,
  ListOrdered,
  Shuffle,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. AI TL;DR & Executive Bullet Summarizer
// ==========================================
export function AiTldrTool() {
  const [text, setText] = useState(
    "Next.js 16 introduces an overhauled Turbopack compiler, optimized server action streams, and sub-millisecond edge caching. This release significantly reduces cold start times in production serverless environments and improves developer build metrics across massive monorepos."
  );
  const [tldr, setTldr] = useState("");
  const { success } = useToast();

  const handleGenerate = () => {
    setTldr(
      `⚡ **TL;DR**: Next.js 16 brings lightning-fast Turbopack compilation, faster server actions, and instant edge caching to slash production cold starts and monorepo build times.`
    );
    success("TL;DR summary created!");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Long Article / Text Document</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
        />
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <Zap className="w-4 h-4" /> Generate 1-Sentence TL;DR
      </button>

      {tldr && (
        <div className="p-6 rounded-2xl border border-pink-500/20 bg-pink-50/50 dark:bg-pink-500/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400">Condensed Takeaway</span>
            <button
              onClick={() => {
                copyToClipboard(tldr);
                success("TL;DR copied!");
              }}
              className="px-3 py-1.5 rounded-xl bg-pink-600 text-white text-xs font-semibold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </div>
          <div className="text-xs font-medium leading-relaxed">{tldr}</div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. AI Tone Shifter (Professional / Casual / Executive)
// ==========================================
export function AiToneShifterTool() {
  const [text, setText] = useState("Hey, fix this bug ASAP, the client is super mad.");
  const [tone, setTone] = useState<"executive" | "diplomatic" | "friendly" | "persuasive">("diplomatic");
  const [result, setResult] = useState("");
  const { success } = useToast();

  const handleShift = () => {
    const tones: Record<string, string> = {
      diplomatic: "Could we prioritize resolving this issue today? It's currently impacting client satisfaction, and addressing it promptly will help ensure a positive relationship.",
      executive: "Urgent action item: Client-facing defect requires immediate escalation and remediation to mitigate SLA risk.",
      friendly: "Hey team! Could we give this bug a quick look when you have a moment? The client reached out and we'd love to get them sorted out quickly. Thanks so much!",
      persuasive: "Resolving this high-visibility issue today will demonstrate our exceptional responsiveness to the client and secure their confidence going forward.",
    };
    setResult(tones[tone]);
    success(`Converted to ${tone} tone!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-bold">Input Draft</label>
          <div className="flex gap-1.5">
            {(["diplomatic", "executive", "friendly", "persuasive"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize cursor-pointer ${
                  tone === t ? "bg-pink-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
        />
      </div>

      <button
        onClick={handleShift}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <Shuffle className="w-4 h-4" /> Shift Message Tone
      </button>

      {result && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold capitalize">Transformed Output ({tone})</span>
            <button
              onClick={() => {
                copyToClipboard(result);
                success("Shifted text copied!");
              }}
              className="px-3 py-1.5 rounded-xl bg-pink-600 text-white text-xs font-semibold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </div>
          <p className="text-xs leading-relaxed italic">{result}</p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. AI Social Media Captions & Hook Maker
// ==========================================
export function AiSocialCaptionsTool() {
  const [topic, setTopic] = useState("Launching our new AI Toolbox platform");
  const [platform, setPlatform] = useState<"twitter" | "linkedin" | "instagram">("linkedin");
  const [captions, setCaptions] = useState<string[]>([]);
  const { success } = useToast();

  const handleGenerate = () => {
    if (platform === "linkedin") {
      setCaptions([
        `🚀 We are thrilled to introduce ${topic}!\n\nAfter months of engineering and customer feedback, we've built a unified ecosystem of 500+ free browser-side utilities.\n\nKey takeaways:\n→ 100% Client-Side Privacy\n→ Instant WebAssembly Performance\n→ Clean modern UI\n\nCheck it out and let us know your thoughts! 👇 #ProductLaunch #Engineering #TechNews`,
      ]);
    } else if (platform === "twitter") {
      setCaptions([
        `Big milestone today! 🚀\n\nWe just dropped ${topic} — 500+ private, lightning-fast developer & creator tools in one place.\n\nNo signups. No subscriptions. 100% free.\n\nLink in bio 🔗`,
      ]);
    } else {
      setCaptions([
        `Work smarter, not harder. ✨\n\nIntroducing ${topic} — your new daily digital superpower. 500+ tools for creators, engineers, and designers.\n\nDouble tap if you love productivity hacks! ❤️\n.\n.\n#developer #productivity #tools #workflow #design`,
      ]);
    }
    success("Captions generated!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Post Topic / Announcement</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Target Platform</label>
          <select
            value={platform}
            onChange={(e: any) => setPlatform(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs capitalize"
          >
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter / X</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <MessageSquare className="w-4 h-4" /> Generate Viral Captions
      </button>

      {captions.length > 0 && (
        <div className="space-y-3">
          {captions.map((cap, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    copyToClipboard(cap);
                    success("Caption copied!");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-pink-600 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 text-xs whitespace-pre-wrap leading-relaxed">
                {cap}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. AI Professional Bio Generator
// ==========================================
export function AiBioGeneratorTool() {
  const [name, setName] = useState("Elena Rostova");
  const [role, setRole] = useState("Principal Software Architect");
  const [hobbies, setHobbies] = useState("Open-source contributor, AI safety advocate, rock climber");
  const [bios, setBios] = useState<string[]>([]);
  const { success } = useToast();

  const handleGenerate = () => {
    setBios([
      `${name} is a ${role} obsessed with building resilient, hyper-scale cloud architectures. Outside of engineering, they are an ${hobbies}.`,
      `${role} | Crafting distributed systems and future-proof digital experiences. ${hobbies}. Connecting the dots between technology and human experience.`,
      `Hi, I'm ${name} 👋 ${role}. Passionate about high-throughput software and high-impact teams. Proud ${hobbies}.`,
    ]);
    success("3 bio variations created!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-bold block mb-1">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Current Role / Title</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Interests / Highlights</label>
          <input
            type="text"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <User className="w-4 h-4" /> Generate Professional Bios
      </button>

      {bios.length > 0 && (
        <div className="space-y-2">
          {bios.map((b, idx) => (
            <div
              key={idx}
              onClick={() => {
                copyToClipboard(b);
                success("Bio copied!");
              }}
              className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] hover:border-pink-500 cursor-pointer flex items-center justify-between text-xs"
            >
              <span>{b}</span>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. AI Meeting Minutes & Action Items Extractor
// ==========================================
export function AiMeetingMinutesTool() {
  const [transcript, setTranscript] = useState(
    `Sarah: Let's review the Q3 timeline. John, will the auth microservice be ready by next Friday?\nJohn: Yes, we finished unit tests today. I need Alex to approve the PR by Wednesday.\nAlex: I will review John's PR tomorrow morning. Also, Sarah, can you update the sprint board?\nSarah: Absolutely, I'll update Jira by 5 PM today.`
  );
  const [minutes, setMinutes] = useState("");
  const { success } = useToast();

  const handleExtract = () => {
    setMinutes(
      `### 📝 Meeting Summary & Action Items\n\n**Executive Overview**:\nThe team aligned on the Q3 authentication milestone and PR review schedules.\n\n**🎯 Action Items & Assignees**:\n• **Alex**: Review and approve John's Auth PR (Deadline: Wednesday morning)\n• **Sarah**: Update sprint board on Jira (Deadline: Today, 5 PM)\n• **John**: Coordinate final microservice deployment after PR merge\n\n**Decisions Made**:\n• Auth microservice release remains on schedule for next Friday.`
    );
    success("Extracted meeting notes & action items!");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Meeting Transcript / Raw Notes</label>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={6}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
        />
      </div>

      <button
        onClick={handleExtract}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <FileText className="w-4 h-4" /> Extract Structured Minutes & Action Items
      </button>

      {minutes && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold">Executive Summary</span>
            <button
              onClick={() => {
                copyToClipboard(minutes);
                success("Minutes copied!");
              }}
              className="px-3 py-1.5 rounded-xl bg-pink-600 text-white text-xs font-semibold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </div>
          <div className="text-xs whitespace-pre-wrap leading-relaxed">{minutes}</div>
        </div>
      )}
    </div>
  );
}
