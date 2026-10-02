"use client";

import React, { useState } from "react";
import { useMemory } from "@/hooks/useMemory";
import { MemoryCard } from "./MemoryCard";
import { MemoryCategory } from "@/types/memory";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Brain, Plus, Sparkles, Filter, Sliders } from "lucide-react";

export function MemoryManager() {
  const { memories, isLoading, settings, updateSettings, createMemory, updateMemory, deleteMemory } = useMemory();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<MemoryCategory>("preference");
  const [newImportance, setNewImportance] = useState(3);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    await createMemory(newContent, newCategory, newImportance);
    setIsAddModalOpen(false);
    setNewContent("");
  };

  const filtered = memories.filter((m) => selectedCategory === "all" || m.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header & Memory Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" /> Long-Term Personal Memory
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            OmniCraft AI references your saved preferences and project facts during relevant conversations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Memory Active
            </label>
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => updateSettings({ enabled: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
          </div>

          <Button
            variant="gradient"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Memory
          </Button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {[
          { id: "all", label: "All Memories" },
          { id: "preference", label: "Preferences" },
          { id: "project", label: "Projects" },
          { id: "education", label: "Education" },
          { id: "work", label: "Work" },
          { id: "instruction", label: "Instructions" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              selectedCategory === cat.id
                ? "bg-indigo-600 border-indigo-600 text-white"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Memories */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          <Brain className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            No memories saved in this category
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Add key preferences (e.g. "I prefer Python for data science") for personalized grounding.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filtered.map((mem) => (
            <MemoryCard
              key={mem.id}
              memory={mem}
              onUpdate={updateMemory}
              onDelete={deleteMemory}
            />
          ))}
        </div>
      )}

      {/* Add Memory Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Remember New Fact">
        <form onSubmit={handleAddSubmit} className="space-y-4 pt-1">
          <div>
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 block">
              What should OmniCraft AI remember?
            </label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="e.g. My primary project is OmniCraft AI and I prefer TypeScript with Next.js App Router."
              rows={3}
              required
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 block">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as MemoryCategory)}
                className="w-full h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs px-2"
              >
                <option value="preference">Preference</option>
                <option value="project">Project</option>
                <option value="education">Education</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="instruction">Instruction</option>
                <option value="fact">Fact</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 block">
                Importance (1–5)
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={newImportance}
                onChange={(e) => setNewImportance(parseInt(e.target.value, 10))}
                className="w-full h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs px-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Memory
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
