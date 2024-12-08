import { Logo } from './Logo'
import { LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white">
      <Logo />
      <div className="flex items-center gap-8">
        <Link to="/" className="text-gray-900 hover:text-[#ff4e6e]">
          HOME
        </Link>
        <Link to="/favourites" className="text-gray-900 hover:text-[#ff4e6e]">
          FAVOURITE
        </Link>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <LogOut className="w-5 h-5" />
      </button>
    </nav>
  )
}

