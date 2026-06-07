import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const STATUS_STYLES = {
  pending: 'bg-gold/20 text-espresso',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

function StatCard({ title, value }) {
  return (
    <div className="bg-cream p-6 flex flex-col gap-2">
      <p className="font-dm text-xs tracking-widest uppercase text-taupe">{title}</p>
      <p className="font-cormorant text-4xl text-espresso">{value}</p>
    </div>
  )
}

export default function AdminDashboard() {
  const { user, authHeader } = useAuth()
  const [stats, setStats] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          axios.get(`${API}/orders/stats`, authHeader()),
          axios.get(`${API}/orders`, authHeader()),
        ])
        setStats(statsRes.data)
        setOrders(ordersRes.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-mocha border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <p className="font-dm text-red-600">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="font-dm text-xs tracking-widest uppercase text-taupe mb-2">
            Welcome, {user?.name}
          </p>
          <h1 className="font-cormorant text-5xl text-espresso">Admin Dashboard</h1>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard title="Total Orders" value={stats?.totalOrders || 0} />
          <StatCard title="Total Revenue" value={`$${Number(stats?.totalRevenue || 0).toFixed(2)}`} />
          <StatCard title="Pending Orders" value={stats?.pendingOrders || 0} />
          <StatCard title="Delivered Orders" value={stats?.deliveredOrders || 0} />
        </div>

        {/* Orders Table */}
        <div className="bg-cream p-8">
          <h2 className="font-cormorant text-2xl text-espresso mb-6 border-b border-sand pb-4">
            Recent Orders
          </h2>

          {orders.length === 0 ? (
            <p className="font-dm text-sm text-taupe text-center py-12">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-sand">
                    <th className="font-dm text-xs tracking-widest uppercase text-taupe text-left py-3 px-4">Customer</th>
                    <th className="font-dm text-xs tracking-widest uppercase text-taupe text-left py-3 px-4">Items</th>
                    <th className="font-dm text-xs tracking-widest uppercase text-taupe text-left py-3 px-4">Total</th>
                    <th className="font-dm text-xs tracking-widest uppercase text-taupe text-left py-3 px-4">Status</th>
                    <th className="font-dm text-xs tracking-widest uppercase text-taupe text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} className="border-b border-sand/50 hover:bg-sand/20 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-dm text-sm text-espresso">{order.customerName}</p>
                        <p className="font-dm text-xs text-taupe">{order.customerEmail}</p>
                      </td>
                      <td className="py-4 px-4 font-dm text-sm text-espresso">
                        {order.items?.reduce((s, i) => s + i.quantity, 0)} items
                      </td>
                      <td className="py-4 px-4 font-cormorant text-xl text-espresso">
                        ${order.totalAmount?.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-dm text-xs tracking-widest uppercase px-3 py-1 ${STATUS_STYLES[order.status] || 'bg-sand text-taupe'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-dm text-sm text-taupe">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}