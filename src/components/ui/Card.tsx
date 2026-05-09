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
          ? "bg-[#1A1A26] border-[#2A2A3D]"
          : "bg-[#12121A] border-[#2A2A3D]"
      } ${hover ? "card-hover cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
