'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Search, X, Check, Plus, Minus,
  Star, Eye, ShoppingBag, Heart, ArrowRight,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { useCart } from '../../context/CartContext'

// -----------------------------
// 1. BASE DE DATOS UNIFICADA
// -----------------------------
const ALL_PRODUCTS = [
  { id: 101, nombre: "Cyber Jacket Pro", categoria: "Chaquetas", precio: 280000, precio_ant: 350000, descripcion: "Diseñada para el entorno urbano hostil.", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200", oferta: true, rating: 4.8, reviews: 85, tag: "Trending" },
  { id: 102, nombre: "Sneakers Carbon", categoria: "Calzado", precio: 190000, precio_ant: 240000, descripcion: "Suela de fibra de carbono.", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200", oferta: false, rating: 5, reviews: 120, tag: "New" },
  { id: 103, nombre: "Hoodie Oversized", categoria: "Hoodies", precio: 120000, precio_ant: 180000, descripcion: "Hoodie de algodón pesado.", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200", oferta: false, rating: 4.9, reviews: 45, tag: "Sale" },
  { id: 104, nombre: "Smart Glasses V2", categoria: "Accesorios", precio: 350000, precio_ant: 450000, descripcion: "Gafas inteligentes con filtro UV.", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200", oferta: true, rating: 4.7, reviews: 32, tag: null },
  { id: 105, nombre: "Tactical Cargo Pants", categoria: "Pantalones", precio: 150000, precio_ant: 190000, descripcion: "Pantalón cargo con múltiples bolsillos funcionales.", img: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=1200", oferta: true, rating: 4.6, reviews: 28, tag: null },
  { id: 201, nombre: "Phantom Bomber Jacket", categoria: "Hombre", precio: 350000, precio_ant: 420000, img: "https://images.unsplash.com/photo-1602525582399-7ef5f604ff7e?w=500&auto=format&fit=crop&q=60", oferta: true, rating: 4.9, reviews: 32, tag: "Trending" },
  { id: 202, nombre: "Oversized Graphic Tee", categoria: "Mujer", precio: 95000, precio_ant: null, img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200", oferta: false, rating: 4.7, reviews: 18, tag: "New Drop" },
  { id: 204, nombre: "Run Star Hike", categoria: "Zapatos", precio: 420000, precio_ant: null, img: "https://images.unsplash.com/photo-1621315271772-28b1f3a5df87?auto=format&fit=crop&q=80&w=387", oferta: false, rating: 5.0, reviews: 89, tag: "Best Seller" },
  { id: 205, nombre: "Urban Crossbody Bag", categoria: "Accesorios", precio: 120000, precio_ant: 150000, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200", oferta: true, rating: 4.8, reviews: 12, tag: "Sale" },
]

// -----------------------------
// 2. MODALES
// -----------------------------

const ProductTargetModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)
  if (!product) return null

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start md:items-center justify-center p-4 pt-32 md:pt-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1a1a1a] w-full max-w-4xl max-h-[75vh] md:max-h-none rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row relative animate-slide-up overflow-hidden md:overflow-visible"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-30 p-2 bg-white/80 md:bg-gray-100 dark:bg-black/50 md:dark:bg-gray-800 rounded-full hover:rotate-90 transition-all dark:text-white backdrop-blur-sm">
          <X size={20} />
        </button>

        <div className="w-full md:w-1/2 h-40 md:h-auto bg-gray-50 dark:bg-gray-900 shrink-0 relative">
          <img src={product.img} className="w-full h-full object-cover" alt={product.nombre} />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col dark:text-white overflow-y-auto md:overflow-visible">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-2">{product.categoria}</span>
          <h2 className="text-2xl md:text-3xl font-black uppercase leading-none mb-4">{product.nombre}</h2>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-500">{[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={14} className={i < Math.round(product.rating) ? "" : "text-gray-300"} />)}</div>
            <span className="text-xs font-bold text-gray-400">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-3xl md:text-4xl font-black">${product.precio.toLocaleString()}</span>
            {product.precio_ant && (
              <span className="text-lg text-gray-400 line-through decoration-red-500 decoration-2 mb-1">${product.precio_ant.toLocaleString()}</span>
            )}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-8 border-l-2 border-red-600 pl-4">
            {product.descripcion || "Descripción detallada no disponible para visualización rápida."}
          </p>

          <div className="mt-auto space-y-6">
            <div className="flex items-center justify-between bg-gray-50 dark:bg-[#111] p-4 rounded-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">Cantidad</span>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-sm"><Minus size={14} /></button>
                <span className="font-black">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-sm"><Plus size={14} /></button>
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

// -----------------------------
// 3. PÁGINA PRINCIPAL
// -----------------------------
function ProductosContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams?.get('categoria') || 'todos'
  const initialSearch = searchParams?.get('search') || ''

  const [products] = useState(ALL_PRODUCTS)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('destacados')
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [animatedCount, setAnimatedCount] = useState(0)

  // HOOK COMPLETO
  const { addToCart, getCartItemsCount, cart, getCartTotal, removeFromCart } = useCart()

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
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white pt-20 pb-24 transition-colors duration-500 relative">

      {/* HEADER */}
      <section className="relative pt-12 pb-16 overflow-hidden border-b border-gray-100 dark:border-gray-900">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 select-none pointer-events-none">
          <h2 className="text-[20vw] font-black uppercase leading-none opacity-[0.03] dark:opacity-[0.04] tracking-tighter whitespace-nowrap text-black dark:text-white">
            AUREA
          </h2>
        </div>
        <div className="absolute inset-0 opacity-[0.3] dark:opacity-[0.15] [background-image:linear-gradient(#f3f4f6_1px,transparent_1px),linear-gradient(90deg,#f3f4f6_1px,transparent_1px)] dark:[background-image:linear-gradient(#1f2937_1px,transparent_1px),linear-gradient(90deg,#1f2937_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
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

      {/* FILTROS */}
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

      {/* GRID DE PRODUCTOS */}
      <main className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">

              {/* TARJETA */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 transition-all duration-500 group-hover:shadow-xl dark:group-hover:shadow-none mb-4">

                {/* Link a Detalle (Cubre toda la imagen) */}
                <Link href={`/productos/${product.id}`} className="block w-full h-full">
                  <img src={product.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={product.nombre} />
                </Link>

                {/* Tag Flotante */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                  {product.tag && <span className="bg-white dark:bg-black text-black dark:text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest shadow-sm">{product.tag}</span>}
                  {product.oferta && <span className="bg-red-600 text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest shadow-sm">Sale</span>}
                </div>

                {/* Overlay oscuro (Solo en PC al hover) */}
                <div className="hidden md:block absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* --- BOTONES DE ACCIÓN (TU ESTILO) --- */}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                  className="absolute top-3 right-3 z-20 bg-white dark:bg-black p-2 rounded-full shadow-md text-black dark:text-white border border-gray-100 dark:border-gray-800 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 lg:hover:scale-110 active:scale-95"
                >
                  <Eye size={16} />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); addToCart(product); setShowSuccess(true); }}
                  className="absolute bottom-3 right-3 z-20 bg-black dark:bg-white text-white dark:text-black p-3 rounded-full shadow-xl opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <Plus size={18} />
                </button>

              </div>

              {/* INFO */}
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
                  {product.precio_ant && <span className="text-[10px] text-gray-400 line-through decoration-red-500">${product.precio_ant.toLocaleString()}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODALES */}
      <ProductTargetModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={(p) => { addToCart(p); setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000); }} />
        <UpsellModal 
         isOpen={showSuccess} 
         onClose={() => setShowSuccess(false)} 
         allProducts={products}
         onAddRecommendation={(p) => addToCart(p)}
      />
    </div>
  )
}

// --- NUEVO MODAL TIPO POP-UP CON RECOMENDACIONES ---
const UpsellModal = ({ isOpen, onClose, allProducts, onAddRecommendation }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [addedItems, setAddedItems] = useState([]) // Nuevo estado para rastrear añadidos

  // Reseteamos los añadidos cada vez que se abre el modal principal
  useEffect(() => {
    if (isOpen) setAddedItems([])
  }, [isOpen])

  if (!isOpen) return null

  const itemsPerPage = 3
  const visibleProducts = allProducts.slice(currentIndex, currentIndex + itemsPerPage)

  const nextSlide = () => { if (currentIndex + itemsPerPage < allProducts.length) setCurrentIndex(currentIndex + 1) }
  const prevSlide = () => { if (currentIndex > 0) setCurrentIndex(currentIndex - 1) }

  const handleAdd = (product) => {
    onAddRecommendation(product)
    setAddedItems(prev => [...prev, product.id]) // Marcamos como añadido
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#111] w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl relative animate-slide-up border border-gray-200 dark:border-gray-800">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-[#111] shadow-lg"><Check size={32} strokeWidth={4} /></div>
          <h2 className="text-2xl font-black uppercase dark:text-white leading-none">¡Producto Agregado!</h2>
          <p className="text-gray-500 text-xs mt-2">Completa tu outfit con estas recomendaciones:</p>
        </div>
        <div className="relative group mb-8 px-2">
          <button onClick={prevSlide} className={`absolute -left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 transition-all ${currentIndex === 0 ? 'opacity-0' : 'opacity-100 hover:scale-110'}`}><ChevronLeft size={18} className="dark:text-white" /></button>
          
          <div className="grid grid-cols-3 gap-3">
            {visibleProducts.map(p => {
              const isAdded = addedItems.includes(p.id) // Verificamos si ya se añadió
              return (
                <div key={p.id} className="border border-gray-100 dark:border-gray-800 p-2 rounded-xl flex flex-col gap-2 group/card hover:border-black dark:hover:border-white transition-all animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-gray-100"><img src={p.img} alt={p.nombre} className="w-full h-full object-cover" /></div>
                  <div>
                    <h4 className="text-[9px] font-bold uppercase line-clamp-1 dark:text-white">{p.nombre}</h4>
                    <p className="text-xs font-black text-red-600">${p.precio.toLocaleString()}</p>
                  </div>
                  
                  <button 
                    onClick={() => !isAdded && handleAdd(p)} // Solo añade si no está añadido
                    className={`w-full text-white dark:text-black text-[9px] font-black uppercase py-2 rounded-lg flex items-center justify-center gap-1 transition-all duration-300 ${
                      isAdded 
                        ? 'bg-green-600 cursor-default' // Estilo verde si ya se añadió
                        : 'bg-black dark:bg-white hover:opacity-80' // Estilo normal
                    }`}
                  >
                    {isAdded ? (
                      <> <Check size={10} strokeWidth={4} /> Añadido </>
                    ) : (
                      <> <Plus size={10} /> Añadir </>
                    )}
                  </button>

                </div>
              )
            })}
          </div>

          <button onClick={nextSlide} className={`absolute -right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 transition-all ${currentIndex + itemsPerPage >= allProducts.length ? 'opacity-0' : 'opacity-100 hover:scale-110'}`}><ChevronRight size={18} className="dark:text-white" /></button>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <button onClick={onClose} className="flex-1 py-3.5 rounded-full border-2 border-gray-200 dark:border-gray-700 font-bold uppercase text-xs hover:border-black dark:hover:border-white transition-colors dark:text-white">Seguir Comprando</button>
          <Link href="/carrito" className="flex-1 py-3.5 rounded-full bg-green-600 text-white font-black uppercase text-xs text-center hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 flex items-center justify-center gap-2">Ir al Carrito <ArrowRight size={14} /></Link>
        </div>
      </div>
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