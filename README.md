# 📰 News & Payout Dashboard

A modern Next.js + Tailwind CSS dashboard that fetches and analyzes news articles via the [NewsData.io](https://newsdata.io) API. Admins can manage payouts per article, toggle dark mode, export reports, and filter articles.

## 🚀 Features

- 🔐 **Email-password based login**
  - Admin login (email: `admin@example.com`, password: `password123`)
  - Regular user support
- 📊 **Stat Cards**
  - Total articles fetched
  - Unique authors
  - Article categories
  - Total calculated payout (admin only)
- 🌓 **Dark Mode Toggle** (persists via `localStorage`)
- 📅 **Dynamic Filtering**
  - Search by keyword, author, and category
- 📈 **Interactive Charts**
  - Line chart: Articles over time
  - Pie chart: Articles by category
- 💸 **Payout Calculator**
  - Admins can set payout per article
  - Inline rate override per article
- 📤 **Export Options**
  - Download filtered data as PDF, CSV, or Google Sheets
- 🖼️ **Article Slider**
  - Visual carousel of article cards

---

## 🧱 Tech Stack

- **Next.js (App Router)**
- **Tailwind CSS**
- **JavaScript (ESLint & formatting enabled)**
- **NewsData.io API**

---

## 🔧 Setup Instructions

1. **Clone this repository**

```bash
git clone https://github.com/CodewithParas1/News-and-Payout-Dashboard.git
cd News-and-Payout-Dashboard
