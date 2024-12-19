// Utility functions for pagination
export const calculatePageRange = (currentPage, totalPages) => {
  const delta = 2; // Number of pages to show before and after current page
  const range = [];
  const rangeWithDots = [];

  // Always include first page
  range.push(1);

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i > 1 && i < totalPages) {
      range.push(i);
    }
  }

  // Always include last page
  if (totalPages > 1) {
    range.push(totalPages);
  }

  // Add dots between page numbers if needed
  let l;
  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};
