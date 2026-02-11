"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { tmdbService } from "@/services/tmdbService";
import { MovieDetails } from "@/types/tmdb";
import styles from "@/styles/pages/contentDetail.module.css";
import Link from "next/link";

export default function TVDetailPage() {
  const { id } = useParams();
  const [show, setShow] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getTVDetails(Number(id));
        setShow(data);
      } catch (err) {
        setError("Impossible de charger les détails de la série.");
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
  if (error || !show) {
    return (
      <div className={styles.error}>
        <p>{error || "Série introuvable"}</p>
        <Link href="/" className={styles.backBtn}>Retour à l'accueil</Link>
      </div>
    );
  }

  const title = show.name || show.title;
  const backdropUrl = tmdbService.getImageUrl(show.backdrop_path, "original");
  const releaseYear = show.first_air_date ? new Date(show.first_air_date).getFullYear() : "N/A";

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.backdrop}>
          <img src={backdropUrl} alt={title} />
          <div className={styles.overlay} />
        </div>
        
        <div className={styles.heroContent}>
          <h1>{title}</h1>
          {show.tagline && <p className={styles.tagline}>"{show.tagline}"</p>}
          
          <div className={styles.meta}>
            <span className={styles.rating}>
              <i className="fa-solid fa-star"></i> {show.vote_average.toFixed(1)}
            </span>
            <span>{releaseYear}</span>
            <div className={styles.genres}>
              {show.genres.map(genre => (
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
          <p className={styles.overview}>{show.overview}</p>
        </section>

        {show.credits && show.credits.cast.length > 0 && (
          <section className={styles.section}>
            <h2>Casting</h2>
            <div className={styles.castGrid}>
              {show.credits.cast.slice(0, 10).map(person => (
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
