"use client";

import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { ElyraXBackground } from "@/components/elyrax-background";
import { ElyraXSidebar } from "@/components/elyrax-sidebar";
import { ElyraXHeader } from "@/components/elyrax-header";
import { ElyraXLoading } from "@/components/elyrax-loading";
import { SidebarProvider, useSidebar } from "@/components/elyrax-sidebar-context";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { status } = useSession();
  const { open } = useSidebar();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      signIn("discord");
      return;
    }
    setIsLoading(false);
  }, [status]);

  if (isLoading || status === "loading") {
    return <ElyraXLoading duration={1200} />;
  }

  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <ElyraXBackground />
      <ElyraXSidebar />

      {/* Main Content */}
      <div className="lg:pl-[260px] flex flex-col min-h-screen relative z-10">
        <ElyraXHeader onMenuClick={open} />
        <main className="flex-1">
          <div className="max-w-[1400px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardShell>{children}</DashboardShell>
    </SidebarProvider>
  );
}
