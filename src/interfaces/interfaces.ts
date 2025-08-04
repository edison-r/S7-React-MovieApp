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
  credits: {
    cast: CastMember[];
  };
}

export interface MovieDetailsProps {
  id: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}