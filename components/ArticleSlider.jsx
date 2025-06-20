'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ArticleSlider({ articles }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  if (!articles || articles.length === 0) return null

  const current = articles[index]

  const next = () => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % articles.length)
  }

  const prev = () => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + articles.length) % articles.length)
  }

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: 'absolute',
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
      transition: { duration: 0.5 },
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      position: 'absolute',
      transition: { duration: 0.3 },
    }),
  }

  return (
    <div className="w-full bg-gradient-to-br from-white via-gray-50 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-6 pb-10 rounded-2xl shadow-lg mt-10 overflow-hidden relative transition-transform hover:scale-[1.01] duration-300">
      <h3 className="font-semibold text-lg sm:text-xl mb-4 dark:text-gray-200 text-gray-800 text-center sm:text-left">
        📰 Featured Article
      </h3>

      <div className="relative min-h-[200px] sm:min-h-[180px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="text-sm sm:text-base space-y-3 dark:text-gray-100 text-gray-800"
          >
            <h4 className="text-lg font-extrabold text-blue-700 dark:text-blue-400">{current.title}</h4>
            <p className="line-clamp-4">{current.description || 'No description available.'}</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Author: <span className="font-medium">{current.creator?.[0] || 'Unknown'}</span> | Published on:{' '}
              <span className="italic">{new Date(current.pubDate).toLocaleDateString()}</span>
            </p>
            <a
              href={current.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline hover:pl-1 transition-all duration-200 inline-block font-medium"
            >
              Read Full Article →
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-between gap-4">
        <button
          onClick={prev}
          className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium"
        >
          ⬅ Prev
        </button>
        <button
          onClick={next}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium"
        >
          Next ➡
        </button>
      </div>
    </div>
  )
}
