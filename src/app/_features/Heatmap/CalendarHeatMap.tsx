"use client";
import CalendarHeatMapView from "@/app/_features/Heatmap/CalendarHeatMapView";
import { useContributions } from "@/app/hooks/useContributions";

export type Contribution = {
  date: string;
  count: number;
};

type CalendarHeatMapProps = {
  contributions: Contribution[];
};

export default function CalendarHeatMap({ contributions }: CalendarHeatMapProps) {
  const { weeks, getColor, hoverDay, setHoverDay } = useContributions(contributions);
  return <CalendarHeatMapView weeks={weeks} getColor={getColor} hoverDay={hoverDay} setHoverDay={setHoverDay} />;
}
