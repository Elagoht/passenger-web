import { create } from "zustand";

interface AuthState {
  login: (token: string) => void;
  token: string | null;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,

  login: (token) => set({ token }),

  logout: () => set({ token: null }),
}));

export default useAuthStore;
