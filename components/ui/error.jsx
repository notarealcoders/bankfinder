import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

export function ErrorMessage({ message, retry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <AlertTriangle className="h-12 w-12 text-destructive" />
      <p className="text-lg font-medium">{message}</p>
      {retry && (
        <Button onClick={retry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}