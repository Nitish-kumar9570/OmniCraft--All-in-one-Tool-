"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Server, Search, CheckCircle2, AlertTriangle, XCircle, Info, Copy } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

interface StatusCodeInfo {
  code: number;
  phrase: string;
  category: "1xx" | "2xx" | "3xx" | "4xx" | "5xx";
  description: string;
  useCase: string;
}

const HTTP_CODES: StatusCodeInfo[] = [
  { code: 200, phrase: "OK", category: "2xx", description: "Standard response for successful HTTP requests.", useCase: "Standard successful REST GET or POST response." },
  { code: 201, phrase: "Created", category: "2xx", description: "Request fulfilled resulting in the creation of a new resource.", useCase: "Returned when a resource is successfully created via POST/PUT." },
  { code: 204, phrase: "No Content", category: "2xx", description: "Request handled successfully with no response body to return.", useCase: "Common for DELETE actions or headless API updates." },
  { code: 301, phrase: "Moved Permanently", category: "3xx", description: "The resource URI has permanently moved to a new Location header.", useCase: "SEO 301 canonical redirects and domain migration." },
  { code: 302, phrase: "Found (Temporary Redirect)", category: "3xx", description: "The resource resides temporarily under a different URI.", useCase: "Temporary login redirects, oauth handshakes." },
  { code: 304, phrase: "Not Modified", category: "3xx", description: "The cached version on the client is up to date (ETag / If-Modified-Since).", useCase: "Browser caching, static assets, unchanged API queries." },
  { code: 400, phrase: "Bad Request", category: "4xx", description: "The server cannot process the request due to client validation error.", useCase: "Malformed JSON syntax, invalid query parameters." },
  { code: 401, phrase: "Unauthorized", category: "4xx", description: "Authentication is required and has failed or has not been provided.", useCase: "Missing Bearer JWT token or invalid API key." },
  { code: 403, phrase: "Forbidden", category: "4xx", description: "The client identity is known, but does not possess access permissions.", useCase: "Role-based access control (RBAC), insufficient permissions." },
  { code: 404, phrase: "Not Found", category: "4xx", description: "The server cannot locate the requested resource endpoint.", useCase: "Unknown route, deleted entity ID, missing file." },
  { code: 409, phrase: "Conflict", category: "4xx", description: "Request conflicts with current server state (e.g. duplicate unique key).", useCase: "Duplicate email registration, version lock conflict." },
  { code: 422, phrase: "Unprocessable Entity", category: "4xx", description: "Syntax is correct but semantic business validation rules failed.", useCase: "Zod or JSON schema validation failure on fields." },
  { code: 429, phrase: "Too Many Requests", category: "4xx", description: "The user has sent too many requests in a given time window (Rate Limited).", useCase: "API rate limiting with Retry-After header." },
  { code: 500, phrase: "Internal Server Error", category: "5xx", description: "Generic server error when an unhandled exception occurs.", useCase: "Unhandled server crash, database outage, runtime error." },
  { code: 502, phrase: "Bad Gateway", category: "5xx", description: "Server received an invalid response from upstream origin server.", useCase: "Reverse proxy (Nginx / Cloudflare) upstream timeout." },
  { code: 503, phrase: "Service Unavailable", category: "5xx", description: "The server is currently unable to handle the request due to maintenance.", useCase: "Server overload, planned maintenance window." },
  { code: 504, phrase: "Gateway Timeout", category: "5xx", description: "The reverse proxy did not receive a timely response from upstream.", useCase: "Slow database query causing gateway timeout." },
];

export function HttpStatusCodeTool() {
  const [search, setSearch] = useState<string>("" );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { success } = useToast();

  const filteredCodes = HTTP_CODES.filter((c) => {
    const matchesCategory = selectedCategory === "all" || c.category === selectedCategory;
    const matchesSearch =
      c.code.toString().includes(search) ||
      c.phrase.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBadgeColor = (cat: string) => {
    switch (cat) {
      case "2xx": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "3xx": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "4xx": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      case "5xx": return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30";
      default: return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Search Bar & Category Filters */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl space-y-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by code (e.g. 404) or name (e.g. Unauthorized)..."
        />

        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: "all", label: "All Status Codes" },
            { id: "2xx", label: "2xx Success" },
            { id: "3xx", label: "3xx Redirection" },
            { id: "4xx", label: "4xx Client Errors" },
            { id: "5xx", label: "5xx Server Errors" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-bold"
                  : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090e1c] text-slate-700 dark:text-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* List of Codes */}
      <div className="space-y-3">
        {filteredCodes.map((item) => (
          <div
            key={item.code}
            className="p-5 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-md backdrop-blur-xl flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-black border ${getBadgeColor(item.category)}`}>
                  {item.code}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.phrase}
                </h4>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                💡 Typical Use Case: {item.useCase}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const ok = await copyToClipboard(`${item.code} ${item.phrase}: ${item.description}`);
                if (ok) success(`Copied HTTP ${item.code} details!`);
              }}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
            >
              Copy
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

