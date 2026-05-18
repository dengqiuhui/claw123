"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ChevronRight, LayoutDashboard, BookOpen, Layers, ExternalLink, Users, Clock, User } from "lucide-react";

interface DeploymentProduct {
  id: string;
  vendor: string;
  vendorLogo: string;
  name: string;
  description: string;
  url?: string;
  downloads: number;
}

const deploymentProducts: DeploymentProduct[] = [
  {
    id: "qclaw",
    vendor: "腾讯",
    vendorLogo: "🐧",
    name: "QClaw（微信直连版）",
    description: "微信扫码直接启用，无需复杂安装，适合普通用户快速体验",
    url: "https://qclaw.qq.com",
    downloads: 52,
  },
  {
    id: "workbuddy",
    vendor: "腾讯",
    vendorLogo: "🐧",
    name: "WorkBuddy（腾讯龙虾）",
    description: "更偏向办公场景，支持接入企业微信、QQ、飞书",
    url: "https://www.codebuddy.cn/work/?from=claw123",
    downloads: 67,
  },
  {
    id: "autoclaw",
    vendor: "智谱（Zhipu AI）",
    vendorLogo: "🔮",
    name: "AutoClaw（澳龙）",
    description: "原生OpenClaw内核，主打飞书集成与浏览器自动化，支持Windows/macOS一键安装",
    url: "https://autoglm.zhipuai.cn/autoclaw/?from=claw123",
    downloads: 34,
  },
  {
    id: "qwenpaw",
    vendor: "阿里",
    vendorLogo: "🐱",
    name: "QwenPaw",
    description: "阿里通义出品，开源 AI Agent 框架，支持本地/云端双模部署",
    url: "https://qwenpaw.agentscope.io/?from=claw123",
    downloads: 89,
  },
  {
    id: "copaw",
    vendor: "阿里",
    vendorLogo: "🐱",
    name: "CoPaw",
    description: "协作个人智能体工作站，基于 AgentScope 框架构建，支持钉钉/飞书/QQ 多渠道",
    url: "https://copaw.bot/zh/",
    downloads: 45,
  },
  {
    id: "lobster",
    vendor: "网易有道",
    vendorLogo: "🦞",
    name: "Lobster",
    description: "国内首个开源的桌面级AI智能体，支持手机、电脑双端互联",
    url: "https://lobsterai.youdao.com",
    downloads: 71,
  },
  {
    id: "lobster-github",
    vendor: "网易有道",
    vendorLogo: "🦞",
    name: "Lobster GitHub",
    description: "开源项目地址",
    url: "https://github.com/netease-youdao/LobsterAI",
    downloads: 23,
  },
  {
    id: "duclaw",
    vendor: "百度",
    vendorLogo: "🔍",
    name: "DuClaw（百度智能云）",
    description: "OpenClaw零部署服务，无需选择镜像或部署云服务器",
    url: "https://cloud.baidu.com/product/duclaw.html",
    downloads: 58,
  },
  {
    id: "arkclaw",
    vendor: "字节跳动",
    vendorLogo: "🎵",
    name: "ArkClaw（火山引擎）",
    description: "基于OpenClaw架构的AI Agent工具，支持企业级部署。邀请码：WNL4CMPX",
    url: "https://volcengine.com/L/a_eJAIm4x74/",
    downloads: 41,
  },
  {
    id: "maxclaw",
    vendor: "稀宇科技（MiniMax）",
    vendorLogo: "🤖",
    name: "MaxClaw",
    description: "基于MiniMax大模型的OpenClaw实现，国产化 AI Agent 助手",
    url: "https://agent.minimax.io/max-claw/?from=claw123",
    downloads: 76,
  },
  {
    id: "openclaw-official",
    vendor: "OpenClaw（开源社区）",
    vendorLogo: "🦞",
    name: "OpenClaw",
    description: "开源社区版，个人AI智能体，支持本地运行与 Skills 扩展",
    url: "https://openclaw.ai/",
    downloads: 95,
  },
  {
    id: "molili",
    vendor: "Molili",
    vendorLogo: "🦞",
    name: "Molili Claw",
    description: "原生适配飞书/微信/钉钉国内办公生态",
    url: "https://molili.dangbei.com",
    downloads: 62,
  },
];

interface TutorialArticle {
  id: string;
  hour: number;
  title: string;
  description: string;
  icon: string;
}

