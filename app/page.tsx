'use client';

import { useState, useEffect } from 'react';
import { SearchFilters } from '@/components/search/search-filters';
import { BankTable } from '@/components/bank/bank-table';
import { BankData, Filters } from '@/lib/types';
import { loadExcelData } from '@/lib/utils/excel';
import { filterBankData } from '@/lib/utils/filters';

export default function Home() {
  const [data, setData] = useState<BankData[]>([]);
  const [filteredData, setFilteredData] = useState<BankData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    ifsc: '',
    bank: '',
    branch: '',
    city: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const excelData = await loadExcelData();
        setData(excelData);
        setFilteredData(excelData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = filterBankData(data, filters);
    setFilteredData(filtered);
  }, [filters, data]);

  const uniqueBanks = Array.from(new Set(data.map((item) => item.bank))).sort();
  const uniqueCities = Array.from(new Set(data.map((item) => item.city))).sort();

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">IFSC Code Search</h1>
      
      <SearchFilters
        filters={filters}
        onFilterChange={setFilters}
        uniqueBanks={uniqueBanks}
        uniqueCities={uniqueCities}
      />

      <BankTable data={filteredData} loading={loading} />
    </main>
  );
}