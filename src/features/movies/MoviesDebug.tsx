import { useEffect, useState } from "react";
import { getPopularMovies } from "../../services/tmdb";
import type { Movie } from "../../interfaces/interfaces";

export default function MoviesDebug() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function testAPI() {
      try {
        const data = await getPopularMovies(1); // página 1
        console.log("Popular Movies:", data);
        setMovies(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }

    testAPI();
  }, []);

  return (
    <div className="p-4">
    </div>
  );
}
