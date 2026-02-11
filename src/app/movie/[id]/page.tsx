"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { tmdbService } from "@/services/tmdbService";
import { MovieDetails } from "@/types/tmdb";
import styles from "@/styles/pages/contentDetail.module.css";
import Link from "next/link";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getMovieDetails(Number(id));
        setMovie(data);
      } catch (err) {
        setError("Impossible de charger les détails du film.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (error || !movie) {
    return (
      <div className={styles.error}>
        <p>{error || "Film introuvable"}</p>
        <Link href="/" className={styles.backBtn}>Retour à l'accueil</Link>
      </div>
    );
  }

  const backdropUrl = tmdbService.getImageUrl(movie.backdrop_path, "original");
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.backdrop}>
          <img src={backdropUrl} alt={movie.title} />
          <div className={styles.overlay} />
        </div>
        
        <div className={styles.heroContent}>
          <h1>{movie.title}</h1>
          {movie.tagline && <p className={styles.tagline}>"{movie.tagline}"</p>}
          
          <div className={styles.meta}>
            <span className={styles.rating}>
              <i className="fa-solid fa-star"></i> {movie.vote_average.toFixed(1)}
            </span>
            <span>{releaseYear}</span>
            {movie.runtime && <span>{movie.runtime} min</span>}
            <div className={styles.genres}>
              {movie.genres.map(genre => (
                <span key={genre.id} className={styles.genreTag}>{genre.name}</span>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.playBtn}>
              <i className="fa-solid fa-play"></i> Lecture
            </button>
            <button className={styles.listBtn}>
              <i className="fa-solid fa-plus"></i> Ma Liste
            </button>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.section}>
          <h2>Synopsis</h2>
          <p className={styles.overview}>{movie.overview}</p>
        </section>

        {movie.credits && movie.credits.cast.length > 0 && (
          <section className={styles.section}>
            <h2>Casting</h2>
            <div className={styles.castGrid}>
              {movie.credits.cast.slice(0, 10).map(person => (
                <div key={person.id} className={styles.castCard}>
                  <img 
                    src={tmdbService.getImageUrl(person.profile_path, "small") || "/avatar-cover.jpg"} 
                    alt={person.name}
                    className={styles.castImage}
                  />
                  <div className={styles.castInfo}>
                    <span className={styles.castName}>{person.name}</span>
                    <span className={styles.castCharacter}>{person.character}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
