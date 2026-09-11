"use client"

import { useThemeStore } from "@/store/useThemeStore"
import { useEffect } from "react"

/**
 * Syncs the Zustand theme store → `<html data-theme="...">` attribute.
 * Must be rendered inside the client tree (e.g. root layout body).
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useThemeStore((s) => s.theme)

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme])

    return <>{children}</>
}
