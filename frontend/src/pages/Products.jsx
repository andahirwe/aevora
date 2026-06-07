import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const CATEGORIES = ['all', 'cleanser', 'serum', 'moisturizer', 'eye-care', 'bundle']

export default function Products() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [active, setActive] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}/products`)
      .then(res => {
        setProducts(res.data)
        setFiltered(res.data)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleFilter = (cat) => {
    setActive(cat)
    if (cat === 'all') {
      setFiltered(products)
    } else {
      setFiltered(products.filter(p => p.category === cat))
    }
  }

  return (
    <div className="min-h-screen bg-ivory">

      {/* Header */}
      <div className="bg-cream py-20 px-6 text-center">
        <p className="font-dm text-xs tracking-widest uppercase text-taupe mb-4">
          Aevora Collection
        </p>
        <h1 className="font-cormorant text-6xl text-espresso mb-4">The Shop</h1>
        <p className="font-dm text-sm text-taupe max-w-md mx-auto leading-relaxed">
          Every formula engineered for skin fitness. Science-backed, results-driven.
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-ivory border-b border-sand px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`font-dm text-xs tracking-widest uppercase whitespace-nowrap pb-1 transition-colors ${
                active === cat
                  ? 'text-espresso border-b border-espresso'
                  : 'text-taupe hover:text-espresso'
              }`}
            >
              {cat === 'all' ? 'All Products' : cat}
            </button>
          ))}
          <span className="ml-auto font-dm text-xs text-taupe whitespace-nowrap">
            {filtered.length} products
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 bg-sand animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-cormorant text-3xl text-taupe">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}