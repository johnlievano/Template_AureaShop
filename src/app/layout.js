import { Inter } from 'next/font/google'
import './globals.css'

import ScrollToTop from '../components/layout/ScrollToTop'
import ClientWrapper from '../components/layout/ClientWrapper'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { ThemeProvider } from '../context/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Áurea Web Store',
  description: 'Ecommerce minimalista de alto rendimiento',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ClientWrapper>
          <ThemeProvider>
              <ScrollToTop />
              <Navbar />
              <main className="min-h-screen pt-[80px]">
                {children}
              </main>
              <Footer />
          </ThemeProvider>
        </ClientWrapper>
      </body>
    </html>
  )
}