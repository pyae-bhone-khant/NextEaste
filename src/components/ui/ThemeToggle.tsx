"use client"

import { useThemeStore } from "@/store/useThemeStore"
import { BsSun, BsMoonStarsFill } from "react-icons/bs"
import clsx from "clsx"

interface ThemeToggleProps {
    /** Pass "light-bg" when the toggle sits on a transparent/dark hero navbar */
    variant?: "default" | "light-bg"
    className?: string
}

export default function ThemeToggle({ variant = "default", className }: ThemeToggleProps) {
    const { theme, toggleTheme } = useThemeStore()
    const isDark = theme === "dark"

    return (
        <button
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            className={clsx(
                "relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 cursor-pointer",
                variant === "light-bg"
                    ? "border border-white/15 bg-white/8 text-white hover:bg-white/15"
                    : "border border-border bg-card text-text hover:border-primary hover:text-primary",
                className
            )}
        >
            <span
                className={clsx(
                    "absolute inset-0 flex items-center justify-center transition-all duration-300",
                    isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                )}
            >
                <BsSun size={16} />
            </span>
            <span
                className={clsx(
                    "absolute inset-0 flex items-center justify-center transition-all duration-300",
                    isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                )}
            >
                <BsMoonStarsFill size={15} />
            </span>
        </button>
    )
}
