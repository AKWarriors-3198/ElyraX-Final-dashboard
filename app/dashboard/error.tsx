"use client";

import React, { useEffect } from "react";
import { ErrorState } from "@/components/elyrax-error-state";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <ErrorState
      title="Something went wrong"
      description="We couldn't load this page. Please try again."
      onRetry={() => reset()}
    />
  );
}
