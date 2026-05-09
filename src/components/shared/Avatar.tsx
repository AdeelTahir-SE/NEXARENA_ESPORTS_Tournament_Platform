interface AvatarProps {
  name: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg";
  online?: boolean;
  className?: string;
}

const sizes = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
};

export default function Avatar({ name, src, size = "md", online = false, className = "" }: AvatarProps) {
  const initial = name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className={`${sizes[size]} rounded-full object-cover border-2 border-[#2A2A3D]`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-[#7C3AED]/20 border-2 border-[#2A2A3D] flex items-center justify-center text-[#A78BFA] font-bold font-display`}
        >
          {initial}
        </div>
      )}
      {online && (
        <span
          className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-[#0A0A0F]"
          aria-label="Online"
        />
      )}
    </div>
  );
}
