import React from "react";
import { Ticket } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const TicketsForm = dynamic(
  () => import("@/components/dashboard/tickets-form").then((mod) => mod.TicketsForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function TicketsPage({ params }: { params: { guildId: string } }) {
  const config = await api.getTickets(params.guildId);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Ticket System"
        description="Create a support ticket system for your community."
        icon={Ticket}
      />
      <TicketsForm initialConfig={config} guildId={params.guildId} />
    </div>
  );
}
