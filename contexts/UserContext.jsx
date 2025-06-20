'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [auth, setAuth] = useState(false)
  const [payoutRate, setPayoutRate] = useState(100)
  const [articlePayouts, setArticlePayouts] = useState({})

  // Load from localStorage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('auth') === 'true'
    const storedEmail = localStorage.getItem('email') || ''
    const admin = localStorage.getItem('isAdmin') === 'true'
    const storedPayout = parseFloat(localStorage.getItem('payoutRate')) || 100
    const storedArticlePayouts = JSON.parse(localStorage.getItem('articlePayouts') || '{}')

    setAuth(isLoggedIn)
    setEmail(storedEmail)
    setIsAdmin(admin)
    setPayoutRate(storedPayout)
    setArticlePayouts(storedArticlePayouts)
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('auth', auth)
    localStorage.setItem('email', email)
    localStorage.setItem('isAdmin', isAdmin)
    localStorage.setItem('payoutRate', payoutRate)
    localStorage.setItem('articlePayouts', JSON.stringify(articlePayouts))
  }, [auth, email, isAdmin, payoutRate, articlePayouts])

  return (
    <UserContext.Provider
      value={{
        auth, setAuth,
        email, setEmail,
        isAdmin, setIsAdmin,
        payoutRate, setPayoutRate,
        articlePayouts, setArticlePayouts
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Hook to use context
export const useUser = () => useContext(UserContext)
