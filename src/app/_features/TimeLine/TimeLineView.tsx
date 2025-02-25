import { ReportCard } from "@/app/_features/ReportCard/ReportCard";
import type { Report } from "@/app/types/reports";

type TimeLineViewProps = {
  reports: Report[];
};

export function TimeLineView({ reports }: TimeLineViewProps) {
  return (
    <div>
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
