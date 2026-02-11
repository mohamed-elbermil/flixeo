// Carte d’un film

// Contient :

// poster

// note

// hover (play / like)

// titre

// Contient :

// 1 gros film mis en avant

// image ou trailer autoplay

// titre

// genres

// description

// boutons d’action

// prix

// Top Box Office à droite

// C’est le cœur visuel de la page.

"use client";

import { useState } from "react";
import styles from "../../styles/components/movieCard.module.css";
import { Movie } from "@/types/tmdb";
import { tmdbService } from "@/services/tmdbService";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [open, setOpen] = useState(false);

  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const rating = movie.vote_average.toFixed(1);
  const posterUrl = tmdbService.getImageUrl(movie.poster_path, "medium");

  return (
    <div className={styles.movieCard}>
      <img src={posterUrl} alt={title} />
      
      <div className={styles.playOverlay}>
        <div className={styles.playIcon}>
        <i class="fa-regular fa-circle-play"></i>
        </div>
      </div>

      <div className="infos-inline">
        <div className={styles.review}>
          <i className="fa-solid fa-star"></i>
          <span>{rating}</span>
        </div>

        <div className={styles.type}>
          <span>{movie.media_type === "tv" ? "Série" : "Film"}</span>
        </div>
      </div>

      <button
        className={styles.menuButton}
        onClick={() => setOpen(!open)}
        aria-label="Options"
      >
        ⋮
      </button>

      {open && (
        <div className={styles.menu}>
          <button>➕ Watchlist</button>
          <button>⭐ Favoris</button>
        </div>
      )}

      <div className={styles.title}>
        <p>{title}</p>
        <span>{year}</span>
      </div>
    </div>
  );
}
