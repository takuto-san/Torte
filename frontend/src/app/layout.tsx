import type { Metadata } from "next";
import { TopLayoutWrapper } from "@/components/layouts/top/TopLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Torte | 食事管理アプリ",
  description: "食事記録を楽に継続するためのアプリです",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <TopLayoutWrapper>{children}</TopLayoutWrapper>;
}
