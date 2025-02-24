import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

type ReportDateProps = {
  createdAt: string;
};

export function ReportDate({ createdAt }: ReportDateProps) {
  const dateObj = dayjs(createdAt);
  const formattedYear = dateObj.format("YYYY");
  const formattedMonth = dateObj.format("M");
  const formattedDay = dateObj.format("D");
  const formattedWeekday = dateObj.format("ddd");

  return (
    <div className="flex flex-col items-end">
      <p className="text-sm text-muted-foreground self-start">{formattedYear}</p>
      <div className="flex items-center space-x-2">
        <p className="text-4xl font-bold text-card-foreground">
          {formattedMonth}.{formattedDay}
        </p>
        <div className="border border-card-foreground rounded-md px-2 py-0.5 text-sm text-card-foreground">
          {formattedWeekday}
        </div>
      </div>
    </div>
  );
}
