import UserStatsCard from "@/app/_features/UserStatsList/UserStatsCard/UserStatsCard";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type UserStatsListProps = {
  stats: {
    title: string;
    value: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    color: string;
  }[];
};
export default function UserStatsList({ stats }: UserStatsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <UserStatsCard stat={stat} index={index} key={stat.title} />
      ))}
    </div>
  );
}
