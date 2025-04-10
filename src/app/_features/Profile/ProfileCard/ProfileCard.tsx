import { ProfileEditDialog } from "@/app/_features/Profile/ProfileEditDialog/ProfileEditDialog";
import type { ProfileUser } from "@/app/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProfileCardProps = {
  user: ProfileUser;
  isOwnProfile: boolean;
  onProfileUpdate?: () => void;
};

export default function ProfileCard({ user, isOwnProfile, onProfileUpdate }: ProfileCardProps) {
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const userId = user.id;

  const navigateToFollowPage = (tab: "following" | "followers") => {
    router.push(`/profile/${userId}/follow?tab=${tab}`);
  };

  // フォロー関連のカウント表示用のバリアント定義
  const countVariants = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
    hover: {
      scale: 1.05,
      y: -3,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
    },
  };

  // 数字用のバリアント定義
  const numberVariants = {
    initial: { color: "var(--primary-foreground)" },
    hover: { color: "var(--primary)" },
  };

  // 編集ダイアログを開く処理
  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  // 編集ダイアログを閉じる処理
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  // 編集後に更新が完了した時の処理
  const handleProfileUpdated = () => {
    setIsEditDialogOpen(false);
    if (onProfileUpdate) {
      onProfileUpdate();
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 bg-card py-6 border border-primary-foreground rounded-xl">
      <Avatar className="w-32 h-32">
        <AvatarImage src={user.image || ""} alt={user.displayName || ""} />
        <AvatarFallback>{user.displayName?.charAt(0) || user.name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <h1 className="mt-4 text-3xl font-bold text-primary-foreground">{user.displayName || user.name}</h1>
      <p className="text-muted-foreground">@{user.email?.split("@")[0]}</p>
      <div className="mt-2 flex space-x-8">
        <motion.div
          className="text-center cursor-pointer p-2 rounded-lg"
          onClick={() => navigateToFollowPage("following")}
          variants={countVariants}
          initial="initial"
          whileHover="hover"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
          }}
        >
          <motion.p className="font-semibold text-lg text-primary-foreground" variants={numberVariants}>
            {user.followingCount}
          </motion.p>
          <p className="text-sm text-muted-foreground">フォロー中</p>
        </motion.div>

        <motion.div
          className="text-center cursor-pointer p-2 rounded-lg"
          onClick={() => navigateToFollowPage("followers")}
          variants={countVariants}
          initial="initial"
          whileHover="hover"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
          }}
        >
          <motion.p className="font-semibold text-lg text-primary-foreground" variants={numberVariants}>
            {user.followerCount}
          </motion.p>
          <p className="text-sm text-muted-foreground">フォロワー</p>
        </motion.div>
      </div>

      {/* 自分のプロフィールの場合のみ編集ボタンを表示 */}
      {isOwnProfile && (
        <Button className="mt-4 text-foreground" variant="outline" onClick={handleOpenEditDialog}>
          プロフィールを編集
        </Button>
      )}

      {/* 編集ダイアログ */}
      {isEditDialogOpen && (
        <ProfileEditDialog user={user} onClose={handleCloseEditDialog} onSave={handleProfileUpdated} />
      )}
    </div>
  );
}
