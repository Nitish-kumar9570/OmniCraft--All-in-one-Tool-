"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

export function CaseConverterTool() {
  const [text, setText] = useState<string>("OmniCraft makes converting text casing fast and effortless.");
  const { success } = useToast();

  const toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  const toCamelCase = (str: string) =>
    str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

  const toSnakeCase = (str: string) =>
    str.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");

  const toKebabCase = (str: string) =>
    str.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const toPascalCase = (str: string) => {
    const camel = toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  };

  const toAlternatingCase = (str: string) =>
    str.split("").map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join("");

  const transform = (fn: (s: string) => string) => {
    setText(fn(text));
    success("Case converted!");
  };

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-sans shadow-xs dark:shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-500"
        placeholder="Type or paste text..."
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <Button variant="outline" size="sm" onClick={() => transform((s) => s.toUpperCase())}>UPPERCASE</Button>
        <Button variant="outline" size="sm" onClick={() => transform((s) => s.toLowerCase())}>lowercase</Button>
        <Button variant="outline" size="sm" onClick={() => transform(toTitleCase)}>Title Case</Button>
        <Button variant="outline" size="sm" onClick={() => transform(toCamelCase)}>camelCase</Button>
        <Button variant="outline" size="sm" onClick={() => transform(toPascalCase)}>PascalCase</Button>
        <Button variant="outline" size="sm" onClick={() => transform(toSnakeCase)}>snake_case</Button>
        <Button variant="outline" size="sm" onClick={() => transform(toKebabCase)}>kebab-case</Button>
        <Button variant="outline" size="sm" onClick={() => transform(toAlternatingCase)}>aLtErNaTiNg</Button>
      </div>

      <div className="flex justify-end">
        <Button
          variant="gradient"
          size="md"
          onClick={async () => {
            const ok = await copyToClipboard(text);
            if (ok) success("Copied to clipboard");
          }}
          leftIcon={<Copy className="w-4 h-4" />}
        >
          Copy Result
        </Button>
      </div>

    </div>
  );
}
