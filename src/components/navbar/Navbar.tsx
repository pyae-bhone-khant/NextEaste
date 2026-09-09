"use client"

import Link from "next/link"
import Button from "../ui/Button"
import { FaHome } from "react-icons/fa"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { IoClose, IoLogInOutline } from "react-icons/io5"
import { useState } from "react"
import { useAuthModal } from "@/store/useAuthModelStore"
import { useCreatePropertyModalStore } from "@/store/createPropertyModalStore"


interface NavbarProps {
    variant: "transparent" | "solid"
}

const navLinks = ["Home", "Properties", "MarketPlace"]

export default function Navbar({ variant = "transparent" }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const isTransparent = variant === "transparent"
    const {open : openCreateModel} = useCreatePropertyModalStore()
    const {openLogin} = useAuthModal()

    return (
        <section className={`top-0 left-0 z-50 w-full ${isTransparent ? "absolute" : "sticky border-b  border-black/5 bg-card"}`} >
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <nav className={`relative flex h-20 items-center justify-between 
                    ${isTransparent ? "mt-6 rounded-3xl border border-white/10 bg-white/5 px-6 backdrop-blur-2xl" :
                        "px-0"}
                     `}>
                    <Link href={'/'} className="flex items-center text-2xl font-semibold ">
                        <span className={isTransparent ? "text-gray-300 " : "text-text"}>
                            Next
                        </span>
                        <span className="bg-primary text-white px-2 py-1 rounded-tr-2xl rounded-bl-2xl">
                            Estate
                        </span>
                    </Link>

                    <div className="hidden items-center gap-8 lg:flex ">
                        {navLinks.map((item) => (
                            <Link key={item} href={item === "Home" ? "/" : `${item.toLowerCase()}`} className={`text-sm font-medium transition hover:text-primary ${isTransparent ? "text-white/80" : "text-text/70"}`}>{item}</Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-4 ">
                        <Button onClick={openLogin} variant="outline">
                            Login
                        </Button>
                        <Button onClick={openCreateModel} icon={<FaHome />} variant="outline">
                            Add Property
                        </Button>
                    </div>
                    {/* mobile menu */}
                    <button aria-label={isOpen ? "Close menu" : "Open menu"} className={`flex h-11 w-11 items-center justify-center rounded-2xl transition lg:hidden ${isTransparent ? "border border-white/10 bg-white/5 text-white" : "border border-black/10 bg-background text-text"}`

                    } onClick={() => setIsOpen(!isOpen)} >
                        {isOpen ? <IoClose size={24} /> : <HiOutlineMenuAlt3 size={24} />}
                    </button>

                    {/* mobile menu */}
                    {isOpen && (
                        <div className={`absolute left-0 right-0 top-full mt-3 overflow-hidden rounded-3xl border p-4 shadow-2xl backdrop-blur-2xl lg:hidden ${
                            isTransparent ? "border-white/10 bg-secondary/95 text-white" : "border-black/5 bg-white text-text"
                        }`}>
                            <div className="mb-3 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-[0.2em] opacity-50">
                                <span>Explore</span>
                                <span>Menu</span>
                            </div>
                            <div className="space-y-1">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item}
                                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        onClick={() => setIsOpen(false)}
                                        className="flex min-h-12 items-center rounded-2xl px-4 text-base font-medium transition hover:bg-primary hover:text-white"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                            <div className={`mt-4 grid grid-cols-2 gap-3 border-t pt-4 ${isTransparent ? "border-white/10" : "border-black/5"}`}>
                                <Button onClick={openLogin} icon={<IoLogInOutline size={18} />} variant="outline" fullWidth>
                                    Login
                                </Button>
                                <Button onClick={openCreateModel} icon={<FaHome size={16} />} variant="primary" fullWidth>
                                    Add Property
                                </Button>
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </section>
    )
}