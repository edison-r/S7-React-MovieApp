import { useEffect, useState } from "react";
import { getPopularMovies } from "../../../services/tmdb";
import type { Movie } from "../../../interfaces/interfaces";
import MovieCard from "./MovieCard";

export default function MoviesGrid() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getPopularMovies(1); // Por ahora solo página 1
      setMovies(data);
    }
    fetchMovies();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-center text-black text-8xl font-bold mb-16">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
