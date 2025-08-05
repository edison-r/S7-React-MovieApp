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
          className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col md:flex-row"
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
              <img
                src={`https://image.tmdb.org/t/p/w500${actorDetails.profile_path}`}
                alt={actorDetails.name}
                className="w-full md:w-1/3 object-cover"
              />
              <div className="flex-1 p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-900">{actorDetails.name}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  {actorDetails.known_for_department} •{" "}
                  {actorDetails.birthday || "Unknown"}{" "}
                  {actorDetails.place_of_birth && ` • ${actorDetails.place_of_birth}`}
                </p>
                <div className="mt-2 text-gray-700 text-sm overflow-y-auto max-h-64 leading-relaxed">
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