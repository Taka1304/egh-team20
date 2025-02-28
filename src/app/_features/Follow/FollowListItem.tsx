import type { FollowUser } from "@/app/hooks/useFollowUsers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type FollowListItemProps = {
  user: FollowUser;
  onFollowAction: (userId: string, isFollowing: boolean) => Promise<void>;
  onNavigateToProfile: (userId: string) => void;
};

export default function FollowListItem({ user, onFollowAction, onNavigateToProfile }: FollowListItemProps) {
  return (
    <motion.li
      className="relative overflow-hidden"
      onClick={() => onNavigateToProfile(user.id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 bg-primary/5"
        initial={{ opacity: 0 }}
        variants={{
          hover: { opacity: 1 },
        }}
      />
      <div className="relative flex items-center justify-between p-4">
        <motion.div
          className="flex items-center space-x-4 cursor-pointer"
          variants={{
            hover: { x: 5 },
          }}
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.image || ""} alt={user.displayName || user.name || ""} />
            <AvatarFallback>{(user.displayName || user.name || "U").charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <motion.p
              className="font-semibold"
              variants={{
                hover: { color: "var(--primary)" },
              }}
            >
              {user.displayName || user.name}
            </motion.p>
            <p className="text-sm text-muted-foreground">@{user.email?.split("@")[0]}</p>
          </div>
        </motion.div>
        <motion.div
          variants={{
            hover: { scale: 1.05 },
          }}
        >
          <Button
            variant={user.isFollowing ? "outline" : "default"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onFollowAction(user.id, !!user.isFollowing);
            }}
            className="transition-all duration-300 ease-in-out"
          >
            {user.isFollowing ? "フォロー解除" : "フォローする"}
          </Button>
        </motion.div>
      </div>
    </motion.li>
  );
}
