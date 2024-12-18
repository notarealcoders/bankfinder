'use client';

import { TableCell, TableRow } from '@/components/ui/table';

export function LoadingRow() {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-8">
        Loading data...
      </TableCell>
    </TableRow>
  );
}