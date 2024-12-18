'use client';

import { SearchInput } from './search-input';
import { FilterSelect } from './filter-select';
import { Filters } from '@/lib/types';
import { useFilters } from '@/hooks/use-filters';

interface SearchFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  uniqueBanks: string[];
  uniqueCities: string[];
}

export function SearchFilters({ 
  filters, 
  onFilterChange, 
  uniqueBanks, 
  uniqueCities 
}: SearchFiltersProps) {
  const { updateFilter } = useFilters(filters, onFilterChange);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <SearchInput
        label="IFSC Code"
        value={filters.ifsc}
        onChange={(value) => updateFilter('ifsc', value)}
        placeholder="Search IFSC"
        icon="search"
      />

      <FilterSelect
        label="Bank"
        value={filters.bank}
        onChange={(value) => updateFilter('bank', value === '_all' ? '' : value)}
        options={uniqueBanks}
        placeholder="Select Bank"
      />

      <SearchInput
        label="Branch"
        value={filters.branch}
        onChange={(value) => updateFilter('branch', value)}
        placeholder="Search Branch"
        icon="building"
      />

      <FilterSelect
        label="City"
        value={filters.city}
        onChange={(value) => updateFilter('city', value === '_all' ? '' : value)}
        options={uniqueCities}
        placeholder="Select City"
      />
    </div>
  );
}