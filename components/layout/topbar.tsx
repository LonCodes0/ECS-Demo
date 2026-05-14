"use client";

import { useEffect, useState } from "react";
import { Bell, CalendarDays, MapPin } from "lucide-react";

import { ScenarioSwitcher } from "@/components/visuals/scenario-switcher";

function formatRiyadhParts(date: Date) {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Riyadh",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Riyadh",
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    date: dateFormatter.format(date),
    time: timeFormatter.format(date),
  };
}

export function TopBar() {
  const [now, setNow] = useState(() => formatRiyadhParts(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(formatRiyadhParts(new Date()));
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="glass-panel sticky top-3 z-20 rounded-[2rem] border border-white/55 px-4 py-4 shadow-[0_18px_45px_-30px_rgba(10,24,16,0.35)] lg:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-emerald-700/70">
            Environmental Intelligence
          </div>
          <div className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
            Environmental Card System (ECS)
          </div>
          <div className="mt-1 text-sm text-slate-600">
            Environmental intelligence, forecasting, and decision support
          </div>
        </div>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <ScenarioSwitcher />
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-[1.4rem] border border-emerald-950/8 bg-white/85 px-4 py-3">
              <MapPin className="h-5 w-5 text-emerald-600" strokeWidth={1.8} />
              <div>
                <div className="text-sm font-medium text-slate-900">Riyadh, Saudi Arabia</div>
                <div className="text-xs text-slate-500">Central Zone</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-[1.4rem] border border-emerald-950/8 bg-white/85 px-4 py-3">
              <CalendarDays className="h-5 w-5 text-slate-700" strokeWidth={1.8} />
              <div>
                <div className="text-sm font-medium text-slate-900">{now.date}</div>
                <div className="text-xs text-slate-500">{now.time}</div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-[1.4rem] border border-emerald-950/8 bg-white/85 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bell className="h-5 w-5 text-slate-700" strokeWidth={1.8} />
                  <span className="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
                    3
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">Judge Mode</div>
                  <div className="text-xs text-slate-500">Interactive mock</div>
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(180deg,#f0f8f2_0%,#d8ecdd_100%)] text-sm font-semibold text-emerald-700">
                AA
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
