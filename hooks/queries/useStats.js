import { useQuery } from "@tanstack/react-query";

export function useStatsQuery() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      return data.data;
    },
  });
}
