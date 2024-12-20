import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Home } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            <span className="font-bold text-xl">Bank Finder</span>
          </Link>

          <div className="flex gap-4">
            <Link href="/locate">
              <Button variant="ghost" size="sm">
                <MapPin className="mr-2 h-4 w-4" />
                Locate Branch
              </Button>
            </Link>
            <Link href="/details">
              <Button variant="ghost" size="sm">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
