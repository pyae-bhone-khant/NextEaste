"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { useCreatePropertyModalStore } from "@/store/createPropertyModalStore"
import { useRouter } from "next/navigation"
import { useRef, useState, useEffect } from "react"
import { FaHome, FaUser } from "react-icons/fa"
import { IoLogOutOutline, IoCamera } from "react-icons/io5"
import { toast } from "sonner"
import axios from "axios"
import Image from "next/image"
import clsx from "clsx"

interface UserMenuProps {
    /** Transparent variant for hero-over navbars */
    isTransparent?: boolean
}

export default function UserMenu({ isTransparent = false }: UserMenuProps) {
    const { data: session } = useSession()
    const { open: openCreateModal } = useCreatePropertyModalStore()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [avatarSrc, setAvatarSrc] = useState<string | null>(session?.user?.image ?? null)
    const [uploading, setUploading] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)

    // Keep avatar in sync when session changes
    useEffect(() => {
        setAvatarSrc(session?.user?.image ?? null)
    }, [session?.user?.image])

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    const handleLogout = async () => {
        setOpen(false)
        await signOut()
        router.refresh()
    }

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Optimistic preview
        const preview = URL.createObjectURL(file)
        setAvatarSrc(preview)

        try {
            setUploading(true)
            const formData = new FormData()
            formData.append("avatar", file)

            const res = await axios.patch<{ image: string }>("/api/user/avatar", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            setAvatarSrc(res.data.image)
            toast.success("Profile photo updated!")
        } catch {
            // Revert on error
            setAvatarSrc(session?.user?.image ?? null)
            toast.error("Failed to upload photo. Please try again.")
        } finally {
            setUploading(false)
            // Reset input so the same file can be re-selected
            if (fileRef.current) fileRef.current.value = ""
        }
    }

    if (!session?.user) return null

    const name = session.user.name ?? "User"
    const email = session.user.email ?? ""
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()

    return (
        <div ref={menuRef} className="relative">
            {/* Avatar trigger button */}
            <button
                id="user-menu-trigger"
                aria-label="Open user menu"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
                className={clsx(
                    "relative flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-offset-2 transition-all duration-200 cursor-pointer overflow-hidden",
                    isTransparent
                        ? "ring-white/30 ring-offset-transparent hover:ring-white/60"
                        : "ring-primary/30 ring-offset-background hover:ring-primary/60"
                )}
            >
                {avatarSrc ? (
                    <Image
                        src={avatarSrc}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="40px"
                        unoptimized={avatarSrc.startsWith("blob:")}
                    />
                ) : (
                    <span
                        className={clsx(
                            "flex h-full w-full items-center justify-center text-sm font-bold",
                            isTransparent
                                ? "bg-white/15 text-white"
                                : "bg-primary text-white"
                        )}
                    >
                        {initials}
                    </span>
                )}
                {/* Uploading spinner overlay */}
                {uploading && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    </span>
                )}
            </button>

            {/* Dropdown panel */}
            <div
                className={clsx(
                    "absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border shadow-2xl",
                    "transition-all duration-200 origin-top-right",
                    open
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
                    "bg-card border-border z-50"
                )}
            >
                {/* User info header */}
                <div className="relative flex items-center gap-3 px-4 py-4 border-b border-border">
                    {/* Avatar + camera overlay */}
                    <button
                        aria-label="Change profile photo"
                        onClick={() => fileRef.current?.click()}
                        className="group relative h-12 w-12 shrink-0 rounded-full overflow-hidden ring-2 ring-primary/20 cursor-pointer"
                    >
                        {avatarSrc ? (
                            <Image
                                src={avatarSrc}
                                alt={name}
                                fill
                                className="object-cover"
                                sizes="48px"
                                unoptimized={avatarSrc.startsWith("blob:")}
                            />
                        ) : (
                            <span className="flex h-full w-full items-center justify-center bg-primary text-white text-sm font-bold">
                                {initials}
                            </span>
                        )}
                        <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <IoCamera size={18} className="text-white" />
                        </span>
                    </button>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-text">{name}</p>
                        <p className="truncate text-xs text-text-muted">{email}</p>
                    </div>

                    {/* Hidden file input */}
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="hidden"
                        onChange={handleAvatarUpload}
                    />
                </div>

                {/* Menu items */}
                <div className="p-2 space-y-0.5">
                    <button
                        onClick={() => { fileRef.current?.click(); }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-primary/8 hover:text-primary transition-colors duration-150 cursor-pointer"
                    >
                        <FaUser size={14} />
                        <span>Upload Profile Photo</span>
                    </button>

                    <button
                        onClick={() => { setOpen(false); openCreateModal(); }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-primary/8 hover:text-primary transition-colors duration-150 cursor-pointer"
                    >
                        <FaHome size={14} />
                        <span>Add Property</span>
                    </button>

                    <div className="my-1 h-px bg-border" />

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors duration-150 cursor-pointer"
                    >
                        <IoLogOutOutline size={16} />
                        <span>Log out</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
