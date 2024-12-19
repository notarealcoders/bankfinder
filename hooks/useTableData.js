import { useState, useEffect, useCallback } from "react";

export function useTableData(initialState) {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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
        setLoading(true);

        // Build URL with query parameters
        const url = new URL("/api/details", window.location.origin);
        url.searchParams.set("page", currentPage);
        url.searchParams.set("limit", itemsPerPage);
        url.searchParams.set("sort", sortColumn);
        url.searchParams.set("order", sortOrder);

        if (searchQuery) {
          url.searchParams.set("search", searchQuery);
        }

        // Add filters to URL
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            url.searchParams.set(`filter_${key.toLowerCase()}`, value);
          }
        });

        const response = await fetch(url);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
          setTotalItems(result.total);
          setTotalPages(result.totalPages);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    data,
    totalItems,
    totalPages,
    error,
    loading,
    fetchData,
  };
}
