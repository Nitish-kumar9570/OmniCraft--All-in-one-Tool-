"use client";

import React, { useState } from "react";
import { MemoryItem, MemoryCategory } from "@/types/memory";
import { Brain, Star, Trash2, Edit2, Check, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface MemoryCardProps {
  memory: MemoryItem;
  onUpdate: (id: string, updates: { content?: string; category?: MemoryCategory; importance?: number }) => void;
  onDelete: (id: string) => void;
}

export function MemoryCard({ memory, onUpdate, onDelete }: MemoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(memory.content);
  const [editedCategory, setEditedCategory] = useState<MemoryCategory>(memory.category);
  const [editedImportance, setEditedImportance] = useState(memory.importance);

  const handleSave = () => {
    if (editedContent.trim()) {
      onUpdate(memory.id, {
        content: editedContent.trim(),
        category: editedCategory,
        importance: editedImportance,
      });
      setIsEditing(false);
    }
  };

  const getCategoryColor = (cat: MemoryCategory) => {
    switch (cat) {
      case "preference":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300";
      case "project":
        return "bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300";
      case "education":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-300";
      case "work":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <div className="p-4.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${getCategoryColor(memory.category)}`}>
            {memory.category}
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < memory.importance ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Edit memory"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(memory.id)}
            className="p-1 rounded-md text-slate-400 hover:text-rose-600 transition-colors"
            title="Delete memory"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <div className="space-y-2 pt-1">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={2}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <div className="flex items-center justify-between pt-1">
            <select
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value as MemoryCategory)}
              className="text-xs p-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            >
              <option value="preference">Preference</option>
              <option value="project">Project</option>
              <option value="education">Education</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="instruction">Instruction</option>
              <option value="fact">Fact</option>
            </select>

            <div className="flex gap-1.5">
              <button
                onClick={() => setIsEditing(false)}
                className="px-2.5 py-1 rounded-lg text-xs border border-slate-200 dark:border-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-2.5 py-1 rounded-lg text-xs bg-indigo-600 text-white font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
          "{memory.content}"
        </p>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px] text-slate-400">
        Saved {formatDate(memory.createdAt)}
      </div>
    </div>
  );
}
