import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await axios.post(`${API}/auth/forgot-password`, { email })
      setSent(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
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
          <h1 className="font-cormorant text-4xl text-espresso mt-6">Reset Password</h1>
          <p className="font-dm text-sm text-taupe mt-2">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <div className="bg-ivory p-8 border border-sand">
          {sent ? (
            <div className="text-center flex flex-col gap-4">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-cormorant text-2xl text-espresso">Check your inbox</h2>
              <p className="font-dm text-sm text-taupe leading-relaxed">
                We sent a password reset link to <strong>{email}</strong>. Check your spam folder if you don't see it.
              </p>
              <Link
                to="/login"
                className="mt-4 w-full block text-center bg-mocha text-ivory font-dm text-xs tracking-widest uppercase py-4 hover:bg-espresso transition-colors"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 font-dm text-sm px-4 py-3 mb-6">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-dm text-xs tracking-widest uppercase text-taupe">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-mocha text-ivory font-dm text-xs tracking-widest uppercase py-4 hover:bg-espresso transition-colors disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
              <p className="font-dm text-sm text-taupe text-center mt-6">
                Remember your password?{' '}
                <Link to="/login" className="text-espresso hover:text-mocha transition-colors underline">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}