"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function RetryStatsButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="mt-2 text-xs"
      onClick={() => window.location.reload()}
    >
      <RefreshCw className="h-3 w-3 mr-1" />
      Retry
    </Button>
  );
}
