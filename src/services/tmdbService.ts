import { Movie, TMDBResponse, MovieDetails, Genre } from "../types/tmdb";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export const tmdbService = {
  /**
   * Generic fetcher for TMDB API
   */
  async fetchTMDB<T>(
    endpoint: string,
    params: Record<string, string | number> = {},
  ): Promise<T> {
    if (!API_KEY) {
      throw new Error("TMDB API Key is missing. Check your .env.local file.");
    }

    const queryParams = new URLSearchParams({
      api_key: API_KEY,
      language: "fr-FR",
      ...Object.entries(params).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: String(value) }),
        {},
      ),
    });

    const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

    try {
      const response = await fetch(url, {
        next: { revalidate: 3600 }, // Revalidate every hour
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.status_message || `TMDB API error: ${response.status}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching from TMDB:", error);
      throw error;
    }
  },

  /**
   * Get trending movies or TV shows
   */
  async getTrending(
    type: "movie" | "tv" | "all" = "all",
    timeWindow: "day" | "week" = "week",
    page = 1,
  ): Promise<TMDBResponse<Movie>> {
    return this.fetchTMDB<TMDBResponse<Movie>>(
      `/trending/${type}/${timeWindow}`,
      { page },
    );
  },

  /**
   * Get popular movies
   */
  async getPopularMovies(page = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchTMDB<TMDBResponse<Movie>>("/movie/popular", { page });
  },

  /**
   * Get top rated movies
   */
  async getTopRatedMovies(page = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchTMDB<TMDBResponse<Movie>>("/movie/top_rated", { page });
  },

  /**
   * Get top rated TV shows
   */
  async getTopRatedTV(page = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchTMDB<TMDBResponse<Movie>>("/tv/top_rated", { page });
  },

  /**
   * Get movie recommendations
   */
  async getRecommendations(
    movieId: number,
    page = 1,
  ): Promise<TMDBResponse<Movie>> {
    return this.fetchTMDB<TMDBResponse<Movie>>(
      `/movie/${movieId}/recommendations`,
      { page },
    );
  },

  /**
   * Get movie details
   */
  async getMovieDetails(id: number): Promise<MovieDetails> {
    return this.fetchTMDB<MovieDetails>(`/movie/${id}`);
  },

  /**
   * Get TV show details
   */
  async getTVDetails(id: number): Promise<MovieDetails> {
    return this.fetchTMDB<MovieDetails>(`/tv/${id}`);
  },

  /**
   * Search for movies or TV shows
   */
  async search(query: string, page = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchTMDB<TMDBResponse<Movie>>("/search/multi", {
      query,
      page,
    });
  },

  /**
   * Get genres list
   */
  async getGenres(
    type: "movie" | "tv" = "movie",
  ): Promise<{ genres: Genre[] }> {
    return this.fetchTMDB<{ genres: Genre[] }>(`/genre/${type}/list`);
  },

  /**
   * Helper to build full image URLs
   */
  getImageUrl(
    path: string | null,
    size: "small" | "medium" | "large" | "original" = "medium",
  ): string {
    if (!path) return "/avatar-placeholder.jpg"; // Fallback

    const sizes = {
      small: "w342",
      medium: "w500",
      large: "w780",
      original: "original",
    };

    return `${IMAGE_BASE_URL}/${sizes[size]}${path}`;
  },
};
