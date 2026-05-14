import { getArticleBySlug } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, BookOpen, ExternalLink } from "lucide-react";

interface Props {
  params: { slug: string };
}

const categoryNames: Record<string, string> = {
  newusers: "新手入门",
  "ai-basics": "AI Agent基础知识",
  skills: "技能教程",
  advanced: "高级技巧",
  faq: "常见问题",
};

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const { meta, htmlContent, content } = article;

  return (
    <div className="min-h-screen dark-gradient text-white font-outfit">
      <nav className="border-b border-white/10 sticky top-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/knowledge" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回知识中心
            </Link>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              {meta.date && (
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {meta.date}
                </span>
              )}
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                {categoryNames[meta.category] || meta.category}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-16">
        <div className="flex items-start mb-2">
          <span className="text-4xl mr-4 mt-1">{meta.icon}</span>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{meta.title}</h1>
            {meta.description && (
              <p className="text-gray-400 text-lg mb-4">{meta.description}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          {meta.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-violet-400" />
              {meta.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-violet-600/20 text-violet-300 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {meta.context && (
          <div className="mb-10 p-4 bg-violet-600/10 border border-violet-500/20 rounded-xl">
            <p className="text-gray-300 text-sm leading-relaxed">{meta.context}</p>
          </div>
        )}

        <div
          className="article-content max-w-none
            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:text-white
            [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-white [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-2
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-white
            [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:text-gray-300 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
            [&_ol]:text-gray-300 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
            [&_li]:mb-2
            [&_code]:bg-white/10 [&_code]:text-violet-300 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
            [&_pre]:bg-white/5 [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-6
            [&_blockquote]:border-l-4 [&_blockquote]:border-violet-500 [&_blockquote]:pl-4 [&_blockquote]:text-gray-400 [&_blockquote]:italic [&_blockquote]:my-6
            [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
            [&_th]:border [&_th]:border-white/10 [&_th]:bg-white/5 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:text-sm [&_th]:font-medium [&_th]:text-white
            [&_td]:border [&_td]:border-white/10 [&_td]:px-4 [&_td]:py-2 [&_td]:text-sm [&_td]:text-gray-300
            [&_strong]:text-white [&_strong]:font-semibold
            [&_a]:text-violet-400 hover:[&_a]:text-violet-300 [&_a]:underline
            [&_hr]:border-white/10 [&_hr]:my-8
            [&_img]:rounded-xl [&_img]:my-4 [&_img]:max-w-full
          "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {meta.ctaTarget && (
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <Link
              href={meta.ctaTarget}
              className="inline-flex items-center px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-medium transition-colors"
            >
              继续阅读
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </div>
        )}
      </article>
    </div>
  );
}
