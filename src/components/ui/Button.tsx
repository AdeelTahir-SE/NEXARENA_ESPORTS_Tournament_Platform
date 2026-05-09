import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  const variants = {
    primary:
      "bg-primary hover:bg-primary-hover text-white shadow-[0_0_12px_rgba(124,58,237,0.4)] hover:shadow-[0_0_20px_rgba(124,58,237,0.6)]",
    secondary:
      "bg-background-elevated border border-border/80 hover:border-primary/50 text-text-secondary hover:text-text-primary hover:bg-background-elevated/80",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary hover:bg-background-surface/50",
    danger:
      "bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
