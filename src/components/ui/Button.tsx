import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline" | "text"
  size?: "sm" | "md"
  loading?: boolean
  fullWidth?: boolean
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export function Button({
  children,
  variant = "filled",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    filled:
      "bg-action text-action-on hover:bg-action-hover shadow-sm",
    outline:
      "bg-transparent text-ink border border-strong hover:border-action hover:text-action",
    text: "bg-transparent text-ink hover:bg-action-soft hover:text-action",
  }

  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
  }

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-sm transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled disabled:border-disabled",
        "active:scale-[0.98]",
        fullWidth && "w-full",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? <Spinner className="w-4 h-4" /> : children}
    </button>
  )
}
