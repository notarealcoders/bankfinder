"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import BankDetailCard from "@/components/bank/BankDetailCard";
import BankDescription from "@/components/bank/BankDescription";
import IFSCInfo from "@/components/bank/IFSCInfo";
import FAQAccordion from "@/components/bank/FAQAccordion";
import BankMap from "@/components/features/BankMap";
import ShareButton from "@/components/features/ShareButton";
import ExportButton from "@/components/features/ExportButton";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Toaster } from "sonner";

const BankDetailPage = ({ params }) => {
  const { ifsc } = use(params);
  const router = useRouter();
  const [detail, setDetail] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`/api/detail/${ifsc}`);
        const data = await response.json();

        if (data.success) {
          setDetail(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch bank details");
      } finally {
        setLoading(false);
      }
    };

    if (ifsc) {
      fetchDetail();
    }
  }, [ifsc]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p>No details found for the given IFSC code.</p>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-6 flex justify-between items-center">
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="flex gap-2">
            <ShareButton branchData={detail} />
            <ExportButton data={detail} />
          </div>
        </div>

        <div className="space-y-8">
          <BankDetailCard detail={detail} />
          <div className="grid md:grid-cols-2 gap-8">
            <BankDescription bank={detail} />
            <BankMap
              address={detail.ADDRESS}
              city={detail.CITY1}
              state={detail.STATE}
            />
          </div>
          <IFSCInfo />
          <FAQAccordion />
        </div>
      </div>
    </>
  );
};

export default BankDetailPage;
