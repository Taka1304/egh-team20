"use client";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";

export type WeekType = {
  date: string;
  count: number;
}[];

type CalendarHeatMapViewProps = {
  weeks: WeekType[];
  getColor: (count: number) => string;
  hoverDay: { date: string; count: number } | null;
  setHoverDay: (day: { date: string; count: number } | null) => void;
};

export default function CalendarHeatMapView({ weeks, getColor, hoverDay, setHoverDay }: CalendarHeatMapViewProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });

  return (
    <TooltipProvider>
      <div className="flex gap-1">
        {weeks.map((week) => (
          <div key={week[0].date} className="flex flex-col gap-1">
            {week.map((day) => (
              <Tooltip key={day.date}>
                <TooltipTrigger>
                  <div
                    className={`w-4 h-4 rounded-sm ${getColor(day.count)}`}
                    onMouseEnter={() => setHoverDay(day)}
                    onMouseLeave={() => setHoverDay(null)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {formatDate(day.date)} : {day.count} ポモドーロ
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
