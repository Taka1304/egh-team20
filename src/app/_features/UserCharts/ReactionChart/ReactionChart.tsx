import { selectedThemeAtom, themes } from "@/app/_features/ThemeSwitcher/atom";
import { Card } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart";
import { useAtom } from "jotai";

type ReactionChartProps = {
  reactionData: { name: string; value: number }[];
};

export default function ReactionChart({ reactionData }: ReactionChartProps) {
  const [selectedTheme] = useAtom(selectedThemeAtom);
  const currentTheme = themes.find((theme) => theme.name === selectedTheme);
  const COLORS = currentTheme?.reactionChartColors || ["#6c5ce7", "#a29bfe", "#81ecec", "#74b9ff"];
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">リアクション内訳</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={reactionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              className="font-bold"
            >
              {reactionData.map((entry, index) => (
                <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
