import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Scroll shrink effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check session on mount
  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    getSession();

    // Optional: add listener for session change
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <nav
      className={`sticky w-full z-20 top-0 start-0 border-b border-gray-800 backdrop-blur-md transition-all duration-300
        ${scrolled ? "bg-black/50" : "bg-[#0A0A0A] py-4"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-300">
        <a href="/" className="hover:opacity-50 transition-opacity duration-200">
          <img
            src="/whiteIcon.png"
            className={`transition-all duration-300 ${scrolled ? "h-8" : "h-12"}`}
            alt="Movies Logo"
          />
        </a>

        <ul className={`flex flex-row gap-16 text-white transition-all duration-300 ${scrolled ? "text-xl font-extralight" : "text-2xl font-light"}`}>
          <a href="/"><li className="hover:text-red-500 transition duration-200">Home</li></a>
          <a href="/movies"><li className="hover:text-red-500 transition duration-200">All Movies</li></a>
          <a href="/moviesalt"><li className="hover:text-red-500 transition duration-200">Movies by theme</li></a>
        </ul>

        <div>
          {isLoggedIn
            ? ( <UserMenu /> )
            : (
            <a 
              href="/auth"
              className={`text-white hover:text-red-500 transition-all duration-200 ${
                scrolled ? "text-xl font-extralight" : "text-2xl font-light"
              }`}
            >
            Log in
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
