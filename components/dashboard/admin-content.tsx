"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Users,
  Server,
  Activity,
  Database,
  Cpu,
  Globe,
  Lock,
  Settings,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { AdminStats, AdminConfig } from "@/types/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AdminContent() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [config, setConfig] = useState<AdminConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const [statsData, configData] = await Promise.all([
        api.getAdminStats(),
        api.getAdminConfig(),
      ]);
      setStats(statsData);
      setConfig(configData);
      setNotification(configData.global_notification || "");
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
      toast.error("Failed to load real-time data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(true), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMaintenance = async () => {
    if (!config) return;
    setSaving(true);
    try {
      const newStatus = !config.maintenance_mode;
      await api.updateAdminConfig({ maintenance_mode: newStatus });
      setConfig({ ...config, maintenance_mode: newStatus });
      toast.success(`Maintenance mode ${newStatus ? "enabled" : "disabled"}`);
    } catch (err) {
      toast.error("Failed to update maintenance mode");
    } finally {
      setSaving(false);
    }
  };

  const handleBroadcast = async () => {
    setSaving(true);
    try {
      await api.updateAdminConfig({ global_notification: notification });
      if (config) setConfig({ ...config, global_notification: notification });
      toast.success("Broadcast message updated");
    } catch (err) {
      toast.error("Failed to update broadcast message");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="h-8 w-8 text-zinc-600 animate-spin" />
      </div>
    );
  }

  const statItems = [
    { name: "Total Users", value: stats?.total_users || "0", icon: Users, color: "text-blue-400" },
    { name: "Active Servers", value: stats?.active_servers || "0", icon: Server, color: "text-emerald-400" },
    { name: "API Latency", value: stats?.api_latency || "0ms", icon: Activity, color: "text-amber-400" },
    { name: "Database Size", value: stats?.db_size || "0 MB", icon: Database, color: "text-purple-400" },
  ];

  return (
    <div className="space-y-6 p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
            <Shield className="h-5 w-5 text-zinc-400" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-white tracking-tight">
              Admin Control Panel
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              Restricted access for ElyraX administrators only.
            </p>
          </div>
        </div>
        <Button
          onClick={() => fetchData(true)}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", refreshing && "animate-spin")} />
          {refreshing ? "Refreshing..." : "Real-time Mode"}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-5 hover:bg-[#0d0d0d] transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={cn("p-2 rounded-lg bg-white/[0.03]", stat.color)}>
                <stat.icon className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/[0.06] px-2 py-0.5 rounded-full border border-emerald-400/10">
                Live
              </span>
            </div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              {stat.name}
            </p>
            <h3 className="text-xl font-display font-bold text-white mt-0.5">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* System Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* API Health */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
          <div className="p-5 border-b border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 text-zinc-500" />
              <h3 className="text-sm font-semibold text-white">System Nodes Status</h3>
            </div>
            <span className="text-[10px] font-medium text-zinc-600">Auto-Polling Active</span>
          </div>
          <div className="p-5 space-y-3">
            {stats?.nodes.map((node) => {
              const Icon =
                node.icon === "Globe"
                  ? Globe
                  : node.icon === "Database"
                  ? Database
                  : node.icon === "Cpu"
                  ? Cpu
                  : Lock;
              const isHealthy = node.status === "Healthy";
              return (
                <div
                  key={node.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center">
                      <Icon className="h-4 w-4 text-zinc-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-white">{node.name}</h4>
                      <p className="text-[10px] text-zinc-600">Load: {node.load}</p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-full border",
                      isHealthy
                        ? "bg-emerald-400/[0.06] border-emerald-400/10"
                        : "bg-amber-400/[0.06] border-amber-400/10"
                    )}
                  >
                    <div
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        isHealthy ? "bg-emerald-400" : "bg-amber-400"
                      )}
                    />
                    <span
                      className={cn(
                        "text-[11px] font-medium",
                        isHealthy ? "text-emerald-400" : "text-amber-400"
                      )}
                    >
                      {node.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Config */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden flex flex-col">
          <div className="p-5 border-b border-white/[0.04] flex items-center gap-3">
            <Settings className="h-4 w-4 text-zinc-500" />
            <h3 className="text-sm font-semibold text-white">Global Settings</h3>
          </div>
          <div className="p-5 flex-1 space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Maintenance Mode
              </label>
              <button
                onClick={handleToggleMaintenance}
                disabled={saving}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg border transition-all",
                  config?.maintenance_mode
                    ? "bg-red-500/[0.06] border-red-500/20 text-red-400"
                    : "bg-white/[0.02] border-white/[0.06] text-zinc-300 hover:bg-white/[0.04]"
                )}
              >
                <span className="text-xs font-medium">
                  {config?.maintenance_mode ? "Restricting Access" : "Standard Operations"}
                </span>
                <div
                  className={cn(
                    "h-5 w-9 rounded-full relative transition-colors duration-200",
                    config?.maintenance_mode ? "bg-red-500" : "bg-zinc-700"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 h-4 w-4 bg-white rounded-full transition-all duration-200 shadow-sm",
                      config?.maintenance_mode ? "left-[18px]" : "left-0.5"
                    )}
                  />
                </div>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Global Notification
              </label>
              <Textarea
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
                className="w-full h-28 bg-white/[0.02] border-white/[0.06] rounded-lg p-3 text-xs text-zinc-300 focus:outline-none focus:border-white/15 resize-none"
                placeholder="Message to display across all dashboards..."
              />
            </div>

            <Button
              onClick={handleBroadcast}
              disabled={saving}
              variant="default"
              size="sm"
              className="w-full"
            >
              {saving ? "Processing..." : "Broadcast Message"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
