'use client'
import { AuthProvider } from '../../context/AuthContext'
import { CartProvider } from '../../context/CartContext'
import { WishlistProvider } from '../../context/WishlistContext' // <--- AÑADE ESTO

export default function ClientWrapper({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider> {/* <--- ENVOLVER AQUÍ */}
          {children}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}