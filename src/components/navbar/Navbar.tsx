"use client"

import Link from "next/link"
import Button from "../ui/Button"
import ThemeToggle from "../ui/ThemeToggle"
import UserMenu from "./UserMenu"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { IoClose, IoLogInOutline, IoLogOutOutline } from "react-icons/io5"
import { FaHome, FaPen } from "react-icons/fa"
import { useState } from "react"
import { useAuthModal } from "@/store/useAuthModelStore"
import { useCreatePropertyModalStore } from "@/store/createPropertyModalStore"
import { useEditProfileModalStore } from "@/store/useEditProfileModalStore"
import { useUserProfileStore } from "@/store/useUserProfileStore"
import { useSession, signOut } from "@/lib/auth-client"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import clsx from "clsx"

interface NavbarProps {
    variant: "transparent" | "solid"
}

const navLinks = [
    { label: "Home",        href: "/"            },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Properties",  href: "/properties"  },
    { label: "About",       href: "/about"       },
]

export default function Navbar({ variant = "transparent" }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const isTransparent = variant === "transparent"
    const pathname = usePathname()
    const router = useRouter()
    const { open: openCreateModal } = useCreatePropertyModalStore()
    const { open: openEditProfile } = useEditProfileModalStore()
    const { openLogin } = useAuthModal()
    const { data: session, isPending } = useSession()
    const { profile, clear } = useUserProfileStore()

    const handleMobileLogout = async () => {
        setIsOpen(false)
        clear()
        await signOut()
        router.refresh()
    }

    // Returns true when the link's href matches the current page
    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href)

    return (
        <section
            className={clsx(
                "top-0 left-0 z-50 w-full",
                isTransparent ? "absolute" : "sticky border-b border-border bg-card"
            )}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <nav
                    className={clsx(
                        "relative flex h-20 items-center justify-between",
                        isTransparent
                            ? "mt-6 rounded-3xl border border-white/10 bg-white/5 px-6 backdrop-blur-2xl"
                            : "px-0"
                    )}
                >
                    {/* ── Logo ─────────────────────────────────────────── */}
                    <Link href="/" className="flex items-center gap-0.5 text-2xl font-bold">
                        <span className={isTransparent ? "text-white/90" : "text-text"}>
                            Next
                        </span>
                        <span className="bg-primary text-white px-2 py-0.5 rounded-tr-xl rounded-bl-xl leading-tight">
                            Estate
                        </span>
                    </Link>

                    {/* ── Desktop nav links ────────────────────────────── */}
                    <div className="hidden items-center gap-7 lg:flex">
                        {navLinks.map(({ label, href }) => {
                            const active = isActive(href)
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={clsx(
                                        "relative text-sm font-semibold transition-colors duration-200",
                                        active
                                            ? "text-primary"
                                            : isTransparent
                                                ? "text-white/70 hover:text-white"
                                                : "text-text-muted hover:text-text"
                                    )}
                                >
                                    {label}
                                    {/* active underline pill */}
                                    {active && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary" />
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    {/* ── Desktop right-side actions ───────────────────── */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Theme toggle */}
                        <ThemeToggle variant={isTransparent ? "light-bg" : "default"} />

                        {!isPending && (
                            session ? (
                                /* Logged in: avatar dropdown */
                                <UserMenu isTransparent={isTransparent} />
                            ) : (
                                /* Logged out: sign-in button */
                                <button
                                    id="navbar-sign-in"
                                    onClick={openLogin}
                                    className={clsx(
                                        "group relative flex h-10 items-center gap-2 overflow-hidden rounded-xl px-5 text-sm font-semibold transition-all duration-200 cursor-pointer",
                                        isTransparent
                                            ? "border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                                            : "border border-primary/30 bg-primary/8 text-primary hover:bg-primary hover:text-white"
                                    )}
                                >
                                    <IoLogInOutline size={16} className="shrink-0" />
                                    Sign In
                                </button>
                            )
                        )}
                    </div>

                    {/* ── Mobile hamburger ─────────────────────────────── */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <ThemeToggle variant={isTransparent ? "light-bg" : "default"} />
                        <button
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            className={clsx(
                                "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200",
                                isTransparent
                                    ? "border border-white/15 bg-white/8 text-white hover:bg-white/15"
                                    : "border border-border bg-card text-text hover:border-primary hover:text-primary"
                            )}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <IoClose size={22} /> : <HiOutlineMenuAlt3 size={22} />}
                        </button>
                    </div>

                    {/* ── Mobile menu panel ────────────────────────────── */}
                    {isOpen && (
                        <div
                            className={clsx(
                                "absolute left-0 right-0 top-full mt-3 overflow-hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl lg:hidden",
                                isTransparent
                                    ? "border-white/10 bg-secondary/95 text-white"
                                    : "border-border bg-card text-text"
                            )}
                        >
                            {/* Section label */}
                            <div className="mb-3 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-widest opacity-40">
                                <span>Explore</span>
                                <span>Menu</span>
                            </div>

                            {/* Links */}
                            <div className="space-y-0.5">
                                {navLinks.map(({ label, href }) => {
                                    const active = isActive(href)
                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={() => setIsOpen(false)}
                                            className={clsx(
                                                "flex min-h-11 items-center gap-3 rounded-xl px-4 text-sm font-semibold transition-all duration-150",
                                                active
                                                    ? "bg-primary/10 text-primary"
                                                    : isTransparent
                                                        ? "text-white/70 hover:bg-white/10 hover:text-white"
                                                        : "text-text-muted hover:bg-background hover:text-text"
                                            )}
                                        >
                                            <span
                                                className={clsx(
                                                    "h-1.5 w-1.5 shrink-0 rounded-full transition-all",
                                                    active ? "bg-primary" : "bg-transparent"
                                                )}
                                            />
                                            {label}
                                        </Link>
                                    )
                                })}
                            </div>

                            {/* Mobile actions */}
                            <div
                                className={clsx(
                                    "mt-4 border-t pt-4 space-y-2",
                                    isTransparent ? "border-white/10" : "border-border"
                                )}
                            >
                                {/* ── Logged-in mobile view ──────────── */}
                                {!isPending && session && profile && (
                                    <>
                                        {/* User card with real avatar */}
                                        <div className={clsx(
                                            "flex items-center gap-3 rounded-xl px-3 py-2.5",
                                            isTransparent ? "bg-white/8" : "bg-background"
                                        )}>
                                            {/* Avatar */}
                                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/25">
                                                {profile.image ? (
                                                    <Image
                                                        src={profile.image}
                                                        alt={profile.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="40px"
                                                        unoptimized={profile.image.startsWith("blob:")}
                                                    />
                                                ) : (
                                                    <span className="flex h-full w-full items-center justify-center bg-primary text-xs font-bold text-white">
                                                        {profile.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            {/* Name + email */}
                                            <div className="min-w-0 flex-1">
                                                <p className={clsx("truncate text-sm font-semibold", isTransparent ? "text-white" : "text-text")}>
                                                    {profile.name}
                                                </p>
                                                <p className={clsx("truncate text-xs", isTransparent ? "text-white/60" : "text-text-muted")}>
                                                    {profile.email}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Edit Profile */}
                                        <button
                                            onClick={() => { setIsOpen(false); openEditProfile(); }}
                                            className={clsx(
                                                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer",
                                                isTransparent
                                                    ? "text-white/70 hover:bg-white/10 hover:text-white"
                                                    : "text-text-muted hover:bg-primary/8 hover:text-primary"
                                            )}
                                        >
                                            <FaPen size={13} />
                                            <span>Edit Profile</span>
                                        </button>

                                        {/* Add Property */}
                                        <button
                                            onClick={() => { setIsOpen(false); openCreateModal(); }}
                                            className={clsx(
                                                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer",
                                                isTransparent
                                                    ? "text-white/70 hover:bg-white/10 hover:text-white"
                                                    : "text-text-muted hover:bg-primary/8 hover:text-primary"
                                            )}
                                        >
                                            <FaHome size={14} />
                                            <span>Add Property</span>
                                        </button>

                                        {/* Logout */}
                                        <button
                                            onClick={handleMobileLogout}
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors duration-150 cursor-pointer"
                                        >
                                            <IoLogOutOutline size={16} />
                                            <span>Log out</span>
                                        </button>
                                    </>
                                )}

                                {/* ── Logged-out mobile view ─────────── */}
                                {!isPending && !session && (
                                    <button
                                        onClick={() => { setIsOpen(false); openLogin(); }}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer"
                                    >
                                        <IoLogInOutline size={16} />
                                        Sign In
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </section>
    )
}