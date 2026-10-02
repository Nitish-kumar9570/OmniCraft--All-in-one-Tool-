"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useDocuments } from "@/hooks/useDocuments";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { DocumentUploader } from "@/components/documents/DocumentUploader";
import { MemoryManager } from "@/components/memory/MemoryManager";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { useConversations } from "@/hooks/useConversations";
import { copyToClipboard } from "@/lib/utils";
import {
  FileText,
  Brain,
  Code2,
  Sparkles,
  Search,
  Plus,
  Trash2,
  Copy,
  Check,
  ArrowUpRight,
  UploadCloud,
  Layers,
} from "lucide-react";

interface LibrarySnippet {
  id: string;
  title: string;
  type: "code" | "note" | "prompt";
  content: string;
  language?: string;
  tags: string[];
  createdAt: string;
}

const DEFAULT_SNIPPETS: LibrarySnippet[] = [
  {
    id: "lib-1",
    title: "Python Timed Execution Decorator",
    type: "code",
    language: "python",
    content: `@timed_execution\ndef compute_fibonacci(n: int) -> int:\n    if n <= 1:\n        return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b`,
    tags: ["python", "decorators", "performance"],
    createdAt: "2026-08-28T12:00:00Z",
  },
  {
    id: "lib-2",
    title: "React Debounced Value Hook",
    type: "code",
    language: "typescript",
    content: `export function useDebouncedValue<T>(value: T, delay: number = 300): T {\n  const [debouncedValue, setDebouncedValue] = useState<T>(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debouncedValue;\n}`,
    tags: ["react", "hooks", "typescript"],
    createdAt: "2026-08-27T15:30:00Z",
  },
  {
    id: "lib-3",
    title: "Database Partitioning Technical Note",
    type: "note",
    content: `PostgreSQL declarative partitioning strategies: Range partitioning by created_at (monthly tables) improves vacuuming overhead and speeds up time-series analytics by an order of magnitude.`,
    tags: ["postgres", "architecture", "database"],
    createdAt: "2026-08-26T09:15:00Z",
  },
];

function LibraryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "documents";

  const [activeTab, setActiveTab] = useState<"documents" | "memories" | "snippets">(
    initialTab === "memories" ? "memories" : initialTab === "snippets" ? "snippets" : "documents"
  );

  const { documents, isLoading: isDocsLoading, deleteDocument, selectedDocIds, toggleDocSelection, clearSelectedDocs } = useDocuments();
  const { createConversation } = useConversations();
  const { success } = useToast();

  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Snippets local storage state
  const [snippets, setSnippets] = useState<LibrarySnippet[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nova_library_snippets");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return DEFAULT_SNIPPETS;
  });

  const [isAddSnippetOpen, setIsAddSnippetOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<"code" | "note" | "prompt">("code");
  const [newLanguage, setNewLanguage] = useState("typescript");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");

  const saveSnippets = (updated: LibrarySnippet[]) => {
    setSnippets(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("nova_library_snippets", JSON.stringify(updated));
    }
  };

  const handleAddSnippet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newItem: LibrarySnippet = {
      id: "snip-" + Date.now(),
      title: newTitle.trim(),
      type: newType,
      language: newType === "code" ? newLanguage : undefined,
      content: newContent.trim(),
      tags: newTags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    saveSnippets([newItem, ...snippets]);
    setIsAddSnippetOpen(false);
    setNewTitle("");
    setNewContent("");
    setNewTags("");
    success("Saved to library");
  };

  const handleDeleteSnippet = (id: string) => {
    const updated = snippets.filter((s) => s.id !== id);
    saveSnippets(updated);
    success("Snippet deleted");
  };

  const handleCopy = async (id: string, content: string) => {
    const ok = await copyToClipboard(content);
    if (ok) {
      setCopiedId(id);
      success("Copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };


  const handleResearchSelectedDocs = async () => {
    if (selectedDocIds.length === 0) return;
    const newId = await createConversation(`Compare & Research ${selectedDocIds.length} Documents`);
    if (newId) {
      router.push(`/chat/${newId}`);
    } else {
      router.push("/chat");
    }
  };

  const filteredDocs = documents.filter(
    (d) =>
      d.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSnippets = snippets.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardShell title="Private Knowledge Hub">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 max-w-6xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Private Knowledge Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Your centralized base of uploaded PDFs, images, personal memories, and saved technical assets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "documents" && (
              <Button
                variant="gradient"
                size="sm"
                onClick={() => setIsUploaderOpen(true)}
                leftIcon={<UploadCloud className="w-4 h-4" />}
              >
                Upload Document
              </Button>
            )}
            {activeTab === "snippets" && (
              <Button
                variant="gradient"
                size="sm"
                onClick={() => setIsAddSnippetOpen(true)}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Add Snippet
              </Button>
            )}
          </div>
        </div>

        {/* Tab Navigation & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto select-none">
            {[
              { id: "documents", label: `Documents (${documents.length})`, icon: FileText },
              { id: "memories", label: "Personal Memories", icon: Brain },
              { id: "snippets", label: `Saved Snippets (${snippets.length})`, icon: Code2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeTab !== "memories" && (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search private knowledge..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        {/* TAB 1: DOCUMENTS */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            {/* Multi-Select Action Bar */}
            {selectedDocIds.length > 0 && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-semibold text-indigo-900 dark:text-indigo-200">
                    {selectedDocIds.length} document(s) selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearSelectedDocs}
                    className="text-slate-500 dark:text-slate-400 hover:underline text-xs"
                  >
                    Deselect all
                  </button>
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={handleResearchSelectedDocs}
                  >
                    Research Selected
                  </Button>
                </div>
              </div>
            )}

            {/* Document Grid */}
            {filteredDocs.length === 0 ? (
              <div className="text-center py-16 p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-60" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  No private documents uploaded yet
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Upload research papers, lecture notes, or diagrams to enable grounded retrieval and comparison.
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsUploaderOpen(true)}
                  >
                    Upload your first document
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocs.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onDelete={deleteDocument}
                    isSelected={selectedDocIds.includes(doc.id)}
                    onToggleSelect={toggleDocSelection}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MEMORIES */}
        {activeTab === "memories" && <MemoryManager />}

        {/* TAB 3: SNIPPETS */}
        {activeTab === "snippets" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSnippets.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-500">
                        {item.type === "code" ? <Code2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(item.id, item.content)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        title="Copy content"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteSnippet(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete snippet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-700 dark:text-slate-300 overflow-x-auto max-h-36 border border-slate-200/60 dark:border-slate-850">
                    <pre className="whitespace-pre-wrap font-mono m-0">{item.content}</pre>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={async () => {
                      const newId = await createConversation("New conversation");
                      if (newId) router.push(`/chat/${newId}`);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>Use in Chat</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Document Uploader Modal */}
      <DocumentUploader
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
      />

      {/* Add Snippet Modal */}
      <Modal isOpen={isAddSnippetOpen} onClose={() => setIsAddSnippetOpen(false)} title="Add to Library">
        <form onSubmit={handleAddSnippet} className="space-y-4 pt-1">
          <Input
            label="Title"
            placeholder="e.g. Next.js App Router Helper"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs px-3"
              >
                <option value="code">Code Snippet</option>
                <option value="note">Note / Documentation</option>
                <option value="prompt">Prompt Template</option>
              </select>
            </div>
            {newType === "code" && (
              <div className="w-1/2">
                <Input
                  label="Language"
                  placeholder="typescript, python..."
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Content</label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={4}
              required
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono"
            />
          </div>

          <Input
            label="Tags (comma-separated)"
            placeholder="react, sql, architecture"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddSnippetOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Item
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardShell>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LibraryContent />
    </Suspense>
  );
}
