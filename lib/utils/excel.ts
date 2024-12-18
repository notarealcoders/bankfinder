import * as XLSX from 'xlsx';
import { BankData } from '../types';

export async function loadExcelData(): Promise<BankData[]> {
  try {
    const response = await fetch('/bank-data.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    
    const sheet1Data = XLSX.utils.sheet_to_json<BankData>(workbook.Sheets[workbook.SheetNames[0]]);
    const sheet2Data = XLSX.utils.sheet_to_json<BankData>(workbook.Sheets[workbook.SheetNames[1]]);
    
    return [...sheet1Data, ...sheet2Data];
  } catch (error) {
    console.error('Error loading Excel data:', error);
    return [];
  }
}