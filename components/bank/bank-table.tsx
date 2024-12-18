'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BankData } from '@/lib/types';
import { LoadingRow } from './loading-row';
import { NoResultsRow } from './no-results-row';
import { DataRow } from './data-row';

interface BankTableProps {
  data: BankData[];
  loading: boolean;
}

export function BankTable({ data, loading }: BankTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>IFSC Code</TableHead>
            <TableHead>Bank</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>City</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <LoadingRow />
          ) : data.length === 0 ? (
            <NoResultsRow />
          ) : (
            data.map((item, index) => (
              <DataRow key={item.ifsc + index} item={item} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}