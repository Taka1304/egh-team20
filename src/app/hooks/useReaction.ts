"use client";

import { client } from "@/lib/hono";
import { useState } from "react";

type ReactionType = "LIKE" | "FLAME" | "CHECK";

// フロントエンドのリアクション名を、データベースの `typeId` に変換するマッピング
const REACTION_TYPE_MAP: Record<ReactionType, string> = {
  LIKE: "cm7k363aj0001r0ux0ff4361n",
  FLAME: "cm7n45ua20000ksuxdbbi597c",
  CHECK: "cm7n45ua40001ksux1x3lbq2m",
};

export function useReaction(reportId: string, initialReactions: Record<ReactionType, number>) {
  const [reactions, setReactions] = useState(initialReactions);
  const [isLoading, setIsLoading] = useState(false);

  // リアクションを追加する
  const addReaction = async (type: ReactionType) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const typeId = REACTION_TYPE_MAP[type];
      const response = await client.api.reports[":id"].reaction[":typeId"].$post(
        {
          param: { id: reportId, typeId },
        },
        {},
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`リアクションの追加に失敗しました: ${errorText}`);
      }

      setReactions((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // リアクションを削除する
  const removeReaction = async (type: ReactionType) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const typeId = REACTION_TYPE_MAP[type]; // 正しい `typeId` に変換
      const response = await client.api.reports[":id"].reaction[":typeId"].$delete(
        {
          param: { id: reportId, typeId },
        },
        {},
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`リアクションの削除に失敗しました: ${errorText}`);
      }

      setReactions((prev) => ({
        ...prev,
        [type]: Math.max(prev[type] - 1, 0),
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    reactions,
    isLoading,
    addReaction,
    removeReaction,
  };
}
