import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, X } from "lucide-react";

export function FilterPopover({ column, value, onChange, onReset }) {
  const [tempValue, setTempValue] = React.useState(value);
  const [open, setOpen] = React.useState(false);

  const handleApply = () => {
    onChange(tempValue);
    setOpen(false);
  };

  const handleReset = () => {
    setTempValue("");
    onReset();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${
            value
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : ""
          }`}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filter {column}</h4>
            <Input
              placeholder={`Enter ${column}...`}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApply();
                }
              }}
            />
          </div>
          <div className="flex flex-row-reverse justify-start gap-2">
            <Button
              variant="destructive"
              size="sm"
              className="px-3"
              onClick={handleReset}
            >
              {/* <X className="mr-2 h-4 w-4" /> */}
              Reset
            </Button>
            <Button size="sm" className="px-3" onClick={handleApply}>
              Apply Filter
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
