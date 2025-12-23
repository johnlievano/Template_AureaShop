'use client'
import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { 
  CheckCircle, CreditCard, Truck, ArrowRight, 
  MapPin, Mail, User, Phone, Banknote, ShieldCheck,
  Building, Map as MapIcon, ChevronDown
} from 'lucide-react'

// --- DATA LOGÍSTICA COLOMBIA ---
const COLOMBIA_DATA = {
  "Antioquia": ["Medellín", "Envigado", "Itagüí", "Bello", "Rionegro"],
  "Atlántico": ["Barranquilla", "Soledad", "Puerto Colombia"],
  "Bogotá D.C.": ["Bogotá D.C."],
  "Bolívar": ["Cartagena", "Turbaco", "Magangué"],
  "Valle del Cauca": ["Cali", "Palmira", "Tuluá", "Buenaventura"],
  "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta"],
  "Cundinamarca": ["Chía", "Cajicá", "Soacha", "Zipaquirá"],
  "Risaralda": ["Pereira", "Dosquebradas"],
  "Quindío": ["Armenia", "Circasia"],
  "Caldas": ["Manizales", "Villamaría"]
}

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
  const [lastOrderTotal, setLastOrderTotal] = useState(0)

  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    departamento: '',
    ciudad: '',
    barrio: '',
    direccion: '',
    apto: '',
    notas: ''
  })

  useEffect(() => {
    if (cart.length === 0 && !success) router.push('/productos')
  }, [cart, router, success])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'departamento') {
      setFormData({ ...formData, departamento: value, ciudad: '' })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const totalCalculated = getCartTotal()
      setLastOrderTotal(totalCalculated)
      
      const newOrder = {
        id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }),
        total: totalCalculated,
        itemsCount: cart.reduce((acc, item) => acc + item.quantity, 0),
        status: "Procesando",
        img: cart[0]?.imagen || cart[0]?.img || ""
      }

      const existingOrders = JSON.parse(localStorage.getItem('aurea_orders') || '[]')
      localStorage.setItem('aurea_orders', JSON.stringify([newOrder, ...existingOrders]))

      await new Promise(resolve => setTimeout(resolve, 2000))
      setSuccess(true)
      clearCart()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white pt-24 pb-24 transition-colors">
      <div className="container mx-auto px-6 mb-12">
        <span className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-2 block">Checkout Seguro</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Finalizar <span className="text-gray-400">Pedido</span></h1>
      </div>

      <main className="container mx-auto px-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            {/* SECCIÓN 1: CLIENTE */}
            <section className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h2 className="text-lg font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                <User size={20} className="text-red-600"/> Datos del Cliente
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Nombre Completo</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-[#1a1a1a] rounded-xl py-4 px-6 outline-none font-bold text-sm border-2 border-transparent focus:border-black dark:focus:border-white transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Teléfono</label>
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-[#1a1a1a] rounded-xl py-4 px-6 outline-none font-bold text-sm border-2 border-transparent focus:border-black dark:focus:border-white transition-all" />
                </div>
              </div>
            </section>

            {/* SECCIÓN 2: DIRECCIÓN CON SELECTORES */}
            <section className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h2 className="text-lg font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                <MapPin size={20} className="text-red-600"/> Ubicación de Envío
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Departamento</label>
                  <div className="relative">
                    <select name="departamento" value={formData.departamento} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-[#1a1a1a] rounded-xl py-4 px-6 outline-none font-bold text-sm border-2 border-transparent focus:border-black dark:focus:border-white transition-all appearance-none">
                      <option value="">Seleccionar...</option>
                      {Object.keys(COLOMBIA_DATA).map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={16} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Ciudad</label>
                  <div className="relative">
                    <select name="ciudad" value={formData.ciudad} onChange={handleChange} required disabled={!formData.departamento} className="w-full bg-gray-50 dark:bg-[#1a1a1a] rounded-xl py-4 px-6 outline-none font-bold text-sm border-2 border-transparent focus:border-black dark:focus:border-white transition-all appearance-none disabled:opacity-30">
                      <option value="">Seleccionar ciudad...</option>
                      {formData.departamento && COLOMBIA_DATA[formData.departamento].map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={16} />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Dirección (Calle, Carrera, Número)</label>
                  <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-[#1a1a1a] rounded-xl py-4 px-6 outline-none font-bold text-sm border-2 border-transparent focus:border-black dark:focus:border-white transition-all" placeholder="EJ: CALLE 10 # 5-12" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Barrio</label>
                  <input type="text" name="barrio" value={formData.barrio} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-[#1a1a1a] rounded-xl py-4 px-6 outline-none font-bold text-sm border-2 border-transparent focus:border-black dark:focus:border-white transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Apto / Torre</label>
                  <input type="text" name="apto" value={formData.apto} onChange={handleChange} className="w-full bg-gray-50 dark:bg-[#1a1a1a] rounded-xl py-4 px-6 outline-none font-bold text-sm border-2 border-transparent focus:border-black dark:focus:border-white transition-all" />
                </div>
              </div>
            </section>
          </div>

          {/* RESUMEN LATERAL */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#111] p-8 rounded-[2.5rem] sticky top-32 shadow-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-black uppercase mb-8">Resumen</h3>
              <div className="space-y-4 mb-8 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.imagen || item.img} className="w-12 h-16 object-cover rounded-lg" alt="" />
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase truncate">{item.nombre}</p>
                      <p className="text-[10px] font-bold text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-800 mb-8">
                <div className="flex justify-between items-center text-xl font-black">
                  <span>TOTAL</span>
                  <span>${getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                  <Truck size={14}/> Envío nacional incluido
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-all shadow-xl">
                {loading ? 'Procesando...' : 'Confirmar y Pagar'}
              </button>
            </div>
          </div>

        </form>
      </main>
      <OrderSuccessModal isOpen={success} total={lastOrderTotal} />
    </div>
  )
}