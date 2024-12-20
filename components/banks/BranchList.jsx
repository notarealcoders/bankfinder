import React, { useState, useEffect } from "react";
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

const BranchList = ({ bankName }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(
          `/api/details?filter_bank=${encodeURIComponent(bankName)}&limit=10`
        );
        const data = await response.json();

        if (data.success) {
          setBranches(data.data);
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (bankName) {
      fetchBranches();
    }
  }, [bankName]);

  if (loading) {
    return (
      <Card className="p-4">
        <div className="h-[200px] flex items-center justify-center">
          <Spinner />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <p className="text-red-500">Error: {error}</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>IFSC</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>City</TableHead>
            <TableHead>State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branches.map((branch) => (
            <TableRow key={branch.IFSC}>
              <TableCell>
                <Link
                  href={`/detail/${branch.IFSC}`}
                  className="text-blue-600 hover:underline"
                >
                  {branch.IFSC}
                </Link>
              </TableCell>
              <TableCell>{branch.BRANCH}</TableCell>
              <TableCell>{branch.CITY1}</TableCell>
              <TableCell>{branch.STATE}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default BranchList;
