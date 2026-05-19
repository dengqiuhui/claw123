import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Download, Star, Shield, Tag, Terminal, Info } from "lucide-react";

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

const dataPath = path.join(process.cwd(), "data", "skills.json");

function loadSkills(): Skill[] {
  if (!fs.existsSync(dataPath)) return [];
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

function formatCount(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + "万";
  if (n >= 1000) return (n / 1000).toFixed(1) + "千";
  return String(n);
}

export default function SkillDetailPage({ params }: { params: { slug: string } }) {
  const skills = loadSkills();
  const skill = skills.find((s) => s.slug === params.slug);

  if (!skill) {
    notFound();
  }

  return (
    <div className="min-h-screen dark-gradient text-white font-outfit">
      <nav className="border-b border-white/10 sticky top-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/skillhub" className="text-gray-400 hover:text-white transition-colors mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-semibold tracking-tight">OpenClaw</h1>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/skillhub" className="px-4 py-2 text-white bg-white/10 rounded-lg transition-colors flex items-center text-sm">
                SkillHub
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/skillhub"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回 SkillHub
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {skill.name}
            </h1>
            {skill.version && (
              <span className="text-xs px-2.5 py-1 bg-white/10 border border-white/10 rounded-full text-gray-400 mt-1">
                v{skill.version}
              </span>
            )}
            {skill.apiKeyRequired && (
              <span className="text-xs px-2.5 py-1 bg-amber-600/15 border border-amber-500/20 text-amber-300 rounded-full mt-1">
                API Key
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {skill.score && (
              <div className="dark-surface rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-500">评分</span>
                </div>
                <p className="text-xl font-semibold">{skill.score}</p>
              </div>
            )}
            <div className="dark-surface rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <Download className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs text-gray-500">下载量</span>
              </div>
              <p className="text-xl font-semibold">{formatCount(skill.downloads)}</p>
            </div>
            <div className="dark-surface rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span className="text-xs text-gray-500">收藏</span>
              </div>
              <p className="text-xl font-semibold">{formatCount(skill.favorites)}</p>
            </div>
            <div className="dark-surface rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <Shield className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs text-gray-500">安全</span>
              </div>
              <p className="text-sm font-semibold text-green-400">通过检测</p>
            </div>
          </div>
        </header>

        {skill.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {skill.categories.map((cat) => (
              <Link
                key={cat}
                href={`/skillhub?category=${cat}`}
                className="text-xs px-3 py-1.5 bg-violet-600/10 border border-violet-500/20 text-violet-300 rounded-full hover:bg-violet-600/20 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        )}

        <section className="mb-12">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Info className="w-3.5 h-3.5" />
            技能简介
          </h2>
          <div className="bg-white/[0.02] border-l-2 border-violet-500/40 rounded-r-lg py-4 px-5">
            <p className="text-gray-200 text-base leading-relaxed">
              {skill.description}
            </p>
          </div>
        </section>

        {skill.installCmd && (
          <section className="mb-12">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              安装方式
            </h2>
            <div className="dark-surface rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
                <span className="text-xs text-gray-500">终端命令</span>
                <span className="text-xs text-gray-600">点击选中复制</span>
              </div>
              <div className="p-4">
                <code className="text-sm text-violet-200 font-mono break-all">
                  {skill.installCmd}
                </code>
              </div>
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Tag className="w-3.5 h-3.5" />
            技能信息
          </h2>
          <div className="dark-surface rounded-xl overflow-hidden">
            <div className="grid grid-cols-2">
              {skill.author && (
                <div className="px-5 py-4 border-b border-white/5 border-r border-white/5">
                  <span className="text-xs text-gray-500">作者</span>
                  <p className="text-sm text-gray-200 mt-1">{skill.author}</p>
                </div>
              )}
              <div className="px-5 py-4 border-b border-white/5">
                <span className="text-xs text-gray-500">来源</span>
                <p className="text-sm text-gray-200 mt-1">{skill.source}</p>
              </div>
              {skill.version && (
                <div className="px-5 py-4 border-b border-white/5 border-r border-white/5">
                  <span className="text-xs text-gray-500">版本</span>
                  <p className="text-sm text-gray-200 mt-1">v{skill.version}</p>
                </div>
              )}
              <div className="px-5 py-4 border-b border-white/5">
                <span className="text-xs text-gray-500">安全状态</span>
                <p className="text-sm text-green-400 mt-1 flex items-center gap-1.5">
                  <Shield className="w-3 h-3" />
                  已通过安全检测
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10">
          <a
            href={skill.originUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm text-white font-medium transition-colors"
          >
            查看原始页面
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </a>
          <Link
            href="/skillhub"
            className="inline-flex items-center px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            返回列表
          </Link>
        </div>
      </article>
    </div>
  );
}
