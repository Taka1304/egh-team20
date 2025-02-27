const achievements = [
  { id: "streak-100", title: "100日連続", subtitle: "継続は力", iconName: "bell", backgroundColor: "#3B82F6" },
  { id: "first-report", title: "最初の日報", subtitle: "初めの一歩", iconName: "home", backgroundColor: "#EC4899" },
  {
    id: "first-follower",
    title: "初めてのフォロワー",
    subtitle: "みんな仲良く",
    iconName: "user",
    backgroundColor: "#F59E0B",
  },
] as const;

export default function UserBadeges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {achievements.map((ach) => (
        <UserBadeges key={ach.id} {...ach} />
      ))}
    </div>
  );
}
