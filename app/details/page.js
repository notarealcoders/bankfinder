"use client";
import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, ArrowDown, ArrowDownUp } from "lucide-react"; // Importing icons
import Link from "next/link";

const DetailsPage = () => {
  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0); // Filtered total items
  const [allItems, setAllItems] = useState(0); // Total number of all items
  const [error, setError] = useState(null);
  const [sortColumn, setSortColumn] = useState("BANK"); // Default sorting column
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `/api/details?page=${currentPage}&limit=${itemsPerPage}&sort=${sortColumn}&order=${sortOrder}&search=${searchQuery}`
        );
        const data = await response.json();

        if (data.success) {
          setDetails(data.data);
          setTotalItems(data.total); // Total items after filtering
          setAllItems(data.allItems); // Total items before filtering
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchDetails();
  }, [currentPage, itemsPerPage, sortColumn, sortOrder, searchQuery]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to determine if the page should be displayed
  const shouldDisplayPage = (pageNumber) => {
    return (
      pageNumber === 1 ||
      pageNumber === totalPages ||
      pageNumber === currentPage ||
      Math.abs(pageNumber - currentPage) <= 1
    );
  };

  // Handle sorting when a header is clicked
  const handleSort = (column) => {
    if (column === sortColumn) {
      // Toggle sort order if the same column is clicked
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc"); // Default to ascending when a new column is clicked
    }
  };

  // Function to render the sort icon based on current sort state
  const renderSortIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? (
        <ArrowUp className="h-4 w-4 ml-2" />
      ) : (
        <ArrowDown className="h-4 w-4 ml-2" />
      );
    }
    return <ArrowDownUp className="h-4 w-4 ml-2" />; // Neutral state
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Details</h1>
      {/* Search and Total Items */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <div>
          <p className="text-sm">
            Total Items: <span className="font-bold">{allItems}</span>
          </p>
          <p className="text-sm">
            Filtered Items: <span className="font-bold">{totalItems}</span>
          </p>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("BANK")}>
              BANK <span>{renderSortIcon("BANK")}</span>
            </TableHead>
            <TableHead onClick={() => handleSort("IFSC")}>
              IFSC <span>{renderSortIcon("IFSC")}</span>
            </TableHead>
            <TableHead onClick={() => handleSort("BRANCH")}>
              BRANCH <span>{renderSortIcon("BRANCH")}</span>
            </TableHead>
            <TableHead onClick={() => handleSort("ADDRESS")}>
              ADDRESS <span>{renderSortIcon("ADDRESS")}</span>
            </TableHead>
            <TableHead onClick={() => handleSort("CITY1")}>
              CITY <span>{renderSortIcon("CITY1")}</span>
            </TableHead>
            <TableHead onClick={() => handleSort("STATE")}>
              STATE <span>{renderSortIcon("STATE")}</span>
            </TableHead>
            <TableHead onClick={() => handleSort("PHONE")}>
              PHONE <span>{renderSortIcon("PHONE")}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {details.map((detail) => (
            <TableRow key={detail._id}>
              <TableCell>{detail.BANK}</TableCell>
              <Link href={`/detail/${detail.IFSC}`}>
                <TableCell>{detail.IFSC}</TableCell>
              </Link>
              <TableCell>{detail.BRANCH}</TableCell>
              <TableCell>{detail.ADDRESS}</TableCell>
              <TableCell>{detail.CITY1}</TableCell>
              <TableCell>{detail.STATE}</TableCell>
              <TableCell>{detail.PHONE}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span>Items per page: </span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />

            {/* Show first page if not currently on it */}
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink
                  isActive={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Show ellipsis if there are skipped pages */}
            {currentPage > 3 && <PaginationEllipsis />}

            {/* Display the pages close to current page */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              if (shouldDisplayPage(pageNumber)) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={currentPage === pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              return null;
            })}

            {/* Show ellipsis if there are skipped pages */}
            {currentPage < totalPages - 2 && <PaginationEllipsis />}

            {/* Show last page if not currently on it */}
            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink
                  isActive={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default DetailsPage;
