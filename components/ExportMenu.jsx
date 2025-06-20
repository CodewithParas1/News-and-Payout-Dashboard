'use client'

import { saveAs } from 'file-saver'
import { utils, writeFile, write } from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useUser } from '../contexts/UserContext'

export default function ExportMenu({ articles }) {
  const { payoutRate, articlePayouts } = useUser()

  const getRate = (title) => articlePayouts[title.slice(0, 50)] || payoutRate

  const buildAuthorSummary = () => {
    const summary = {}
    articles.forEach(article => {
      const author = (article.creator && article.creator[0]) || 'Unknown'
      const titleKey = article.title.slice(0, 50)
      const rate = articlePayouts[titleKey] || payoutRate

      if (!summary[author]) {
        summary[author] = { totalPayout: 0, count: 0, totalRate: 0 }
      }

      summary[author].totalPayout += rate
      summary[author].totalRate += rate
      summary[author].count += 1
    })

    return Object.entries(summary).map(([author, stats]) => ({
      Author: author,
      'No. of Articles': stats.count,
      'Avg. Rate (₹)': (stats.totalRate / stats.count).toFixed(2),
      'Total Payout (₹)': stats.totalPayout.toFixed(2),
    }))
  }

  const exportToCSV = () => {
    const rows = articles.map(a => ({
      Title: a.title,
      Author: a.creator?.[0] || 'N/A',
      Category: a.category?.[0] || 'N/A',
      Payout: getRate(a.title)
    }))

    const summaryRows = buildAuthorSummary()

    const wb = utils.book_new()
    const ws1 = utils.json_to_sheet(rows)
    const ws2 = utils.json_to_sheet(summaryRows)

    utils.book_append_sheet(wb, ws1, 'Article Payouts')
    utils.book_append_sheet(wb, ws2, 'Author Summary')

    const csvOutput = write(wb, { bookType: 'csv', type: 'array' })
    const blob = new Blob([csvOutput], { type: 'text/csv' })
    saveAs(blob, 'payout_data.csv')
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(12)
    doc.text('Article Payout Report', 14, 20)

    // Article Payout Table
    const articleData = articles.map(a => [
      a.title,
      a.creator?.[0] || 'N/A',
      a.category?.[0] || 'N/A',
      `₹${getRate(a.title)}`
    ])

    autoTable(doc, {
      startY: 30,
      head: [['Title', 'Author', 'Category', 'Payout']],
      body: articleData,
      styles: { fontSize: 8 },
    })

    // Author Summary Table
    const finalY = doc.lastAutoTable.finalY + 10
    doc.text('Author Summary Payouts', 14, finalY)

    const summaryData = buildAuthorSummary().map(row => [
      row.Author,
      row['No. of Articles'],
      row['Avg. Rate (₹)'],
      row['Total Payout (₹)']
    ])

    autoTable(doc, {
      startY: finalY + 5,
      head: [['Author', 'No. of Articles', 'Avg. Rate (₹)', 'Total Payout (₹)']],
      body: summaryData,
      styles: { fontSize: 9 },
    })

    doc.save('payout_report.pdf')
  }

  const exportToGoogleSheet = () => {
    window.open('https://docs.google.com/spreadsheets/u/0/', '_blank')
  }

  return (
    <div className="flex gap-3 flex-wrap mt-4">
      <button
        onClick={exportToCSV}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
      >
        📄 Export Full CSV
      </button>

      <button
        onClick={exportToPDF}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
      >
        📘 Export Full PDF Report
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
