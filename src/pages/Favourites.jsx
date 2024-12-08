import React from 'react';
import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { RecipeCard } from '../components/RecipeCard'

const sampleFavorites = Array(5).fill(null).map((_, i) => ({
  id: i,
  title: 'Chicken Noodle Soup',
  category: 'Soups',
  image: '/placeholder.svg',
  isFavorite: true
}))

export function Favourites() {
  const [favorites, setFavorites] = useState(sampleFavorites)

  const toggleFavorite = (id) => {
    setFavorites(favorites.filter(recipe => recipe.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#fff9f9]">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-8">Favourite Recipes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {favorites.map(recipe => (
            <RecipeCard
              key={recipe.id}
              {...recipe}
              onFavoriteClick={() => toggleFavorite(recipe.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

