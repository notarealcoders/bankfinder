import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FilterSummary({ filters, onClear }) {
  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    if (key === "sortBy" || key === "sortOrder") return false;
    return value && value !== "";
  });

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-wrap gap-2">
        {activeFilters.map(([key, value]) => (
          <Badge key={key} variant="secondary">
            {key}: {value.toString()}
          </Badge>
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        className="h-6 px-2 text-xs"
      >
        <X className="h-3 w-3 mr-1" />
        Clear All
      </Button>
    </div>
  );
}