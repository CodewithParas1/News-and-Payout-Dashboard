'use client'

import { Download } from 'lucide-react'
import { useUser } from '../contexts/UserContext'
import { saveAs } from 'file-saver'
import { utils, write } from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function ExportMenu({ articles }) {
  const { payoutRate, articlePayouts } = useUser()

  const getRate = (title) => articlePayouts[title.slice(0, 50)] || payoutRate

  const exportToCSV = () => {
    const rows = articles.map(a => ({
      Title: a.title,
      Author: a.creator?.[0] || 'N/A',
      Category: a.category?.[0] || 'N/A',
      Payout: getRate(a.title)
    }))
    const worksheet = utils.json_to_sheet(rows)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, worksheet, 'Articles')
    const csvOutput = write(wb, { bookType: 'csv', type: 'array' })
    const blob = new Blob([csvOutput], { type: 'text/csv' })
    saveAs(blob, 'articles.csv')
  }

  const exportToGoogleSheet = () => {
    window.open('https://docs.google.com/spreadsheets/u/0/', '_blank')
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(12)
    doc.text('Article Payout Report', 14, 20)
    const tableData = articles.map(a => [
      a.title,
      a.creator?.[0] || 'N/A',
      a.category?.[0] || 'N/A',
      `₹${getRate(a.title)}`
    ])
    autoTable(doc, {
      startY: 30,
      head: [['Title', 'Author', 'Category', 'Payout']],
      body: tableData
    })
    doc.save('articles.pdf')
  }

  return (
    <div className="flex gap-3 flex-wrap mt-4">
      <button
        onClick={exportToCSV}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
      >
        📄 Export CSV
      </button>

      <button
        onClick={exportToPDF}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
      >
        🧾 Export PDF
      </button>

      <button
        onClick={exportToGoogleSheet}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
      >
        📊 Open Google Sheets
      </button>
    </div>
  )
}
