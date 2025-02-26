import { Settings, Shield, User } from "lucide-react";

export const menuItems = [
  {
    label: "アカウント",
    items: [
      {
        icon: User,
        label: "プロフィール",
        link: "/profile/[username]",
      },
      {
        icon: Settings,
        label: "設定",
        link: "/settings",
      },
    ],
  },
  {
    label: "その他",
    items: [
      {
        icon: Shield,
        label: "プライバシー",
        link: "/privacy",
      },
    ],
  },
];
