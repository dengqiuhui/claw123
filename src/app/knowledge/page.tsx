"use client";

import { Sparkles, ChevronRight, BookOpen, Clock, ArrowLeft, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface Article {
  id: string;
  title: string;
  description: string;
  icon: string;
  readTime: string;
  hour?: number;
}

interface Category {
  id: string;
  name: string;
  articles: Article[];
}

const categories: Category[] = [
  {
    id: "newusers",
    name: "新手入门",
    articles: [
      {
        id: "hour-1",
        title: "选择最适合自己的小龙虾智能体",
        description: "在这篇文章给用户列举头部6家（Qclaw、原生Openclaw、Workbuddy、QwenPaw、Copaw、Aekclaw）小龙虾的差异，让用户做出适合自己的选择",
        icon: "🎯",
        readTime: "10分钟",
        hour: 1,
      },
      {
        id: "hour-2",
        title: "安装与首次启动",
        description: "手把手教你完成选定的小龙虾智能体的安装过程，熟悉首次启动的界面和基础设置",
        icon: "📦",
        readTime: "15分钟",
        hour: 2,
      },
      {
        id: "hour-3",
        title: "绑定即时通讯工具",
        description: "将你的微信、企业微信、飞书、钉钉等 IM 工具与小龙虾连接，实现随时随地发指令",
        icon: "💬",
        readTime: "12分钟",
        hour: 3,
      },
      {
        id: "hour-4",
        title: "完成第一个任务",
        description: "通过实际案例教你如何给小龙虾下达第一个任务，体验 AI 帮你干活的魅力",
        icon: "🚀",
        readTime: "15分钟",
        hour: 4,
      },
      {
        id: "hour-5",
        title: "配置记忆与偏好",
        description: "让小龙虾学习你的工作习惯和偏好，建立个人知识库，越用越懂你",
        icon: "🧠",
        readTime: "12分钟",
        hour: 5,
      },
      {
        id: "hour-6",
        title: "安装第一个技能",
        description: "从 SkillHub 安装你的第一个技能，让小龙虾的能力得到扩展",
        icon: "⚡",
        readTime: "10分钟",
        hour: 6,
      },
      {
        id: "hour-7",
        title: "成为小龙虾玩家",
        description: "回顾六小时学习成果，开启你的 AI 智能体之旅，获得更多进阶技巧",
        icon: "🏆",
        readTime: "8分钟",
        hour: 7,
      },
    ],
  },
  {
    id: "skills",
    name: "技能教程",
    articles: [
      {
        id: "skill-1",
        title: "代码助手技能详解",
        description: "深入了解代码助手的各项功能，包括智能补全、代码审查、批量重命名等高级用法",
        icon: "⌨️",
        readTime: "20分钟",
      },
      {
        id: "skill-2",
        title: "文档生成技能进阶",
        description: "掌握文档生成技能的自定义模板和批量生成功能，提高工作效率",
        icon: "📝",
        readTime: "18分钟",
      },
      {
        id: "skill-3",
        title: "数据分析技能实战",
        description: "通过实际案例学习如何利用数据分析技能处理日常工作中的数据",
        icon: "📊",
        readTime: "25分钟",
      },
      {
        id: "skill-4",
        title: "会议纪要技能使用指南",
        description: "从基础录音到智能整理，一文掌握会议纪要技能的全部功能",
        icon: "📋",
        readTime: "15分钟",
      },
      {
        id: "skill-5",
        title: "网页搜索技能技巧",
        description: "学习如何高效使用网页搜索技能，快速获取精准信息",
        icon: "🔍",
        readTime: "12分钟",
      },
    ],
  },
  {
    id: "advanced",
    name: "高级技巧",
    articles: [
      {
        id: "adv-1",
        title: "自定义工作流配置",
        description: "学习如何创建和管理复杂的自动化工作流，实现一键完成多项任务",
        icon: "⚙️",
        readTime: "30分钟",
      },
      {
        id: "adv-2",
        title: "API集成与扩展开发",
        description: "掌握 OpenClaw 的 API 接口和扩展开发方法，打造专属功能",
        icon: "🔌",
        readTime: "35分钟",
      },
      {
        id: "adv-3",
        title: "企业级部署方案",
        description: "了解企业环境下的大规模部署、权限管理和安全策略配置",
        icon: "🏢",
        readTime: "40分钟",
      },
      {
        id: "adv-4",
        title: "性能优化与资源管理",
        description: "优化 OpenClaw 的运行性能，合理管理系统资源",
        icon: "⚡",
        readTime: "25分钟",
      },
    ],
  },
  {
    id: "faq",
    name: "常见问题",
    articles: [
      {
        id: "faq-1",
        title: "安装失败怎么解决？",
        description: "汇总常见的安装问题及解决方案，包括权限、网络、环境配置等",
        icon: "❓",
        readTime: "5分钟",
      },
      {
        id: "faq-2",
        title: "无法连接即时通讯工具",
        description: "微信、企业微信、飞书等工具连接失败的原因及排查方法",
        icon: "💬",
        readTime: "8分钟",
      },
      {
        id: "faq-3",
        title: "技能安装失败怎么办？",
        description: "SkillHub 技能安装过程中的常见问题及解决步骤",
        icon: "📦",
        readTime: "6分钟",
      },
      {
        id: "faq-4",
        title: "如何备份和恢复数据？",
        description: "保护重要数据的备份方法以及如何在新设备上恢复",
        icon: "💾",
        readTime: "10分钟",
      },
      {
        id: "faq-5",
        title: "运行缓慢怎么优化？",
        description: "解决 OpenClaw 运行卡顿、响应慢等性能问题",
        icon: "🐢",
        readTime: "7分钟",
      },
    ],
  },
];

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

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState("newusers");
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];
  const articlesPerPage = 3;
  const isNewUsersTab = activeTab === "newusers";

  const totalPages = Math.ceil(currentCategory.articles.length / articlesPerPage);
  const hasMore = pageIndex < totalPages - 1;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setPageIndex(0);
  };

  const loadMore = () => {
    if (pageIndex < totalPages - 1 && !loading) {
      setLoading(true);
      setTimeout(() => {
        setPageIndex(pageIndex + 1);
        setLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isNewUsersTab || loading || !hasMore) return;
      
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageIndex, loading, hasMore, isNewUsersTab]);

  const displayedArticles = isNewUsersTab 
    ? currentCategory.articles 
    : currentCategory.articles.slice(0, (pageIndex + 1) * articlesPerPage);

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

      <main ref={containerRef} className="max-w-6xl mx-auto px-4">
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
        </section>

        <section className="mt-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/5 rounded-xl p-1.5 border border-white/10">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleTabChange(category.id)}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === category.id
                        ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 flex flex-col items-center">
              {displayedArticles.map((article, index) => {
                const isLastArticle = index === displayedArticles.length - 1;
                const isNewUsersLast = isNewUsersTab && isLastArticle;
                
                if (isNewUsersLast) {
                  return (
                    <div key={article.id} className="w-full max-w-[1200px]">
                      <div className="w-full mx-auto h-8 flex justify-center">
                        <div className="w-0.5 h-full bg-gradient-to-b from-violet-600/50 to-amber-500/50"></div>
                      </div>
                      <div className="w-full max-w-[1200px] mx-auto mt-4 text-center">
                        <h3 className="text-2xl font-semibold text-white mb-4 leading-relaxed">
                          恭喜获得7×24小时智能助手，让它彻底帮你做事<br />快来学习更多技能
                        </h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                          让它给你写PPT、分析股票、写年终总结、情感陪伴、像一个数字生命一样陪你做任何事情
                        </p>
                        <Link
                          href="/knowledge/skills"
                          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-500 hover:to-emerald-500 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          探索技能教程
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Link>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <div key={article.id}>
                    <div
                      className="article-card dark-surface dark-surface-hover rounded-2xl p-6 transition-all duration-300 cursor-pointer group flex items-start"
                    >
                      <div className="flex flex-col items-center mr-6 flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <span className="text-2xl">{article.icon}</span>
                        </div>
                        {article.hour && (
                          <div className="text-violet-400 text-xs font-medium">
                            第{article.hour}小时
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between h-full">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="group-hover:text-violet-300 transition-colors flex-1">
                            {article.title}
                          </h3>
                          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all ml-4 flex-shrink-0" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-2">
                          {article.description}
                        </p>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                    {(!isLastArticle || (isNewUsersTab && !isLastArticle)) && (
                      <div className="w-[1200px] mx-auto h-8 flex justify-center">
                        <div className="w-0.5 h-full bg-gradient-to-b from-violet-600/50 to-transparent"></div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {!isNewUsersTab && hasMore && (
                <div className="w-full max-w-[1200px] text-center py-8">
                  {loading ? (
                    <div className="inline-flex items-center px-6 py-3 bg-violet-600/20 text-violet-400 rounded-xl">
                      <div className="animate-spin mr-2">
                        <Clock className="w-5 h-5" />
                      </div>
                      加载中...
                    </div>
                  ) : (
                    <button
                      onClick={loadMore}
                      className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-violet-500/25"
                    >
                      加载更多
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  )}
                </div>
              )}
              
              {!isNewUsersTab && !hasMore && displayedArticles.length > 0 && (
                <div className="w-full max-w-[1200px] text-center py-8">
                  <p className="text-gray-500 text-sm">— 已加载全部内容 —</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <ScrollToTopButton />
    </div>
  );
}
