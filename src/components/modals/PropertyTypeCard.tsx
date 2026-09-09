"use client"

import type { IconType } from "react-icons"

interface PropertyTypeCardProps {
    label: string
    icon: IconType
    selected: boolean
    onClick: () => void
}

export default function PropertyTypeCard({ label, icon: Icon, selected, onClick }: PropertyTypeCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex min-h-28 flex-col items-center justify-center gap-3 rounded-2xl border p-4 text-center transition ${
                selected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 bg-white text-gray-600 hover:border-primary/50 hover:text-primary"
            }`}
        >
            <Icon size={28} />
            <span className="text-sm font-semibold">{label}</span>
        </button>
    )
}