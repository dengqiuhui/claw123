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

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  if (!fs.existsSync(dataPath)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const raw = fs.readFileSync(dataPath, "utf8");
  const skills: Skill[] = JSON.parse(raw);
  const skill = skills.find((s) => s.slug === params.slug);

  if (!skill) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json({ skill });
}
