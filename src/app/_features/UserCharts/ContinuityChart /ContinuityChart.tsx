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

type ContinuityChartProps = {
  continuityData: { date: string; days: number }[];
};

export default function ContinuityChart({ continuityData }: ContinuityChartProps) {
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
            <Line type="monotone" dataKey="days" stroke="#6c5ce7" strokeWidth={2} dot={{ fill: "#6c5ce7" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
