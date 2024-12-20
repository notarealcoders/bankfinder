import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Spinner from "@/components/ui/spinner";

const BankStats = ({ data, loading }) => {
  if (loading || !data) {
    return (
      <div className="grid gap-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Branch Distribution by State</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <Spinner />
          </CardContent>
        </Card>
      </div>
    );
  }

  const stateData = data.stateDistribution.map((item) => ({
    name: item._id,
    branches: item.count,
  }));

  return (
    <div className="grid gap-4">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Branch Distribution by State</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="branches" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Branches</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.branchCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cities Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.cityDistribution.length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BankStats;
