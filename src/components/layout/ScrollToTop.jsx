'use client' // Importante: es un componente de cliente
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const ScrollToTop = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Cada vez que cambie la ruta (pathname), sube al inicio instantáneamente
    window.scrollTo(0, 0)
  }, [pathname])

  return null // Este componente no renderiza nada visual
}

export default ScrollToTop