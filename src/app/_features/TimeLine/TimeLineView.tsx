import { ReportCard } from "@/app/_features/ReportCard/ReportCard";

type Report = {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  image?: string;
  link?: string;
};

type TimelineViewProps = {
  reports: Report[];
};

export function TimelineView({ reports }: TimelineViewProps) {
  return (
    <div className="max-w-2xl mx-auto mt-16 p-4">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
