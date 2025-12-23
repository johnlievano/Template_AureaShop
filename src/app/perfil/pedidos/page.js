'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Package, Truck, CheckCircle, Clock, ChevronRight, Search, ShoppingBag } from 'lucide-react'

export default function PedidosPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // 1. CARGAR PEDIDOS REALES (Simulados en LocalStorage)
  useEffect(() => {
    // Leemos la clave 'aurea_orders' que guardamos en el Checkout
    const storedOrders = localStorage.getItem('aurea_orders')
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
    setLoading(false)
  }, [])

  // Filtrar por ID
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
     return <div className="py-20 text-center text-gray-400 text-sm animate-pulse">Cargando historial...</div>
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase mb-1 dark:text-white">Mis Pedidos</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Historial de compras y seguimiento.</p>
        </div>
        
        {/* Buscador de Pedidos (Solo aparece si hay pedidos) */}
        {orders.length > 0 && (
          <div className="relative group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
             <input 
               type="text" 
               placeholder="BUSCAR ID..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-xl py-3 pl-12 pr-4 text-sm font-bold outline-none focus:border-black dark:focus:border-white transition-colors w-full md:w-64 dark:text-white placeholder-gray-400"
             />
          </div>
        )}
      </div>

      <div className="space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="group bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 transition-all hover:border-black dark:hover:border-white hover:shadow-lg animate-slide-up">
               <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  
                  {/* Imagen Preview (Primera imagen del carrito) */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200 dark:border-gray-700">
                     <img src={order.img} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Info Principal */}
                  <div className="flex-1 w-full">
                     <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black uppercase dark:text-white">{order.id}</h3>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 ${order.statusColor}`}>
                           {order.status}
                        </span>
                     </div>
                     <div className="text-sm text-gray-500 dark:text-gray-400 font-medium flex gap-4 mb-4 items-center flex-wrap">
                        <span className="flex items-center gap-1"><Clock size={14}/> {order.date}</span>
                        <span className="hidden md:inline">•</span>
                        <span>{order.items} Artículo{order.items > 1 ? 's' : ''}</span>
                        <span className="hidden md:inline">•</span>
                        <span className="text-black dark:text-white font-bold text-lg">${order.total.toLocaleString()}</span>
                     </div>

                     {/* Barra de Progreso */}
                     <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                           className={`h-full ${order.bgStatus} transition-all duration-1000`} 
                           style={{ width: `${order.progress}%` }}
                        ></div>
                     </div>
                  </div>

                  {/* Botón Acción */}
                  <button className="w-full md:w-auto self-stretch md:self-center flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-bold uppercase text-xs hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all dark:text-white">
                     Ver Detalles <ChevronRight size={14} />
                  </button>
               </div>
            </div>
          ))
        ) : (
          /* Estado Vacío (Si no hay compras o filtro no coincide) */
          <div className="text-center py-24 bg-gray-50 dark:bg-[#1a1a1a] rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center">
             <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <Package className="text-gray-400" size={32} />
             </div>
             
             {orders.length === 0 ? (
                // Caso: Usuario nuevo sin compras
                <>
                   <h3 className="text-xl font-black uppercase mb-2 dark:text-white">Aún no tienes pedidos</h3>
                   <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 max-w-xs mx-auto">
                      Tu historial de compras aparecerá aquí cuando realices tu primer pedido.
                   </p>
                   <Link href="/productos" className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-lg">
                      <ShoppingBag size={16} /> Empezar a Comprar
                   </Link>
                </>
             ) : (
                // Caso: Buscador no encuentra nada
                <>
                   <h3 className="text-xl font-black uppercase mb-2 dark:text-white">Pedido no encontrado</h3>
                   <p className="text-gray-500 text-sm mb-6">Intenta buscar con otro ID.</p>
                   <button onClick={() => setSearchTerm('')} className="text-xs font-bold uppercase border-b border-black dark:border-white pb-1 dark:text-white">
                      Limpiar Filtros
                   </button>
                </>
             )}
          </div>
        )}
      </div>
    </div>
  )
}