'use client'
import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { CheckCircle, CreditCard, Truck, ArrowRight, Lock, MapPin, Mail, User, Phone, Banknote, ShieldCheck } from 'lucide-react'

// --- MODAL DE ÉXITO ---
const OrderSuccessModal = ({ isOpen, total }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-[#111] max-w-md w-full text-center p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 animate-slide-up relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="mb-8 flex justify-center relative z-10">
          <div className="bg-green-500 text-white p-4 rounded-full shadow-lg shadow-green-500/40">
            <CheckCircle size={48} strokeWidth={2} />
          </div>
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight mb-4 dark:text-white">Orden <br /> Confirmada</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed font-medium">
          Gracias por tu compra. Hemos enviado la confirmación y el número de guía a tu correo.
        </p>
        <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-6 mb-8 border border-gray-100 dark:border-gray-800">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Total Pagado</p>
          <p className="text-3xl font-black dark:text-white">${total.toLocaleString()}</p>
        </div>
        <Link href="/" className="block w-full bg-black dark:bg-white text-white dark:text-black py-4 text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:scale-105 transition-transform shadow-xl">
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    direccion: user?.direccion || '',
    ciudad: 'Bogotá',
    notas: ''
  })

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [lastOrderTotal, setLastOrderTotal] = useState(0)

  useEffect(() => {
    if (cart.length === 0 && !success) {
      router.push('/productos')
    }
  }, [cart, router, success])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const totalCalculated = getCartTotal()
      setLastOrderTotal(totalCalculated)

      const newOrder = {
        id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' }),
        total: totalCalculated,
        items: cart.reduce((acc, item) => acc + item.quantity, 0),
        status: "Procesando",
        statusColor: "text-yellow-500",
        bgStatus: "bg-yellow-500",
        progress: 25,
        // CORRECCIÓN IMAGEN ORDEN: Compatibilidad img/imagen
        img: cart[0]?.imagen || cart[0]?.img || "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=200"
      }

      const existingOrders = JSON.parse(localStorage.getItem('aurea_orders') || '[]')
      localStorage.setItem('aurea_orders', JSON.stringify([newOrder, ...existingOrders]))

      await new Promise(resolve => setTimeout(resolve, 2000))
      setSuccess(true)
      clearCart()
    } catch (error) {
      console.error("Error checkout", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans pt-24 pb-24 transition-colors duration-500">
      <div className="container mx-auto px-6 mb-12">
        <span className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-2 block">Paso Final</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
          Finalizar <span className="text-gray-400">Pedido</span>
        </h1>
      </div>

      <main className="container mx-auto px-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white dark:bg-[#111] p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">1</div>
                <h2 className="text-xl font-black uppercase tracking-tight">Información de Envío</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-[#1a1a1a] border-2 border-transparent focus:border-black dark:focus:border-white rounded-xl py-4 pl-12 pr-4 outline-none font-bold text-sm transition-all dark:text-white placeholder-gray-300" placeholder="TU NOMBRE" />
                  </div>
                </div>
                <div className="group space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-[#1a1a1a] border-2 border-transparent focus:border-black dark:focus:border-white rounded-xl py-4 pl-12 pr-4 outline-none font-bold text-sm transition-all dark:text-white placeholder-gray-300" placeholder="+57..." />
                  </div>
                </div>
                {/* ... otros campos de dirección ... */}
              </div>
            </section>

            {/* 2. MÉTODO DE PAGO */}
            <section className="bg-white dark:bg-[#111] p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
               <div className="flex items-center gap-4 mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">2</div>
                <h2 className="text-xl font-black uppercase tracking-tight">Método de Pago</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div onClick={() => setPaymentMethod('card')} className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${paymentMethod === 'card' ? 'border-black dark:border-white bg-gray-50 dark:bg-[#1a1a1a]' : 'border-gray-100 dark:border-gray-800'}`}>
                  {paymentMethod === 'card' && <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>}
                  <CreditCard size={32} className="mb-4 text-gray-900 dark:text-white" />
                  <h3 className="font-black uppercase text-sm mb-1 dark:text-white">Nequi / Tarjeta</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Procesamiento seguro via Wompi/PayU.</p>
                </div>
                <div onClick={() => setPaymentMethod('cod')} className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${paymentMethod === 'cod' ? 'border-black dark:border-white bg-gray-50 dark:bg-[#1a1a1a]' : 'border-gray-100 dark:border-gray-800'}`}>
                  {paymentMethod === 'cod' && <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>}
                  <Banknote size={32} className="mb-4 text-gray-900 dark:text-white" />
                  <h3 className="font-black uppercase text-sm mb-1 dark:text-white">Contra Entrega</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Paga en efectivo al recibir.</p>
                </div>
              </div>
            </section>
          </div>

          {/* RESUMEN LATERAL */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#111] p-8 rounded-[2.5rem] sticky top-32 shadow-xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-black uppercase tracking-tight mb-8 dark:text-white">Tu Orden</h3>
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0">
                      {/* CORRECCIÓN IMAGEN ITEM: item.imagen || item.img */}
                      <img
                        src={item.imagen || item.img}
                        alt={item.nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase dark:text-white line-clamp-1">{item.nombre}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Cant: {item.quantity}</p>
                      <p className="text-sm font-black dark:text-white">${(item.precio * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-800 text-sm mb-8">
                <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium">
                  <span>Subtotal</span>
                  <span className="text-black dark:text-white font-bold">${getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium text-xl font-black pt-2 dark:text-white">
                  <span>TOTAL</span>
                  <span>${getCartTotal().toLocaleString()}</span>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl disabled:opacity-50">
                {loading ? 'Procesando...' : <>Pagar Ahora <ArrowRight size={16}/></>}
              </button>
            </div>
          </div>
        </form>
      </main>
      <OrderSuccessModal isOpen={success} total={lastOrderTotal} />
    </div>
  )
}