import { create } from "zustand";

interface AuthState {
  login: (token: string) => void;
  token: string | null;
  logout: () => void;
  recoveryKey: string | null;
  setRecoveryKey: (recoveryKey: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,

  login: (token) => set({ token }),

  logout: () => set({ token: null }),

  recoveryKey: null,

  setRecoveryKey: (recoveryKey) => set({ recoveryKey }),
}));

export default useAuthStore;
