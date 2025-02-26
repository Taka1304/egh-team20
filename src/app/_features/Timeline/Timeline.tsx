"use client";
import { TimelineView } from "@/app/_features/Timeline/TimelineView";
import { useReports } from "@/app/hooks/useReprots";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function Timeline() {
  const { reports, isLoading, error } = useReports();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>エラーが発生しました</AlertTitle>
        <AlertDescription>
          タイムラインの読み込み中にエラーが発生しました。時間をおいて再度お試しください。
        </AlertDescription>
      </Alert>
    );
  }

  return <TimelineView reports={reports} />;
}
