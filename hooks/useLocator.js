import { useState, useEffect, useCallback } from "react";

export function useLocator() {
  const [banks, setBanks] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);

  const [selectedBank, setSelectedBank] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDistinctValues = useCallback(async (field, query = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ distinct: field, ...query });
      const response = await fetch(`/api/details?${params}`);
      const result = await response.json();

      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(`Failed to fetch ${field}: ${err.message}`);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch banks on mount
  useEffect(() => {
    fetchDistinctValues("BANK").then(setBanks);
  }, [fetchDistinctValues]);

  // Fetch states when bank changes
  useEffect(() => {
    if (selectedBank) {
      fetchDistinctValues("STATE", { bank: selectedBank }).then(setStates);
      setSelectedState("");
      setSelectedCity("");
      setSelectedBranch("");
    } else {
      setStates([]);
    }
  }, [selectedBank, fetchDistinctValues]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedState) {
      fetchDistinctValues("CITY1", {
        bank: selectedBank,
        state: selectedState,
      }).then(setCities);
      setSelectedCity("");
      setSelectedBranch("");
    } else {
      setCities([]);
    }
  }, [selectedState, selectedBank, fetchDistinctValues]);

  // Fetch branches when city changes
  useEffect(() => {
    if (selectedCity) {
      fetchDistinctValues("BRANCH", {
        bank: selectedBank,
        state: selectedState,
        city: selectedCity,
      }).then(setBranches);
      setSelectedBranch("");
    } else {
      setBranches([]);
    }
  }, [selectedCity, selectedState, selectedBank, fetchDistinctValues]);

  const handleBankChange = (value) => {
    setSelectedBank(value);
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  const handleBranchChange = (value) => {
    setSelectedBranch(value);
  };

  const handleReset = () => {
    setSelectedBank("");
    setSelectedState("");
    setSelectedCity("");
    setSelectedBranch("");
    setError(null);
  };

  return {
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
  };
}
