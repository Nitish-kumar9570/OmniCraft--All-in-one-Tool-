"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";
import { copyToClipboard } from "@/lib/utils";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
  "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut",
  "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit"
];

export function LoremIpsumTool() {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [generatedText, setGeneratedText] = useState<string>("");
  const { success } = useToast();

  const generateLorem = (count: number) => {
    const paras: string[] = [];
    for (let p = 0; p < count; p++) {
      const sentences: string[] = [];
      for (let s = 0; s < 4; s++) {
        const sentenceWords: string[] = [];
        for (let w = 0; w < 12; w++) {
          const randomWord = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
          sentenceWords.push(randomWord);
        }
        const fullSentence = sentenceWords.join(" ");
        sentences.push(fullSentence.charAt(0).toUpperCase() + fullSentence.slice(1) + ".");
      }
      paras.push(sentences.join(" "));
    }
    const result = paras.join("\n\n");
    setGeneratedText(result);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-4 shadow-md backdrop-blur-xl">
        <ManualNumberInput
          label="Number of Paragraphs"
          value={paragraphs}
          onChange={setParagraphs}
          min={1}
          max={50}
          step={1}
          suffix=" paras"
          placeholder="3"
          presets={[
            { label: "1 Para", value: 1 },
            { label: "3 Paras", value: 3 },
            { label: "5 Paras", value: 5 },
            { label: "10 Paras", value: 10 },
          ]}
        />
        <div className="flex justify-end pt-2">
          <Button variant="gradient" size="md" onClick={() => generateLorem(paragraphs)}>
            Generate Lorem Ipsum
          </Button>
        </div>
      </div>

      {generatedText && (
        <div className="space-y-3">
          <textarea
            readOnly
            value={generatedText}
            rows={8}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs leading-relaxed font-sans shadow-inner"
          />
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const ok = await copyToClipboard(generatedText);
                if (ok) success("Copied to clipboard");
              }}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
            >
              Copy Text
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

