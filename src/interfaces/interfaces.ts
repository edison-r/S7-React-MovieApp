export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieCardProps {
  movie: Movie;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
}

export interface MovieDetailsProps {
  id: string;
}