import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Security() {
  const { authHeader } = useAuth()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }

    setSaving(true)

    try {
      await axios.put(
        `${API}/auth/change-password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        authHeader()
      )

      setMessage('Password updated successfully!')
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update password'
      setError(errorMsg)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <p className="font-dm text-xs uppercase tracking-[0.35em] text-taupe">Security</p>
        <h1 className="mt-3 text-3xl font-cormorant text-espresso">Manage your security</h1>
      </div>

      <div className="rounded-3xl border border-sand bg-ivory p-8 shadow-sm shadow-espresso/5">
        <h2 className="text-base font-semibold text-espresso">Change Password</h2>
        <p className="mt-2 text-sm text-taupe">Update your password to keep your account secure.</p>

        {message && <div className="mt-6 rounded-2xl bg-gold/10 p-4 text-sm text-espresso">{message}</div>}
        {error && <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm uppercase tracking-[0.25em] text-taupe">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
              className="mt-3 w-full rounded-2xl border border-sand bg-white px-4 py-3 text-espresso placeholder-taupe/50 outline-none focus:border-mocha"
            />
          </div>

          <div className="border-t border-sand pt-6">
            <div>
              <label className="block text-sm uppercase tracking-[0.25em] text-taupe">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                className="mt-3 w-full rounded-2xl border border-sand bg-white px-4 py-3 text-espresso placeholder-taupe/50 outline-none focus:border-mocha"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm uppercase tracking-[0.25em] text-taupe">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                className="mt-3 w-full rounded-2xl border border-sand bg-white px-4 py-3 text-espresso placeholder-taupe/50 outline-none focus:border-mocha"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-full border border-espresso bg-espresso px-8 py-3 font-dm text-xs font-semibold uppercase tracking-[0.3em] text-ivory transition hover:bg-mocha hover:border-mocha disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      <div className="mt-8 rounded-3xl border border-sand bg-white p-6 shadow-sm shadow-espresso/5">
        <p className="text-sm uppercase tracking-[0.25em] text-taupe">Two-step verification</p>
        <p className="mt-3 text-sm text-espresso">Add a second layer of protection for your account when available.</p>
      </div>
    </div>
  )
}
