"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import FilterPanel from "@/components/filter/FilterPanel";
import FilterResults from "@/components/filter/FilterResults";
import FilterSummary from "@/components/filter/FilterSummary";

export default function FilterPage() {
  const [filters, setFilters] = useState({
    bank: "",
    state: "",
    city: "",
    branch: "",
    hasPhone: false,
    sortBy: "BANK",
    sortOrder: "asc",
  });

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Advanced Bank Search</h1>
      
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <FilterPanel filters={filters} onFilterChange={setFilters} />
        <div className="space-y-6">
          <FilterSummary filters={filters} onClear={() => setFilters({})} />
          <FilterResults filters={filters} />
        </div>
      </div>
    </div>
  );
}