export interface Movie {
  id: number;
  title: string;
  original_title: string;
  name?: string; // For TV shows
  original_name?: string; // For TV shows
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string; // For TV shows
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  media_type?: "movie" | "tv";
  original_language?: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime?: number;
  tagline?: string;
  status: string;
  budget?: number;
  revenue?: number;
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

