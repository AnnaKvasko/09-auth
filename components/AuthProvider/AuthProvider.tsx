"use client";

import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getMe, checkSession } from "@/lib/api/clientApi";

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();

        if (isAuthenticated) {
          const user = await getMe();
          if (user) {
            setUser(user);
          }
        } else {
          clearAuth();
        }
      } catch (error) {
        clearAuth();
      }
    };

    fetchUser();
  }, [setUser, clearAuth]);

  return <>{children}</>;
};

export default AuthProvider;
