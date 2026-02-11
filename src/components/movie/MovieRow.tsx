import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/types/tmdb";
import styles from "../../styles/components/movieRow.module.css";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  if (!movies || movies.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth * 0.8
          : scrollLeft + clientWidth * 0.8;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.movieRow}>
      <h2 className={styles.rowTitle}>{title}</h2>

      <div className={styles.rowContainer}>
        <button
          className={`${styles.arrow} ${styles.leftArrow}`}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <div className={styles.rowList} ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.rightArrow}`}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
