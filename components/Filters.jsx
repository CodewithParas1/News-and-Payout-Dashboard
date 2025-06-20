'use client'

import { useState } from 'react'

export default function Filters({ articles, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [author, setAuthor] = useState('')
  const [type, setType] = useState('')

  const authors = [...new Set(articles.flatMap(a => a.creator || []))].filter(Boolean)
  const types = [...new Set(articles.flatMap(a => a.category || []))].filter(Boolean)

  const handleFilter = () => {
    onFilter({ searchTerm, author, type })
  }

  return (
   <div className="bg-white dark:bg-gray-800 dark:text-gray-300 p-2 rounded-lg shadow flex flex-wrap items-center gap-4 sm:gap-6 justify-between">
  <input
    type="text"
    placeholder="🔍 Search keyword"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="flex-1 min-w-[180px] border dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
  />

  <select
    value={author}
    onChange={(e) => setAuthor(e.target.value)}
    className="min-w-[160px] border dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
  >
    <option value="">All Authors</option>
    {authors.map((a, i) => (
      <option key={i} value={a}>{a}</option>
    ))}
  </select>

  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    className="min-w-[160px] border dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
  >
    <option value="">All Categories</option>
    {types.map((t, i) => (
      <option key={i} value={t}>{t}</option>
    ))}
  </select>

  <button
    onClick={handleFilter}
    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded transition-colors duration-200"
  >
    Apply Filters
  </button>
</div>

  )
}
