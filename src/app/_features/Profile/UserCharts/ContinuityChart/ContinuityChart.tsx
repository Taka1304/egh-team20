import { selectedThemeAtom, themes } from "@/app/_features/ThemeSwitcher/atom";
import { Card } from "@/components/ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart";
import { useAtom } from "jotai";

type ContinuityChartProps = {
  continuityData: { date: string; days: number }[];
};

export default function ContinuityChart({ continuityData }: ContinuityChartProps) {
  const [selectedTheme] = useAtom(selectedThemeAtom);
  const currentTheme = themes.find((theme) => theme.name === selectedTheme);
  const COLORS = currentTheme?.reactionChartColors[0];
  const maxDays = Math.max(...continuityData.map((item) => item.days), 1);
  const yAxisDomain = maxDays <= 7 ? [0, 7] : [0, Math.ceil(maxDays * 1.1)];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">週間アクティブ日数</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={continuityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} interval={Math.floor(continuityData.length / 8)} />
            <YAxis domain={yAxisDomain} tickCount={Math.min(8, maxDays + 1)} />
            <Tooltip formatter={(value) => [`${value}日`, "活動日数"]} labelFormatter={(label) => `${label}の週`} />
            <Legend />
            <Line
              name="活動日数"
              type="monotone"
              dataKey="days"
              stroke={COLORS}
              strokeWidth={2}
              dot={{ fill: COLORS }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
