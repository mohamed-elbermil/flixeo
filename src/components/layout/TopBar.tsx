"use client";

import Link from "next/link";
import styles from "../../styles/components/topBar.module.css";

export default function TopBar() {
  return (
    <nav>
      <Link href="/" className="logo-link">
        <h1
          style={{
            color: "var(--primary-color)",
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          FLIXEO
        </h1>
      </Link>
      <div className="searchBar">
        <input
          type="search"
          name=""
          id=""
          placeholder="Rechercher un film ou série"
        />
        <button className="mic-button">
          <i className="fa-solid fa-microphone"></i>
          <div className="particles">
            <span className="particle"></span>
            <span className="particle"></span>
            <span className="particle"></span>
            <span className="particle"></span>
            <span className="particle"></span>
            <span className="particle"></span>
          </div>
        </button>
      </div>
      <div className="rightElement">
        <button>Recommandé</button>
        <i className="fa-regular fa-user"></i>
      </div>
    </nav>
  );
}
