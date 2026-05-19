import { getAllArticles, ArticleMeta } from "@/lib/articles";
import KnowledgeClient from "./KnowledgeClient";

const defaultMeta = { date: "", tags: [], keywords_seed: "", status: "published" as const, ctaTarget: "", context: "" };

const hardcodedCategories = [
  { id: "newusers", name: "新手入门" },
  { id: "ai-basics", name: "AI Agent 基础知识" },
  { id: "skills", name: "技能教程" },
  { id: "advanced", name: "高级技巧" },
  { id: "faq", name: "常见问题" },
];

const hardcodedArticles: Record<string, ArticleMeta[]> = {
  "ai-basics": [
    { slug: "ai-what-is-agent", title: "什么是 AI Agent？", description: "从零理解 AI Agent 的概念、架构和与普通 AI 的区别", icon: "🤖", category: "ai-basics", order: 1, ...defaultMeta },
    { slug: "ai-how-agent-works", title: "AI Agent 的工作原理", description: "深入浅出讲解 AI Agent 的感知-思考-行动循环机制", icon: "⚙️", category: "ai-basics", order: 2, ...defaultMeta },
    { slug: "ai-vs-chatbot", title: "AI Agent vs 聊天机器人", description: "对比分析 AI Agent 与 ChatGPT 等聊天机器人的本质差异", icon: "🆚", category: "ai-basics", order: 3, ...defaultMeta },
    { slug: "ai-agent-scenarios", title: "AI Agent 的典型应用场景", description: "了解 AI Agent 在办公、开发、数据分析等领域的实际应用", icon: "🎯", category: "ai-basics", order: 4, ...defaultMeta },
  ],
  advanced: [
    { slug: "adv-1", title: "自定义工作流配置", description: "学习如何创建和管理复杂的自动化工作流，实现一键完成多项任务", icon: "⚙️", category: "advanced", order: 1, ...defaultMeta },
    { slug: "adv-2", title: "API集成与扩展开发", description: "掌握 OpenClaw 的 API 接口和扩展开发方法，打造专属功能", icon: "🔌", category: "advanced", order: 2, ...defaultMeta },
    { slug: "adv-3", title: "企业级部署方案", description: "了解企业环境下的大规模部署、权限管理和安全策略配置", icon: "🏢", category: "advanced", order: 3, ...defaultMeta },
    { slug: "adv-4", title: "性能优化与资源管理", description: "优化 OpenClaw 的运行性能，合理管理系统资源", icon: "⚡", category: "advanced", order: 4, ...defaultMeta },
  ],
  faq: [
    { slug: "faq-1", title: "安装失败怎么解决？", description: "汇总常见的安装问题及解决方案，包括权限、网络、环境配置等", icon: "❓", category: "faq", order: 1, ...defaultMeta },
    { slug: "faq-2", title: "无法连接即时通讯工具", description: "微信、企业微信、飞书等工具连接失败的原因及排查方法", icon: "💬", category: "faq", order: 2, ...defaultMeta },
    { slug: "faq-3", title: "技能安装失败怎么办？", description: "SkillHub 技能安装过程中的常见问题及解决步骤", icon: "📦", category: "faq", order: 3, ...defaultMeta },
    { slug: "faq-4", title: "如何备份和恢复数据？", description: "保护重要数据的备份方法以及如何在新设备上恢复", icon: "💾", category: "faq", order: 4, ...defaultMeta },
    { slug: "faq-5", title: "运行缓慢怎么优化？", description: "解决 OpenClaw 运行卡顿、响应慢等性能问题", icon: "🐢", category: "faq", order: 5, ...defaultMeta },
  ],
};

export default function KnowledgePage() {
  const mdArticles = getAllArticles();
  const mdSlugs = mdArticles.map((a) => a.slug);

  const categories = hardcodedCategories.map((cat) => {
    const fromMd = mdArticles.filter((a) => a.category === cat.id);
    const fromCode = (hardcodedArticles[cat.id] || []).filter((a) => !mdSlugs.includes(a.slug));
    return {
      ...cat,
      articles: [...fromMd, ...fromCode].sort((a, b) => a.order - b.order),
    };
  });

  return <KnowledgeClient categories={categories} mdSlugs={mdSlugs} />;
}
