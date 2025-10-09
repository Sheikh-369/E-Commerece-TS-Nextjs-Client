"use client";
import { useRouter } from "next/navigation";
import { useAppSelector } from "./hooks";

export function useAuthGuard() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const checkAuth = (onFail?: () => void) => {
    if (!user) {
      if (onFail) onFail();
      return false;
    }
    return true;
  };

  const redirectIfNotAuthenticated = () => {
    if (!user) {
      router.push("/login");
      return false;
    }
    return true;
  };

  return {
    user,
    checkAuth,
    redirectIfNotAuthenticated,
  };
}
