

import { persist } from "zustand/middleware";
import * as z from "zustand";
import type { UserType } from "../user/user.types";

type AuthStoreState = {
  user: UserType | null;
  isLoggedIn: boolean;
  token: string | null;
};

type AuthStoreAction = {
  login: (user: UserType, token: string) => void;
  logout: VoidFunction;
};


export const useAuthStore = z.create<AuthStoreState & AuthStoreAction>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      token: null,
      login: (user, token) => set({ isLoggedIn: true, user, token }),
      logout: () => set({ isLoggedIn: false, user: null, token: null }),
    }),
    {
      name: "auth-store",
    },
  ),
);
