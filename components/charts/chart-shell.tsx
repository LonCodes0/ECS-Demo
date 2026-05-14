"use client";

import { useEffect, useState } from "react";

export function ChartShell({
  height,
  children,
}: {
  height: number;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <div
        className="rounded-[1.5rem] bg-slate-50/80 animate-pulse"
        style={{ height }}
      />
    );
  }

  return <>{children}</>;
}
