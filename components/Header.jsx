'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toggleDarkMode, applyStoredThemePreference } from '../utils/themeToggle'

export default function Header() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    applyStoredThemePreference()

    if (typeof window !== 'undefined') {
      const adminFlag = localStorage.getItem('isAdmin')
      setIsAdmin(adminFlag === 'true')
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  return (
    <header className="bg-green-300 dark:bg-gray-800 text-white shadow-md p-4 px-6 flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 items-center">
      {/* Left: User Role */}
      <div className="text-sm text-black dark:text-gray-300 w-full sm:w-1/3 text-center sm:text-left">
        👤 Logged in as <strong>{isAdmin ? 'Admin' : 'User'}</strong>
      </div>

      {/* Center: Title */}
      <div className="text-center w-1/3">
        <h1 className="text-2xl font-bold text-black dark:text-gray-300">
          📊 News Articles & Payout Dashboard
        </h1>
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center justify-end gap-4 w-1/3">
        <button
          onClick={toggleDarkMode}
          className="text-sm bg-gray-900 hover:bg-gray-600 text-white px-3 py-1 rounded"
        >
          🌓 Change Theme
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-sm text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
