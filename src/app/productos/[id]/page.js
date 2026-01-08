'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '../../../context/CartContext'
import Link from 'next/link'
import {
   Star, ShoppingBag, Heart, Truck, ShieldCheck,
   ChevronDown, ChevronUp, ArrowLeft, ZoomIn,
   X, Check, ChevronLeft, ChevronRight, Plus, ArrowRight
} from 'lucide-react'

// --- 1. BASE DE DATOS UNIFICADA ---
const ALL_PRODUCTS = [
   // SERIE 100
   { id: 101, nombre: "Cyber Jacket Pro", categoria: "Chaquetas", precio: 280000, precio_ant: 350000, descripcion: "Diseñada para el entorno urbano hostil. Tejido impermeable de alta densidad.", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200", imgs: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200"], rating: 4.8, reviews: 85, sizes: ['S', 'M', 'L', 'XL'] },
   { id: 102, nombre: "Sneakers Carbon", categoria: "Calzado", precio: 190000, precio_ant: 240000, descripcion: "Suela de fibra de carbono para retorno de energía.", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200", imgs: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200"], rating: 5, reviews: 120, sizes: ['38', '40', '42', '44'] },
   { id: 103, nombre: "Hoodie Oversized", categoria: "Hoodies", precio: 120000, precio_ant: 180000, descripcion: "Hoodie de algodón pesado con caída estructural.", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200", imgs: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200"], rating: 4.9, reviews: 45, sizes: ['S', 'M', 'L', 'XL'] },
   { id: 104, nombre: "Smart Glasses V2", categoria: "Accesorios", precio: 350000, precio_ant: 450000, descripcion: "Gafas inteligentes con filtro UV y conectividad Bluetooth.", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200", imgs: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200"], rating: 4.7, reviews: 32, sizes: ['Unica'] },
   { id: 105, nombre: "Tactical Cargo Pants", categoria: "Pantalones", precio: 150000, precio_ant: 190000, descripcion: "Pantalón cargo con múltiples bolsillos funcionales y ajuste en tobillos.", img: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=1200", imgs: ["https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=1200"], rating: 4.6, reviews: 28, sizes: ['30', '32', '34'] },
   // SERIE 200
   { id: 201, nombre: "Phantom Bomber Jacket", categoria: "Hombre", precio: 350000, precio_ant: 420000, descripcion: "Bomber clásica reinventada con materiales técnicos.", img: "https://images.unsplash.com/photo-1602525582399-7ef5f604ff7e?w=500&auto=format&fit=crop&q=60", imgs: ["https://images.unsplash.com/photo-1602525582399-7ef5f604ff7e?w=500&auto=format&fit=crop&q=60"], rating: 4.9, reviews: 32, sizes: ['M', 'L', 'XL'] },
   { id: 202, nombre: "Oversized Graphic Tee", categoria: "Mujer", precio: 95000, precio_ant: null, descripcion: "Algodón peruano de alto gramaje.", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200", imgs: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200"], rating: 4.7, reviews: 18, sizes: ['S', 'M', 'L'] },
   { id: 204, nombre: "Run Star Hike", categoria: "Zapatos", precio: 420000, precio_ant: null, descripcion: "Plataforma voluminosa y suela dentada.", img: "https://images.unsplash.com/photo-1621315271772-28b1f3a5df87?auto=format&fit=crop&q=80&w=387", imgs: ["https://images.unsplash.com/photo-1621315271772-28b1f3a5df87?auto=format&fit=crop&q=80&w=387"], rating: 5.0, reviews: 89, sizes: ['36', '38', '40'] },
   { id: 205, nombre: "Urban Crossbody Bag", categoria: "Accesorios", precio: 120000, precio_ant: 150000, descripcion: "Bolso cruzado compacto e impermeable.", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200", imgs: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200"], rating: 4.8, reviews: 12, sizes: ['Unica'] },
]

// --- COMPONENTE ACORDEÓN ---
const ProductAccordion = ({ title, children }) => {
   const [isOpen, setIsOpen] = useState(false)
   return (
      <div className="border-t border-gray-200 dark:border-gray-800">
         <button onClick={() => setIsOpen(!isOpen)} className="w-full py-4 flex justify-between items-center text-left group">
            <span className="text-sm font-bold uppercase tracking-widest group-hover:text-red-600 transition-colors dark:text-white">{title}</span>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
         </button>
         <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{children}</div>
         </div>
      </div>
   )
}

