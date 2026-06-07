import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      navigate(user.isAdmin ? '/admin' : '/')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
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
          <h1 className="font-cormorant text-4xl text-espresso mt-6">Welcome Back</h1>
          <p className="font-dm text-sm text-taupe mt-2">Sign in to your account</p>
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
              <label className="font-dm text-xs tracking-widest uppercase text-taupe">
                Email
              </label>
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
              <div className="flex items-center justify-between">
                <label className="font-dm text-xs tracking-widest uppercase text-taupe">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="font-dm text-xs text-taupe hover:text-espresso transition-colors underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={form.password}
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
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="font-dm text-sm text-taupe text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-espresso hover:text-mocha transition-colors underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}