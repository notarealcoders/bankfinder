import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ExportButton = ({ data }) => {
  const handleExport = () => {
    const csvContent = [
      ["Bank", "IFSC", "Branch", "Address", "City", "State", "Phone"],
      [
        data.BANK,
        data.IFSC,
        data.BRANCH,
        data.ADDRESS,
        data.CITY1,
        data.STATE,
        data.PHONE,
      ],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bank-details-${data.IFSC}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} variant="outline" size="sm">
      <Download className="mr-2 h-4 w-4" />
      Export
    </Button>
  );
};
export default ExportButton;
