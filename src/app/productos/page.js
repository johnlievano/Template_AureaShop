'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Search, X, Check, Plus, Minus, 
  Star, Eye, ShoppingBag, Heart 
} from 'lucide-react'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { useCart } from '../../context/CartContext'

// -----------------------------
// 1. MOCK DATA (Imágenes HD Streetwear)
// -----------------------------
const MOCK_PRODUCTS_DATA = [
  { 
    id: 201, 
    nombre: "Phantom Bomber Jacket", 
    categoria: "Hombre", 
    precio: 350000, 
    precio_original: 420000, 
    imagen: "https://images.unsplash.com/photo-1602525582399-7ef5f604ff7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9tYmVyJTIwamFja2V0fGVufDB8fDB8fHww", 
    oferta: true, 
    rating: 4.9, 
    reviews: 32, 
    tag: "Trending" 
  },
  { 
    id: 202, 
    nombre: "Oversized Graphic Tee", 
    categoria: "Mujer", 
    precio: 95000, 
    precio_original: null, 
    imagen: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800", 
    oferta: false, 
    rating: 4.7, 
    reviews: 18, 
    tag: "New Drop" 
  },
  { 
    id: 203, 
    nombre: "Tactical Cargo Pants", 
    categoria: "Hombre", 
    precio: 180000, 
    precio_original: 210000, 
    imagen: "https://images.unsplash.com/photo-1763388542551-f6e278d2c1a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhcmdvJTIwcGFudHxlbnwwfHwwfHx8MA%3D%3D", 
    oferta: true, 
    rating: 4.5, 
    reviews: 45, 
    tag: null 
  },
  { 
    id: 204, 
    nombre: "Run Star Hike", 
    categoria: "Zapatos", 
    precio: 420000, 
    precio_original: null, 
    imagen: "https://images.unsplash.com/photo-1621315271772-28b1f3a5df87?auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=387", 
    oferta: false, 
    rating: 5.0, 
    reviews: 89, 
    tag: "Best Seller" 
  },
  { 
    id: 205, 
    nombre: "Urban Crossbody Bag", 
    categoria: "Accesorios", 
    precio: 120000, 
    precio_original: 150000, 
    imagen: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800", 
    oferta: true, 
    rating: 4.8, 
    reviews: 12, 
    tag: "Sale" 
  },
  { 
    id: 206, 
    nombre: "Denim Jacket Vintage", 
    categoria: "Mujer", 
    precio: 250000, 
    precio_original: null, 
    imagen: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800", 
    oferta: false, 
    rating: 4.6, 
    reviews: 21, 
    tag: null 
  },
  { 
    id: 207, 
    nombre: "Minimalist Beanie", 
    categoria: "Accesorios", 
    precio: 45000, 
    precio_original: null, 
    imagen: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800", 
    oferta: false, 
    rating: 4.9, 
    reviews: 56, 
    tag: "Essential" 
  },
  { 
    id: 208, 
    nombre: "Tech Hoodie Black", 
    categoria: "Hombre", 
    precio: 160000, 
    precio_original: 200000, 
    imagen: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800", 
    oferta: true, 
    rating: 4.8, 
    reviews: 67, 
    tag: null 
  }
]

