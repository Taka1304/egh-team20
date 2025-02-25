import { ReportCard } from "@/app/_features/ReportCard/ReportCard";
import type { Report } from "@/app/types/reports";

type TimelineViewProps = {
  reports: Report[];
};

export function TimelineView({ reports }: TimelineViewProps) {
  return (
    <div>
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
