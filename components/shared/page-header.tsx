import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-5", className)}>
      <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-emerald-700/65">
        {eyebrow}
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-950 lg:text-[2.15rem]">
        {title}
      </h1>
      <p className="mt-2 max-w-[72ch] text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
