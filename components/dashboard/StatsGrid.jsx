import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Landmark } from "lucide-react";
import Spinner from "@/components/ui/spinner";

const StatCard = ({ title, value, icon: Icon, loading }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {loading ? <Spinner className="h-6 w-6" /> : value.toLocaleString()}
      </div>
    </CardContent>
  </Card>
);

export default function StatsGrid({ stats, loading }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Branches"
        value={stats?.totalBranches || 0}
        icon={Building2}
        loading={loading}
      />
      <StatCard
        title="Total Banks"
        value={stats?.bankDistribution?.length || 0}
        icon={Landmark}
        loading={loading}
      />
      <StatCard
        title="States Covered"
        value={stats?.stateDistribution?.length || 0}
        icon={MapPin}
        loading={loading}
      />
    </div>
  );
}
