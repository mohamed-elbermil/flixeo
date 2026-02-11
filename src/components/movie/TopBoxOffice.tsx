"use client"

import React from 'react'
import { Movie } from '@/types/tmdb'
import { tmdbService } from '@/services/tmdbService'

interface TopBoxOfficeProps {
  movies: Movie[];
}

export default function TopBoxOffice({ movies }: TopBoxOfficeProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="top-box-office">
      <div className="tbo-header">
        <h2>Top #10 Boxoffice</h2>
        <span>Populaires cette semaine</span>
      </div>

      <div className="tbo-list">
        {movies.slice(0, 10).map((movie, index) => {
          const title = movie.title || movie.name;
          const rating = movie.vote_average.toFixed(1);
          const posterUrl = tmdbService.getImageUrl(movie.poster_path, 'small');
          
          return (
            <div key={movie.id} className="tbo-item">
              <div className="tbo-rank">{index + 1}</div>
              <img src={posterUrl} alt={title} className="tbo-poster" />
              
              <div className="tbo-info">
                <h3 className="tbo-title">{title}</h3>
                <div className="tbo-meta">
                  <span>
                    <i className="fa-solid fa-star"></i> {rating}
                  </span>
                </div>
              </div>

              <div className="tbo-status">
                {movie.vote_average > 7 ? (
                  <i className="fa-solid fa-circle-check status-ok"></i>
                ) : (
                  <i className="fa-solid fa-ban status-bad"></i>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
