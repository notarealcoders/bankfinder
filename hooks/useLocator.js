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
      setError(null);

      // Build query parameters
      const queryParams = new URLSearchParams({
        distinct: field,
        ...Object.fromEntries(
          Object.entries(query).filter(([_, value]) => value !== "")
        ),
      });

      const response = await fetch(`/api/details?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch data");
      }

      return result.data;
    } catch (err) {
      setError(`Failed to fetch ${field}: ${err.message}`);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch banks on mount
  useEffect(() => {
    fetchDistinctValues("BANK").then((data) => {
      setBanks(data);
    });
  }, [fetchDistinctValues]);

  // Fetch states when bank changes
  useEffect(() => {
    if (selectedBank) {
      fetchDistinctValues("STATE", { bank: selectedBank }).then((data) => {
        setStates(data);
        setSelectedState("");
        setSelectedCity("");
        setSelectedBranch("");
      });
    } else {
      setStates([]);
      setSelectedState("");
      setSelectedCity("");
      setSelectedBranch("");
    }
  }, [selectedBank, fetchDistinctValues]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedBank && selectedState) {
      fetchDistinctValues("CITY1", {
        bank: selectedBank,
        state: selectedState,
      }).then((data) => {
        setCities(data);
        setSelectedCity("");
        setSelectedBranch("");
      });
    } else {
      setCities([]);
      setSelectedCity("");
      setSelectedBranch("");
    }
  }, [selectedState, selectedBank, fetchDistinctValues]);

  // Fetch branches when city changes
  useEffect(() => {
    if (selectedBank && selectedState && selectedCity) {
      fetchDistinctValues("BRANCH", {
        bank: selectedBank,
        state: selectedState,
        city: selectedCity,
      }).then((data) => {
        setBranches(data);
        setSelectedBranch("");
      });
    } else {
      setBranches([]);
      setSelectedBranch("");
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
