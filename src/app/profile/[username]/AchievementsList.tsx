import Image from "next/image";

type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string; // アイコン画像のURL
};

type AchievementsListProps = {
  achievements: Achievement[];
};

export function AchievementsList({ achievements }: AchievementsListProps) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((ach) => (
          <div key={ach.id} className="flex items-center bg-card text-foreground p-4 rounded-lg shadow-md">
            {/* アイコン画像 */}
            <div className="w-12 h-12 flex-shrink-0">
              <Image src={ach.icon} alt={ach.title} width={48} height={48} className="rounded-full" />
            </div>

            {/* タイトル & 説明 */}
            <div className="flex-1 ml-4">
              <p className="font-bold text-lg">{ach.title}</p>
              <p className="text-sm text-gray-300">{ach.description}</p>
            </div>

            {/* 獲得日 */}
            <div className="text-sm text-gray-400">{ach.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