const tutorialArticles: TutorialArticle[] = [
  {
    id: "hour-1",
    hour: 1,
    title: "第一个小时「选择最适合自己的小龙虾智能体」",
    description: "在这篇文章给用户列举头部6家（Qclaw、原生Openclaw、Workbuddy、QwenPaw、Copaw、Aekclaw）小龙虾的差异，让用户做出适合自己的选择",
    icon: "🎯",
  },
  {
    id: "hour-2",
    hour: 2,
    title: "第二个小时「安装与首次启动」",
    description: "手把手教你完成选定的小龙虾智能体的安装过程，熟悉首次启动的界面和基础设置",
    icon: "📦",
  },
  {
    id: "hour-3",
    hour: 3,
    title: "第三个小时「绑定即时通讯工具」",
    description: "将你的微信、企业微信、飞书、钉钉等 IM 工具与小龙虾连接，实现随时随地发指令",
    icon: "💬",
  },
  {
    id: "hour-4",
    hour: 4,
    title: "第四个小时「完成第一个任务」",
    description: "通过实际案例教你如何给小龙虾下达第一个任务，体验 AI 帮你干活的魅力",
    icon: "🚀",
  },
  {
    id: "hour-5",
    hour: 5,
    title: "第五个小时「配置记忆与偏好」",
    description: "让小龙虾学习你的工作习惯和偏好，建立个人知识库，越用越懂你",
    icon: "🧠",
  },
  {
    id: "hour-6",
    hour: 6,
    title: "第六个小时「安装第一个技能」",
    description: "从 SkillHub 安装你的第一个技能，让小龙虾的能力得到扩展",
    icon: "⚡",
  },
  {
    id: "hour-7",
    hour: 7,
    title: "恭喜毕业「成为小龙虾玩家」",
    description: "回顾六小时学习成果，开启你的 AI 智能体之旅，获得更多进阶技巧",
    icon: "🏆",
  },
];

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  downloads: number;
}

const skills: Skill[] = [
  { id: "skill-1", name: "代码助手", description: "智能代码补全、审查与优化建议", category: "开发", icon: "⌨️", downloads: 856 },
  { id: "skill-2", name: "文档生成", description: "自动生成 API 文档、技术文档与报告", category: "工具", icon: "📝", downloads: 723 },
  { id: "skill-3", name: "数据分析", description: "快速分析数据趋势，生成可视化图表", category: "数据", icon: "📊", downloads: 634 },
  { id: "skill-4", name: "翻译助手", description: "多语言翻译，支持中英日韩等20+语言", category: "语言", icon: "🌍", downloads: 589 },
  { id: "skill-5", name: "会议纪要", description: "自动整理会议内容，提炼关键决策与待办", category: "办公", icon: "📋", downloads: 478 },
  { id: "skill-6", name: "周报生成", description: "根据工作内容自动生成周报总结", category: "办公", icon: "📅", downloads: 412 },
  { id: "skill-7", name: "邮件助手", description: "智能撰写、回复和整理邮件", category: "办公", icon: "📧", downloads: 367 },
  { id: "skill-8", name: "网页搜索", description: "实时搜索网络信息，整理摘要答案", category: "工具", icon: "🔍", downloads: 534 },
  { id: "skill-9", name: "文件整理", description: "自动分类整理文件夹，清理冗余文件", category: "工具", icon: "📁", downloads: 298 },
  { id: "skill-10", name: "PPT 制作", description: "根据内容自动生成精美 PPT 演示文稿", category: "创作", icon: "🎨", downloads: 445 },
  { id: "skill-11", name: "视频剪辑", description: "智能剪辑视频，自动生成字幕", category: "创作", icon: "🎬", downloads: 312 },
  { id: "skill-12", name: "知识问答", description: "基于知识库回答专业领域问题", category: "工具", icon: "💡", downloads: 423 },
];