// --- MODAL UPSELL (Recomendaciones) ---
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
                     className={`w-full text-white dark:text-black text-[9px] font-black uppercase py-2 rounded-lg flex items-center justify-center gap-1 transition-all duration-300 ${
                       isAdded 
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

export default function ProductDetailPage() {
   const params = useParams()
   const { addToCart } = useCart()
   const imageContainerRef = useRef(null) // Referencia para el contenedor de la imagen

   // Estado de carga y producto
   const [product, setProduct] = useState(null)
   const [loading, setLoading] = useState(true)

   // Estados de interacción
   const [selectedSize, setSelectedSize] = useState('U')
   const [quantity, setQuantity] = useState(1)
   const [activeImg, setActiveImg] = useState('')
   const [zoomStyle, setZoomStyle] = useState({ opacity: 0, transform: 'scale(1)' })
   const [showSuccess, setShowSuccess] = useState(false)

   // Efecto: Buscar producto por ID
   useEffect(() => {
      if (params?.id) {
         const found = ALL_PRODUCTS.find(p => p.id === parseInt(params.id))
         if (found) {
            setProduct(found)
            setActiveImg(found.img)
            if (found.sizes) setSelectedSize(found.sizes[0])
         }
         setLoading(false)
      }
   }, [params])

   // --- LÓGICA DE ZOOM (MOUSE Y TÁCTIL) ---

   // Función auxiliar para calcular la posición del zoom
   const calculateZoom = (clientX, clientY, currentTarget) => {
      const { left, top, width, height } = currentTarget.getBoundingClientRect()
      const x = ((clientX - left) / width) * 100
      const y = ((clientY - top) / height) * 100
      // Aseguramos que los valores estén entre 0% y 100%
      const clampedX = Math.max(0, Math.min(100, x))
      const clampedY = Math.max(0, Math.min(100, y))
      return { x: clampedX, y: clampedY }
   }

   // Manejador para Mouse (PC)
   const handleMouseMove = (e) => {
      const { x, y } = calculateZoom(e.pageX, e.pageY, e.currentTarget)
      setZoomStyle({
         opacity: 1,
         transformOrigin: `${x}% ${y}%`,
         transform: 'scale(2)'
      })
   }

   // Manejadores para Táctil (Móvil)
   const handleTouchMove = (e) => {
      // Previene el scroll de la página mientras se hace zoom
      if (e.cancelable) e.preventDefault(); 
      
      const touch = e.touches[0]
      const { x, y } = calculateZoom(touch.clientX, touch.clientY, e.currentTarget)
      
      setZoomStyle({
         opacity: 1,
         transformOrigin: `${x}% ${y}%`,
         transform: 'scale(2.5)', // Un poco más de zoom en móvil
         pointerEvents: 'none' // Importante para que el toque no se "pegue"
      })
   }

   const handleResetZoom = () => {
      setZoomStyle({ opacity: 0, transform: 'scale(1)', pointerEvents: 'auto' })
   }

   // --- MANEJO DE ESTADOS DE CARGA Y ERROR ---
   if (loading) return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-white dark:bg-[#0a0a0a]">
         <div className="text-black dark:text-white font-bold animate-pulse">CARGANDO PRODUCTO...</div>
      </div>
   )

   if (!product) return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-4 bg-white dark:bg-[#0a0a0a]">
         <h2 className="text-2xl font-black text-black dark:text-white uppercase">Producto no encontrado</h2>
         <p className="text-gray-500">El artículo que buscas no existe o fue retirado.</p>
         <Link href="/productos" className="bg-black text-white px-6 py-3 rounded-xl font-bold uppercase text-xs hover:bg-red-600 transition-colors">
            Volver a la tienda
         </Link>
      </div>
   )

   return (
      // CORRECCIÓN CLAVE PC: Aumentado el padding superior en MD (md:pt-32) para bajar el contenido
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500 pt-28 md:pt-32 pb-24">

         {/* Breadcrumb */}
         <div className="container mx-auto px-6 mb-8 flex items-center justify-between">
            <Link href="/productos" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors">
               <ArrowLeft size={16} /> Volver a Colección
            </Link>
            <span className="text-[10px] uppercase font-black text-red-600 tracking-[0.2em]">{product.categoria} / {product.nombre}</span>
         </div>

         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

               {/* --- COLUMNA IZQUIERDA: GALERÍA + ZOOM --- */}
               <div className="lg:col-span-7">
                  <div className="grid gap-4">
                     {/* IMAGEN PRINCIPAL CON ZOOM TÁCTIL Y MOUSE */}
                     <div
                        ref={imageContainerRef}
                        className="relative w-full aspect-[4/5] bg-gray-100 dark:bg-[#151515] rounded-xl overflow-hidden cursor-crosshair group touch-none" // touch-none previene scroll nativo
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleResetZoom}
                        onTouchStart={handleTouchMove} // Inicia zoom al tocar
                        onTouchMove={handleTouchMove}  // Mueve el zoom al arrastrar
                        onTouchEnd={handleResetZoom}   // Resetea al soltar
                        onTouchCancel={handleResetZoom} // Resetea si se cancela el toque
                     >
                        <img
                           src={activeImg}
                           className="absolute inset-0 w-full h-full object-cover transition-transform duration-100 ease-linear will-change-transform"
                           style={zoomStyle.opacity === 1 ? zoomStyle : {}}
                           alt={product.nombre}
                        />
                        {/* Lupa siempre visible en móvil (opacity-100) */}
                        <div className={`absolute bottom-6 right-6 bg-white/90 dark:bg-black/80 p-3 rounded-full pointer-events-none transition-opacity duration-300 ${zoomStyle.opacity === 1 ? 'opacity-0' : 'opacity-100'}`}>
                           <ZoomIn size={20} />
                        </div>
                     </div>

                     {/* Miniaturas */}
                     {product.imgs && product.imgs.length > 0 && (
                        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                           {[product.img, ...product.imgs].filter((v, i, a) => a.indexOf(v) === i).map((imgUrl, idx) => (
                              <button
                                 key={idx}
                                 onClick={() => setActiveImg(imgUrl)}
                                 className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === imgUrl ? 'border-black dark:border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                              >
                                 <img src={imgUrl} className="w-full h-full object-cover" alt="thumbnail" />
                              </button>
                           ))}
                        </div>
                     )}
                  </div>
               </div>

               {/* --- COLUMNA DERECHA: INFO --- */}
               <div className="lg:col-span-5 sticky top-32 h-fit">
                  <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
                     <div className="flex justify-between items-start mb-4">
                        <h1 className="text-4xl md:text-5xl font-black uppercase italic leading-none">{product.nombre}</h1>
                        <button className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                           <Heart size={24} />
                        </button>
                     </div>

                     <div className="flex items-center gap-4 mb-6">
                        <div className="flex text-yellow-500">
                           {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i >= Math.floor(product.rating) ? "text-gray-300" : ""} />)}
                        </div>
                        <span className="text-xs font-bold text-gray-400 border-l border-gray-300 pl-4">{product.reviews} Reseñas</span>
                     </div>

                     <div className="flex items-end gap-4">
                        <span className="text-5xl font-black">${product.precio.toLocaleString()}</span>
                        {product.precio_ant && (
                           <span className="text-xl text-gray-400 line-through decoration-red-500 decoration-2 mb-2">${product.precio_ant ? product.precio_ant.toLocaleString() : ''}</span>
                        )}
                     </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-8 font-medium leading-relaxed">
                     {product.descripcion}
                  </p>

                  {/* Selectores */}
                  <div className="space-y-6 mb-8">
                     {product.sizes && (
                        <div>
                           <div className="flex justify-between mb-2">
                              <span className="text-xs font-black uppercase tracking-widest text-gray-400">Talla</span>
                              <button className="text-[10px] underline font-bold uppercase">Guía</button>
                           </div>
                           <div className="flex flex-wrap gap-3">
                              {product.sizes.map(size => (
                                 <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`h-12 w-12 flex items-center justify-center rounded-xl font-bold border-2 transition-all ${selectedSize === size ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' : 'border-gray-200 dark:border-gray-800 hover:border-gray-400'}`}
                                 >
                                    {size}
                                 </button>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-4 mb-10">
                     <div className="flex items-center border-2 border-gray-200 dark:border-gray-800 rounded-xl px-4">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl font-bold hover:text-red-600 px-2">-</button>
                        <span className="w-8 text-center font-black">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="text-xl font-bold hover:text-red-600 px-2">+</button>
                     </div>
                     <button
                        onClick={() => {
                           addToCart({ ...product, quantity, size: selectedSize });
                           setShowSuccess(true);
                        }}
                        className="flex-1 bg-red-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 active:scale-95"
                     >
                        <ShoppingBag size={20} /> Añadir
                     </button>
                  </div>

                  {/* Acordeones */}
                  <div className="space-y-0">
                     <ProductAccordion title="Detalles">
                        <p>Composición: 100% Algodón Orgánico.<br />Ref: {product.id}-2025.</p>
                     </ProductAccordion>
                     <ProductAccordion title="Envío">
                        <div className="flex items-center gap-3 mb-2">
                           <Truck size={18} /> <span>Envío Express (24-48h)</span>
                        </div>
                        <p>Gratis por compras superiores a $200.000 COP.</p>
                     </ProductAccordion>
                     <ProductAccordion title="Garantía">
                        <div className="flex items-center gap-3 mb-2">
                           <ShieldCheck size={18} /> <span>Garantía de 30 días</span>
                        </div>
                        <p>Cambios gratis si no te queda.</p>
                     </ProductAccordion>
                  </div>
               </div>
            </div>

            {/* RECOMENDADOS */}
            <div className="mt-32 border-t border-gray-100 dark:border-gray-800 pt-16">
               <h2 className="text-2xl font-black uppercase mb-8 dark:text-white">También te puede gustar</h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {ALL_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map(p => (
                     <Link href={`/productos/${p.id}`} key={p.id} className="group">
                        <div className="aspect-[3/4] bg-gray-100 dark:bg-[#151515] rounded-xl overflow-hidden mb-4 relative">
                           <img src={p.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.nombre}/>
                        </div>
                        <h3 className="font-bold text-sm uppercase group-hover:text-red-600 transition-colors dark:text-white">{p.nombre}</h3>
                        <p className="text-gray-500 text-xs">${p.precio.toLocaleString()}</p>
                     </Link>
                  ))}
               </div>
            </div>

         </div>

         {/* MODAL DE ÉXITO */}
         <UpsellModal 
            isOpen={showSuccess} 
            onClose={() => setShowSuccess(false)} 
            allProducts={ALL_PRODUCTS} 
            onAddRecommendation={(p) => addToCart(p)} 
         />

      </div>
   )
}