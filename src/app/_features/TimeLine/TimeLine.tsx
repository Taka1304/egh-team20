"use client";

import { TimeLineView } from "@/app/_features/Timeline/TimeLineView";
import { useReports } from "@/app/hooks/useReprots";

export function TimeLine() {
  const { reports, isLoading, error } = useReports();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <TimeLineView reports={reports} />;
}
