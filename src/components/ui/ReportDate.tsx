type ReportDateProps = {
  createdAt: string;
};

export function ReportDate({ createdAt }: ReportDateProps) {
  const dateObj = new Date(createdAt);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[dateObj.getDay()];

  return (
    <div className="flex flex-col items-end">
      <p className="text-sm text-muted-foreground self-start">{year}</p>
      <div className="flex items-center space-x-2">
        <p className="text-4xl font-bold text-card-foreground">
          {month}.{day}
        </p>
        <div className="border border-card-foreground rounded-md px-2 py-0.5 text-sm text-card-foreground">
          {weekday}
        </div>
      </div>
    </div>
  );
}
