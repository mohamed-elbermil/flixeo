"use client"

import React from 'react'

const movies = [
  {
    rank: 1,
    title: "Mercy",
    rating: 6.7,
    duration: "1h 40m",
    image: "/avatar.jpg", // Using avatar.jpg as placeholder
    status: "bad"
  },
  {
    rank: 2,
    title: "Avatar: Fire and Ash",
    rating: 7.3,
    duration: "3h 18m",
    image: "/avatar.jpg",
    status: "bad"
  },
  {
    rank: 3,
    title: "Zootopia 2",
    rating: 7.6,
    duration: "1h 47m",
    image: "/avatar.jpg",
    status: "ok"
  },
  {
    rank: 4,
    title: "Mufasa: The Lion King",
    rating: 6.8,
    duration: "1h 58m",
    image: "/avatar.jpg",
    status: "bad"
  },
  {
    rank: 5,
    title: "Sonic the Hedgehog 3",
    rating: 7.2,
    duration: "1h 49m",
    image: "/avatar.jpg",
    status: "bad"
  },
  {
    rank: 6,
    title: "Mufasa: The Lion King",
    rating: 6.8,
    duration: "1h 58m",
    image: "/avatar.jpg",
    status: "bad"
  },
  {
    rank: 7,
    title: "Mufasa: The Lion King",
    rating: 6.8,
    duration: "1h 58m",
    image: "/avatar.jpg",
    status: "bad"
  },
  {
    rank: 8,
    title: "Mufasa: The Lion King",
    rating: 6.8,
    duration: "1h 58m",
    image: "/avatar.jpg",
    status: "bad"
  },
  {
    rank: 9,
    title: "Mufasa: The Lion King",
    rating: 6.8,
    duration: "1h 58m",
    image: "/avatar.jpg",
    status: "bad"
  },
  {
    rank: 10,
    title: "Mufasa: The Lion King",
    rating: 6.8,
    duration: "1h 58m",
    image: "/avatar.jpg",
    status: "bad"
  },
]

export default function TopBoxOffice() {
  return (
    <div className="top-box-office">
      <div className="tbo-header">
        <h2>Top #10 Boxoffice</h2>
        <span>Week 4 | 2026</span>
      </div>

      <div className="tbo-list">
        {movies.map((movie) => (
          <div key={movie.rank} className="tbo-item">
            <div className="tbo-rank">{movie.rank}</div>
            <img src={movie.image} alt={movie.title} className="tbo-poster" />
            
            <div className="tbo-info">
              <h3 className="tbo-title">{movie.title}</h3>
              <div className="tbo-meta">
                <span>
                  <i className="fa-solid fa-star"></i> {movie.rating}
                </span>
                <span>•</span>
                <span>{movie.duration}</span>
              </div>
            </div>

            <div className="tbo-status">
              {movie.status === 'ok' ? (
                <i className="fa-solid fa-circle-check status-ok"></i>
              ) : (
                <i className="fa-solid fa-ban status-bad"></i>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
