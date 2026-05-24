"use client";

import { useMemo, useState } from "react";
import { Search, Star, Clock, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { DRUGS, DRUG_CATEGORIES, searchDrugs } from "@/lib/data/drugs";
import type { Drug } from "@/lib/types/drug-types";
import { cn } from "@/lib/utils";

interface Props {
  selectedId: string | null;
  onSelect: (drug: Drug) => void;
  recents: string[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export function DrugSearch({
  selectedId,
  onSelect,
  recents,
  favorites,
  onToggleFavorite,
}: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");

  const results = useMemo(
    () => searchDrugs(query, category || undefined).slice(0, 8),
    [query, category],
  );

  const favDrugs = DRUGS.filter((d) => favorites.includes(d.id));
  const recentDrugs = recents
    .map((id) => DRUGS.find((d) => d.id === id))
    .filter((d): d is Drug => Boolean(d));

  return (
    <Card title="Drug Search" subtitle="Real-time, by generic / brand / class">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-white/40"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search propofol, fentanyl, vancomycin…"
              className="w-full pl-10 pr-9 py-2.5 text-sm text-body dark:text-white/80 bg-white dark:bg-dark-card border border-input dark:border-white/20 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:text-gray-400 dark:placeholder:text-white/40"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted dark:text-white/40"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: "", label: "All categories" },
            ...DRUG_CATEGORIES.map((c) => ({ value: c, label: c })),
          ]}
        />
      </div>

      {(favDrugs.length > 0 || recentDrugs.length > 0) && !query && (
        <div className="mt-5 space-y-4">
          {favDrugs.length > 0 && (
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted dark:text-white/40 mb-2 flex items-center gap-1.5">
                <Star size={11} /> Favorites
              </p>
              <div className="flex flex-wrap gap-2">
                {favDrugs.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => onSelect(d)}
                    className="px-3 py-1.5 rounded-lg bg-gradient-primary shadow-primary text-white text-xs font-bold uppercase tracking-wide hover:-translate-y-px transition-all"
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          {recentDrugs.length > 0 && (
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted dark:text-white/40 mb-2 flex items-center gap-1.5">
                <Clock size={11} /> Recently used
              </p>
              <div className="flex flex-wrap gap-2">
                {recentDrugs.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => onSelect(d)}
                    className="px-3 py-1.5 rounded-lg bg-page dark:bg-white/10 text-body dark:text-white/80 text-xs font-bold hover:bg-gray-100 dark:hover:bg-white/15 transition-all"
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-5 space-y-2">
        {results.length === 0 && (
          <div className="text-sm text-muted dark:text-white/40 text-center py-6">
            No drugs match your filter.
          </div>
        )}
        {results.map((d) => {
          const active = d.id === selectedId;
          const isFav = favorites.includes(d.id);
          return (
            <div
              key={d.id}
              className={cn(
                "flex items-center justify-between gap-3 p-3 rounded-xl border transition-all",
                active
                  ? "border-primary bg-primary/5"
                  : "border-light dark:border-white/10 hover:border-primary/40",
              )}
            >
              <button
                onClick={() => onSelect(d)}
                className="flex-1 min-w-0 text-left"
              >
                <p className="text-sm font-bold text-dark dark:text-white truncate">
                  {d.name}
                </p>
                <p className="text-xs text-muted dark:text-white/40 truncate">
                  {d.genericName} · {d.concentration}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <Badge tone="info">{d.category}</Badge>
                  <Badge tone="dark">{d.defaultRoute}</Badge>
                </div>
              </button>
              <button
                onClick={() => onToggleFavorite(d.id)}
                aria-label="Toggle favorite"
                className={cn(
                  "p-2 rounded-lg transition-colors shrink-0",
                  isFav
                    ? "text-warning"
                    : "text-muted dark:text-white/40 hover:text-warning",
                )}
              >
                <Star
                  size={16}
                  fill={isFav ? "currentColor" : "none"}
                />
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
