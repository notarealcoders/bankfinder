import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocator } from "@/hooks/useLocator";

const BranchSelector = ({ value, onChange }) => {
  const {
    banks,
    states,
    cities,
    branches,
    selectedBank,
    selectedState,
    selectedCity,
    selectedBranch,
    handleBankChange,
    handleStateChange,
    handleCityChange,
    handleBranchChange,
  } = useLocator();

  const handleBranchSelection = async (branch) => {
    if (!selectedBank || !selectedState || !selectedCity || !branch) return;

    try {
      const response = await fetch(
        `/api/locate?${new URLSearchParams({
          bank: selectedBank,
          state: selectedState,
          city: selectedCity,
          branch,
        })}`
      );
      const data = await response.json();

      if (data.success && data.data) {
        onChange(data.data);
      }
    } catch (error) {
      console.error("Error fetching branch details:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Branch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedBank} onValueChange={handleBankChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Bank" />
          </SelectTrigger>
          <SelectContent>
            {Array.isArray(banks) &&
              banks.map((bank) => (
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
            {Array.isArray(states) &&
              states.map((state) => (
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
            {Array.isArray(cities) &&
              cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedBranch}
          onValueChange={(branch) => {
            handleBranchChange(branch);
            handleBranchSelection(branch);
          }}
          disabled={!selectedCity}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            {Array.isArray(branches) &&
              branches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
