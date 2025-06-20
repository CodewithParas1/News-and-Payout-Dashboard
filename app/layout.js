// app/layout.js
import './globals.css'
import { UserProvider } from '../contexts/UserContext'

export const metadata = {
  title: 'News & Payout Dashboard',
  description: 'Dashboard powered by NewsData.io',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
