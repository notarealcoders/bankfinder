"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // To handle navigation

const IFSCDetailPage = ({ params }) => {
  const { ifsc } = params;
  console.log("ifsc", ifsc); // Get the dynamic IFSC code from the URL
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/api/detail/${ifsc}`); // API endpoint for fetching details by IFSC
        const data = await response.json();

        if (data.success) {
          setDetail(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (ifsc) {
      fetchDetails();
    }
  }, [ifsc]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!detail) {
    return <div>No details found for the given IFSC code.</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Bank Details</h1>
      <div className="border p-4 rounded-lg shadow-md bg-white">
        <p>
          <strong>Bank Name:</strong> {detail.BANK}
        </p>
        <p>
          <strong>IFSC Code:</strong> {detail.IFSC}
        </p>
        <p>
          <strong>Branch:</strong> {detail.BRANCH}
        </p>
        <p>
          <strong>Address:</strong> {detail.ADDRESS}
        </p>
        <p>
          <strong>City:</strong> {detail.CITY1}
        </p>
        <p>
          <strong>State:</strong> {detail.STATE}
        </p>
        <p>
          <strong>Phone:</strong> {detail.PHONE || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default IFSCDetailPage;
