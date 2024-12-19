import { useState, useEffect, useCallback } from "react";

export function useTableData(initialState) {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [allItems, setAllItems] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    async ({
      currentPage,
      itemsPerPage,
      sortColumn,
      sortOrder,
      filters,
      searchQuery,
    }) => {
      try {
        const response = await fetch(
          `/api/details?page=${currentPage}&limit=${itemsPerPage}&sort=${sortColumn}&order=${sortOrder}`
        );
        const result = await response.json();

        if (result.success) {
          let filteredData = result.data;

          // Apply filters
          if (Object.values(filters).some((value) => value)) {
            filteredData = filteredData.filter((item) => {
              return Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                return item[key]
                  ?.toString()
                  .toLowerCase()
                  .includes(value.toLowerCase());
              });
            });
          }

          // Apply search
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredData = filteredData.filter((item) => {
              return Object.values(item).some((value) =>
                value?.toString().toLowerCase().includes(query)
              );
            });
          }

          setData(filteredData);
          setTotalItems(filteredData.length);
          setAllItems(result.total);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    data,
    totalItems,
    allItems,
    error,
    loading,
    fetchData,
  };
}
