import { client } from "@/lib/hono";
import type { Interest } from "@prisma/client";
import { useEffect, useState } from "react";

export const useInterests = () => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInterests = async () => {
    setIsLoading(true);
    const res = await client.api.interests.$get();
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    setInterests(data);
    setIsLoading(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchInterests();
  }, []);

  return { interests, isLoading, fetchInterests };
};
