"use client";
import type { Contribution } from "@/app/_features/Heatmap/CalendarHeatMap";
import { useEffect, useState } from "react";

export const useContributions = (initialData: Contribution[]) => {
  const [contributions, setContributions] = useState<Contribution[]>(initialData);
  const [hoverDay, setHoverDay] = useState<Contribution | null>(null);

  useEffect(() => {
    // API からデータ取得
  }, []);

  const chunkArray = <T>(array: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, i * size + size));

  const weeks = chunkArray(contributions, 7);

  const getColor = (count: number) =>
    count === 0
      ? "bg-gray-100"
      : count <= 2
        ? "bg-green-200"
        : count <= 4
          ? "bg-green-300"
          : count <= 6
            ? "bg-green-400"
            : "bg-green-500";

  return { contributions, hoverDay, setHoverDay, weeks, getColor };
};
