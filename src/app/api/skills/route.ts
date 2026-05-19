import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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
  const raw = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(raw);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const sort = searchParams.get("sort") || "downloads";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

  let skills = loadSkills();

  if (category && category !== "all") {
    skills = skills.filter((s) => s.categories.includes(category));
  }

  if (q) {
    const query = q.toLowerCase();
    skills = skills.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.categories.some((c) => c.includes(query))
    );
  }

  if (sort === "downloads") {
    skills.sort((a, b) => b.downloads - a.downloads);
  } else if (sort === "favorites") {
    skills.sort((a, b) => b.favorites - a.favorites);
  } else if (sort === "newest") {
    skills.sort((a, b) => b.slug.localeCompare(a.slug));
  }

  const total = skills.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const items = skills.slice(start, start + pageSize);

  const categories = [
    ...new Set(loadSkills().flatMap((s) => s.categories)),
  ].sort();

  return NextResponse.json({
    items,
    total,
    totalPages,
    page,
    pageSize,
    categories,
  });
}
