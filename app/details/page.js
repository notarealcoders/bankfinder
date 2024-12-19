"use client";

import React, { useState, useEffect } from "react";
import PaginationControls from "@/components/pagination/PaginationControls";
import ItemsPerPage from "@/components/pagination/ItemsPerPage";
import ColumnFilter from "@/components/filters/ColumnFilter";
import { filterData, searchData } from "@/lib/utils/filters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ArrowUp, ArrowDown, ArrowDownUp } from "lucide-react";

const DetailsPage = () => {
  // State management
  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [allItems, setAllItems] = useState(0);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `/api/details?page=${currentPage}&limit=${itemsPerPage}&sort=${sortColumn}&order=${sortOrder}&search=${searchQuery}`
        );
        const data = await response.json();

        if (data.success) {
          setDetails(data.data);
          setTotalItems(data.total);
          setAllItems(data.total);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchDetails();
  }, [currentPage, itemsPerPage, sortColumn, sortOrder, searchQuery]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? (
        <ArrowUp className="h-4 w-4 ml-2" />
      ) : (
        <ArrowDown className="h-4 w-4 ml-2" />
      );
    }
    return <ArrowDownUp className="h-4 w-4 ml-2" />;
  };

  const handleColumnFilterChange = (column, value) => {
    setColumnFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Bank Details</h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search all columns..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(columnFilters).map((column) => (
                <TableHead key={column}>
                  <div className="space-y-2">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort(column)}
                    >
                      {column} {renderSortIcon(column)}
                    </div>
                    <ColumnFilter
                      column={column}
                      value={columnFilters[column]}
                      onChange={(value) =>
                        handleColumnFilterChange(column, value)
                      }
                    />
                  </div>
                </TableHead>
              ))}
              <TableHead>PHONE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {details.map((detail) => (
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
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <ItemsPerPage
          value={itemsPerPage}
          onChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Results Summary */}
      <div className="mt-4 text-sm text-gray-600">
        <p>
          Showing {Math.min(itemsPerPage, details.length)} of {totalItems}{" "}
          results
          {searchQuery && ` (filtered from ${allItems} total records)`}
        </p>
      </div>
    </div>
  );
};

export default DetailsPage;
