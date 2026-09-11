import { create } from "zustand"

interface EditProfileModalState {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const useEditProfileModalStore = create<EditProfileModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}))
