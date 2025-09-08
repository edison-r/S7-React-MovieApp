import { useProtectedRoute } from "../../../hooks/useProtectedRoute";
import { useEffect, useRef, useState, useCallback } from "react";
import type { Movie } from "../../../interfaces/interfaces";
import MovieCard from "./MovieCard";
import { getPopularMovies } from "../../../services/tmdb";

interface MoviesRowProps {
  title?: string;
  /** Función de fetch. Por defecto, popular de TMDB (página 1). Debe devolver como mínimo 20. */
  fetchFn?: (page?: number) => Promise<Movie[]>;
  page?: number;
  limit?: number; // por si quieres menos/más de 20 (default 20)
}

export default function MoviesRow({ title = "", fetchFn = getPopularMovies, page = 1, limit = 20 }: MoviesRowProps) {
  useProtectedRoute();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      const data = await fetchFn(page);
      if (!ignore) {
        setMovies(data.slice(0, limit));
        setLoading(false);
        // evaluar flechas tras pintar
        requestAnimationFrame(updateArrows);
      }
    }
    load();
    return () => { ignore = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFn, page, limit]);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 0);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  const scrollByAmount = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("div[role='listitem']") as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 /* gap */ : el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
    // actualizar flechas un pelín después del scroll
    setTimeout(updateArrows, 250);
  };

  const onScroll = () => updateArrows();

  return (
    <section className="relative px-6 py-6">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-white text-2xl sm:text-3xl font-bold">{title}</h2>
        {/* Puedes añadir un CTA aquí si quieres */}
      </div>

      <div className="relative">
        {/* Gradientes laterales (desaparecen cuando no hay más scroll) */}
        <div
          className={`pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#0A0A0A] to-transparent transition-opacity ${canLeft ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        />
        <div
          className={`pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0A0A0A] to-transparent transition-opacity ${canRight ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        />

        {/* Botones de scroll */}
        <button
          aria-label="Scroll left"
          onClick={() => scrollByAmount("left")}
          disabled={!canLeft}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 text-white px-3 py-2 backdrop-blur border border-white/10 transition ${canLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          ‹
        </button>
        <button
          aria-label="Scroll right"
          onClick={() => scrollByAmount("right")}
          disabled={!canRight}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 text-white px-3 py-2 backdrop-blur border border-white/10 transition ${canRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          ›
        </button>

        {/* Carrusel horizontal */}
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="scrollbar-none flex gap-4 overflow-x-auto snap-x snap-mandatory px-1 py-2"
          role="list"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  role="listitem"
                  className="min-w-[140px] sm:min-w-[160px] md:min-w-[200px] h-[240px] md:h-[300px] rounded-xl bg-white/10 animate-pulse"
                />
              ))
            : movies.map((m) => (
                <div key={m.id} role="listitem" className="snap-start min-w-[140px] sm:min-w-[160px] md:min-w-[200px]">
                  <MovieCard movie={m} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
