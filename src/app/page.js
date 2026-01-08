'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import {
  X, ArrowRight, Star, ShoppingBag, Truck, ShieldCheck,
  CreditCard, Clock, Zap, Eye, Heart, Check, ChevronLeft, ChevronRight, Plus
} from 'lucide-react'

// --- 2. DATOS ---
const CATEGORIES = [
  { name: "Sneakers", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600" },
  { name: "Jackets", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600" },
  { name: "Hoodies", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600" },
  { name: "Pants", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600" },
  { name: "Access", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600" },
]

const HERO_SLIDES = [
  {
    id: 1,
    title: "URBAN LEGENDS",
    subtitle: "La calle es tu pasarela. Descubre la nueva colección de alto impacto.",
    cta: "Comprar Ahora",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1500",
    align: "left",
    position: "object-center"
  },
  {
    id: 2,
    title: "MONOCHROME",
    subtitle: "La elegancia del negro. Edición Limitada.",
    cta: "Ver Colección",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=1500",
    align: "center",
    position: "object-center"
  },
  {
    id: 3,
    title: "SALE 50% OFF",
    subtitle: "Precios de locura en referencias seleccionadas. Tiempo limitado.",
    cta: "Ir a Ofertas",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1500",
    align: "right",
    position: "object-center"
  }
]

const PRODUCTS = [
  { id: 101, nombre: "Cyber Jacket Pro", precio: 280000, precio_ant: 350000, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800", rating: 4.8, reviews: 85, tag: "Best Seller" },
  { id: 102, nombre: "Sneakers Carbon", precio: 190000, precio_ant: 240000, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800", rating: 5, reviews: 120, tag: "New" },
  { id: 103, nombre: "Hoodie Oversized", precio: 120000, precio_ant: 180000, img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800", rating: 4.9, reviews: 45, tag: "Sale" },
  { id: 104, nombre: "Smart Glasses V2", precio: 350000, precio_ant: 450000, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800", rating: 4.7, reviews: 32, tag: null },
]

// --- 3. COMPONENTES INTERNOS ---

// A. Scroll Reveal
const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => { if (ref.current) observer.unobserve(ref.current) }
  }, [])

  return (
    <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      {children}
    </div>
  )
}

// B. Modal "Target View" (VISTA RÁPIDA) - CORREGIDO PARA PC
const ProductTargetModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null

  return (
    <div
      // CORRECCIÓN CLAVE: items-end en móvil, md:items-center en PC. pt-28 en móvil, md:pt-8 en PC para centrar y bajar del navbar.
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        // CORRECCIÓN DE ALTURA Y ANCHO: max-w-5xl para más espacio lateral, max-h-[85vh] para que no se corte verticalmente.
        className="bg-white dark:bg-[#1a1a1a] w-full max-w-5xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col md:flex-row relative animate-slide-up overflow-hidden border border-gray-100 dark:border-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 z-30 p-2 bg-white/80 md:bg-gray-100 dark:bg-black/50 md:dark:bg-gray-800 rounded-full hover:rotate-90 transition-all dark:text-white backdrop-blur-sm shadow-sm">
          <X size={20} />
        </button>

        {/* Imagen: Altura fija en móvil, automática en PC para llenar el espacio */}
        <div className="w-full md:w-1/2 h-48 md:h-auto bg-gray-100 dark:bg-gray-900 relative shrink-0">
          <img src={product.img} className="w-full h-full object-cover" alt={product.nombre} />
          {product.tag && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-widest">
              {product.tag}
            </span>
          )}
        </div>

        {/* Contenido con scroll interno */}
        <div className="w-full md:w-1/2 flex-1 flex flex-col p-6 md:p-8 dark:text-white overflow-y-auto">
          <div className="mb-2">
            <h2 className="text-2xl md:text-3xl font-black italic uppercase leading-none mb-1">{product.nombre}</h2>
            <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold">
              <div className="flex"><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /></div>
              <span className="text-gray-400 dark:text-gray-500">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-black text-red-600">${product.precio.toLocaleString()}</span>
            <span className="text-sm text-gray-400 line-through decoration-red-500">${product.precio_ant.toLocaleString()}</span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed border-l-2 border-red-600 pl-4">
            Diseño ergonómico con materiales de alta resistencia. Ideal para uso intensivo urbano.
          </p>

          <div className="mt-auto space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-gray-400 mb-2 block tracking-widest">Seleccionar Talla</span>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL'].map(s => (
                  <button key={s} className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded-lg font-bold text-sm hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-black dark:bg-white dark:text-black text-white py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:opacity-80 transition-opacity flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag size={16} /> Agregar al Carrito
              </button>
              <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 hover:text-red-600 transition-colors">
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// C. Modal de Recomendaciones (UPSELL)
const UpsellModal = ({ isOpen, onClose, allProducts, onAddRecommendation }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [addedItems, setAddedItems] = useState([])

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
    setAddedItems(prev => [...prev, product.id])
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
              const isAdded = addedItems.includes(p.id)
              return (
                <div key={p.id} className="border border-gray-100 dark:border-gray-800 p-2 rounded-xl flex flex-col gap-2 group/card hover:border-black dark:hover:border-white transition-all animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-gray-100"><img src={p.img} alt={p.nombre} className="w-full h-full object-cover" /></div>
                  <div>
                    <h4 className="text-[9px] font-bold uppercase line-clamp-1 dark:text-white">{p.nombre}</h4>
                    <p className="text-xs font-black text-red-600">${p.precio.toLocaleString()}</p>
                  </div>

                  <button
                    onClick={() => !isAdded && handleAdd(p)}
                    className={`w-full text-white dark:text-black text-[9px] font-black uppercase py-2 rounded-lg flex items-center justify-center gap-1 transition-all duration-300 ${isAdded
                      ? 'bg-green-600 cursor-default'
                      : 'bg-black dark:bg-white hover:opacity-80'
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

// D. Card de Producto
const ProductCard = ({ product, onView, onAdd }) => (
  <div className="group relative bg-white dark:bg-[#151515] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 dark:text-white">

    <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800">
      {/* 1. IMAGEN CON LINK */}
      <Link href={`/productos/${product.id}`} className="block w-full h-full cursor-pointer">
        <img src={product.img} alt={product.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </Link>

      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Botones (z-20 para estar encima del Link de la imagen) */}
      <button
        onClick={(e) => { e.stopPropagation(); onView(product); }}
        className="absolute top-3 right-3 z-20 bg-white dark:bg-black p-2 rounded-full shadow-md text-black dark:text-white border border-gray-100 dark:border-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <Eye size={16} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onAdd(product); }}
        className="absolute bottom-3 right-3 z-20 bg-black dark:bg-white text-white dark:text-black p-3 rounded-full shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
      >
        <Plus size={18} />
      </button>

      <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
        {product.tag && <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider rounded-sm shadow-sm">{product.tag}</span>}
      </div>
    </div>

    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        {/* 2. TÍTULO CON LINK */}
        <Link href={`/productos/${product.id}`} className="font-bold text-lg leading-tight group-hover:text-red-600 transition-colors cursor-pointer">
          {product.nombre}
        </Link>
        <div className="flex items-center gap-1 text-yellow-500">
          <Star size={12} fill="currentColor" />
          <span className="text-xs font-bold text-gray-400">{product.rating}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-black text-gray-900 dark:text-white">${product.precio.toLocaleString()}</span>
        <span className="text-xs text-gray-400 line-through decoration-red-500">${product.precio_ant.toLocaleString()}</span>
      </div>
    </div>
  </div>
)

// --- 4. PÁGINA PRINCIPAL ---
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 })
  const { addToCart } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % HERO_SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const now = new Date();
    const target = new Date(now.getTime() + (24 * 60 * 60 * 1000));
    const timer = setInterval(() => {
      const current = new Date();
      const diff = target - current;
      if (diff > 0) {
        setTimeLeft({
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans">

      {/* 1. HERO SLIDER */}
      <section className="relative h-screen w-full overflow-hidden bg-gray-900">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100 z-20 pointer-events-auto' : 'opacity-0 scale-105 z-10 pointer-events-none'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 opacity-90" />
            <img
              src={slide.image}
              className={`w-full h-full object-cover ${slide.position || 'object-center'}`}
              alt={slide.title}
            />
            <div className={`absolute inset-0 z-20 container mx-auto px-6 md:px-12 flex flex-col justify-end pb-32 md:justify-center md:pb-0 ${slide.align === 'center' ? 'items-start text-left md:items-center md:text-center' :
              slide.align === 'right' ? 'items-start text-left md:items-end md:text-right' :
                'items-start text-left'
              }`}>
              <div className="animate-slide-up max-w-3xl">
                <span className="inline-block px-4 py-1 border border-white/30 backdrop-blur-md text-white text-xs font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 rounded-full">
                  Nueva Temporada 2025
                </span>
                <h2 className="text-4xl md:text-8xl font-black text-white mb-4 md:mb-6 leading-[0.9] tracking-tighter drop-shadow-2xl">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-2xl text-gray-200 mb-8 md:mb-10 font-medium max-w-xl leading-relaxed">
                  {slide.subtitle}
                </p>
                <Link
                  href="/productos"
                  className="inline-flex items-center gap-4 bg-red-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all transform hover:-translate-y-2 shadow-[0_20px_50px_rgba(220,38,38,0.5)] text-sm md:text-base cursor-pointer z-50 pointer-events-auto"
                >
                  {slide.cta} <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-12 right-12 z-30 flex gap-4">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-16 bg-red-600' : 'w-4 bg-gray-600'}`}
            />
          ))}
        </div>
      </section>

      {/* Resto de secciones (Trust Bar, Productos, etc.) siguen igual... */}
      {/* 2. TRUST BAR */}
      <section className="bg-white dark:bg-[#111] border-y border-gray-200 dark:border-gray-800 py-10 relative z-20">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Truck, t: "Envío Gratis", d: "Pedidos +$200k" },
            { icon: ShieldCheck, t: "Garantía", d: "1 Año Directa" },
            { icon: CreditCard, t: "Pago Seguro", d: "Encriptación SSL" },
            { icon: Clock, t: "Entrega Rápida", d: "24-48 Horas" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 justify-center md:justify-start">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-black dark:text-white">
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase dark:text-white">{item.t}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PRODUCTOS DESTACADOS */}
      <section className="py-12 md:py-24 px-4 md:px-12 bg-stone-50 dark:bg-[#0a0a0a]">
        <ScrollReveal>
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-8 md:mb-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2 dark:text-white">
                  Lo Más <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Vendido</span>
                </h2>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium">Favoritos de la comunidad.</p>
              </div>
              <Link href="/productos" className="hidden md:flex items-center gap-2 font-bold uppercase tracking-widest border-b-2 border-red-600 pb-1 hover:text-red-600 transition-colors">
                Ver Todo <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
              {PRODUCTS.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={() => setSelectedProduct(product)}
                  onAdd={(p) => { addToCart(p); setShowSuccess(true); }}
                />
              ))}
            </div>
            <div className="mt-8 md:mt-12 text-center md:hidden">
              <Link
                href="/productos"
                className="inline-flex items-center gap-2 font-bold uppercase tracking-widest border-b-2 border-red-600 pb-1 hover:text-red-600 transition-colors text-gray-900 dark:text-white"
              >
                VER TODO <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. BANNER PROMOCIONAL */}
      <section className="relative py-32 bg-red-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-multiply"></div>
        <div className="absolute -right-20 top-0 w-96 h-96 bg-black rounded-full blur-[100px] opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={24} className="fill-yellow-400 text-yellow-400 animate-pulse" />
              <span className="font-bold uppercase tracking-widest">Oferta Relámpago</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-none mb-6">
              Streetwear <br /> Revolution
            </h2>
            <p className="text-xl font-medium mb-8 text-red-100 max-w-md">
              Equípate con lo mejor. Hasta 60% de descuento en la colección urbana. Solo por 24 horas.
            </p>
            <div className="flex gap-4 mb-8">
              <div className="bg-black/20 backdrop-blur border border-white/20 p-4 rounded-xl text-center min-w-[80px]">
                <span className="block text-3xl font-black">{String(timeLeft.h).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase font-bold opacity-70">Horas</span>
              </div>
              <div className="bg-black/20 backdrop-blur border border-white/20 p-4 rounded-xl text-center min-w-[80px]">
                <span className="block text-3xl font-black">{String(timeLeft.m).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase font-bold opacity-70">Min</span>
              </div>
              <div className="bg-black/20 backdrop-blur border border-white/20 p-4 rounded-xl text-center min-w-[80px]">
                <span className="block text-3xl font-black">{String(timeLeft.s).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase font-bold opacity-70">Seg</span>
              </div>
            </div>
            <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors shadow-2xl">
              Comprar Ahora
            </button>
          </div>
          <div className="w-full md:w-1/2 relative">
            <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800" className="w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transform -rotate-12 hover:rotate-0 transition-transform duration-700" alt="Banner" />
          </div>
        </div>
      </section>

      {/* 5. CATEGORÍAS */}
      <section className="py-24 bg-gray-100 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-black uppercase mb-16 dark:text-white">Explora tu estilo</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {CATEGORIES.map((cat, i) => (
              <Link href="/productos" key={i} className="group flex flex-col items-center gap-4">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-2 bg-white shadow-xl dark:bg-[#1a1a1a] dark:shadow-none dark:border-2 dark:border-gray-800 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <img src={cat.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={cat.name} />
                  </div>
                </div>
                <span className="font-bold uppercase tracking-widest text-sm text-gray-800 dark:text-white group-hover:text-red-600 transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MODALES Y FLOTANTES */}
      <ProductTargetModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => {
          addToCart(p);
          setSelectedProduct(null);
          setShowSuccess(true);
        }}
      />

      <UpsellModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        allProducts={PRODUCTS}
        onAddRecommendation={(p) => addToCart(p)}
      />

    </div>
  )
}