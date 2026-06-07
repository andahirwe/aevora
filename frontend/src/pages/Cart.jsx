import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center gap-6">
      <div className="w-20 h-20 rounded-full border-2 border-sand flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-taupe" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h2 className="font-cormorant text-4xl text-espresso">Your cart is empty</h2>
      <p className="font-dm text-sm text-taupe">Add some products to get started</p>
      <Link
        to="/products"
        className="bg-mocha text-ivory font-dm text-xs tracking-widest uppercase px-10 py-4 hover:bg-espresso transition-colors"
      >
        Shop Now
      </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="font-dm text-xs tracking-widest uppercase text-taupe mb-2">Review</p>
          <h1 className="font-cormorant text-5xl text-espresso">Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cartItems.map(item => (
              <div key={item._id} className="flex gap-6 bg-cream p-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover flex-shrink-0"
                />
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-dm text-xs tracking-widest uppercase text-taupe">
                        {item.category}
                      </span>
                      <h3 className="font-cormorant text-2xl text-espresso mt-1">
                        {item.name}
                      </h3>
                    </div>
                    <span className="font-cormorant text-xl text-espresso">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-sand bg-ivory">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-taupe hover:text-espresso transition-colors"
                      >
                        −
                      </button>
                      <span className="w-9 h-9 flex items-center justify-center font-dm text-sm text-espresso">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-taupe hover:text-espresso transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="font-dm text-xs tracking-widest uppercase text-taupe hover:text-espresso transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="self-start font-dm text-xs tracking-widest uppercase text-taupe hover:text-espresso transition-colors border-b border-taupe pb-0.5"
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-6">
            <div className="bg-cream p-8 flex flex-col gap-6">
              <h2 className="font-cormorant text-2xl text-espresso">Order Summary</h2>

              <div className="flex flex-col gap-3 border-t border-sand pt-6">
                {cartItems.map(item => (
                  <div key={item._id} className="flex justify-between items-center">
                    <span className="font-dm text-sm text-taupe">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-dm text-sm text-espresso">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-sand pt-4 flex justify-between items-center">
                <span className="font-dm text-sm tracking-widest uppercase text-taupe">
                  Total
                </span>
                <span className="font-cormorant text-3xl text-espresso">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-mocha text-ivory font-dm text-xs tracking-widest uppercase py-4 hover:bg-espresso transition-colors"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="text-center font-dm text-xs tracking-widest uppercase text-taupe hover:text-espresso transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Free shipping notice */}
            <div className="border border-gold/30 bg-gold/5 p-4">
              <p className="font-dm text-xs text-taupe text-center leading-relaxed">
                🌿 Free shipping on orders over <strong className="text-espresso">$100</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}