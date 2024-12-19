"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocator } from "@/hooks/useLocator";

export default function LocatePage() {
  const router = useRouter();
  const {
    banks,
    states,
    cities,
    branches,
    selectedBank,
    selectedState,
    selectedCity,
    selectedBranch,
    loading,
    error,
    handleBankChange,
    handleStateChange,
    handleCityChange,
    handleBranchChange,
    handleReset,
  } = useLocator();

  const handleViewDetails = () => {
    if (!selectedBank || !selectedState || !selectedCity || !selectedBranch) {
      return;
    }

    // Encode the values to handle special characters
    const params = new URLSearchParams();
    params.set("filter_bank", encodeURIComponent(selectedBank));
    params.set("filter_state", encodeURIComponent(selectedState));
    params.set("filter_city1", encodeURIComponent(selectedCity));
    params.set("filter_branch", encodeURIComponent(selectedBranch));

    router.push(`/details?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Locate Bank Branch</h1>

      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <Select value={selectedBank} onValueChange={handleBankChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Bank" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank} value={bank}>
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedState}
            onValueChange={handleStateChange}
            disabled={!selectedBank}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedCity}
            onValueChange={handleCityChange}
            disabled={!selectedState}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedBranch}
            onValueChange={handleBranchChange}
            disabled={!selectedCity}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full"
            disabled={!selectedBank}
          >
            Reset
          </Button>
          <Button
            className="w-full"
            onClick={handleViewDetails}
            disabled={!selectedBranch || loading}
          >
            <MapPin className="mr-2 h-4 w-4" />
            View Branch Details
          </Button>
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </Card>
    </div>
  );
}
