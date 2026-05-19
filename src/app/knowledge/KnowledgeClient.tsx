"use client";

import { useState, useEffect } from "react";
import { BookOpen, Calendar, ChevronRight, ArrowLeft, Tag, ArrowUp } from "lucide-react";
import Link from "next/link";
import { ArticleMeta } from "@/lib/articles";

const categoryIcons: Record<string, string> = {
  newusers: "🎯",
  "ai-basics": "🤖",
  skills: "⚡",
  advanced: "🚀",
  faq: "💡",
};

interface CategoryGroup {
  id: string;
  name: string;
  articles: ArticleMeta[];
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-violet-500/30 transition-all duration-300 hover:scale-110"
    >
      <ArrowUp className="w-5 h-5 text-white" />
    </button>
  );
}

export default function KnowledgeClient({
  categories,
  mdSlugs,
}: {
  categories: CategoryGroup[];
  mdSlugs: string[];
}) {
  const [activeTab, setActiveTab] = useState("newusers");
  const slugSet = new Set(mdSlugs);

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
              <Link href="/knowledge" className="px-4 py-2 text-white bg-white/10 rounded-lg transition-colors flex items-center text-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                知识中心
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4">
        <section className="py-16 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-violet-600/20 border border-violet-500/30 rounded-full text-sm text-violet-300 mb-6 font-medium">
            <BookOpen className="w-4 h-4 mr-2" />
            知识中心
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 glow-text">
            知识中心
          </h1>
          <p className="text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            从入门到精通<br />
            全面掌握 OpenClaw 的使用技巧
          </p>
          <p className="mt-4 text-sm text-violet-400">
            💡 在 <code className="bg-white/10 px-2 py-0.5 rounded text-xs">content/articles/</code> 目录下添加 .md 文件即可自动生成文章页面
          </p>
        </section>

        <section className="mt-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/5 rounded-xl p-1.5 border border-white/10">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === category.id
                        ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {categories.filter((c) => c.id === activeTab).map((category) => (
              <div key={category.id}>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-violet-600/20 rounded-lg flex items-center justify-center mr-3 text-sm">
                    {categoryIcons[category.id] || "💡"}
                  </span>
                  {category.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.articles.map((article) => {
                    const hasMd = slugSet.has(article.slug);
                    return (
                      <Link
                        key={article.slug}
                        href={hasMd ? `/knowledge/article/${article.slug}` : "#"}
                        className={`block dark-surface dark-surface-hover rounded-xl p-5 transition-all duration-300 group ${!hasMd ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <div className="flex items-center mb-3">
                          <div className={`w-10 h-10 ${hasMd ? "bg-violet-600/20" : "bg-white/5"} rounded-lg flex items-center justify-center mr-3`}>
                            <span className="text-xl">{article.icon}</span>
                          </div>
                          <div className="flex items-center text-xs gap-2">
                            {article.date && (
                              <span className="flex items-center text-violet-400">
                                <Calendar className="w-3 h-3 mr-1" />
                                {article.date}
                              </span>
                            )}
                            {!hasMd && (
                              <span className="text-xs px-1.5 py-0.5 bg-violet-600/15 text-violet-300 rounded-full">待创建</span>
                            )}
                          </div>
                        </div>
                        <h3 className="text-base font-medium mb-2 group-hover:text-violet-300 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{article.description}</p>
                        {article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            <Tag className="w-3 h-3 text-gray-500 mt-0.5" />
                            {article.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs px-1.5 py-0.5 bg-white/5 rounded text-gray-400">{tag}</span>
                            ))}
                          </div>
                        )}
                        {hasMd && (
                          <div className="mt-3 flex items-center text-violet-400 text-xs font-medium">
                            <span>阅读文章</span>
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <ScrollToTopButton />
    </div>
  );
}
