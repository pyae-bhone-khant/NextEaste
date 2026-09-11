import { create } from "zustand"

interface UserProfile {
    name: string
    email: string
    image: string | null
}

interface UserProfileState {
    profile: UserProfile | null
    /** Called once on mount to seed the store from the session */
    init: (profile: UserProfile) => void
    /** Called after any successful save so UI updates instantly */
    update: (patch: Partial<UserProfile>) => void
    clear: () => void
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
    profile: null,
    init: (profile) =>
        set((s) => ({
            // Only seed if not already set (avoid overwriting a live update)
            profile: s.profile ?? profile,
        })),
    update: (patch) =>
        set((s) => ({
            profile: s.profile ? { ...s.profile, ...patch } : null,
        })),
    clear: () => set({ profile: null }),
}))
