import { useEffect, useState } from "react";
import { fetchData } from "../../../utils/fetchData";
import CastModal from "./CastModal";
import type { MovieDetails, MovieDetailsProps, CastMember } from "../../../interfaces/interfaces";

export default function MovieDetails({ id }: MovieDetailsProps) {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedActorId, setSelectedActorId] = useState<number | null>(null);

    useEffect(() => {
        async function loadMovie() {
        try {
            const url = `${import.meta.env.PUBLIC_TMDB_BASE_URL}/movie/${id}?api_key=${import.meta.env.PUBLIC_TMDB_KEY}&language=en-US&append_to_response=credits`;
            const data = await fetchData<MovieDetails>(url);
            setMovie(data);
        } catch (err) {
            console.error("Error fetching movie:", err);
            setError("Failed to load movie details. Please try again.");
        } finally {
            setLoading(false);
        }
        }

        loadMovie();
    }, [id]);

    if (loading) {
        return (
        <div className="flex justify-center items-center h-96">
            <p className="text-gray-400 animate-pulse">Loading movie...</p>
        </div>
        );
    }

    if (error || !movie) {
        return (
        <div className="flex justify-center items-center h-96">
            <p className="text-red-500">{error || "Movie not found."}</p>
        </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
        {/* --- DETALLES DE LA PELI --- */}
        <div className="mb-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full md:w-1/3 object-cover shadow-lg md:rounded-2xl"
            />
            <div className="p-6 flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {movie.title}
                </h1>
                <p className="text-gray-700 mb-4 leading-relaxed">{movie.overview}</p>
                <p className="text-gray-500 text-sm mb-2">
                Release date: <span className="font-medium">{movie.release_date}</span>
                </p>
                {movie.runtime && (
                <p className="text-gray-500 text-sm">
                    Duration: <span className="font-medium">{movie.runtime} min</span>
                </p>
                )}
            </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-yellow-600 font-semibold">
                ⭐ {movie.vote_average.toFixed(1)} / 10
            </p>
            </div>
        </div>

        {/* --- GRID DE ACTORES --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.credits.cast
            .filter((actor) => actor.profile_path)
            .slice(0, 12)
            .map((actor) => (
                <div
                key={actor.id}
                className="text-center cursor-pointer hover:scale-105 transition"
                onClick={() => setSelectedActorId(actor.id)}
                >
                <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="rounded-lg shadow-md mb-2"
                />
                <p className="text-sm font-semibold text-black">{actor.name}</p>
                <p className="text-xs text-gray-500">{actor.character}</p>
                </div>
            ))}
        </div>

        {/* --- MODAL DEL ACTOR --- */}
        <CastModal actorId={selectedActorId} onClose={() => setSelectedActorId(null)} />
        </div>
    );
}
