import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const ComparisonTable = ({ branches = [] }) => {
  const fields = [
    { key: "BANK", label: "Bank" },
    { key: "IFSC", label: "IFSC" },
    { key: "BRANCH", label: "Branch" },
    { key: "CITY1", label: "City" },
    { key: "STATE", label: "State" },
    { key: "ADDRESS", label: "Address" },
    { key: "PHONE", label: "Phone" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Branch Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Field</TableHead>
              <TableHead>Branch 1</TableHead>
              <TableHead>Branch 2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map(({ key, label }) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{label}</TableCell>
                <TableCell>
                  {key === "IFSC" && branches[0]?.[key] ? (
                    <Link
                      href={`/detail/${branches[0][key]}`}
                      className="text-blue-600 hover:underline"
                    >
                      {branches[0][key]}
                    </Link>
                  ) : (
                    branches[0]?.[key] || "N/A"
                  )}
                </TableCell>
                <TableCell>
                  {key === "IFSC" && branches[1]?.[key] ? (
                    <Link
                      href={`/detail/${branches[1][key]}`}
                      className="text-blue-600 hover:underline"
                    >
                      {branches[1][key]}
                    </Link>
                  ) : (
                    branches[1]?.[key] || "N/A"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
