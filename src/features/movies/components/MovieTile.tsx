import { motion } from "framer-motion";
import type { Movie } from "../../../interfaces/interfaces";

interface MovieTileProps {
  movie: Movie;
  onClick?: (m: Movie) => void;
}

export default function MovieTile({ movie, onClick }: MovieTileProps) {
  const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "/placeholder-poster.jpg";

  return (
    <motion.div
      className="group relative min-w-[140px] sm:min-w-[160px] md:min-w-[200px] rounded-xl overflow-hidden bg-[#F2F2F2] cursor-pointer"
      whileHover={{ scale: 1.03 }}
      onClick={() => onClick?.(movie)}
    >
      <img
        src={imgUrl}
        alt={movie.title}
        loading="lazy"
        className="w-full h-auto object-cover"
      />

      {/* Sombra base + hover un poco más difusa */}
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 shadow-[4px_4px_0_#000] group-hover:shadow-[8px_8px_0_#000] transition-shadow" />
    </motion.div>
  );
}
