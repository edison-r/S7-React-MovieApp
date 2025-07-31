import { motion } from "framer-motion";
import type { Movie, MovieCardProps } from "../../../interfaces/interfaces";

export default function MovieCard({ movie }: MovieCardProps) {
  const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <motion.div
      className="rounded-xl overflow-hidden bg-[#F2F2F2] cursor-pointer"
      initial={{ opacity: 0, boxShadow: "0px 2px 8px rgba(0,0,0,0.2)"}}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 200 }}
      whileHover={{ scale: 1.02, boxShadow: "0px 10px 24px rgba(0,0,0,0.3)", }}
      transition={{ duration: 0.3 }}
    >
      <img src={imgUrl} alt={movie.title} className="w-full object-cover" />
      {/*<div className="p-3">
        <h3 className="text-black text-sm font-bold truncate">{movie.title}</h3>
        <p className="text-gray-400 text-xs">{movie.release_date}</p>
      </div>*/}
    </motion.div>
  );
}
