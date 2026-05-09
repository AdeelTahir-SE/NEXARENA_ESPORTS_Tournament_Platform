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
      "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-[0_0_12px_rgba(124,58,237,0.4)] hover:shadow-[0_0_20px_rgba(124,58,237,0.6)]",
    secondary:
      "bg-[#12121A] border border-[#2A2A3D] hover:border-[#4A4A6A] text-[#A78BFA] hover:text-[#F1F0FF] hover:bg-[#1A1A26]",
    ghost:
      "bg-transparent text-[#9B99B8] hover:text-[#F1F0FF] hover:bg-[#1A1A26]",
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
