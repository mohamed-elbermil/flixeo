"use client"

import Link from "next/link"
import styles from "../../styles/components/topBar.module.css"

export default function TopBar() {
  return (
    <nav>
      <div className="searchBar">
        <input type="search" name="" id="" placeholder="Rechercher un film ou série" />
        <button className={styles.btnNav}><i className="fa-solid fa-microphone"></i></button>
      </div>
        <div className="rightElement">
            <button>Recommandé</button>
            <i className="fa-regular fa-user"></i>
        </div>
    </nav>
    
  )
}
