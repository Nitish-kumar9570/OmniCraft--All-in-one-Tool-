"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TOOLS_REGISTRY } from "@/tools/registry";
import { CATEGORY_LIST } from "@/tools/categories";
import { ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export function AdminPage() {
  const [tools, setTools] = useState(TOOLS_REGISTRY);
  const [searchFilter, setSearchFilter] = useState("");
  const { success } = useToast();

  const togglePopular = (id: string) => {
    setTools((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isPopular: !t.isPopular } : t))
    );
    success("Tool status updated");
  };

  const toggleNew = (id: string) => {
    setTools((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isNew: !t.isNew } : t))
    );
    success("Tool status updated");
  };

  const filtered = tools.filter((t) =>
    t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" /> Administration
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              OmniCraft Control Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              System analytics, active tool manager, and catalog controls.
            </p>
          </div>
        </div>

        {/* Analytics Statistics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-1 shadow-xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Registered Tools</span>
            <p className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">{tools.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-1 shadow-xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Categories</span>
            <p className="text-3xl font-extrabold font-mono text-purple-600 dark:text-purple-400">{CATEGORY_LIST.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-1 shadow-xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">System Uptime</span>
            <p className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-500">99.98%</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-1 shadow-xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Daily Operations</span>
            <p className="text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-500">248,320</p>
          </div>
        </div>

        {/* Tools Management Table */}
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tool Registry Management ({filtered.length})
            </h3>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by tool or category..."
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs w-full sm:w-64 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                  <th className="pb-3">Tool Name</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Processing Type</th>
                  <th className="pb-3">Popular Badge</th>
                  <th className="pb-3">New Badge</th>
                  <th className="pb-3">Estimated Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((tool) => (
                  <tr key={tool.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                    <td className="py-3 font-semibold text-slate-900 dark:text-white">{tool.name}</td>
                    <td className="py-3 capitalize text-slate-500 dark:text-slate-400">{tool.category}</td>
                    <td className="py-3 font-mono text-slate-500 dark:text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">
                        {tool.processingType}
                      </span>
                    </td>
                    <td className="py-3">
                      <button onClick={() => togglePopular(tool.id)} className="cursor-pointer">
                        {tool.isPopular ? (
                          <span className="text-amber-600 dark:text-amber-400 font-semibold">Yes</span>
                        ) : (
                          <span className="text-slate-400">No</span>
                        )}
                      </button>
                    </td>
                    <td className="py-3">
                      <button onClick={() => toggleNew(tool.id)} className="cursor-pointer">
                        {tool.isNew ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Yes</span>
                        ) : (
                          <span className="text-slate-400">No</span>
                        )}
                      </button>
                    </td>
                    <td className="py-3 font-mono text-slate-600 dark:text-slate-400">
                      {tool.usageCount?.toLocaleString() || "1,000+"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminPage;
