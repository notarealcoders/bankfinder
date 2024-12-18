export interface BankData {
  ifsc: string;
  bank: string;
  branch: string;
  city: string;
  state: string;
  address: string;
}

export interface Filters {
  ifsc: string;
  bank: string;
  branch: string;
  city: string;
}