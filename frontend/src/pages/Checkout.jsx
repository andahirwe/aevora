import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const { user, authHeader } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    customerPhone: '',
    address: '',
    city: '',
    paymentMethod: 'cash_on_delivery',
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (cartItems.length === 0) return setError('Your cart is empty')
    setLoading(true)
    try {
      const orderData = {
        ...form,
        items: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: totalPrice,
      }
      const { data } = await axios.post(
        `${API}/orders`,
        orderData,
        authHeader()
      )
      clearCart()
      navigate('/order-confirmation', { state: { order: data } })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="font-dm text-xs tracking-widest uppercase text-taupe mb-2">Almost there</p>
          <h1 className="font-cormorant text-5xl text-espresso">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Form */}
          <div className="lg:col-span-2">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 font-dm text-sm px-4 py-3 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

              {/* Contact */}
              <div className="flex flex-col gap-4">
                <h2 className="font-cormorant text-2xl text-espresso border-b border-sand pb-4">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-dm text-xs tracking-widest uppercase text-taupe">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={form.customerName}
                      onChange={handleChange}
                      required
                      className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-dm text-xs tracking-widest uppercase text-taupe">
                      Email
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={form.customerEmail}
                      onChange={handleChange}
                      required
                      className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-dm text-xs tracking-widest uppercase text-taupe">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={form.customerPhone}
                    onChange={handleChange}
                    className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
                    placeholder="+250 7XX XXX XXX"
                  />
                </div>
              </div>

              {/* Shipping */}
              <div className="flex flex-col gap-4">
                <h2 className="font-cormorant text-2xl text-espresso border-b border-sand pb-4">
                  Shipping Address
                </h2>
                <div className="flex flex-col gap-2">
                  <label className="font-dm text-xs tracking-widest uppercase text-taupe">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
                    placeholder="Street address"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-dm text-xs tracking-widest uppercase text-taupe">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
                    placeholder="City"
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="flex flex-col gap-4">
                <h2 className="font-cormorant text-2xl text-espresso border-b border-sand pb-4">
                  Payment Method
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { value: 'cash_on_delivery', label: 'Cash on Delivery' },
                    { value: 'mobile_money', label: 'Mobile Money (MTN / Airtel)' },
                  ].map(opt => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${
                        form.paymentMethod === opt.value
                          ? 'border-mocha bg-cream'
                          : 'border-sand hover:border-taupe'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.value}
                        checked={form.paymentMethod === opt.value}
                        onChange={handleChange}
                        className="accent-mocha"
                      />
                      <span className="font-dm text-sm text-espresso">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-mocha text-ivory font-dm text-sm tracking-widest uppercase py-4 hover:bg-espresso transition-colors disabled:opacity-60"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="flex flex-col gap-6">
            <div className="bg-cream p-8 flex flex-col gap-6 sticky top-24">
              <h2 className="font-cormorant text-2xl text-espresso">Order Summary</h2>

              <div className="flex flex-col gap-4">
                {cartItems.map(item => (
                  <div key={item._id} className="flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-dm text-sm text-espresso">{item.name}</p>
                      <p className="font-dm text-xs text-taupe">× {item.quantity}</p>
                    </div>
                    <span className="font-dm text-sm text-espresso">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-sand pt-4 flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-dm text-sm text-taupe">Subtotal</span>
                  <span className="font-dm text-sm text-espresso">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-dm text-sm text-taupe">Shipping</span>
                  <span className="font-dm text-sm text-espresso">
                    {totalPrice >= 100 ? 'Free' : '$10.00'}
                  </span>
                </div>
              </div>

              <div className="border-t border-sand pt-4 flex justify-between items-center">
                <span className="font-dm text-sm tracking-widest uppercase text-taupe">Total</span>
                <span className="font-cormorant text-3xl text-espresso">
                  ${(totalPrice >= 100 ? totalPrice : totalPrice + 10).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}