import { create } from "zustand";

export const useProfileStore = create((set) => ({
  profile: null,               // ✅ correct initial state

  setProfile: (profile) => {
    console.log("Setting profile in store:", profile);
    set({ profile });
  },

  clearProfile: () => set({ profile: null }),
}));
