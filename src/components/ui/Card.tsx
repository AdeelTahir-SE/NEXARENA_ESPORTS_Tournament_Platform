import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  elevated?: boolean;
  id?: string;
}

export default function Card({
  children,
  className = "",
  hover = false,
  elevated = false,
  id,
}: CardProps) {
  return (
    <div
      id={id}
      className={`rounded-xl p-5 border transition-all duration-200 ${
        elevated
          ? "bg-background-elevated border-border/80"
          : "bg-background-surface border-border/50"
      } ${hover ? "hover:border-primary/50 hover:shadow-[0_0_24px_rgba(124,58,237,0.15)] hover:-translate-y-0.5 cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
