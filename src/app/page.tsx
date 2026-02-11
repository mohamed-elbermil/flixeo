"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import HeroSection from "@/components/movie/HeroSection";
import TopBoxOffice from "@/components/movie/TopBoxOffice";
import MovieCard from "@/components/movie/MovieCard";
import MovieRow from "@/components/movie/MovieRow";
import { tmdbService } from "@/services/tmdbService";
import { Movie } from "@/types/tmdb";

export default function Home() {
  const [trendingAll, setTrendingAll] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [topRatedTV, setTopRatedTV] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [trending, popular, topMovies, topTV] = await Promise.all([
          tmdbService.getTrending("all", "week"),
          tmdbService.getPopularMovies(),
          tmdbService.getTopRatedMovies(),
          tmdbService.getTopRatedTV(),
        ]);

        setTrendingAll(trending.results);
        setPopularMovies(popular.results);
        setTopRatedMovies(topMovies.results);
        setTopRatedTV(topTV.results);

        // Fetch recommendations based on the first trending movie if it exists
        if (trending.results.length > 0) {
          const recs = await tmdbService.getRecommendations(
            trending.results[0].id,
          );
          setRecommendations(recs.results);
        }
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

  const heroMovie = trendingAll[0];

  return (
    <div>
      <div className="container">
        {heroMovie && <HeroSection movie={heroMovie}></HeroSection>}
        <div className={styles.tboWrapper}>
          <TopBoxOffice movies={popularMovies}></TopBoxOffice>
        </div>
      </div>

      <div className={styles.contentRows}>
        <MovieRow
          title="Tendances de la semaine"
          movies={trendingAll.slice(1)}
        />
        <MovieRow title="Les mieux notés au cinéma" movies={topRatedMovies} />
        <MovieRow title="Séries incontournables" movies={topRatedTV} />
        <MovieRow
          title="Parce que vous avez aimé le contenu à l'affiche"
          movies={recommendations}
        />
      </div>
    </div>
  );
}
