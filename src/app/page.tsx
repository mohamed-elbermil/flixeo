"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import TopBar from "@/components/layout/TopBar";
import HeroSection from "@/components/movie/HeroSection";
import SideBar from "@/components/layout/Sidebar";
import TopBoxOffice from "@/components/movie/TopBoxOffice";
import MovieCard from "@/components/movie/MovieCard";
import { tmdbService } from "@/services/tmdbService";
import { Movie } from "@/types/tmdb";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [trending, popular] = await Promise.all([
          tmdbService.getTrending("all", "week"),
          tmdbService.getPopularMovies(),
        ]);

        setTrendingMovies(trending.results);
        setPopularMovies(popular.results);
      } catch (err) {
        setError(
          "Impossible de charger les données de TMDB. Vérifiez votre clé API.",
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const heroMovie = trendingMovies[0];

  return (
    <div>
      <TopBar></TopBar>
      <SideBar></SideBar>
      <div className="container">
        {heroMovie && <HeroSection movie={heroMovie}></HeroSection>}
        <div className={styles.tboWrapper}>
          <TopBoxOffice movies={popularMovies}></TopBoxOffice>
        </div>
      </div>
      <div className={styles.moviesGrid}>
        {trendingMovies.slice(1, 7).map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>
    </div>
  );
}
