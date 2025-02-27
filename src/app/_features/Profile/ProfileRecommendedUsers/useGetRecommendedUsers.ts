import type { User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useGetRecommendedUsers = () => {
  const [recommendedUsers, setRecommendedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // モックデータを非同期的に取得する
    const mockFetchRecommendedUsers = async () => {
      // fetchやAPIでデータを取得する処理を模擬
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockData: User[] = [
        {
          id: "cm7hceqgd0002ux8873ysihbc",
          name: "タナカ",
          email: "tanaka@example.com",
          emailVerified: null,
          image: "https://picsum.photos/640/360",
          displayName: "タナカ",
          bio: "こんにちは、タナカです",
          isPrivate: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "cm7hceqgd0002ux8873ysihb1",
          name: "山田",
          email: "yamada@example.com",
          emailVerified: null,
          image: "https://picsum.photos/640/360",
          displayName: "タナカ",
          bio: "こんにちは、yamadaです",
          isPrivate: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "cm7hceqgd0002ux8873ysihb2",
          name: "aoyama",
          email: "yamada@example.com",
          emailVerified: null,
          image: "https://picsum.photos/640/360",
          displayName: "タナカ",
          bio: "こんにちは、yamadaです",
          isPrivate: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "cm7hceqgd0002ux8873ysihb3",
          name: "山田",
          email: "yamada@example.com",
          emailVerified: null,
          image: "https://picsum.photos/640/360",
          displayName: "タナカ",
          bio: "こんにちは、yamadaです",
          isPrivate: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "cm7hceqgd0002ux8873ysihb4",
          name: "山田",
          email: "yamada@example.com",
          emailVerified: null,
          image: "https://picsum.photos/640/360",
          displayName: "タナカ",
          bio: "こんにちは、yamadaです",
          isPrivate: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      setRecommendedUsers(mockData);
      setIsLoading(false);
    };
    mockFetchRecommendedUsers();
  }, []);

  return { recommendedUsers, isLoading };
};
