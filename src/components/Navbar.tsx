import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky w-full z-20 top-0 start-0 border-b border-gray-800 backdrop-blur-md transition-all duration-300
        ${scrolled ? "bg-black/50" : "bg-[#0A0A0A] py-4"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-300">
        <a href="/home" className="hover:opacity-50 transition-opacity duration-200">
          <img
            src="/whiteIcon.png"
            className={`transition-all duration-300 ${scrolled ? "h-8" : "h-12"}`}
            alt="Movies Logo"
          />
        </a>

        <ul className={`flex flex-row gap-16 text-white transition-all duration-300 ${scrolled ? "text-xl font-extralight" : "text-2xl font-light"}`}>
          <a href="/home"><li className="hover:opacity-50 transition-opacity duration-200">Home</li></a>
          <a href="/"><li className="hover:opacity-50 transition-opacity duration-200">Movies</li></a>
        </ul>

        <div>
          <button className={`text-white transition-all duration-300 ${scrolled ? "text-xl font-extralight" : "text-2xl font-light"}`}>
            <span className="hover:opacity-50 transition-opacity duration-200">Log in</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
