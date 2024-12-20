"use client";

import { useEffect, useState, use } from "react";
import { useBankInfo } from "@/hooks/useBankInfo";
import BankStats from "@/components/banks/BankStats";
import BranchList from "@/components/banks/BranchList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BankPage({ params }) {
  const { bank } = use(params);
  const { data, loading, error } = useBankInfo(bank);

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">{decodeURIComponent(bank)}</h1>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <BankStats data={data} loading={loading} />
        </TabsContent>

        <TabsContent value="branches">
          <BranchList bankName={bank} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
