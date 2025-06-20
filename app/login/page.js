'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // 🔄 Clear previous session
  useEffect(() => {
    localStorage.removeItem('auth')
    localStorage.removeItem('isAdmin')
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()

    if (email === 'admin@example.com' && password === 'password123') {
      localStorage.setItem('auth', 'true')
      localStorage.setItem('isAdmin', 'true')
      window.location.href = '/'  // ✅ Full page reload
    } else if (email && password) {
      localStorage.setItem('auth', 'true')
      localStorage.setItem('isAdmin', 'false')
      window.location.href = '/'  // ✅ Full page reload
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 dark:bg-gray-900 transition-colors duration-300">
      <form className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">🔐 Login to Dashboard</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <input
          type="password"
          className="w-full p-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}
