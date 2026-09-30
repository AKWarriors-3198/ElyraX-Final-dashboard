"use client";

import { Button } from "@/components/ui/button";

export function RetryButton() {
  return (
    <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
      Retry Connection
    </Button>
  );
}
