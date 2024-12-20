import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function LocationForm({
  banks,
  states,
  cities,
  branches,
  selectedBank,
  selectedState,
  selectedCity,
  selectedBranch,
  onBankChange,
  onStateChange,
  onCityChange,
  onBranchChange,
  onReset,
  onSubmit,
  isLoading,
  error,
}) {
  return (
    <div className="space-y-4">
      <Select value={selectedBank} onValueChange={onBankChange}>
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

      <Select
        value={selectedState}
        onValueChange={onStateChange}
        disabled={!selectedBank}
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

      <Select
        value={selectedCity}
        onValueChange={onCityChange}
        disabled={!selectedState}
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

      <Select
        value={selectedBranch}
        onValueChange={onBranchChange}
        disabled={!selectedCity}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Branch" />
        </SelectTrigger>
        <SelectContent>
          {branches.map((branch) => (
            <SelectItem key={branch} value={branch}>
              {branch}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          onClick={onReset}
          className="w-full"
          disabled={!selectedBank || isLoading}
        >
          Reset
        </Button>
        <Button
          className="w-full"
          onClick={onSubmit}
          disabled={!selectedBranch || isLoading}
        >
          <MapPin className="mr-2 h-4 w-4" />
          View Branch Details
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm mt-4">{error.message}</p>}
    </div>
  );
}
