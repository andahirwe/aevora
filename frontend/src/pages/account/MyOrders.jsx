import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function MyOrders() {
  const { authHeader } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${API}/orders/user/me`, authHeader())
        setOrders(data)
      } catch (err) {
        console.error('Error fetching orders:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [authHeader])

  if (loading) return <div className="text-center text-taupe">Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <p className="font-dm text-xs uppercase tracking-[0.35em] text-taupe">Order history</p>
        <h1 className="mt-3 text-3xl font-cormorant text-espresso">Your recent orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-sand bg-ivory p-8 text-center text-espresso shadow-sm shadow-espresso/5">
          <p className="text-lg font-semibold">No orders yet</p>
          <p className="mt-3 text-sm text-taupe">Any orders you place will appear here with delivery status and order details.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-3xl border border-sand bg-ivory shadow-sm shadow-espresso/5">
              <button
                onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                className="w-full px-6 py-4 text-left hover:bg-cream/50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-dm text-xs uppercase tracking-[0.25em] text-taupe">Order #{order._id?.slice(-6)}</p>
                    <p className="mt-2 text-sm text-espresso">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-taupe">Total</p>
                      <p className="text-lg font-semibold text-espresso">RWF {order.totalAmount?.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className={`inline-block rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'pending' ? 'bg-gold/20 text-espresso' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status || 'pending'}
                      </span>
                    </div>
                    <svg className={`h-5 w-5 text-espresso transition ${expandedId === order._id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {expandedId === order._id && (
                <div className="border-t border-sand px-6 py-4">
                  <p className="mb-4 text-xs uppercase tracking-[0.25em] text-taupe">Items</p>
                  <div className="space-y-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-espresso font-semibold">{item.name}</p>
                          <p className="text-taupe">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-espresso font-semibold">RWF {(item.price * item.quantity)?.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-sand pt-4">
                    <div className="flex justify-between text-sm">
                      <p className="text-taupe">Shipping to:</p>
                      <p className="text-espresso font-semibold">{order.address}, {order.city}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
