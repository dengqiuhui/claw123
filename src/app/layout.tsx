import type { Metadata } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "OpenClaw - 用户流程",
  description: "OpenClaw 用户流程式页面",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${outfit.variable} ${plusJakarta.variable}`}>
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  );
}