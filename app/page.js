import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import { initializeCache } from "@/lib/cache/initCache";

// In your startup code
await initializeCache();

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Bank Branch Finder</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/locate">
          <Button size="lg" className="w-full sm:w-auto">
            <MapPin className="mr-2 h-5 w-5" />
            Locate Branch
          </Button>
        </Link>
        <Link href="/details">
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            <Search className="mr-2 h-5 w-5" />
            Search All Branches
          </Button>
        </Link>
      </div>
    </div>
  );
}
