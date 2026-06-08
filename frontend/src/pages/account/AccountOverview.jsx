import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function AccountOverview() {
  const { user, authHeader } = useAuth()
  const [profile, setProfile] = useState(null)
  const [orderCount, setOrderCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axios.get(`${API}/auth/profile`, authHeader())
        setProfile(profileRes.data)

        const ordersRes = await axios.get(`${API}/orders/user/me`, authHeader())
        setOrderCount(ordersRes.data.length)
      } catch (err) {
        console.error('Error fetching profile:', err)
      } finally {
        setLoading(false)
      }
    }
    if (user) fetchData()
  }, [user, authHeader])

  if (loading) return <div className="text-center text-taupe">Loading...</div>

  const memberSince = profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '—'

  return (
    <div>
      <div className="mb-8">
        <p className="font-dm text-xs uppercase tracking-[0.35em] text-taupe">Account overview</p>
        <h1 className="mt-3 text-3xl font-cormorant text-espresso">Your account at a glance</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-sand bg-ivory p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-taupe">Name</p>
          <p className="mt-3 text-lg font-semibold text-espresso">{profile?.name || '—'}</p>
        </div>
        <div className="rounded-3xl border border-sand bg-ivory p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-taupe">Email</p>
          <p className="mt-3 text-lg font-semibold text-espresso break-all">{profile?.email || '—'}</p>
        </div>
        <div className="rounded-3xl border border-sand bg-ivory p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-taupe">Member since</p>
          <p className="mt-3 text-lg font-semibold text-espresso">{memberSince}</p>
        </div>
        <div className="rounded-3xl border border-sand bg-ivory p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-taupe">Total orders</p>
          <p className="mt-3 text-lg font-semibold text-espresso">{orderCount}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-sand bg-white p-6 shadow-sm shadow-espresso/5">
        <p className="text-sm uppercase tracking-[0.25em] text-taupe">Quick actions</p>
        <p className="mt-3 text-sm text-espresso">View recent orders, update your profile, or secure your account from the navigation menu.</p>
      </div>
    </div>
  )
}
