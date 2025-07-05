import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <nav className="w-full bg-white/10 backdrop-blur-md shadow-md text-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-300 hover:text-white transition">
          PamojaApp
        </Link>
        <div className="space-x-6 text-sm font-medium hidden md:flex">
          <Link
            to="/home"
            className={`hover:text-purple-400 ${isActive('/home') ? 'text-purple-400' : 'text-white'}`}
          >
            Home
          </Link>
          <Link
            to="/Community"
            className={`hover:text-purple-400 ${isActive('/Community') ? 'text-purple-400' : 'text-white'}`}
          >
            Community
          </Link>
          <Link
            to="/AdminPage"
            className={`hover:text-purple-400 ${isActive('/AdminPage') ? 'text-purple-400' : 'text-white'}`}
          >
            Admin
          </Link>
          <Link
            to="/ResourceSkillPage"
            className={`hover:text-purple-400 ${isActive('/ResourceSkillPage') ? 'text-purple-400' : 'text-white'}`}
          >
            Resources & Skills
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
