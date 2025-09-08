import { fetchData } from "../utils/fetchData";
import type { Movie, TMDBResponse } from "../interfaces/interfaces";

const API_KEY = import.meta.env.PUBLIC_TMDB_KEY;
const BASE_URL = import.meta.env.PUBLIC_TMDB_BASE_URL;

export async function getPopularMovies(page = 1): Promise<Movie[]>{
    const data = await fetchData<TMDBResponse>(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    return data.results;
}

export async function getTopRatedMovies(page = 1): Promise<Movie[]>{
    const data = await fetchData<TMDBResponse>(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
    return data.results;
}

export async function getNowInCinema(page = 1): Promise<Movie[]>{
    const data = await fetchData<TMDBResponse>(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`);
    return data.results;
}