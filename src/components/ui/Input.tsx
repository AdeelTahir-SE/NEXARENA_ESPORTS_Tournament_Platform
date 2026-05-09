import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
}

export default function Input({
  label,
  error,
  helperText,
  icon,
  className = "",
  id,
  ...props
}: InputProps) {
  const uniqueId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={uniqueId}
          className="text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={uniqueId}
          className={`
            bg-background-elevated
            border border-border
            rounded-md
            text-text-primary
            placeholder:text-text-muted
            h-10 px-3 py-2
            outline-none ring-0
            transition-shadow duration-150
            focus:border-primary
            focus:shadow-[0_0_0_2px_rgba(124,58,237,0.3)]
            disabled:opacity-50 disabled:cursor-not-allowed
            w-full
            ${icon ? "pl-10" : ""}
            ${error ? "border-[#EF4444] focus:border-[#EF4444]" : ""}
            ${className}
          `}
          {...props}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted flex items-center">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs text-[#EF4444]">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-xs text-text-secondary">{helperText}</span>
      )}
    </div>
  );
}
