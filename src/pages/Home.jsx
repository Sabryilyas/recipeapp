import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { RecipeCard } from '../components/RecipeCard'

const categories = ['pork', 'Beef', 'Chicken', 'Lamb', 'pasta']

const sampleRecipes = Array(10).fill(null).map((_, i) => ({
  id: i,
  title: 'Chicken Noodle Soup',
  category: 'Soups',
  image: '/placeholder.svg',
  isFavorite: false
}))

export function Home() {
  const [activeCategory, setActiveCategory] = useState('pork')
  const [recipes, setRecipes] = useState(sampleRecipes)

  const toggleFavorite = (id) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id 
        ? {...recipe, isFavorite: !recipe.isFavorite}
        : recipe
    ))
  }

  return (
    <div className="min-h-screen bg-[#fff9f9]">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-[#ff4e6e] text-white'
                  : 'bg-white text-gray-900 border border-[#ff4e6e]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {recipes.map(recipe => (
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

