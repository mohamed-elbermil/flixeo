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

"use client"

import { Movie } from "@/types/tmdb"
import { tmdbService } from "@/services/tmdbService"

interface HeroSectionProps {
  movie: Movie;
}

export default function HeroSection({ movie }: HeroSectionProps) {
  if (!movie) return null;

  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const backdropUrl = tmdbService.getImageUrl(movie.backdrop_path, 'original');

  return (
    <div className="HeroSection">
        <img src={backdropUrl} alt={title} />
    
    <div className="infos">
        <h1>{title}</h1>
        <span>{year} - {movie.original_language?.toUpperCase() || 'EN'}</span>
        <p>{movie.overview}</p>
        <div className="buttonContainer">
          <button className="buttonLong"><i className="fa-solid fa-play"></i>Watch</button>
          <i className="fa-regular fa-heart"></i>
        </div>
    </div>
    </div>
  )
}
