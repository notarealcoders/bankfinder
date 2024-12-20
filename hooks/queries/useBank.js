import { useQuery } from "@tanstack/react-query";

export function useBankQuery(ifsc) {
  return useQuery({
    queryKey: ["bank", ifsc],
    queryFn: async () => {
      const response = await fetch(`/api/detail/${ifsc}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      return data.data;
    },
    enabled: !!ifsc,
  });
}

export function useBanksQuery() {
  return useQuery({
    queryKey: ["banks"],
    queryFn: async () => {
      const response = await fetch("/api/details?distinct=BANK");
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      return data.data;
    },
  });
}

export function useBankStatsQuery(bankName) {
  return useQuery({
    queryKey: ["bank-stats", bankName],
    queryFn: async () => {
      const response = await fetch(`/api/banks/${bankName}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      return data.data;
    },
    enabled: !!bankName,
  });
}
