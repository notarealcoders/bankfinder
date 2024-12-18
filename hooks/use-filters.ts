'use client';

import { Filters } from '@/lib/types';

export function useFilters(filters: Filters, onFilterChange: (filters: Filters) => void) {
  const updateFilter = (key: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return { updateFilter };
}