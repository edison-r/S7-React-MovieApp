import { motion } from "framer-motion";
import type { Movie } from "../../../interfaces/interfaces";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden bg-[#F2F2F2] cursor-pointer"
      initial={{ opacity: 0, boxShadow: "0px 2px 8px rgba(0,0,0,0.2)" }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 200 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 8px 24px rgba(0,0,0,0.3)",
      }}
      transition={{ duration: 0.3 }}
    >
      <a href={`/movie/${movie.id}`}>
        <img src={imgUrl} alt={movie.title} className="w-full object-cover" />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/20 flex items-center justify-center p-2"
        >
          <p className="text-white text-center font-bold text-sm sm:text-base">
            {movie.title}
          </p>
        </motion.div>
      </a>
    </motion.div>
  );
}
