import React from "react";
import { Activity } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const TrackingForm = dynamic(
  () => import("@/components/dashboard/tracking-form").then((mod) => mod.TrackingForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function TrackingPage({ params }: { params: { guildId: string } }) {
  const config = await api.getTracking(params.guildId);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Tracking"
        description="Track user activity and server metrics."
        icon={Activity}
      />
      <TrackingForm initialConfig={config} guildId={params.guildId} />
    </div>
  );
}
