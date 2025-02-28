import type { FollowUser } from "@/app/hooks/useFollowUsers";
import { CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import FollowListItem from "./FollowListItem";

type FollowListProps = {
  users: FollowUser[];
  activeTab: "following" | "followers";
  onFollowAction: (userId: string, isFollowing: boolean) => Promise<void>;
  onNavigateToProfile: (userId: string) => void;
};

export default function FollowList({ users, activeTab, onFollowAction, onNavigateToProfile }: FollowListProps) {
  return (
    <CardContent className="p-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {users.length === 0 ? (
            <p className="text-muted-foreground p-6 text-center">
              {activeTab === "following" ? "フォロー中のユーザーがいません" : "フォロワーがいません"}
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {users.map((user) => (
                <FollowListItem
                  key={user.id}
                  user={user}
                  onFollowAction={onFollowAction}
                  onNavigateToProfile={onNavigateToProfile}
                />
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </CardContent>
  );
}
