import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  keywords_seed: string;
  category: string;
  status: "published" | "draft";
  icon: string;
  order: number;
  ctaTarget: string;
  context: string;
}

export interface ArticleData {
  meta: ArticleMeta;
  content: string;
  htmlContent: string;
}

function parseMeta(rawData: Record<string, unknown>, slug: string): ArticleMeta {
  const tagsRaw = rawData.tags;
  const tags: string[] = typeof tagsRaw === "string"
    ? tagsRaw.split(",").map((t: string) => t.trim()).filter(Boolean)
    : Array.isArray(tagsRaw)
      ? tagsRaw
      : [];

  return {
    slug: (rawData.slug as string) || slug,
    title: (rawData.title as string) || slug,
    description: (rawData.description as string) || "",
    date: (rawData.date as string) || "",
    tags,
    keywords_seed: (rawData.keywords_seed as string) || "",
    category: (rawData.category as string) || "uncategorized",
    status: rawData.status === "draft" ? "draft" : "published",
    icon: (rawData.icon as string) || "📄",
    order: typeof rawData.order === "number" ? rawData.order : 999,
    ctaTarget: (rawData.ctaTarget as string) || "",
    context: (rawData.context as string) || "",
  };
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(articlesDirectory)) return [];

  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return parseMeta(data, slug);
    })
    .filter((a) => a.status === "published")
    .sort((a, b) => a.order - b.order);

  return articles;
}

export function getArticleBySlug(slug: string): ArticleData | null {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const meta = parseMeta(data, slug);
  const htmlContent = marked(content, { breaks: true, gfm: true }) as string;

  return { meta, content, htmlContent };
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticlesByTag(tag: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.tags.includes(tag));
}