// -----------------------------
// MODALES
// -----------------------------
const ProductTargetModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)
  if (!product) return null

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-[#1a1a1a] w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:rotate-90 transition-all dark:text-white">
          <X size={20} />
        </button>

        <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-900">
           <img src={product.imagen} className="w-full h-full object-cover" alt={product.nombre} />
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col dark:text-white">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-2">{product.categoria}</span>
          <h2 className="text-3xl font-black uppercase leading-none mb-4">{product.nombre}</h2>
          
          <div className="flex items-center gap-2 mb-8">
             <div className="flex text-yellow-500">{[...Array(5)].map((_,i) => <Star key={i} fill="currentColor" size={14} className={i < Math.round(product.rating) ? "" : "text-gray-300"} />)}</div>
             <span className="text-xs font-bold text-gray-400">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-end gap-3 mb-8">
             <span className="text-4xl font-black">${product.precio.toLocaleString()}</span>
             {product.precio_original && (
               <span className="text-lg text-gray-400 line-through decoration-red-500 decoration-2 mb-1">${product.precio_original.toLocaleString()}</span>
             )}
          </div>

          <div className="mt-auto space-y-6">
             <div className="flex items-center justify-between bg-gray-50 dark:bg-[#111] p-4 rounded-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Cantidad</span>
                <div className="flex items-center gap-4">
                   <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-sm"><Minus size={14}/></button>
                   <span className="font-black">{quantity}</span>
                   <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-sm"><Plus size={14}/></button>
                </div>
             </div>
             
             <div className="flex gap-3">
               <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-black dark:bg-white dark:text-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:opacity-80 transition-all flex items-center justify-center gap-2"
               >
                 <ShoppingBag size={18} /> Añadir
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AddedSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  return (
    <div className="fixed top-24 right-6 z-[250] animate-in slide-in-from-right">
      <div className="bg-black dark:bg-white text-white dark:text-black p-6 shadow-2xl rounded-2xl border border-gray-800 dark:border-gray-200 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 text-white rounded-full p-1"><Check size={14} strokeWidth={4} /></div>
          <span className="text-xs font-black uppercase tracking-widest">En tu bolsa</span>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="text-[10px] font-black uppercase px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">Cerrar</button>
          <Link href="/carrito" className="bg-red-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg">Ir a Pagar</Link>
        </div>
      </div>
    </div>
  )
}

