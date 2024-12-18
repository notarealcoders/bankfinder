'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { BankData } from '@/lib/types';

interface DataRowProps {
  item: BankData;
}

export function DataRow({ item }: DataRowProps) {
  return (
    <TableRow>
      <TableCell className="font-mono">{item.ifsc}</TableCell>
      <TableCell>{item.bank}</TableCell>
      <TableCell>{item.branch}</TableCell>
      <TableCell>{item.city}</TableCell>
      <TableCell>{item.state}</TableCell>
      <TableCell className="max-w-xs truncate">{item.address}</TableCell>
    </TableRow>
  );
}