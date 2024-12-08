import { Heart } from 'lucide-react'

export function RecipeCard({ title, category, isFavorite, onFavoriteClick, image }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-square rounded-2xl bg-gray-200 overflow-hidden">
        <img 
          src={image || "/placeholder.svg"} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600">{category}</p>
          <h3 className="font-medium">{title}</h3>
        </div>
        <button 
          onClick={onFavoriteClick}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <Heart 
            className={`w-4 h-4 ${isFavorite ? 'fill-[#ff4e6e] text-[#ff4e6e]' : 'text-gray-400'}`}
          />
        </button>
      </div>
    </div>
  )
}

