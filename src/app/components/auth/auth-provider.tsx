"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { setUser } from "@/lib/store/auth/auth-slice";
import { supabase } from "@/lib/supabaseClient";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        dispatch(
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata.full_name || "",
            avatar_url: session.user.user_metadata.avatar_url || "",
          })
        );
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        dispatch(
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata.full_name || "",
            avatar_url: session.user.user_metadata.avatar_url || "",
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
