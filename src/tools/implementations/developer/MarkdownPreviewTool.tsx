"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

export function MarkdownPreviewTool() {
  const [markdown, setMarkdown] = useState<string>(`# Welcome to OmniCraft Markdown Editor

OmniCraft provides **fast**, *responsive*, and private developer utilities.

## Features:
- Tables with auto-formatting
- Code blocks with syntax styles
- Real-time side-by-side preview

| Tool Category | Count | Status |
| :--- | :--- | :--- |
| PDF Tools | 15+ | Active |
| Image Tools | 20+ | Active |
| Developer | 30+ | Active |

\`\`\`typescript
const isAwesome = true;
console.log("Hello from OmniCraft!");
\`\`\`
`);
  const { success } = useToast();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
            Markdown Source Editor
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={14}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
            Live Rendered HTML Preview
          </label>
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#060a14] h-[320px] overflow-y-auto text-xs text-slate-800 dark:text-slate-200 shadow-inner prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          size="md"
          onClick={async () => {
            const ok = await copyToClipboard(markdown);
            if (ok) success("Markdown copied");
          }}
          leftIcon={<Copy className="w-4 h-4" />}
        >
          Copy Markdown
        </Button>
      </div>

    </div>
  );
}
