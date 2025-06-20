'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import StatCard from '../components/StatCard'
import Charts from '../components/Charts'
import Filters from '../components/Filters'
import PayoutTable from '../components/PayoutTable'
import ArticleSlider from '../components/ArticleSlider'
import { useUser } from '../contexts/UserContext'
import ExportMenu from '../components/ExportMenu'
import Header from '../components/Header'

export default function Dashboard() {
  const router = useRouter()

  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const {
    isAdmin,
    payoutRate,
    setPayoutRate,
    articlePayouts,
    setArticlePayouts
  } = useUser()

  // Auth Check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('auth')
      if (!isLoggedIn) {
        router.push('/login')
      }
    }
  }, [router])

  // Fetch Articles
  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(`https://newsdata.io/api/1/news?country=in&language=en&apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}`)
      const data = await res.json()
      const fetched = data.results || []
      setArticles(fetched)
      setFilteredArticles(fetched)
      setLoading(false)
    }

    fetchArticles()
  }, [])

  //  Filters
  const handleFilter = ({ searchTerm, author, type }) => {
  const filtered = articles.filter(article => {
    const lowerSearch = searchTerm.toLowerCase()

    const inTitle = article.title?.toLowerCase().includes(lowerSearch)
    const inAuthor = (article.creator || []).some(c => c.toLowerCase().includes(lowerSearch))
    const inCategory = (article.category || []).some(cat => cat.toLowerCase().includes(lowerSearch))

    const matchesSearch = !searchTerm || inTitle || inAuthor || inCategory

    const matchesAuthor = !author || (article.creator || []).some(c => c.toLowerCase().includes(author.toLowerCase()))
    const matchesType = !type || (article.category || []).some(cat => cat.toLowerCase().includes(type.toLowerCase()))

    return matchesSearch && matchesAuthor && matchesType
  })

  setFilteredArticles(filtered)
}



  const totalArticles = filteredArticles.length
  const authors = [...new Set(filteredArticles.flatMap(a => a.creator || []))]
  const types = [...new Set(filteredArticles.flatMap(a => a.category || []))]

  const totalPayout = filteredArticles.reduce((sum, article) => {
    const key = article.title.slice(0, 50)
    const rate = articlePayouts[key] || payoutRate
    return sum + rate
  }, 0).toFixed(2)

  const handlePayoutChange = (e) => {
    const newRate = parseFloat(e.target.value)
    setPayoutRate(newRate)
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 space-y-6">
      {/* 🔝 HEADER */}
      <Header />

      {/* 🔍 Filters */}
      <div className="mt-4 px-4 md:px-8">
        <Filters articles={articles} onFilter={handleFilter} />
      </div>
      

      {/* 💸 Admin Payout Controls */}
      {isAdmin && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mx-4 md:mx-8 grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-sm sm:text-base">
          <div className="font-semibold text-gray-800 dark:text-gray-200">
            🧮 Payout Calculator
          </div>

          <div className="flex justify-center items-center gap-2 sm:gap-3">
            <label className="text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
              💵 Payout / Article:
            </label>
            <input
              type="number"
              value={isNaN(payoutRate) ? '' : payoutRate}
              onChange={handlePayoutChange}
              className="border dark:border-gray-600 px-2 py-1 rounded-md w-24 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="text-right font-semibold text-gray-800 dark:text-white">
            💰 Total Payout: <span className="text-green-600 dark:text-green-400">₹{totalPayout}</span>
          </div>
        </div>
      )}
      
      {/* 📊 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-8">
        <StatCard title="🗞️ Total Articles" value={totalArticles} trend="+12.5%" color="blue" />
        <StatCard title="✍️ Unique Authors" value={authors.length} trend="+4.2%" color="indigo" />
        <StatCard title="🏷️ Categories Found" value={types.length} trend="+3.5%" color="emerald" />
        <StatCard title="💸 Total Payout" value={`₹${totalPayout}`} color="rose" />
      </div>
     
      {/* Charts */}
      {!loading && (
        <div className="px-4 md:px-8">
          <Charts articles={filteredArticles} />
        </div>
      )}

      {/* Table & Export */}
      <div className="px-4 md:px-8 space-y-6">
        <PayoutTable articles={filteredArticles} />
        <ExportMenu articles={filteredArticles} />
         <ArticleSlider articles={filteredArticles} />
      </div>
    </div>
  )
}
