import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UserBadge = {
  id: string;
  name: string;
  description: string;
};

type UserBadgeProps = {
  badges: UserBadge[];
};

export function UserBages({ badges }: UserBadgeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>獲得バッチ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <Badge key={badge.id} className="cursor-help" title={badge.description}>
              {badge.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
