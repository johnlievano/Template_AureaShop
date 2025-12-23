// UBICACIÓN: src/context/WishlistContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])

  // Cargar Wishlist desde localStorage al iniciar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('aurea_wishlist')
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist))
      }
    }
  }, [])

  // Guardar en localStorage cada vez que cambie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aurea_wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist])

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.filter(item => item.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)