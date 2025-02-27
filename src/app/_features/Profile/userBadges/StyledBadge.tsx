import { Bell, Home, Search, User } from "lucide-react";

type UserBadgeProps = {
  title: string;
  subtitle: string;
  iconName: "bell" | "home" | "search" | "user"; // 指定可能なアイコン名
  backgroundColor?: string;
};

export function UserBadge({
  title,
  subtitle,
  iconName,
  backgroundColor = "#3B82F6", // デフォルトの背景色
}: UserBadgeProps) {
  // `iconName` に応じて適切なアイコンを選択
  const IconComponent = {
    bell: Bell,
    home: Home,
    search: Search,
    user: User,
  }[iconName];

  return (
    <div
      className="relative flex items-center w-[280px] h-[60px] rounded-full shadow-md px-3 border-2 border-gray-300"
      style={{ backgroundColor }}
    >
      {/* 左側のアイコン */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white shadow-sm bg-white">
        <IconComponent className="w-6 h-6 text-gray-700" />
      </div>

      {/* テキスト部分 */}
      <div className="flex-1 text-center">
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-xs text-gray-200">{subtitle}</p>
      </div>

      {/* 右側の装飾 */}
      <div className="absolute -right-2 w-6 h-6 rounded-full border border-white opacity-50" />
    </div>
  );
}
