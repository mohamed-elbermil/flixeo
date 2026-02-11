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

"use client"

import { useState } from "react"
import Link from "next/link"
import styles from '../../styles/components/movieCard.module.css'

export default function MovieCard() {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.movieCard}>
      <img src="/avatar-cover.jpg" alt="Avatar The Way of Water" />

      <div className={styles.container}>
        <div className={styles.review}>
          <i className="fa-solid fa-star"></i>
          <span>8.5</span>
        </div>

        <div className={styles.type}>
          <span>Movie</span>
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
        <p>Avatar: The Way of Water</p>
        <span>2026</span>
      </div>

    </div>
  )
}