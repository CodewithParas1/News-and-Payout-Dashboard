'use client'

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts'
import { useUser } from '../contexts/UserContext'

const COLORS = ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#FB7185', '#10B981']

export default function Charts({ articles }) {
  const { payoutRate, articlePayouts } = useUser()

  const getPayoutForArticle = (article) => {
    const key = article.title.slice(0, 50)
    return articlePayouts?.[key] || payoutRate
  }

  // 📅 Articles Over Time
  const articlesByDate = articles.reduce((acc, article) => {
    const date = new Date(article.pubDate).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})
  const dateData = Object.entries(articlesByDate).map(([date, count]) => ({ date, count }))

  // 🏷️ Categories
  const categoryCount = {}
  articles.forEach(article => {
    (article.category || []).forEach(cat => {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1
    })
  })
  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({ name, value }))

  // ✍️ Top Authors
  const authorCount = {}
  articles.forEach(article => {
    (article.creator || []).forEach(author => {
      authorCount[author] = (authorCount[author] || 0) + 1
    })
  })
  const topAuthors = Object.entries(authorCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([name, value]) => ({ name, value }))

  // 💸 Payout Distribution per Author
  const payoutsByAuthor = {}
  articles.forEach(article => {
    const author = (article.creator && article.creator[0]) || 'Unknown'
    const payout = getPayoutForArticle(article)
    payoutsByAuthor[author] = (payoutsByAuthor[author] || 0) + payout
  })
  const payoutPieData = Object.entries(payoutsByAuthor).map(([name, value]) => ({ name, value }))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 mt-6">
      {/* Line Chart: Articles over Time */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2 text-sm text-gray-900 dark:text-white">📈 Articles Posted Over Time</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={dateData}>
            <XAxis dataKey="date" fontSize={10} />
            <YAxis fontSize={10} />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: '8px' }}
              labelStyle={{ color: '#000000' }}
            />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
</ResponsiveContainer>

      </div>

      {/* Pie Chart: Article Categories */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2 text-sm text-gray-900 dark:text-white">🏷️ Article Categories</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={60} label fontSize={10}>
              {categoryData.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

   {/* Bar Chart: Top Authors */}
<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow sm:col-span-2">
  <h3 className="font-semibold mb-4 text-sm text-center text-gray-900 dark:text-white">
    ✍️ Top Authors (by article count)
  </h3>
  <ResponsiveContainer width="100%" height={250}>
    <BarChart
      data={topAuthors}
      margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
      barCategoryGap="20%" // space between bars
      barGap={5}
    >
      <XAxis
        dataKey="name"
        fontSize={12}
        tick={{ fill: '#ccc' }}
        interval={0}
        angle={-20}
        textAnchor="end"
      />
      <YAxis fontSize={12} tick={{ fill: '#ccc' }} />
      <Tooltip
        contentStyle={{
          backgroundColor: '#fff',
          color: '#000',
          borderRadius: '8px',
        }}
        labelStyle={{ color: '#000' }}
      />
      <Bar dataKey="value" fill="#34D399" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>


      {/* Pie Chart: Author-wise Payouts */}
<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow col-span-1 sm:col-span-2">
  <h3 className="font-semibold mb-4 text-base sm:text-lg text-gray-900 dark:text-white">
    💸 Author-wise Payout Distribution
  </h3>
  <ResponsiveContainer width="100%" height={280}>
    <PieChart>
      <Pie
        data={payoutPieData}
        dataKey="value"
        nameKey="name"
        outerRadius={80}
        label={({ name, value }) => `${name} (${value})`}
        isAnimationActive
      >
        {payoutPieData.map((_, idx) => (
          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: '#ffffff',
          color: '#000000',
          borderRadius: '8px',
        }}
        labelStyle={{ color: '#000000' }}
      />
      <Legend
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
        wrapperStyle={{ fontSize: 12, marginTop: '12px' }}
      />
    </PieChart>
  </ResponsiveContainer>
</div>

    </div>
  )
}
