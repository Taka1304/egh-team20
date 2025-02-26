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

type PostsChartProps = {
  postsData: { month: string; count: number }[];
};

export default function PostsChart({ postsData }: PostsChartProps) {
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
            <Bar dataKey="count" fill="#6c5ce7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
