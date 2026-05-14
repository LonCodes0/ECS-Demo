import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-slate-900/7 bg-white/90 p-5 shadow-[0_20px_40px_-26px_rgba(10,24,16,0.18)] backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base font-semibold tracking-[-0.03em] text-slate-950", className)}
      {...props}
    />
  );
}
