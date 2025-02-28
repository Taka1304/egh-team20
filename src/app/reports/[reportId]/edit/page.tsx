"use client";

import ReportEditorEditContainer from "@/app/_features/ReportEditor/ReportEditorEditContainer";
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams<{ reportId: string }>();
  return <ReportEditorEditContainer reportId={params.reportId} />;
}
