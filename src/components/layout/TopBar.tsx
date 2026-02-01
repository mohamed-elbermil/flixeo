"use client"

import Link from "next/link"

export default function TopBar() {
  return (
    <nav>
      <div className="searchBar">
        <input type="search" name="" id="" placeholder="Rechercher un film ou série" />
      </div>
        <div className="rightElement">
            <button>Recommandé</button>
            <i className="fa-regular fa-user"></i>
        </div>
    </nav>
    
  )
}
