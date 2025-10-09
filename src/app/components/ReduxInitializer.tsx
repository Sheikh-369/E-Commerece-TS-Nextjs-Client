"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { loadUserFromStorage } from "@/lib/store/auth/auth-slice";

export default function ReduxInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return null;
}
