import { HomeLayoutWrapper } from "@/components/layouts/home/HomeLayout";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <HomeLayoutWrapper>{children}</HomeLayoutWrapper>;
}
