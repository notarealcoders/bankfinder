import { useState, useEffect } from "react";

export function useBankInfo(bankName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBankInfo() {
      try {
        const response = await fetch(`/api/banks/${bankName}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (bankName) {
      fetchBankInfo();
    }
  }, [bankName]);

  return { data, loading, error };
}
