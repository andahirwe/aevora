import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="group flex flex-col bg-ivory border border-sand hover:border-taupe transition-colors duration-300">
      
      {/* Image */}
      <Link to={`/products/${product._id}`} className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-dm text-xs tracking-widest uppercase text-taupe">
              {product.category}
            </span>
            <Link to={`/products/${product._id}`}>
              <h3 className="font-cormorant text-xl text-espresso mt-1 hover:text-taupe transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
          <span className="font-cormorant text-xl text-espresso">${product.price}</span>
        </div>

        <p className="font-dm text-sm text-taupe leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Benefits */}
        {product.benefits?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {product.benefits.slice(0, 2).map((b, i) => (
              <span key={i} className="font-dm text-xs text-taupe bg-cream px-2 py-1">
                {b}
              </span>
            ))}
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className="mt-2 w-full border border-mocha text-mocha font-dm text-xs tracking-widest uppercase py-3 hover:bg-mocha hover:text-ivory transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}// TODO: implement
