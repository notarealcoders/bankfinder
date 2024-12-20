"use client";

import { useState } from "react";
import BranchSelector from "@/components/compare/BranchSelector";
import ComparisonTable from "@/components/compare/ComparisonTable";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ComparePage() {
  const [branches, setBranches] = useState([null, null]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Compare Branches</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {branches.map((branch, index) => (
          <BranchSelector
            key={index}
            value={branch}
            onChange={(newBranch) => {
              const newBranches = [...branches];
              newBranches[index] = newBranch;
              setBranches(newBranches);
            }}
          />
        ))}
      </div>

      {branches[0] && branches[1] && <ComparisonTable branches={branches} />}
    </div>
  );
}
