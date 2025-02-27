import UserStatsCard from "@/app/_features/UserStatsList/UserStatsCard/UserStatsCard";

type UserStatsListProps = {
  stats: {
    value: string;
    label: string;
  }[];
};

export default function UserStatsList({ stats }: UserStatsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <UserStatsCard stat={stat} index={index} key={stat.label} />
      ))}
    </div>
  );
}
