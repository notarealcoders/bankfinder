"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Spinner from "@/components/ui/spinner";
import LocationSelect from "@/components/locate/LocationSelect";
import { fetchDistinctValues } from "@/lib/api/bankApi";

export default function LocatePage() {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);

  // Fetch banks on mount
  useEffect(() => {
    fetchDistinctValues("BANK", {}, setLoading).then(setBanks);
  }, []);

  // Fetch states when bank changes
  useEffect(() => {
    if (selectedBank) {
      fetchDistinctValues("STATE", { bank: selectedBank }, setLoading).then(
        (data) => {
          setStates(data);
          setSelectedState("");
          setSelectedCity("");
          setSelectedBranch("");
        }
      );
    } else {
      setStates([]);
    }
  }, [selectedBank]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedBank && selectedState) {
      fetchDistinctValues(
        "CITY1",
        { bank: selectedBank, state: selectedState },
        setLoading
      ).then((data) => {
        setCities(data);
        setSelectedCity("");
        setSelectedBranch("");
      });
    } else {
      setCities([]);
    }
  }, [selectedBank, selectedState]);

  // Fetch branches when city changes
  useEffect(() => {
    if (selectedBank && selectedState && selectedCity) {
      fetchDistinctValues(
        "BRANCH",
        { bank: selectedBank, state: selectedState, city: selectedCity },
        setLoading
      ).then((data) => {
        setBranches(data);
        setSelectedBranch("");
      });
    } else {
      setBranches([]);
    }
  }, [selectedBank, selectedState, selectedCity]);

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

      <Card>
        <CardHeader>
          <CardTitle>Select Branch Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <LocationSelect
            label="Bank"
            value={selectedBank}
            onChange={setSelectedBank}
            options={banks}
          />

          <LocationSelect
            label="State"
            value={selectedState}
            onChange={setSelectedState}
            options={states}
            disabled={!selectedBank}
          />

          <LocationSelect
            label="City"
            value={selectedCity}
            onChange={setSelectedCity}
            options={cities}
            disabled={!selectedState}
          />

          <LocationSelect
            label="Branch"
            value={selectedBranch}
            onChange={setSelectedBranch}
            options={branches}
            disabled={!selectedCity}
          />

          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full"
              disabled={!selectedBank || loading}
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

          {loading && <Spinner />}
        </CardContent>
      </Card>
    </div>
  );
}
