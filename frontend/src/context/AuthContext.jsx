import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('aevora_user')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/auth/login`, { email, password })
    setUser(data)
    localStorage.setItem('aevora_user', JSON.stringify(data))
    return data
  }

  const register = async (name, email, password) => {
    const { data } = await axios.post(`${API}/auth/register`, { name, email, password })
    setUser(data)
    localStorage.setItem('aevora_user', JSON.stringify(data))
    return data
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('aevora_user')
  }

  const authHeader = useCallback(() => ({
    headers: { Authorization: `Bearer ${user?.token}` }
  }), [user])

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, authHeader }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}