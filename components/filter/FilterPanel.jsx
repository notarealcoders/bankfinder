import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocatorQuery } from "@/hooks/queries/useLocator";

export default function FilterPanel({ filters, onFilterChange }) {
  const { banks, states, cities } = useLocatorQuery({
    bank: filters.bank,
    state: filters.state,
  });

  const sortOptions = [
    { value: "BANK", label: "Bank Name" },
    { value: "STATE", label: "State" },
    { value: "CITY1", label: "City" },
    { value: "BRANCH", label: "Branch" },
  ];

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Bank</Label>
            <Select
              value={filters.bank}
              onValueChange={(value) =>
                onFilterChange({ ...filters, bank: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Bank" />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank} value={bank}>
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>State</Label>
            <Select
              value={filters.state}
              onValueChange={(value) =>
                onFilterChange({ ...filters, state: value })
              }
              disabled={!filters.bank}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>City</Label>
            <Select
              value={filters.city}
              onValueChange={(value) =>
                onFilterChange({ ...filters, city: value })
              }
              disabled={!filters.state}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                onFilterChange({ ...filters, sortBy: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sort Order</Label>
            <Select
              value={filters.sortOrder}
              onValueChange={(value) =>
                onFilterChange({ ...filters, sortOrder: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort order..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="hasPhone"
            checked={filters.hasPhone}
            onCheckedChange={(checked) =>
              onFilterChange({ ...filters, hasPhone: checked })
            }
          />
          <Label htmlFor="hasPhone">Has Phone Number</Label>
        </div>
      </CardContent>
    </Card>
  );
}