import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems, setIsOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setDropdownOpen(false)
    setMenuOpen(false)
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-ivory/95 shadow-sm shadow-espresso/10 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 items-center gap-4">

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-dm text-xs tracking-widest uppercase text-espresso hover:text-mocha transition-colors">HOME</Link>
          <Link to="/products" className="font-dm text-xs tracking-widest uppercase text-espresso hover:text-mocha transition-colors">SHOP</Link>
          <Link to="/science" className="font-dm text-xs tracking-widest uppercase text-espresso hover:text-mocha transition-colors">SCIENCE</Link>
          <Link to="/us" className="font-dm text-xs tracking-widest uppercase text-espresso hover:text-mocha transition-colors">US</Link>
        </div>

        <div className="flex justify-center md:justify-center">
          <Link to="/" className="inline-flex items-center gap-3 text-espresso uppercase font-cormorant text-2xl tracking-[0.35em]">
            <span className="w-10 h-10 rounded-full border border-espresso flex items-center justify-center text-espresso">A</span>
            AEVORA
          </Link>
        </div>

        <div className="flex items-center justify-end gap-4 relative" ref={dropdownRef}>
          {user ? (
            <div className="hidden md:block">
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-sand bg-ivory/90 px-4 py-2 text-espresso transition-colors hover:border-mocha"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sand text-xs font-semibold text-espresso">P</span>
                <span className="font-dm text-xs tracking-widest uppercase">Hi, {user.name?.split(' ')[0]}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-taupe" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute right-0 top-full mt-3 w-56 rounded-2xl bg-ivory border border-sand shadow-lg shadow-espresso/10 transition-opacity duration-200 ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="flex flex-col py-3">
                  <Link to="/account" className="px-4 py-3 font-dm text-xs tracking-widest uppercase text-espresso hover:bg-gold/10 hover:text-mocha">My Account</Link>
                  <Link to="/account/orders" className="px-4 py-3 font-dm text-xs tracking-widest uppercase text-espresso hover:bg-gold/10 hover:text-mocha">My Orders</Link>
                  <Link to="/account/profile" className="px-4 py-3 font-dm text-xs tracking-widest uppercase text-espresso hover:bg-gold/10 hover:text-mocha">Edit Profile</Link>
                  <Link to="/account/security" className="px-4 py-3 font-dm text-xs tracking-widest uppercase text-espresso hover:bg-gold/10 hover:text-mocha">Security</Link>
                  <button onClick={handleLogout} className="text-left px-4 py-3 font-dm text-xs tracking-widest uppercase text-espresso hover:bg-gold/10 hover:text-mocha">Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hidden md:inline-flex font-dm text-xs tracking-widest uppercase text-espresso hover:text-mocha transition-colors">LOGIN</Link>
          )}

          <button onClick={() => setIsOpen(true)} className="relative p-2 text-espresso hover:text-mocha transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold px-1.5 text-[10px] font-semibold text-espresso">{totalItems}</span>
            )}
          </button>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-espresso" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-ivory border-t border-sand px-6 py-4">
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="font-dm text-xs tracking-widest uppercase text-espresso">HOME</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)} className="font-dm text-xs tracking-widest uppercase text-espresso">SHOP</Link>
            <Link to="/science" onClick={() => setMenuOpen(false)} className="font-dm text-xs tracking-widest uppercase text-espresso">SCIENCE</Link>
            <Link to="/us" onClick={() => setMenuOpen(false)} className="font-dm text-xs tracking-widest uppercase text-espresso">US</Link>
            {user ? (
              <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="text-left font-dm text-xs tracking-widest uppercase text-espresso">LOGOUT</button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="font-dm text-xs tracking-widest uppercase text-espresso">LOGIN</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
