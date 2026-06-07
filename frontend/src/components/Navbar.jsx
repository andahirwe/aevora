import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems, setIsOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-ivory border-b border-sand">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-mocha flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gold"></div>
          </div>
          <span className="font-cormorant text-2xl font-semibold tracking-widest text-espresso uppercase">
            Aevora
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-dm text-sm tracking-widest uppercase text-taupe hover:text-espresso transition-colors">
            Home
          </Link>
          <Link to="/products" className="font-dm text-sm tracking-widest uppercase text-taupe hover:text-espresso transition-colors">
            Shop
          </Link>
          {user?.isAdmin && (
            <Link to="/admin" className="font-dm text-sm tracking-widest uppercase text-taupe hover:text-espresso transition-colors">
              Dashboard
            </Link>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="font-dm text-sm text-taupe">Hi, {user.name?.split(' ')[0]}</span>
              <button onClick={handleLogout} className="font-dm text-sm tracking-widest uppercase text-taupe hover:text-espresso transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="font-dm text-sm tracking-widest uppercase text-taupe hover:text-espresso transition-colors">
                Login
              </Link>
            </div>
          )}

          {/* Cart Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 hover:opacity-70 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-espresso" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-mocha text-ivory text-xs rounded-full flex items-center justify-center font-dm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-espresso" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-ivory border-t border-sand px-6 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="font-dm text-sm tracking-widest uppercase text-taupe">Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="font-dm text-sm tracking-widest uppercase text-taupe">Shop</Link>
          {user?.isAdmin && <Link to="/admin" onClick={() => setMenuOpen(false)} className="font-dm text-sm tracking-widest uppercase text-taupe">Dashboard</Link>}
          {user ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="text-left font-dm text-sm tracking-widest uppercase text-taupe">Logout</button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="font-dm text-sm tracking-widest uppercase text-taupe">Login</Link>
          )}
        </div>
      )}
    </nav>
  )
}// TODO: implement
