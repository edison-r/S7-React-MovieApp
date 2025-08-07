import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CastDetails, CastModalProps} from "../../../interfaces/interfaces";

export default function ActorModal({ actorId, onClose }: CastModalProps) {
  const [actorDetails, setActorDetails] = useState<CastDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!actorId) return;

    async function fetchActorDetails() {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.PUBLIC_TMDB_BASE_URL}/person/${actorId}?api_key=${
            import.meta.env.PUBLIC_TMDB_KEY
          }&language=en-US`
        );
        const data = await res.json();
        setActorDetails(data);
      } catch (err) {
        console.error("Error fetching actor details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchActorDetails();
  }, [actorId]);

  useEffect(() => {
    if (actorId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [actorId]);

  if (!actorId) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-[#0A0A0A] rounded-2xl shadow-2xl w-full overflow-hidden flex flex-col md:flex-row 
             max-w-md w-[90%] max-h-[90vh] md:max-w-3xl md:w-full md:max-h-none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {loading || !actorDetails ? (
            <div className="flex-1 flex justify-center items-center p-10">
              <p className="text-gray-500 animate-pulse">Loading actor details...</p>
            </div>
          ) : (
            <>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl z-50"
              aria-label="Close modal"
            >
              ✕
            </button>              
              <img
                src={`https://image.tmdb.org/t/p/w500${actorDetails.profile_path}`}
                alt={actorDetails.name}
                className="w-full md:w-1/3 object-cover"
              />
              <div className="flex-1 p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-white">{actorDetails.name}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  {actorDetails.known_for_department} •{" "}
                  {actorDetails.birthday || "Unknown"}{" "}
                  {actorDetails.place_of_birth && ` • ${actorDetails.place_of_birth}`}
                </p>
                <div className="mt-2 text-gray-400 text-md overflow-y-auto max-h-64 leading-relaxed">
                  {actorDetails.biography || "No biography available."}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}