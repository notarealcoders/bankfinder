"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocatorQuery } from "@/hooks/queries/useLocator";
import LocationForm from "@/components/locate/LocationForm";
import { Card } from "@/components/ui/card";

export default function LocatePage() {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const { banks, states, cities, branches, isLoading, error } = useLocatorQuery(
    {
      bank: selectedBank,
      state: selectedState,
      city: selectedCity,
    }
  );

  const handleReset = () => {
    setSelectedBank("");
    setSelectedState("");
    setSelectedCity("");
    setSelectedBranch("");
  };

  const handleViewDetails = () => {
    if (!selectedBank || !selectedState || !selectedCity || !selectedBranch) {
      return;
    }

    const params = new URLSearchParams({
      filter_bank: selectedBank,
      filter_state: selectedState,
      filter_city1: selectedCity,
      filter_branch: selectedBranch,
    });

    router.push(`/details?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Locate Bank Branch</h1>

      <Card className="p-6">
        <LocationForm
          banks={banks}
          states={states}
          cities={cities}
          branches={branches}
          selectedBank={selectedBank}
          selectedState={selectedState}
          selectedCity={selectedCity}
          selectedBranch={selectedBranch}
          onBankChange={setSelectedBank}
          onStateChange={setSelectedState}
          onCityChange={setSelectedCity}
          onBranchChange={setSelectedBranch}
          onReset={handleReset}
          onSubmit={handleViewDetails}
          isLoading={isLoading}
          error={error}
        />
      </Card>
    </div>
  );
}
