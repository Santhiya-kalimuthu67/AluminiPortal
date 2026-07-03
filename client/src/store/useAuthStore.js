import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // state
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  isFirstLogin: false,
  user: null,

  // actions
  setAuth: ({ token, role, isFirstLogin, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    set({
      token,
      role,
      isFirstLogin,
      user,
    });
  },

  logout: () => {
    localStorage.clear();
    set({
      token: null,
      role: null,
      isFirstLogin: false,
      user: null,
    });
  },
}));
