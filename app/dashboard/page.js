"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import DashboardChart from "@/components/dashboard/DashboardChart";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentSearches from "@/components/dashboard/RecentSearches";

export default function DashboardPage() {
  const { stats, loading, error } = useDashboardStats();

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <StatsGrid stats={stats} loading={loading} />

      <div className="grid md:grid-cols-2 gap-6">
        <DashboardChart data={stats?.bankDistribution} loading={loading} />
        <RecentSearches />
      </div>
    </div>
  );
}
