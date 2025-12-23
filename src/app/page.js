'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { 
  X, ArrowRight, Star, ShoppingBag, Truck, ShieldCheck, 
  CreditCard, Clock, Zap, Eye, Heart 
} from 'lucide-react'

// --- 1. URLs DE IMÁGENES CORREGIDAS (Garantizadas) ---
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
    align: "left"
  },
  {
    id: 2,
    title: "MONOCHROME",
    subtitle: "Minimalismo radical. Blanco y negro nunca pasan de moda.",
    cta: "Ver Colección",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1500",
    align: "center"
  },
  {
    id: 3,
    title: "SALE 50% OFF",
    subtitle: "Precios de locura en referencias seleccionadas. Tiempo limitado.",
    cta: "Ir a Ofertas",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1500",
    align: "right"
  }
]

const PRODUCTS = [
  { id: 101, nombre: "Cyber Jacket Pro", precio: 280000, precio_ant: 350000, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800", rating: 4.8, reviews: 85, tag: "Best Seller" },
  { id: 102, nombre: "Sneakers Carbon", precio: 190000, precio_ant: 240000, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800", rating: 5, reviews: 120, tag: "New" },
  { id: 103, nombre: "Hoodie Oversized", precio: 120000, precio_ant: 180000, img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800", rating: 4.9, reviews: 45, tag: "Sale" },
  { id: 104, nombre: "Smart Glasses V2", precio: 350000, precio_ant: 450000, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800", rating: 4.7, reviews: 32, tag: null },
]

// --- 2. COMPONENTES INTERNOS ---

// A. Scroll Reveal
const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => { if(ref.current) observer.unobserve(ref.current) }
  }, [])

  return (
    <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      {children}
    </div>
  )
}

// B. Modal "Target View"
const ProductTargetModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null
  
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-white dark:bg-[#1a1a1a] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:rotate-90 transition-all dark:text-white">
          <X size={20} />
        </button>

        {/* Imagen */}
        <div className="w-full md:w-1/2 bg-gray-200 dark:bg-gray-900 relative group">
          <img src={product.img} className="w-full h-full object-cover" alt={product.nombre} />
          {product.tag && (
            <span className="absolute top-6 left-6 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-sm uppercase tracking-widest">
              {product.tag}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col dark:text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
               <h2 className="text-3xl font-black italic uppercase leading-none mb-2">{product.nombre}</h2>
               <div className="flex items-center gap-2 text-yellow-500 text-sm font-bold">
                 <div className="flex"><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /></div>
                 <span className="text-gray-400 dark:text-gray-500">({product.reviews} reviews)</span>
               </div>
            </div>
          </div>

          <div className="flex items-end gap-3 mb-8">
             <span className="text-4xl font-black text-red-600">${product.precio.toLocaleString()}</span>
             <span className="text-lg text-gray-400 line-through decoration-red-500 decoration-2 mb-1">${product.precio_ant.toLocaleString()}</span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-medium">
            Diseño ergonómico con materiales de alta resistencia. Ideal para uso intensivo urbano. Garantía de fábrica incluida.
          </p>

          <div className="mt-auto space-y-4">
             {/* Tallas Simuladas */}
             <div>
               <span className="text-xs font-bold uppercase text-gray-400 mb-2 block tracking-widest">Seleccionar Talla</span>
               <div className="flex gap-2">
                 {['S', 'M', 'L', 'XL'].map(s => (
                   <button key={s} className="w-10 h-10 border-2 border-gray-200 dark:border-gray-700 rounded-lg font-bold hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                     {s}
                   </button>
                 ))}
               </div>
             </div>

             <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
               <button 
                  onClick={() => onAddToCart(product)}
                  className="flex-1 bg-black dark:bg-white dark:text-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
               >
                 <ShoppingBag size={18} /> Agregar
               </button>
               <button className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 hover:text-red-600 transition-colors">
                 <Heart size={20} />
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// C. Card de Producto
const ProductCard = ({ product, onView }) => (
  <div className="group relative bg-white dark:bg-[#151515] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 dark:text-white">
    {/* Imagen */}
    <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800">
      <img src={product.img} alt={product.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <button 
        onClick={() => onView(product)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs shadow-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
      >
        <Eye size={16} /> Vista Rápida
      </button>
      <div className="absolute top-3 left-3 flex flex-col gap-2">
         {product.tag && <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider rounded-sm shadow-sm">{product.tag}</span>}
         <span className="bg-black/80 dark:bg-white/90 text-white dark:text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm backdrop-blur-sm">
           -{Math.round(((product.precio_ant - product.precio) / product.precio_ant) * 100)}%
         </span>
      </div>
    </div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
         <h3 className="font-bold text-lg leading-tight group-hover:text-red-600 transition-colors">{product.nombre}</h3>
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

// --- 3. PÁGINA PRINCIPAL ---
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  // Estado para el contador: Iniciamos visualmente en 24 horas
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 })
  
  const { addToCart } = useCart()

  // Slider Automático
  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % HERO_SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [])

  // Lógica del Contador: CUENTA REGRESIVA DE 24 HORAS FIJAS DESDE QUE ENTRA
  useEffect(() => {
    // Definimos el objetivo: 24 horas a partir de AHORA MISMO
    const now = new Date();
    const target = new Date(now.getTime() + (24 * 60 * 60 * 1000)); // +24 horas

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
        clearInterval(timer); // O reiniciar
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
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 opacity-90" />
            <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
            <div className={`absolute inset-0 z-20 container mx-auto px-6 md:px-12 flex flex-col justify-center ${slide.align === 'center' ? 'items-center text-center' : slide.align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
              <div className="animate-slide-up max-w-3xl">
                <span className="inline-block px-4 py-1 border border-white/30 backdrop-blur-md text-white text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded-full">
                  Nueva Temporada 2025
                </span>
                <h2 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter drop-shadow-2xl">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-200 mb-10 font-medium max-w-xl leading-relaxed">
                  {slide.subtitle}
                </p>
                <Link 
                  href="/productos" 
                  className="inline-flex items-center gap-4 bg-red-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all transform hover:-translate-y-2 shadow-[0_20px_50px_rgba(220,38,38,0.5)]"
                >
                  {slide.cta} <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicadores */}
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
      <section className="py-24 px-6 md:px-12 bg-stone-50 dark:bg-[#0a0a0a]">
        <ScrollReveal>
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-12">
               <div>
                 <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 dark:text-white">
                   Lo Más <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Vendido</span>
                 </h2>
                 <p className="text-gray-500 dark:text-gray-400 font-medium">Favoritos de la comunidad esta semana.</p>
               </div>
               <Link href="/productos" className="hidden md:flex items-center gap-2 font-bold uppercase tracking-widest border-b-2 border-red-600 pb-1 hover:text-red-600 transition-colors">
                 Ver Todo <ArrowRight size={16} />
               </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {PRODUCTS.map(product => (
                 <ProductCard 
                   key={product.id} 
                   product={product} 
                   onView={() => setSelectedProduct(product)} 
                 />
               ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. BANNER PROMOCIONAL CON CONTADOR (EMPIEZA EN 24H) */}
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
                 Streetwear <br/> Revolution
               </h2>
               <p className="text-xl font-medium mb-8 text-red-100 max-w-md">
                 Equípate con lo mejor. Hasta 60% de descuento en la colección urbana. Solo por 24 horas.
               </p>
               
               {/* CONTADOR DE 24 HORAS COMPLETO */}
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

      {/* 5. CATEGORÍAS CIRCULARES (SOLUCIONADO: URLS FIJAS) */}
      <section className="py-24 bg-gray-100 dark:bg-[#0a0a0a]">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-black uppercase mb-16 dark:text-white">Explora tu estilo</h2>
            <div className="flex flex-wrap justify-center gap-10">
               {CATEGORIES.map((cat, i) => (
                 <Link href="/productos" key={i} className="group flex flex-col items-center gap-4">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-2 bg-white shadow-xl dark:bg-[#1a1a1a] dark:shadow-none dark:border-2 dark:border-gray-800 group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                         {/* object-cover para rellenar, bg-gray-200 por si tarda en cargar */}
                         <img src={cat.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={cat.name} />
                      </div>
                    </div>
                    <span className="font-bold uppercase tracking-widest text-sm text-gray-800 dark:text-white group-hover:text-red-600 transition-colors">{cat.name}</span>
                 </Link>
               ))}
            </div>
         </div>
      </section>

      {/* 6. MODAL Y FLOTANTES */}
      <ProductTargetModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={(p) => { addToCart(p); setSelectedProduct(null); }} 
      />
      
    </div>
  )
}