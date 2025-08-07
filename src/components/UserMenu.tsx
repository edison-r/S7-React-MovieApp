import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UserMenu() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserEmail(user?.email ?? null);
    }

    loadUser();

    // Escuchar cambios de sesión por si hace login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(() => loadUser());

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    window.location.href = "/";
  };

  if (!userEmail) return null;

  return (
    <div className="text-right text-sm">
      <button
        onClick={handleLogout}
        className="text-white rounded hover:text-red-600 transition"
      >
        <span className="font-semibold">Log out</span>
      </button>
      <p className="font-extralight text-gray-600 mb-1">
        Hello!{" "} {userEmail?.split("@")[0]}
      </p>
    </div>
  );
}
