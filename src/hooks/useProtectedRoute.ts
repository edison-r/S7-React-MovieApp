import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useProtectedRoute() {
  const [isChecking, setIsChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const check = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = "/auth";
      } else {
        setHasSession(true);
      }

      setIsChecking(false);
    };

    check();

    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
    if (!session) {
        window.location.href = "/auth";
    }
    });

    return () => authListener.data.subscription.unsubscribe();

  }, []);

  return { isChecking, hasSession };
}
