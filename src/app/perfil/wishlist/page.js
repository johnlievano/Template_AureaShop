'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Trash2, ShoppingBag, HeartOff, AlertCircle } from 'lucide-react'
import { useCart } from '../../../context/CartContext'

// MOCK DATA WISHLIST
const INITIAL_WISHLIST = [
  { 
    id: 101, 
    nombre: "Cyber Jacket Pro", 
    precio: 280000, 
    tag: "Best Seller",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400" 
  },
  { 
    id: 104, 
    nombre: "Smart Glasses V2", 
    precio: 350000, 
    tag: null,
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400" 
  }
]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST)
  const { addToCart } = useCart()

  const removeItem = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
  }

  const moveToCart = (item) => {
    addToCart(item)
    // Opcional: Eliminar de wishlist al agregar al carrito
    // removeItem(item.id) 
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-3xl font-black uppercase mb-1 dark:text-white">Mi Wishlist</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Tus artículos guardados ({wishlist.length})</p>
         </div>
         {wishlist.length > 0 && (
            <button 
               onClick={() => setWishlist([])}
               className="text-xs font-bold uppercase tracking-widest text-red-600 hover:text-red-700 border-b border-red-200 hover:border-red-600 pb-0.5 transition-colors"
            >
               Limpiar Todo
            </button>
         )}
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
             <div key={item.id} className="group relative bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all">
                
                {/* Botón Eliminar (Flotante) */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 z-20 p-2 bg-white/80 dark:bg-black/50 backdrop-blur rounded-full text-gray-500 hover:text-red-600 hover:bg-white dark:hover:bg-white transition-all"
                >
                   <Trash2 size={16} />
                </button>

                {/* Imagen */}
                <div className="relative aspect-square overflow-hidden bg-gray-200">
                   <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   {item.tag && (
                      <span className="absolute bottom-3 left-3 bg-red-600 text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest rounded-sm">
                         {item.tag}
                      </span>
                   )}
                </div>

                {/* Info & Acciones */}
                <div className="p-5">
                   <h3 className="font-bold uppercase dark:text-white mb-1 truncate">{item.nombre}</h3>
                   <p className="text-lg font-black mb-4 dark:text-white">${item.precio.toLocaleString()}</p>
                   
                   <button 
                      onClick={() => moveToCart(item)}
                      className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:opacity-80 transition-opacity"
                   >
                      <ShoppingBag size={16} /> Agregar al Carrito
                   </button>
                </div>
             </div>
          ))}
        </div>
      ) : (
        /* Estado Vacío */
        <div className="text-center py-24 bg-gray-50 dark:bg-[#1a1a1a] rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center">
           <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <HeartOff className="text-gray-400" size={40} />
           </div>
           <h3 className="text-xl font-black uppercase mb-2 dark:text-white">Tu lista está vacía</h3>
           <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
              Guarda lo que te gusta para no perderlo de vista.
           </p>
           <Link href="/productos" className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
              Explorar Colección
           </Link>
        </div>
      )}
    </div>
  )
}