# 📰 News & Payout Dashboard
![image](https://github.com/user-attachments/assets/a34dce44-3d5d-49fb-bbda-5519ea850b3b)
![image](https://github.com/user-attachments/assets/88166f07-cb08-4382-a36e-d09e90c0e5af)
![image](https://github.com/user-attachments/assets/ef69c3f4-26f8-4f67-818e-1b8ae5c98b9a)
![image](https://github.com/user-attachments/assets/1b14945b-9292-4d4f-875d-3ddc5b230e9b)
![image](https://github.com/user-attachments/assets/d6132822-0160-4451-88f4-62a1ecb3fd28)
![image](https://github.com/user-attachments/assets/181dcf3d-7a2f-4778-afe9-f87a595716d5)

Light Mode:
![image](https://github.com/user-attachments/assets/83914ec0-1296-4d6a-a39b-5c81fb3fafd3)


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
