import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match')
    if (form.password.length < 6) return setError('Password must be at least 6 characters')
    setLoading(true)
    try {
      await axios.post(`${API}/auth/reset-password/${token}`, {
        password: form.password
      })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Reset link is invalid or expired')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-mocha flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gold"></div>
            </div>
            <span className="font-cormorant text-2xl tracking-widest uppercase text-espresso">
              Aevora
            </span>
          </Link>
          <h1 className="font-cormorant text-4xl text-espresso mt-6">New Password</h1>
          <p className="font-dm text-sm text-taupe mt-2">Choose a strong password</p>
        </div>

        <div className="bg-ivory p-8 border border-sand">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 font-dm text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-dm text-xs tracking-widest uppercase text-taupe">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
                placeholder="Min. 6 characters"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-dm text-xs tracking-widest uppercase text-taupe">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                required
                className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-mocha text-ivory font-dm text-xs tracking-widest uppercase py-4 hover:bg-espresso transition-colors disabled:opacity-60"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}