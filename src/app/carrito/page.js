'use client'
import { useCart } from '../../context/CartContext'
import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Lock } from 'lucide-react'

export default function Carrito() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  // --- ESTADO VACÍO (High-End) ---
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-400 dark:text-gray-500 animate-pulse">
          <ShoppingBag size={40} strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2 dark:text-white">Tu bolsa está vacía</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm font-medium max-w-md">
          Los iconos de estilo no se encuentran solos. Empieza a curar tu colección ahora.
        </p>
        <Link href="/productos" className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 text-xs font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-xl">
          Explorar Colección
        </Link>
      </div>
    )
  }

  // --- ESTADO CON PRODUCTOS ---
  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen pt-24 pb-24 transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 dark:border-gray-800 pb-6 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-2 block">Checkout</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter dark:text-white leading-none">
              Tu <span className="text-gray-400 dark:text-gray-600">Bolsa.</span>
            </h1>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 bg-white dark:bg-[#111] px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800">
            {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* COLUMNA IZQUIERDA: PRODUCTOS */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="group flex gap-6 bg-white dark:bg-[#111] p-4 pr-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all shadow-sm hover:shadow-lg">

                {/* Imagen */}
                <div className="w-24 h-32 md:w-32 md:h-40 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0 relative">
                  <img
                    // Verificamos ambas posibilidades para evitar errores
                    src={item.imagen || item.img}
                    alt={item.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    // Fallback en caso de que la imagen falle
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1594750825015-49c2847c0e81?q=80&w=400';
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-sm md:text-lg font-black uppercase tracking-wide dark:text-white leading-tight mb-1">{item.nombre}</h3>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ref: {item.id} / {item.categoria}</p>
                    </div>
                    <p className="text-sm md:text-lg font-bold dark:text-white text-right">
                      ${(item.precio * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    {/* Controles de Cantidad */}
                    <div className="flex items-center bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-2 md:p-3 text-gray-500 hover:text-black dark:hover:text-white disabled:opacity-30 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-bold w-6 text-center dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 md:p-3 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-600 transition-colors group/trash"
                    >
                      <Trash2 size={14} className="group-hover/trash:animate-bounce" /> <span className="hidden md:inline">Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <button
                onClick={clearCart}
                className="text-xs font-bold text-red-500 uppercase tracking-widest hover:text-red-700 border-b border-red-200 hover:border-red-700 pb-0.5 transition-all"
              >
                Vaciar Todo
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESUMEN (Sticky) */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 sticky top-32 shadow-xl">
              <h2 className="text-xl font-black uppercase tracking-tight mb-8 dark:text-white flex items-center gap-2">
                Resumen <span className="w-2 h-2 rounded-full bg-red-600"></span>
              </h2>

              <div className="space-y-4 text-sm mb-8 font-medium">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-gray-900 dark:text-white font-bold">${getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Envío</span>
                  <span className="text-green-500 font-bold text-xs uppercase">Gratis</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Impuestos</span>
                  <span className="text-gray-900 dark:text-white font-bold">$0</span>
                </div>

                <div className="h-px bg-gray-100 dark:bg-gray-800 my-4"></div>

                <div className="flex justify-between items-center text-lg">
                  <span className="font-black uppercase tracking-wide dark:text-white">Total</span>
                  <span className="font-black dark:text-white">${getCartTotal().toLocaleString()}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg group"
              >
                Pagar Ahora <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Trust Badges */}
              <div className="mt-8 flex items-center justify-center gap-4 text-gray-400 dark:text-gray-600">
                <div className="flex flex-col items-center gap-1">
                  <Lock size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">SSL Secure</span>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-800"></div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Garantía</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}