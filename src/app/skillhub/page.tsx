"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Sparkles, Search, ChevronDown, ArrowLeft, Layers, ChevronRight } from "lucide-react";

interface Skill {
  slug: string;
  name: string;
  description: string;
  source: string;
  version?: string;
  downloads: number;
  favorites: number;
  score?: number;
  author?: string;
  apiKeyRequired: boolean;
  categories: string[];
  installCmd?: string;
  originUrl: string;
}

interface SkillListResponse {
  items: Skill[];
  total: number;
  totalPages: number;
  page: number;
  categories: string[];
}

function formatCount(n: number): string {
  if (n >= 10000) {
    return (n / 10000).toFixed(1) + " 万";
  }
  if (n >= 1000) {
    return (n / 1000).toFixed(1) + " 千";
  }
  return String(n);
}

export default function SkillHubPage() {
  const [data, setData] = useState<SkillListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (query) params.set("q", query);
    params.set("page", String(page));
    params.set("pageSize", "50");

    const res = await fetch(`/api/skills?${params}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, [category, query, page]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return (
    <div className="min-h-screen dark-gradient text-white font-outfit">
      <nav className="border-b border-white/10 sticky top-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-semibold tracking-tight">OpenClaw</h1>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/skillhub" className="px-4 py-2 text-white bg-white/10 rounded-lg transition-colors flex items-center text-sm">
                <Layers className="w-4 h-4 mr-2" />
                SkillHub
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4">
        <section className="py-16 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-violet-600/20 border border-violet-500/30 rounded-full text-sm text-violet-300 mb-6 font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            安装技能，扩展 AI 能力
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 glow-text">
            SkillHub
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed mb-6">
            发现高质量 AI 技能，让你的小龙虾能做更多事
          </p>
          {data && (
            <p className="text-sm text-gray-500">
              收录 {data.categories.length} 个分类 · {data.total} 个技能
            </p>
          )}
        </section>

        <section className="pb-16">
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="搜索技能名称或描述..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
          </div>

          {data && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => { setCategory("all"); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${category === "all" ? "bg-violet-600 text-white" : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"}`}
              >
                全部
              </button>
              {data.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${category === cat ? "bg-violet-600 text-white" : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="dark-surface rounded-xl p-5 h-44 animate-pulse">
                  <div className="w-2/3 h-4 bg-white/5 rounded mb-3" />
                  <div className="w-full h-3 bg-white/5 rounded mb-2" />
                  <div className="w-5/6 h-3 bg-white/5 rounded mb-2" />
                  <div className="w-1/3 h-3 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          ) : data && data.items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.items.map((skill) => (
                  <Link
                    key={skill.slug}
                    href={`/skillhub/${skill.slug}`}
                    className="dark-surface dark-surface-hover rounded-xl p-5 transition-all duration-300 group cursor-pointer block"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-wrap gap-2 items-center">
                        <h3 className="text-base font-semibold group-hover:text-violet-300 transition-colors">
                          {skill.name}
                        </h3>
                        {skill.apiKeyRequired && (
                          <span className="text-xs px-1.5 py-0.5 bg-amber-600/15 text-amber-300 rounded-full">需 API Key</span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-violet-400 flex-shrink-0 group-hover:text-violet-300 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {skill.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {skill.categories.slice(0, 2).map((cat) => (
                          <span key={cat} className="text-xs px-2 py-0.5 bg-violet-600/15 text-violet-300 rounded-full">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{formatCount(skill.downloads)} 下载</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {data.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    上一页
                  </button>
                  <span className="text-sm text-gray-500">
                    {page} / {data.totalPages}
                  </span>
                  <button
                    onClick={() => setPage(Math.min(data.totalPages, page + 1))}
                    disabled={page === data.totalPages}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    下一页
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">没有找到匹配的技能</p>
              <button
                onClick={() => { setCategory("all"); setQuery(""); setPage(1); }}
                className="mt-4 text-violet-400 hover:text-violet-300 text-sm transition-colors"
              >
                重置筛选
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
