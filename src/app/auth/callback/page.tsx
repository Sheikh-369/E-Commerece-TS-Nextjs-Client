"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // The Supabase client will automatically handle the token exchange
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        router.push("/"); // Redirect to home page after successful sign in
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
