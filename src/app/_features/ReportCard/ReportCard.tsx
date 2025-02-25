import { ReportCardView } from "@/app/_features/ReportCard/ReportCardView";
import type { Report } from "@/app/types/reports";
import { useState } from "react";

type ReportCardProps = {
  report: Report;
};

export function ReportCard({ report }: ReportCardProps) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const maxLength = 200;
  const isLongContent = report.text.length > maxLength;
  const displayedContent = showFullContent ? report.text : report.text;

  const handleShowMore = () => setShowFullContent(true);

  return (
    <>
      <ReportCardView
        report={report}
        displayedContent={displayedContent}
        shouldShowMoreButton={isLongContent && !showFullContent}
        onShowMore={handleShowMore}
        isExpanded
      />
      {/* <ReportDetailDialog report={report} open={isDetailOpen} onOpenChange={setIsDetailOpen} /> */}
    </>
  );
}
