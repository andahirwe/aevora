import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'

export default function OrderConfirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    if (!state?.order) {
      navigate('/', { replace: true })
      return
    }
    setOrder(state.order)
  }, [state, navigate])

  if (!order) return null

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-dm text-xs tracking-widest uppercase text-taupe mb-2">Order Confirmed</p>
          <h1 className="font-cormorant text-5xl text-espresso mb-4">Thank You!</h1>
          <p className="font-dm text-sm text-taupe">
            Order <span className="text-espresso font-semibold">#{order._id?.slice(-8).toUpperCase()}</span> has been placed successfully.
          </p>
          <p className="font-dm text-sm text-taupe mt-1">
            A confirmation will be sent to <strong>{order.customerEmail}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Items */}
          <div className="lg:col-span-2 bg-cream p-8 flex flex-col gap-6">
            <h2 className="font-cormorant text-2xl text-espresso border-b border-sand pb-4">
              Your Items
            </h2>
            <div className="flex flex-col gap-4">
              {order.items?.map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-dm text-sm text-espresso font-medium">{item.name}</p>
                    <p className="font-dm text-xs text-taupe">× {item.quantity}</p>
                  </div>
                  <span className="font-dm text-sm text-espresso">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-sand pt-4 flex justify-between items-center">
              <span className="font-dm text-sm tracking-widest uppercase text-taupe">Total</span>
              <span className="font-cormorant text-3xl text-espresso">
                ${order.totalAmount?.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div className="bg-cream p-6 flex flex-col gap-4">
              <h3 className="font-cormorant text-xl text-espresso border-b border-sand pb-3">
                Delivery Details
              </h3>
              <div className="flex flex-col gap-2">
                <p className="font-dm text-sm text-espresso">{order.customerName}</p>
                <p className="font-dm text-sm text-taupe">{order.customerEmail}</p>
                {order.customerPhone && (
                  <p className="font-dm text-sm text-taupe">{order.customerPhone}</p>
                )}
                <p className="font-dm text-sm text-taupe mt-2">{order.address}</p>
                <p className="font-dm text-sm text-taupe">{order.city}</p>
              </div>

              <div className="border-t border-sand pt-3">
                <p className="font-dm text-xs tracking-widest uppercase text-taupe mb-1">Payment</p>
                <p className="font-dm text-sm text-espresso capitalize">
                  {order.paymentMethod?.replace('_', ' ')}
                </p>
              </div>

              <div className="border-t border-sand pt-3">
                <p className="font-dm text-xs tracking-widest uppercase text-taupe mb-1">Status</p>
                <span className="inline-block bg-gold/20 text-espresso font-dm text-xs tracking-widest uppercase px-3 py-1">
                  {order.status}
                </span>
              </div>
            </div>

            <Link
              to="/products"
              className="w-full text-center bg-mocha text-ivory font-dm text-xs tracking-widest uppercase py-4 hover:bg-espresso transition-colors"
            >
              Continue Shopping
            </Link>

            <Link
              to="/"
              className="w-full text-center border border-sand text-taupe font-dm text-xs tracking-widest uppercase py-3 hover:border-mocha transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}