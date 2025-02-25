"use client";

import { TimelineView } from "@/app/_features/Timeline/TimelineView";
import { useReports } from "@/app/hooks/useReprots";

export function Timeline() {
  const { reports, isLoading, error } = useReports();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <TimelineView reports={reports} />;
}
