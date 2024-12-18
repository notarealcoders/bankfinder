import { BankData, Filters } from '../types';

export function filterBankData(data: BankData[], filters: Filters): BankData[] {
  return data.filter((item) => {
    const matchIfsc = item.ifsc.toLowerCase().includes(filters.ifsc.toLowerCase());
    const matchBank = item.bank.toLowerCase().includes(filters.bank.toLowerCase());
    const matchBranch = item.branch.toLowerCase().includes(filters.branch.toLowerCase());
    const matchCity = item.city.toLowerCase().includes(filters.city.toLowerCase());
    
    return matchIfsc && matchBank && matchBranch && matchCity;
  });
}