const testimonials = [
  { name: "码农小张", icon: "👨‍💻", content: "自动整理代码文档、查开发资料，拓展性超强还能自定义技能，本地运行不占云端内存，太合心意了。", color: "bg-violet-600/20" },
  { name: "行政小李", icon: "👩‍💼", content: "填表单、整理会议纪要、归档文件一键搞定，零门槛上手，再也不用对着电脑做重复操作了。", color: "bg-green-600/20" },
  { name: "运营阿明", icon: "👨‍🎨", content: "公司用飞书、私下用微信，两边都能发指令控电脑，远程搜运营素材超省心，终于不用天天加班了。", color: "bg-blue-600/20" },
  { name: "人事小王", icon: "👩‍💻", content: "做员工档案、整理考勤表比人工还细心，能直接操作电脑里的表格，不用反复导出导入。", color: "bg-pink-600/20" },
  { name: "开发阿杰", icon: "👨‍💻", content: "试过多款 AI 工具，Molili 是最适配国内开发者的，中文界面超友好，写脚本、整理日志超顺手。", color: "bg-amber-600/20" },
  { name: "财务小陈", icon: "👩‍💼", content: "整理报销单、统计消费明细全交给 Molili，本地读写文件不用传云端，安全又高效。", color: "bg-cyan-600/20" },
  { name: "运维老周", icon: "👨‍💻", content: "远程监控电脑、整理运维日志，手机钉钉发指令就能操作，不用随时守在电脑前。", color: "bg-emerald-600/20" },
  { name: "学生小美", icon: "👩‍💻", content: "上手毫无压力，微信发指令就能搜学习资料、整理笔记，备考党直接锁死！", color: "bg-rose-600/20" },
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function HomeClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen dark-gradient text-white font-outfit">
        <nav className="border-b border-white/10 sticky top-0 z-50 bg-black/50 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-semibold tracking-tight">Openclaw</h1>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4">
          <section className="py-32 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-violet-600/20 border border-violet-500/30 rounded-full text-sm text-violet-300 mb-8 font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI 助手新时代
            </div>
            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-6 glow-text">OpenClaw</h1>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              真正能替你做事的 AI <br />
              清理收件箱、发送邮件、管理日历、为你办理值机
            </p>
          </section>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-screen dark-gradient text-white font-outfit">
      <nav className="border-b border-white/10 sticky top-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-semibold tracking-tight">Openclaw</h1>
            <div className="hidden md:flex items-center space-x-1">
              <button className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center text-sm">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                OpenClaw 部署客户端
              </button>
              <button className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center text-sm">
                <Layers className="w-4 h-4 mr-2" />
                SkillHub
              </button>
              <button className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center text-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                知识中心
              </button>
              <button className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Agent跑分
              </button>
              <button className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                AI模型大PK
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4">
        <section className="py-32 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-violet-600/20 border border-violet-500/30 rounded-full text-sm text-violet-300 mb-8 font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            AI 助手新时代
          </div>
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-6 glow-text">OpenClaw</h1>
          <p className="text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            真正能替你做事的 AI <br />
            清理收件箱、发送邮件、管理日历、为你办理值机
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
            <button
              onClick={() => scrollToSection("tutorials")}
              className="dark-surface dark-surface-hover rounded-2xl p-8 text-left transition-all duration-300"
            >
              <div className="flex items-center mb-5">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center mr-5">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">新手用户</h3>
                  <p className="text-sm text-gray-500">刚刚接触 OpenClaw</p>
                </div>
              </div>
              <p className="text-gray-400 mb-5 text-base leading-relaxed">
                浏览热门 OpenClaw 客户端，了解不同版本的功能对比，选择最适合您的版本开始体验。
              </p>
              <div className="flex items-center text-violet-400 font-medium">
                开始探索
                <ChevronRight className="w-5 h-5 ml-2" />
              </div>
            </button>
            <button
              onClick={() => scrollToSection("skillhub")}
              className="dark-surface dark-surface-hover rounded-2xl p-8 text-left transition-all duration-300"
            >
              <div className="flex items-center mb-5">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center mr-5">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">已安装用户</h3>
                  <p className="text-sm text-gray-500">已经在使用 OpenClaw</p>
                </div>
              </div>
              <p className="text-gray-400 mb-5 text-base leading-relaxed">
                直接进入 SkillHub，浏览和安装各种智能技能，提升您的工作效率和创作能力。
              </p>
              <div className="flex items-center text-green-400 font-medium">
                进入 SkillHub
                <ChevronRight className="w-5 h-5 ml-2" />
              </div>
            </button>
          </div>
        </section>

        <section className="mt-8">
          <div className="text-center mb-6 h-[224px] flex flex-col justify-center">
            <h2 className="section-title mb-2">OpenClaw 部署客户端</h2>
            <p className="section-description">阿里、腾讯、智谱、火山各家小龙虾随意选择</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {deploymentProducts.map((product) => (
              <a
                key={product.id}
                href={product.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block dark-surface dark-surface-hover rounded-xl p-4 transition-all duration-300 relative group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{product.vendorLogo}</span>
                    <span className="text-sm text-gray-400">{product.vendor}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    {product.downloads}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-medium text-white">{product.name}</h4>
                    <ExternalLink className="w-4 h-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{product.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div id="tutorials" className="text-center mb-6 h-[224px] flex flex-col justify-center">
            <h2 className="section-title mb-2">新手入门</h2>
            <p className="section-description">7小时成为小龙虾高手</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tutorialArticles.map((article) => (
              <Link
                key={article.id}
                href={`/knowledge/article/${article.id}`}
                className="dark-surface dark-surface-hover rounded-xl p-5 transition-all duration-300 cursor-pointer group block"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xl">{article.icon}</span>
                  </div>
                  <div className="flex items-center text-violet-400 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    第 {article.hour} 小时
                  </div>
                </div>
                <h4 className="text-base font-medium mb-2 text-white group-hover:text-violet-300 transition-colors">
                  {article.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">{article.description}</p>
                <div className="mt-4 flex items-center text-violet-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>阅读文章</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div id="skillhub" className="text-center mb-6 h-[224px] flex flex-col justify-center">
            <h2 className="section-title mb-2">SkillHub</h2>
            <p className="section-description">安装技能扩展小龙虾的能力</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="dark-surface dark-surface-hover rounded-xl p-4 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">{skill.icon}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    {skill.downloads}
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <h4 className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">{skill.name}</h4>
                    <span className="ml-2 text-xs px-2 py-0.5 bg-green-600/20 text-green-400 rounded-full">{skill.category}</span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="text-center mb-8 h-[224px] flex flex-col justify-center">
            <h2 className="section-title mb-2">用户好评</h2>
            <p className="section-description">看看大家怎么说</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`${t.color} rounded-xl p-6`}>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-white/10">
                    <span className="text-xl">{t.icon}</span>
                  </div>
                  <h4 className="text-sm font-medium text-white">{t.name}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{t.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="text-center mb-8 h-[224px] flex flex-col justify-center">
            <h2 className="section-title mb-2">扫码加入微信群</h2>
            <p className="section-description">有问题有人解答，想玩有人交流，想获得第一手AI资讯，就加群</p>
          </div>
          <div className="flex justify-center pb-8">
            <div className="dark-surface rounded-2xl p-8 flex items-center justify-center">
              <div className="bg-white rounded-xl w-48 h-48 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-sm">微信群二维码</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="text-center mb-8 h-[224px] flex flex-col justify-center">
            <h2 className="section-title mb-2">开始搭建你的AI Agent吧</h2>
            <p className="section-description">选择适合您的AI Agent方案，体验 AI 带来的效率革命</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto pb-16">
            <button
              onClick={() => scrollToSection("tutorials")}
              className="dark-surface dark-surface-hover rounded-2xl p-8 text-left transition-all duration-300"
            >
              <div className="flex items-center mb-5">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center mr-5">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">新手用户</h3>
                  <p className="text-sm text-gray-500">刚刚接触 OpenClaw</p>
                </div>
              </div>
              <p className="text-gray-400 mb-5 text-base leading-relaxed">
                浏览热门 OpenClaw 客户端，了解不同版本的功能对比，选择最适合您的版本开始体验。
              </p>
              <div className="flex items-center text-violet-400 font-medium">
                开始探索
                <ChevronRight className="w-5 h-5 ml-2" />
              </div>
            </button>
            <button
              onClick={() => scrollToSection("skillhub")}
              className="dark-surface dark-surface-hover rounded-2xl p-8 text-left transition-all duration-300"
            >
              <div className="flex items-center mb-5">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center mr-5">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">已安装用户</h3>
                  <p className="text-sm text-gray-500">已经在使用 OpenClaw</p>
                </div>
              </div>
              <p className="text-gray-400 mb-5 text-base leading-relaxed">
                直接进入 SkillHub，浏览和安装各种智能技能，提升您的工作效率和创作能力。
              </p>
              <div className="flex items-center text-green-400 font-medium">
                进入 SkillHub
                <ChevronRight className="w-5 h-5 ml-2" />
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}