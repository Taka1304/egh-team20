import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, Flame, Heart, Trophy } from "lucide-react";

type UserStatsCardProps = {
  stat: {
    value: string;
    label: string;
  };
  index: number;
};

const statsConfig = [
  {
    title: "累計継続日数",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    title: "投稿数",
    icon: Flame,
    color: "text-red-500",
  },
  {
    title: "リアクション数",
    icon: Heart,
    color: "text-pink-500",
  },
  {
    title: "バッジ取得数",
    icon: Trophy,
    color: "text-yellow-500",
  },
];

export default function UserStatsCard({ stat, index }: UserStatsCardProps) {
  const { title, icon: Icon, color } = statsConfig[index];

  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </Card>
    </motion.div>
  );
}
