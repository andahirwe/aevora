import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CartDrawer() {
  const { cartItems, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    setIsOpen(false)
    navigate('/checkout')
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-espresso/40 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-ivory z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-sand">
            <h2 className="font-cormorant text-2xl text-espresso">Your Cart</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:opacity-60 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-espresso" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-sand flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-taupe" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="font-dm text-taupe text-sm">Your cart is empty</p>
                <button
                  onClick={() => { setIsOpen(false); navigate('/products') }}
                  className="font-dm text-xs tracking-widest uppercase text-mocha border border-mocha px-6 py-2 hover:bg-mocha hover:text-ivory transition-colors"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {cartItems.map(item => (
                  <div key={item._id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover bg-cream"
                    />
                    <div className="flex-1">
                      <h3 className="font-cormorant text-lg text-espresso">{item.name}</h3>
                      <p className="font-dm text-sm text-taupe">${item.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-6 h-6 border border-sand flex items-center justify-center text-taupe hover:border-mocha transition-colors"
                        >
                          −
                        </button>
                        <span className="font-dm text-sm text-espresso w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-6 h-6 border border-sand flex items-center justify-center text-taupe hover:border-mocha transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="ml-auto font-dm text-xs text-taupe hover:text-espresso transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-sand px-6 py-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-dm text-sm tracking-widest uppercase text-taupe">Total</span>
                <span className="font-cormorant text-2xl text-espresso">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-mocha text-ivory font-dm text-sm tracking-widest uppercase py-4 hover:bg-espresso transition-colors"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full border border-sand text-taupe font-dm text-sm tracking-widest uppercase py-3 hover:border-mocha transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}// TODO: implement
