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
    <div className="bg-white dark:bg-gray-800 p-6 pb-10 rounded-xl shadow mt-10 w-full max-w-2xl mx-auto overflow-hidden relative">
      <h3 className="font-semibold text-lg sm:text-xl mb-4 dark:text-gray-300 text-gray-800 text-center sm:text-left">
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
            <h4 className="text-base sm:text-lg font-bold">{current.title}</h4>
            <p className="line-clamp-4">{current.description || 'No description available.'}</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Author: {current.creator?.[0] || 'Unknown'} | Published on:{' '}
              {new Date(current.pubDate).toLocaleDateString()}
            </p>
            <a
              href={current.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-block"
            >
              Read Full Article →
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-between gap-4">
        <button
          onClick={prev}
          className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm px-4 py-2 rounded transition-all duration-200"
        >
          ⬅ Prev
        </button>
        <button
          onClick={next}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-all duration-200"
        >
          Next ➡
        </button>
      </div>
    </div>
  )
}
