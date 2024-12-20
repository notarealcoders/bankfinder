import { useQuery } from "@tanstack/react-query";

export function useLocatorQuery({ bank, state, city }) {
  const getDistinctValues = async (field, params = {}) => {
    const queryParams = new URLSearchParams({
      distinct: field,
      ...params,
    });
    const response = await fetch(`/api/details?${queryParams}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error);
    }

    return data.data;
  };

  const banksQuery = useQuery({
    queryKey: ["banks"],
    queryFn: () => getDistinctValues("BANK"),
  });

  const statesQuery = useQuery({
    queryKey: ["states", bank],
    queryFn: () => getDistinctValues("STATE", { bank }),
    enabled: !!bank,
  });

  const citiesQuery = useQuery({
    queryKey: ["cities", bank, state],
    queryFn: () => getDistinctValues("CITY1", { bank, state }),
    enabled: !!bank && !!state,
  });

  const branchesQuery = useQuery({
    queryKey: ["branches", bank, state, city],
    queryFn: () => getDistinctValues("BRANCH", { bank, state, city }),
    enabled: !!bank && !!state && !!city,
  });

  return {
    banks: banksQuery.data || [],
    states: statesQuery.data || [],
    cities: citiesQuery.data || [],
    branches: branchesQuery.data || [],
    isLoading:
      banksQuery.isLoading ||
      statesQuery.isLoading ||
      citiesQuery.isLoading ||
      branchesQuery.isLoading,
    error:
      banksQuery.error ||
      statesQuery.error ||
      citiesQuery.error ||
      branchesQuery.error,
  };
}
