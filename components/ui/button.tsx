import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(180deg,#31ba69_0%,#23914f_100%)] text-white shadow-[0_16px_26px_-16px_rgba(35,145,79,0.75)] hover:-translate-y-[1px]",
        secondary:
          "border border-slate-900/8 bg-white text-slate-700 hover:-translate-y-[1px] hover:bg-slate-50",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        danger:
          "bg-[linear-gradient(180deg,#de6f61_0%,#cb4c3d_100%)] text-white shadow-[0_16px_26px_-18px_rgba(203,76,61,0.7)] hover:-translate-y-[1px]",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-12 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  ),
);

Button.displayName = "Button";
