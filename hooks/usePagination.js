import { useState, useCallback } from "react";

export function usePagination({ initialPage = 1, initialItemsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  }, []);

  const getPaginationInfo = useCallback(
    (totalItems) => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

      return {
        currentPage,
        itemsPerPage,
        totalPages,
        startIndex,
        endIndex,
      };
    },
    [currentPage, itemsPerPage]
  );

  return {
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    getPaginationInfo,
  };
}
