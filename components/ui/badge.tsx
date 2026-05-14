import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]",
  {
    variants: {
      tone: {
        good: "bg-emerald-100 text-emerald-700",
        moderate: "bg-amber-100 text-amber-700",
        high: "bg-rose-100 text-rose-700",
        critical: "bg-rose-600 text-white",
        info: "bg-sky-100 text-sky-700",
        neutral: "bg-slate-100 text-slate-600",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
