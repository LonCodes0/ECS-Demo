import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  indicatorClassName,
}: {
  value: number;
  className?: string;
  indicatorClassName?: string;
}) {
  return (
    <div className={cn("h-2.5 rounded-full bg-slate-100", className)}>
      <div
        className={cn(
          "h-full rounded-full bg-[linear-gradient(90deg,#2bb05f_0%,#1f8b4b_100%)]",
          indicatorClassName,
        )}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
