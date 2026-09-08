import { ButtonHTMLAttributes, ReactNode } from "react"
import clsx from "clsx"


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline",
    icon?: ReactNode,
    iconPosition?: "left" | "right",
    fullWidth?: boolean,
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
        <button disabled={loading || disabled}
            className={clsx(
                `inline-flex items-center justify-center gap-2 h-13 px-6 rounded-2xl font-semibold transition-all duration-300 cursor-pointer`,
                 {
                "bg-primary text-white hover:bg-primary/90":
                    variant === "primary",
                "border border-black/10 bg-card text-text hover:border-primary hover:text-primary":
                    variant === "outline",
                "w-full": fullWidth,
                "opacity-70 cursor-not-allowed":
                    loading || disabled
            }  , 
            className
            )}
            {...props}
        > 
        {loading ? (
            <>
              <div  className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent " />
              <span>Loading...</span>
            </>
        ) : (
            <>  
            {icon && iconPosition === "left" && (
                <span>{icon}</span>
            )} 
            {children} 
            {icon && iconPosition === "right" && (
                <span>{icon}</span>
            )}
            </>
        )}

        </button>
    )
}