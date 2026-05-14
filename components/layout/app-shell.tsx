"use client";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopBar } from "@/components/layout/topbar";

export function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[100dvh] bg-transparent">
      <div className="mx-auto flex min-h-[100dvh] max-w-[1600px] gap-4 px-3 py-3 lg:px-5 lg:py-5">
        <SidebarNav />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 px-1 py-4 lg:px-2 lg:py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
