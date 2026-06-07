import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match')
    if (form.password.length < 6) return setError('Password must be at least 6 characters')
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-12">
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
          <h1 className="font-cormorant text-4xl text-espresso mt-6">Create Account</h1>
          <p className="font-dm text-sm text-taupe mt-2">Join the Aevora ritual</p>
        </div>

        {/* Form */}
        <div className="bg-ivory p-8 border border-sand">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 font-dm text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-dm text-xs tracking-widest uppercase text-taupe">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
                placeholder="Your full name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-dm text-xs tracking-widest uppercase text-taupe">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-dm text-xs tracking-widest uppercase text-taupe">Password</label>
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
              <label className="font-dm text-xs tracking-widest uppercase text-taupe">Confirm Password</label>
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
              className="w-full bg-mocha text-ivory font-dm text-xs tracking-widest uppercase py-4 hover:bg-espresso transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="font-dm text-sm text-taupe text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-espresso hover:text-mocha transition-colors underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}