// -----------------------------
// PÁGINA PRINCIPAL
// -----------------------------
function ProductosContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams?.get('categoria') || 'todos'
  const initialSearch = searchParams?.get('search') || ''
  
  const [products] = useState(MOCK_PRODUCTS_DATA)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('destacados')
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [animatedCount, setAnimatedCount] = useState(0)

  const { addToCart } = useCart()

  const categories = [
    { id: 'todos', name: 'Todo' },
    { id: 'Mujer', name: 'Mujer' },
    { id: 'Hombre', name: 'Hombre' },
    { id: 'Accesorios', name: 'Accesorios' },
    { id: 'Zapatos', name: 'Zapatos' }
  ]

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let result = [...products]
    if (selectedCategory !== 'todos') result = result.filter(p => p.categoria.toLowerCase() === selectedCategory.toLowerCase())
    if (searchTerm) result = result.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    
    if (sortBy === 'precio-asc') result.sort((a, b) => a.precio - b.precio)
    if (sortBy === 'precio-desc') result.sort((a, b) => b.precio - a.precio)
    
    setFilteredProducts(result)
  }, [selectedCategory, searchTerm, sortBy, products])

  // Animación contador
  useEffect(() => {
    const target = filteredProducts.length
    if (target === animatedCount) return
    let start = 0
    const duration = 600
    const stepTime = 20
    const steps = Math.max(1, Math.floor(duration / stepTime))
    const increment = target / steps
    let current = 0
    const id = setInterval(() => {
      current += increment
      if (current >= target) {
        setAnimatedCount(target)
        clearInterval(id)
      } else {
        setAnimatedCount(Math.floor(current))
      }
    }, stepTime)
    return () => clearInterval(id)
  }, [filteredProducts.length])

  if (loading) return <LoadingSpinner />

  return (
    // AJUSTE: pt-20 para que no haya tanto hueco con la navbar fija
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white pt-20 pb-24 transition-colors duration-500">
      
      {/* --- HEADER COMPACTO Y LIMPIO --- */}
      <section className="relative pt-12 pb-16 overflow-hidden border-b border-gray-100 dark:border-gray-900">
        
        {/* Marca de agua (Sutil) */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 select-none pointer-events-none">
          <h2 className="text-[20vw] font-black uppercase leading-none opacity-[0.03] dark:opacity-[0.04] tracking-tighter whitespace-nowrap text-black dark:text-white">
            AUREA
          </h2>
        </div>

        {/* Patrón de Rejilla sutil */}
        <div className="absolute inset-0 opacity-[0.3] dark:opacity-[0.15] [background-image:linear-gradient(#f3f4f6_1px,transparent_1px),linear-gradient(90deg,#f3f4f6_1px,transparent_1px)] dark:[background-image:linear-gradient(#1f2937_1px,transparent_1px),linear-gradient(90deg,#1f2937_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
            
            {/* IZQUIERDA: Título */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-4 animate-fade-in">
                <span className="w-8 h-[2px] bg-black dark:bg-white"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">
                  {selectedCategory === 'todos' ? 'Global' : selectedCategory} Catalog
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] dark:text-white transition-all drop-shadow-sm">
                {selectedCategory === 'todos' ? 'Store' : selectedCategory}
              </h1>
            </div>

            {/* DERECHA: Datos técnicos y Buscador */}
            <div className="w-full lg:w-[450px] space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                 <span className="text-xs font-black uppercase text-gray-400">Stock Online</span>
                 <span className="text-xl font-black dark:text-white tracking-tighter">{String(animatedCount).padStart(2, '0')} REFS</span>
              </div>

              <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="BUSCAR PRODUCTO..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="w-full pl-8 bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white outline-none text-xs font-black uppercase tracking-[0.2em] placeholder-gray-400 py-3 transition-all dark:text-white" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BARRA DE FILTROS STICKY */}
      <div className="sticky top-20 z-40 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 py-4 mb-12 shadow-sm dark:shadow-none">
        <div className="container mx-auto px-6 flex flex-wrap justify-between items-center gap-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${selectedCategory === cat.id ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'bg-white dark:bg-transparent text-gray-500 hover:text-black dark:hover:text-white border-gray-200 dark:border-gray-800'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)} 
            className="bg-transparent text-[10px] font-bold uppercase outline-none cursor-pointer tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <option value="destacados">Relevancia</option>
            <option value="precio-asc">Precio Bajo</option>
            <option value="precio-desc">Precio Alto</option>
          </select>
        </div>
      </div>

      {/* GRID DE PRODUCTOS LIMPIO */}
      <main className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
               
               {/* TARJETA DE IMAGEN */}
               {/* AJUSTE MODO CLARO: bg-white o gray-50 sutil, borde muy fino, sombra al hover */}
               <Link 
                 href={`/productos/${product.id}`} 
                 className="block relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 transition-all duration-500 group-hover:shadow-xl dark:group-hover:shadow-none mb-4"
               >
                  <img src={product.imagen} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={product.nombre} />
                  
                  {/* Tag Flotante */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                      {product.tag && <span className="bg-white dark:bg-black text-black dark:text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest shadow-sm">{product.tag}</span>}
                      {product.oferta && <span className="bg-red-600 text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest shadow-sm">Sale</span>}
                  </div>

                  {/* Overlay oscuro sutil al hover */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               </Link>

               {/* BOTONES ACCION (Ocultos hasta hover) */}
               <button 
                  onClick={() => setSelectedProduct(product)}
                  className="absolute top-3 right-3 z-20 bg-white dark:bg-black p-2 rounded-full shadow-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-black dark:text-white hover:text-red-600 border border-gray-100 dark:border-gray-800"
               >
                  <Eye size={16} />
               </button>

               <button 
                  onClick={() => { addToCart(product); setShowSuccess(true); setTimeout(()=>setShowSuccess(false), 3000); }}
                  className="absolute bottom-24 right-3 z-20 bg-black dark:bg-white text-white dark:text-black p-3 rounded-full shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 active:scale-95"
               >
                  <Plus size={18} />
               </button>

               {/* INFO DEL PRODUCTO */}
               <div className="px-1">
                  <div className="flex justify-between items-start mb-1">
                     <Link href={`/productos/${product.id}`} className="text-xs font-bold uppercase text-gray-900 dark:text-white hover:text-red-600 transition-colors line-clamp-1 pr-4">
                        {product.nombre}
                     </Link>
                     <div className="flex items-center gap-1 text-gray-300 dark:text-gray-600">
                        <Star size={10} fill="currentColor" className="text-black dark:text-white" />
                        <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400">{product.rating}</span>
                     </div>
                  </div>
                  
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">{product.categoria}</p>

                  <div className="flex items-center gap-2">
                     <span className="text-sm font-black text-gray-900 dark:text-white">${product.precio.toLocaleString()}</span>
                     {product.precio_original && <span className="text-[10px] text-gray-400 line-through decoration-red-500">${product.precio_original.toLocaleString()}</span>}
                  </div>
               </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODALES */}
      <ProductTargetModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={(p) => { addToCart(p); setShowSuccess(true); setTimeout(()=>setShowSuccess(false), 3000); }} />
      <AddedSuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  )
}

export default function Productos() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductosContent />
    </Suspense>
  )
}