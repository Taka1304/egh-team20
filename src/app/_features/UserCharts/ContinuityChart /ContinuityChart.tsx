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
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">継続日数の推移</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={continuityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="days" stroke={COLORS} strokeWidth={2} dot={{ fill: COLORS }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
