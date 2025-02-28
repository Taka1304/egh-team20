import Loading from "@/app/Loading";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

export default function FollowSkeleton() {
  const skeletonItems = useMemo(() => Array.from({ length: 5 }, (_, i) => ({ id: `skeleton-${i}` })), []);

  return (
    <CardContent className="p-0">
      <div>
        <ul className="divide-y divide-border">
          {skeletonItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full flex items-center justify-center">
                  <Loading />
                </Skeleton>
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-8 w-24" />
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
  );
}
