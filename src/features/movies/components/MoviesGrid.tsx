import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { getPopularMovies } from "../../../services/tmdb";
import type { Movie } from "../../../interfaces/interfaces";
import MovieCard from "./MovieCard";

export default function MoviesGrid() {
  const { items: movies, loaderRef, loading } = useInfiniteScroll<Movie>(getPopularMovies);

  return (
    <div className="p-6">
      <h2 className="text-white text-7xl text-center font-extrabold mb-8">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div ref={loaderRef} className="flex justify-center p-4">
        {loading && <p className="text-gray-400">Loading...</p>}
      </div>
    </div>
  );
}
