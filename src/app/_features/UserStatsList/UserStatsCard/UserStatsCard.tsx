import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type UserStatsCardProps = {
  stat: {
    title: string;
    value: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    color: string;
  };
  index: number;
};

export default function UserStatsCard({ stat, index }: UserStatsCardProps) {
  return (
    <motion.div
      key={stat.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
          <stat.icon className={`h-8 w-8 ${stat.color}`} />
        </div>
      </Card>
    </motion.div>
  );
}
