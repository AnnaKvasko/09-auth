"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession } from "@/lib/api/clientApi";

import { useAuthStore } from "@/lib/store/authStore";

const PRIVATE_PREFIXES = ["/notes", "/profile"];
const AUTH_PREFIXES = ["/sign-in", "/sign-up"];

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const user = await checkSession();
        if (cancelled) return;

        if (user) {
          setUser(user);
          if (AUTH_PREFIXES.some((p) => pathname?.startsWith(p))) {
            router.replace("/profile");
          }
        } else {
          clearAuth();
          if (PRIVATE_PREFIXES.some((p) => pathname?.startsWith(p))) {
            router.replace("/sign-in");
          }
        }
      } catch {
        if (cancelled) return;
        clearAuth();
        if (PRIVATE_PREFIXES.some((p) => pathname?.startsWith(p))) {
          router.replace("/sign-in");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, router, setUser, clearAuth]);

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <span>Loading…</span>
      </div>
    );
  }

  return <>{children}</>;
}
