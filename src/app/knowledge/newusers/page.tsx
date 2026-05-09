"use client";

import { Sparkles, ChevronRight, ArrowLeft, Clock, BookOpen, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Tutorial {
  id: string;
  hour: number;
  title: string;
  description: string;
  icon: string;
  readTime: string;
}

const tutorials: Tutorial[] = [
  {
    id: "hour-1",
    hour: 1,
    title: "选择最适合自己的小龙虾智能体",
    description: "在这篇文章给用户列举头部6家（Qclaw、原生Openclaw、Workbuddy、QwenPaw、Copaw、Aekclaw）小龙虾的差异，让用户做出适合自己的选择",
    icon: "🎯",
    readTime: "10分钟",
  },
  {
    id: "hour-2",
    hour: 2,
    title: "安装与首次启动",
    description: "手把手教你完成选定的小龙虾智能体的安装过程，熟悉首次启动的界面和基础设置",
    icon: "📦",
    readTime: "15分钟",
  },
  {
    id: "hour-3",
    hour: 3,
    title: "绑定即时通讯工具",
    description: "将你的微信、企业微信、飞书、钉钉等 IM 工具与小龙虾连接，实现随时随地发指令",
    icon: "💬",
    readTime: "12分钟",
  },
  {
    id: "hour-4",
    hour: 4,
    title: "完成第一个任务",
    description: "通过实际案例教你如何给小龙虾下达第一个任务，体验 AI 帮你干活的魅力",
    icon: "🚀",
    readTime: "15分钟",
  },
  {
    id: "hour-5",
    hour: 5,
    title: "配置记忆与偏好",
    description: "让小龙虾学习你的工作习惯和偏好，建立个人知识库，越用越懂你",
    icon: "🧠",
    readTime: "12分钟",
  },
  {
    id: "hour-6",
    hour: 6,
    title: "安装第一个技能",
    description: "从 SkillHub 安装你的第一个技能，让小龙虾的能力得到扩展",
    icon: "⚡",
    readTime: "10分钟",
  },
  {
    id: "hour-7",
    hour: 7,
    title: "成为小龙虾玩家",
    description: "回顾六小时学习成果，开启你的 AI 智能体之旅，获得更多进阶技巧",
    icon: "🏆",
    readTime: "8分钟",
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

export default function NewUsersPage() {
  return (
    <div className="min-h-screen dark-gradient text-white font-outfit">
      <nav className="border-b border-white/10 sticky top-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/knowledge" className="text-gray-400 hover:text-white transition-colors mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-semibold tracking-tight">OpenClaw</h1>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/knowledge" className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center text-sm">
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
            <Sparkles className="w-4 h-4 mr-2" />
            新手入门
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 glow-text">
            新手入门
          </h1>
          <p className="text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            7小时成为小龙虾高手<br />
            从零开始掌握 OpenClaw
          </p>
        </section>

        <section className="mt-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {tutorials.map((tutorial, index) => (
                <div
                  key={tutorial.id}
                  className="dark-surface dark-surface-hover rounded-2xl p-6 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <span className="text-2xl">{tutorial.icon}</span>
                      </div>
                      <div className="text-violet-400 text-xs font-medium">
                        第{tutorial.hour}小时
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold group-hover:text-violet-300 transition-colors flex-1">
                          {tutorial.title}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all ml-4" />
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        {tutorial.description}
                      </p>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {tutorial.readTime}
                      </div>
                    </div>
                  </div>
                  {index < tutorials.length - 1 && (
                    <div className="mt-4 ml-7 w-0.5 h-8 bg-gradient-to-b from-violet-600/50 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ScrollToTopButton />
    </div>
  );
}
