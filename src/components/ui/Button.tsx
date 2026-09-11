import { ButtonHTMLAttributes, ReactNode } from "react"
import clsx from "clsx"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline" | "ghost"
    icon?: ReactNode
    iconPosition?: "left" | "right"
    fullWidth?: boolean
    loading?: boolean
}

export default function Button({
    variant = "primary",
    children,
    icon,
    iconPosition = "left",
    fullWidth = false,
    loading = false,
    disabled,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            disabled={loading || disabled}
            className={clsx(
                "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer",
                // Size: only apply default padding/height when NOT ghost
                variant !== "ghost" && "h-10 px-5 rounded-xl",
                {
                    // Primary
                    "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-primary/25 hover:shadow-md":
                        variant === "primary",
                    // Outline
                    "border border-border bg-card text-text hover:border-primary hover:text-primary":
                        variant === "outline",
                    // Ghost — icon-only, no background by default
                    "rounded-xl h-9 w-9 text-text-muted hover:bg-primary/10 hover:text-primary":
                        variant === "ghost",
                    // Full width
                    "w-full": fullWidth,
                    // Disabled state
                    "opacity-60 cursor-not-allowed pointer-events-none":
                        loading || disabled,
                },
                className
            )}
            {...props}
        >
            {loading ? (
                <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Loading…</span>
                </>
            ) : (
                <>
                    {icon && iconPosition === "left" && <span>{icon}</span>}
                    {children}
                    {icon && iconPosition === "right" && <span>{icon}</span>}
                </>
            )}
        </button>
    )
}