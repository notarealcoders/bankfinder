export async function fetchDistinctValues(field, query = {}, setLoading) {
  try {
    setLoading(true);
    const queryParams = new URLSearchParams({
      distinct: field,
      ...query,
    });
    const response = await fetch(`/api/details?${queryParams}`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error(`Error fetching ${field}:`, error);
    return [];
  } finally {
    setLoading(false);
  }
}
