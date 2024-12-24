import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Spinner from "@/components/ui/spinner";
import { useTableData } from "@/hooks/useTableData";
import PaginationControls from "@/components/pagination/PaginationControls";
import { usePagination } from "@/hooks/usePagination";

export default function FilterResults({ filters }) {
  const {
    currentPage,
    itemsPerPage,
    handlePageChange,
    getPaginationInfo,
  } = usePagination({});

  const { data, totalItems, error, loading, fetchData } = useTableData();

  useEffect(() => {
    const queryParams = {
      currentPage,
      itemsPerPage,
      sortColumn: filters.sortBy,
      sortOrder: filters.sortOrder,
      filters: {
        BANK: filters.bank,
        STATE: filters.state,
        CITY1: filters.city,
      },
    };

    if (filters.hasPhone) {
      queryParams.filters.PHONE = { $exists: true, $ne: "" };
    }

    fetchData(queryParams);
  }, [currentPage, itemsPerPage, filters, fetchData]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const paginationInfo = getPaginationInfo(totalItems);

  return (
    <Card className="relative">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bank</TableHead>
              <TableHead>IFSC</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.IFSC}>
                <TableCell>{item.BANK}</TableCell>
                <TableCell>
                  <Link
                    href={`/detail/${item.IFSC}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.IFSC}
                  </Link>
                </TableCell>
                <TableCell>{item.BRANCH}</TableCell>
                <TableCell>{item.CITY1}</TableCell>
                <TableCell>{item.STATE}</TableCell>
                <TableCell>{item.PHONE || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      <div className="p-4 flex justify-center">
        <PaginationControls
          currentPage={paginationInfo.currentPage}
          totalPages={paginationInfo.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Card>
  );
}