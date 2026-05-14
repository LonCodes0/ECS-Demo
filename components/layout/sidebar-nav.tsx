"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  FileText,
  Gauge,
  LayoutGrid,
  Leaf,
  Settings,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";

import { EcsLogo } from "@/components/visuals/ecs-logo";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Dashboard", icon: Gauge },
  { href: "/overview", label: "Overview", icon: LayoutGrid },
  { href: "/forecast", label: "Forecast", icon: Activity },
  { href: "/variables", label: "Variables", icon: Waves },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/alerts", label: "Alerts", icon: AlertTriangle },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/benchmarks", label: "Benchmarks", icon: ShieldCheck },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="glass-panel hidden w-[280px] shrink-0 rounded-[2rem] border border-white/35 bg-[linear-gradient(180deg,#06150f_0%,#0b1f17_55%,#11281f_100%)] p-5 text-white shadow-[0_24px_55px_-28px_rgba(4,14,10,0.7)] lg:flex lg:min-h-[calc(100dvh-2.5rem)] lg:flex-col">
      <div className="flex items-center gap-3 border-b border-white/10 pb-5">
        <EcsLogo />
        <div>
          <div className="text-[2rem] font-semibold tracking-[-0.04em]">ECS</div>
          <div className="text-sm text-emerald-100/70">
            Environmental Card System
          </div>
        </div>
      </div>

      <nav className="mt-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-[1px]",
                isActive
                  ? "bg-emerald-500/22 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-emerald-300/25"
                  : "text-emerald-50/78 hover:bg-white/6 hover:text-white",
              )}
            >
              <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 pt-8">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/55">
            System Status
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.55)]" />
              Stable
            </span>
            <Leaf className="h-4 w-4 text-emerald-300" strokeWidth={1.8} />
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/55">
            Model Status
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.55)]" />
              Online
            </span>
            <Sparkles className="h-4 w-4 text-emerald-300" strokeWidth={1.8} />
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/4 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/7 text-sm font-semibold">
            AA
          </div>
          <div>
            <div className="text-sm font-medium">Amina Alharbi</div>
            <div className="text-xs text-emerald-100/55">Lead Demonstrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
