'use client';

import { TableCell, TableRow } from '@/components/ui/table';

export function NoResultsRow() {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-8">
        No results found
      </TableCell>
    </TableRow>
  );
}