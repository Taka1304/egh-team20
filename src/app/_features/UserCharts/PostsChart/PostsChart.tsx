import { selectedThemeAtom, themes } from "@/app/_features/ThemeSwitcher/atom";
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart";
import { useAtom } from "jotai";

type PostsChartProps = {
  postsData: { month: string; count: number }[];
};

export default function PostsChart({ postsData }: PostsChartProps) {
  const [selectedTheme] = useAtom(selectedThemeAtom);
  const currentTheme = themes.find((theme) => theme.name === selectedTheme);
  const COLORS = currentTheme?.reactionChartColors[0];
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">月別投稿数</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={postsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill={COLORS} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
