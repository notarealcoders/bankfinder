// Utility functions for filtering and searching
export const filterData = (data, filters) => {
  return data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return item[key]?.toString().toLowerCase().includes(value.toLowerCase());
    });
  });
};

export const searchData = (data, searchQuery) => {
  if (!searchQuery) return data;

  const query = searchQuery.toLowerCase();
  return data.filter((item) => {
    return Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(query)
    );
  });
};
