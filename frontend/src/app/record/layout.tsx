import { RecordLayoutWrapper } from "@/components/layouts/record/RecordLayout";
import { ReactNode } from "react";

export default function RecordLayout({ children }: { children: ReactNode }) {
  return <RecordLayoutWrapper>{children}</RecordLayoutWrapper>;
}