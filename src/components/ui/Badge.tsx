import { ReactNode } from "react";

type BadgeVariant = "live" | "upcoming" | "completed" | "cancelled" | "gold" | "silver" | "bronze" | "primary";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  live: "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30",
  upcoming: "bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30",
  completed: "bg-[#5C5A78]/15 text-[#9B99B8] border border-[#5C5A78]/30",
  cancelled: "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30",
  gold: "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30",
  silver: "bg-[#9CA3AF]/10 text-[#9CA3AF] border border-[#9CA3AF]/30",
  bronze: "bg-[#B45309]/10 text-[#B45309] border border-[#B45309]/30",
  primary: "bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30",
};

export default function Badge({ variant = "primary", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-body tracking-wide uppercase ${variantStyles[variant]} ${className}`}
    >
      {variant === "live" && (
        <span className="live-dot w-2 h-2 rounded-full bg-[#10B981] animate-pulse-live inline-block" />
      )}
      {children}
    </span>
  );
}
