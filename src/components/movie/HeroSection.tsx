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

import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="HeroSection">
        <img src="/avatar.jpg" alt="" />
    
    <div className="infos">
        <h1>Title</h1>
        <span>2026 - EN</span>
        <span className="categorie">Action, Thriller, Crime</span>
        <p>Résumé du contenu :  ipsum dolor sit amet consectetur adipisicing elit. Provident sit similique quasi!</p>
        <button>Watch</button>
    </div>
    </div>
    
  )
}
