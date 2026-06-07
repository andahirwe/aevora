import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState('benefits')

  useEffect(() => {
    axios.get(`${API}/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-mocha border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!product) return null

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-12">
          <button onClick={() => navigate('/products')}
            className="font-dm text-xs tracking-widest uppercase text-taupe hover:text-espresso transition-colors">
            Shop
          </button>
          <span className="text-taupe">/</span>
          <span className="font-dm text-xs tracking-widest uppercase text-espresso">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Image */}
          <div className="bg-cream aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-dm text-xs tracking-widest uppercase text-taupe">
                {product.category}
              </span>
              <h1 className="font-cormorant text-5xl text-espresso mt-2">
                {product.name}
              </h1>
            </div>

            <p className="font-cormorant text-3xl text-espresso">
              ${product.price}
            </p>

            <p className="font-dm text-sm text-taupe leading-relaxed">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-dm text-xs tracking-widest uppercase text-taupe">Qty</span>
              <div className="flex items-center border border-sand">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-taupe hover:text-espresso transition-colors"
                >
                  −
                </button>
                <span className="w-10 h-10 flex items-center justify-center font-dm text-sm text-espresso">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-taupe hover:text-espresso transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`w-full font-dm text-sm tracking-widest uppercase py-4 transition-colors ${
                added
                  ? 'bg-gold text-espresso'
                  : 'bg-mocha text-ivory hover:bg-espresso'
              }`}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            {/* Stock */}
            <p className="font-dm text-xs text-taupe">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>

            {/* Tabs */}
            <div className="border-t border-sand pt-6">
              <div className="flex gap-6 mb-6">
                {['benefits', 'ingredients'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-dm text-xs tracking-widest uppercase pb-2 transition-colors ${
                      activeTab === tab
                        ? 'text-espresso border-b border-espresso'
                        : 'text-taupe hover:text-espresso'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'benefits' && (
                <ul className="flex flex-col gap-3">
                  {product.benefits?.map((b, i) => (
                    <li key={i} className="flex items-center gap-3 font-dm text-sm text-taupe">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'ingredients' && (
                <ul className="flex flex-col gap-3">
                  {product.ingredients?.map((ing, i) => (
                    <li key={i} className="flex items-center gap-3 font-dm text-sm text-taupe">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {ing}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}