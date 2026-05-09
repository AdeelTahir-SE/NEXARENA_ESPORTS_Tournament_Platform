import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export default function Select({
  label,
  error,
  options,
  placeholder,
  className = "",
  id,
  ...props
}: SelectProps) {
  const uniqueId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

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
      <select
        id={uniqueId}
        className={`
          bg-background-elevated
          border border-border
          rounded-md
          text-text-primary
          h-10 px-3 py-2
          outline-none ring-0
          transition-shadow duration-150
          focus:border-primary
          focus:shadow-[0_0_0_2px_rgba(124,58,237,0.3)]
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer
          ${error ? "border-[#EF4444] focus:border-[#EF4444]" : ""}
          ${className}
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-[#EF4444]">{error}</span>
      )}
    </div>
  );
}
