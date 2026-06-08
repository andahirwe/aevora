import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function EditProfile() {
  const { user, authHeader, updateUser } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    country: 'Rwanda',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API}/auth/profile`, authHeader())
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          street: data.address?.street || '',
          city: data.address?.city || '',
          country: data.address?.country || 'Rwanda',
        })
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    if (user) fetchProfile()
  }, [user, authHeader])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    try {
      const { data } = await axios.put(
        `${API}/auth/profile`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.street,
            city: formData.city,
            country: formData.country,
          },
        },
        authHeader()
      )

      // Update context with new user data and token if provided
      updateUser({
        ...data,
        token: data.token || user.token,
      })

      setMessage('Profile updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update profile'
      setError(errorMsg)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center text-taupe">Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <p className="font-dm text-xs uppercase tracking-[0.35em] text-taupe">Profile settings</p>
        <h1 className="mt-3 text-3xl font-cormorant text-espresso">Edit your profile</h1>
      </div>

      {message && <div className="mb-6 rounded-2xl bg-gold/10 p-4 text-sm text-espresso">{message}</div>}
      {error && <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm uppercase tracking-[0.25em] text-taupe">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="mt-3 w-full rounded-2xl border border-sand bg-ivory px-4 py-3 text-espresso placeholder-taupe/50 outline-none focus:border-mocha"
            />
          </div>
          <div>
            <label className="block text-sm uppercase tracking-[0.25em] text-taupe">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="mt-3 w-full rounded-2xl border border-sand bg-ivory px-4 py-3 text-espresso placeholder-taupe/50 outline-none focus:border-mocha"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm uppercase tracking-[0.25em] text-taupe">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+250 XXX XXXXXX"
            className="mt-3 w-full rounded-2xl border border-sand bg-ivory px-4 py-3 text-espresso placeholder-taupe/50 outline-none focus:border-mocha"
          />
        </div>

        <div className="border-t border-sand pt-6">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-taupe">Address</p>
          <div>
            <label className="block text-sm uppercase tracking-[0.25em] text-taupe">Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Your street address"
              className="mt-3 w-full rounded-2xl border border-sand bg-ivory px-4 py-3 text-espresso placeholder-taupe/50 outline-none focus:border-mocha"
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm uppercase tracking-[0.25em] text-taupe">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Your city"
                className="mt-3 w-full rounded-2xl border border-sand bg-ivory px-4 py-3 text-espresso placeholder-taupe/50 outline-none focus:border-mocha"
              />
            </div>
            <div>
              <label className="block text-sm uppercase tracking-[0.25em] text-taupe">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Rwanda"
                className="mt-3 w-full rounded-2xl border border-sand bg-ivory px-4 py-3 text-espresso placeholder-taupe/50 outline-none focus:border-mocha"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full border border-espresso bg-espresso px-8 py-3 font-dm text-xs font-semibold uppercase tracking-[0.3em] text-ivory transition hover:bg-mocha hover:border-mocha disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
