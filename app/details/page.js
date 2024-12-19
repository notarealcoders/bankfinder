"use client";

import React, { useState, useCallback } from "react";
import PaginationControls from "@/components/pagination/PaginationControls";
import ItemsPerPage from "@/components/pagination/ItemsPerPage";
import { FilterPopover } from "@/components/filters/FilterPopover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { ArrowUp, ArrowDown, ArrowDownUp } from "lucide-react";
import { useTableData } from "@/hooks/useTableData";
import { usePagination } from "@/hooks/usePagination";

const DetailsPage = () => {
  const [sortColumn, setSortColumn] = useState("BANK");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [columnFilters, setColumnFilters] = useState({
    BANK: "",
    IFSC: "",
    BRANCH: "",
    CITY1: "",
    STATE: "",
  });

  const {
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    getPaginationInfo,
  } = usePagination({});

  const { data, totalItems, error, loading, fetchData } = useTableData();

  React.useEffect(() => {
    fetchData({
      currentPage,
      itemsPerPage,
      sortColumn,
      sortOrder,
      filters: columnFilters,
      searchQuery,
    });
  }, [
    currentPage,
    itemsPerPage,
    sortColumn,
    sortOrder,
    columnFilters,
    searchQuery,
    fetchData,
  ]);

  const handleSort = useCallback(
    (column) => {
      setSortOrder((prevOrder) => {
        if (column === sortColumn) {
          return prevOrder === "asc" ? "desc" : "asc";
        }
        return "asc";
      });
      setSortColumn(column);
    },
    [sortColumn]
  );

  const handleColumnFilterChange = useCallback(
    (column, value) => {
      setColumnFilters((prev) => ({
        ...prev,
        [column]: value,
      }));
      handlePageChange(1);
    },
    [handlePageChange]
  );

  const handleColumnFilterReset = useCallback(
    (column) => {
      setColumnFilters((prev) => ({
        ...prev,
        [column]: "",
      }));
      handlePageChange(1);
    },
    [handlePageChange]
  );

  const renderSortIcon = useCallback(
    (column) => {
      if (column === sortColumn) {
        return sortOrder === "asc" ? (
          <ArrowUp className="h-4 w-4 ml-2" />
        ) : (
          <ArrowDown className="h-4 w-4 ml-2" />
        );
      }
      return <ArrowDownUp className="h-4 w-4 ml-2" />;
    },
    [sortColumn, sortOrder]
  );

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  const paginationInfo = getPaginationInfo(totalItems);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Bank Details</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search all columns..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handlePageChange(1);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <div className="min-h-[500px] max-h-[500px] overflow-y-auto relative">
          {loading ? (
            <Spinner className="absolute inset-0 bg-white/80" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(columnFilters).map((column) => (
                    <TableHead key={column}>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={() => handleSort(column)}
                          >
                            {column} {renderSortIcon(column)}
                          </div>
                          <FilterPopover
                            column={column}
                            value={columnFilters[column]}
                            onChange={(value) =>
                              handleColumnFilterChange(column, value)
                            }
                            onReset={() => handleColumnFilterReset(column)}
                          />
                        </div>
                      </div>
                    </TableHead>
                  ))}
                  <TableHead>PHONE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((detail) => (
                  <TableRow key={detail._id}>
                    <TableCell>{detail.BANK}</TableCell>
                    <TableCell>
                      <Link
                        href={`/detail/${detail.IFSC}`}
                        className="text-blue-600 hover:underline"
                      >
                        {detail.IFSC}
                      </Link>
                    </TableCell>
                    <TableCell>{detail.BRANCH}</TableCell>
                    <TableCell>{detail.CITY1}</TableCell>
                    <TableCell>{detail.STATE}</TableCell>
                    <TableCell>{detail.PHONE || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center text-nowrap">
        <ItemsPerPage
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        />

        <PaginationControls
          currentPage={paginationInfo.currentPage}
          totalPages={paginationInfo.totalPages}
          onPageChange={handlePageChange}
        />
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Showing {paginationInfo.startIndex + 1} to {paginationInfo.endIndex}{" "}
            of {totalItems} results
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
