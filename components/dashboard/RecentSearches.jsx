import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecentSearches } from "@/lib/storage/recentSearches";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function RecentSearches() {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    setSearches(getRecentSearches());
  }, []);

  if (searches.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Searches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {searches.map((search, index) => (
            <Link
              key={search.ifsc}
              href={`/detail/${search.ifsc}`}
              className="block p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="font-medium">{search.bank}</div>
              <div className="text-sm text-muted-foreground">
                {search.branch}, {search.city}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                IFSC: {search.ifsc}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
