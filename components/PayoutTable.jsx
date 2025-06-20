'use client'

import { useUser } from '../contexts/UserContext'

export default function PayoutTable({ articles }) {
  const { articlePayouts, setArticlePayouts, isAdmin, payoutRate } = useUser()

  const handleRateChange = (key, rate) => {
    setArticlePayouts(prev => ({
      ...prev,
      [key]: parseFloat(rate) || 0
    }))
  }

  // Grouping payouts by author
  const authorSummary = {}

  articles.forEach(article => {
    const author = (article.creator && article.creator[0]) || 'Unknown'
    const titleKey = article.title.slice(0, 50)
    const rate = articlePayouts[titleKey] || payoutRate

    if (!authorSummary[author]) {
      authorSummary[author] = { totalPayout: 0, count: 0, totalRate: 0 }
    }

    authorSummary[author].totalPayout += rate
    authorSummary[author].totalRate += rate
    authorSummary[author].count += 1
  })

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-10 overflow-x-auto space-y-12">
      {/* 🔹 Article-wise Table */}
      <div>
        <h3 className="font-semibold text-lg mb-4 dark:text-gray-300">🧾 Payout Details Per Article</h3>

        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b text-gray-700 dark:text-gray-300 font-medium">
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Author</th>
              <th className="py-2 px-3">Rate (₹)</th>
              <th className="py-2 px-3">Total Payout</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-200">
            {articles.map((article, idx) => {
              const titleKey = article.title.slice(0, 50)
              const rate = articlePayouts[titleKey] || payoutRate
              const total = rate

              return (
                <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="py-2 px-3">{article.title}</td>
                  <td className="py-2 px-3">{(article.creator && article.creator[0]) || 'N/A'}</td>
                  <td className="py-2 px-3">
                    {isAdmin ? (
                      <input
                        type="number"
                        value={isNaN(rate) ? '' : rate}
                        onChange={(e) => handleRateChange(titleKey, e.target.value)}
                        className="border p-1 w-20 rounded bg-white dark:bg-gray-700 dark:text-white"
                        />

                    ) : (
                      <span>₹{rate.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="py-2 px-3 font-semibold text-green-600">₹{total.toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 🔹 Author-wise Summary Table */}
      <div>
        <h3 className="font-semibold text-lg mb-4 dark:text-gray-300">👤 Author Summary Payouts</h3>

        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b text-gray-700 dark:text-gray-300 font-medium">
              <th className="py-2 px-3">Author</th>
              <th className="py-2 px-3">No. of Articles</th>
              <th className="py-2 px-3">Avg. Rate (₹)</th>
              <th className="py-2 px-3">Total Payout (₹)</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-200">
            {Object.entries(authorSummary).map(([author, stats], idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="py-2 px-3">{author}</td>
                <td className="py-2 px-3">{stats.count}</td>
                <td className="py-2 px-3">₹{(stats.totalRate / stats.count).toFixed(2)}</td>
                <td className="py-2 px-3 font-semibold text-green-600">₹{stats.totalPayout.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
