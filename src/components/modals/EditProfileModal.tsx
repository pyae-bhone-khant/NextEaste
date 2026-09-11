"use client"

import { useEditProfileModalStore } from "@/store/useEditProfileModalStore"
import { useUserProfileStore } from "@/store/useUserProfileStore"
import { useSession } from "@/lib/auth-client"
import Modal from "./modals"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { IoCamera } from "react-icons/io5"
import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function EditProfileModal() {
    const { isOpen, close } = useEditProfileModalStore()
    const { data: session } = useSession()
    const { update: updateProfile } = useUserProfileStore()
    const router = useRouter()

    const [name, setName]   = useState("")
    const [email, setEmail] = useState("")

    const [avatarSrc, setAvatarSrc]     = useState<string | null>(null)
    const [avatarFile, setAvatarFile]   = useState<File | null>(null)

    const [savingInfo,   setSavingInfo]   = useState(false)
    const [savingAvatar, setSavingAvatar] = useState(false)

    const fileRef = useRef<HTMLInputElement>(null)

    // Hydrate fields from session when modal opens
    useEffect(() => {
        if (isOpen && session?.user) {
            setName(session.user.name  ?? "")
            setEmail(session.user.email ?? "")
            setAvatarSrc(session.user.image ?? null)
            setAvatarFile(null)
        }
    }, [isOpen, session?.user])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setAvatarFile(file)
        setAvatarSrc(URL.createObjectURL(file))
        if (fileRef.current) fileRef.current.value = ""
    }

    /* ── Upload avatar separately ────────────────────────────────────── */
    const handleAvatarSave = async () => {
        if (!avatarFile) return
        try {
            setSavingAvatar(true)
            const fd = new FormData()
            fd.append("avatar", avatarFile)
            const res = await axios.patch<{ image: string }>("/api/user/avatar", fd, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            const newImage = res.data.image
            setAvatarSrc(newImage)
            setAvatarFile(null)
            // ✅ Live update — no refresh needed
            updateProfile({ image: newImage })
            toast.success("Profile photo updated!")
        } catch {
            toast.error("Failed to upload photo. Please try again.")
        } finally {
            setSavingAvatar(false)
        }
    }

    /* ── Save name/email ─────────────────────────────────────────────── */
    const handleInfoSave = async () => {
        if (!name.trim()) {
            toast.error("Name cannot be empty")
            return
        }
        try {
            setSavingInfo(true)
            await axios.patch("/api/user/profile", { name: name.trim(), email: email.trim() })
            // ✅ Live update — no refresh needed
            updateProfile({ name: name.trim(), email: email.trim() })
            toast.success("Profile updated!")
            close()
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.error ?? "Something went wrong")
            } else {
                toast.error("Something went wrong")
            }
        } finally {
            setSavingInfo(false)
        }
    }

    const initials = (session?.user?.name ?? "U")
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()

    return (
        <Modal isOpen={isOpen} onClose={close} title="Edit Profile">
            {/* ── Avatar section ──────────────────────────────────────── */}
            <div className="mb-7 flex flex-col items-center gap-4">
                {/* Avatar ring + photo */}
                <div className="relative">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary/20">
                        {avatarSrc ? (
                            <Image
                                src={avatarSrc}
                                alt="Profile photo"
                                fill
                                className="object-cover"
                                sizes="96px"
                                unoptimized={avatarSrc.startsWith("blob:")}
                            />
                        ) : (
                            <span className="flex h-full w-full items-center justify-center bg-primary text-2xl font-bold text-white">
                                {initials}
                            </span>
                        )}
                    </div>

                    {/* Camera overlay button */}
                    <button
                        aria-label="Change profile photo"
                        onClick={() => fileRef.current?.click()}
                        className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
                    >
                        <IoCamera size={15} />
                    </button>
                </div>

                <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={handleFileChange}
                />

                {/* Upload button — only shown when a new file is staged */}
                {avatarFile && (
                    <Button
                        variant="outline"
                        onClick={handleAvatarSave}
                        loading={savingAvatar}
                        className="text-xs h-8 px-4 rounded-lg"
                    >
                        {savingAvatar ? "Uploading…" : "Save Photo"}
                    </Button>
                )}

                <p className="text-xs text-text-muted">
                    Click the camera icon to change your photo
                </p>
            </div>

            {/* ── Info fields ─────────────────────────────────────────── */}
            <div className="space-y-5">
                <Input
                    name="name"
                    label="Full Name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
                <Input
                    name="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
            </div>

            {/* ── Actions ─────────────────────────────────────────────── */}
            <div className="mt-7 flex gap-3">
                <Button variant="outline" fullWidth onClick={close}>
                    Cancel
                </Button>
                <Button
                    fullWidth
                    onClick={handleInfoSave}
                    loading={savingInfo}
                >
                    Save Changes
                </Button>
            </div>
        </Modal>
    )
}
