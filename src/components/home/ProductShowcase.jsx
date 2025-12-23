'use client'
import Link from 'next/link'
import FadeIn from '../ui/FadeIn' // Ruta relativa corregida
import { useCart } from '../../context/CartContext' // Ruta relativa corregida

export function ProductGrid({ products }) {
  const { addToCart } = useCart()

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="flex justify-between items-end mb-16">
            <div>
              <h3 className="text-4xl font-light tracking-tighter uppercase mb-2">Favoritos</h3>
              <div className="h-1 w-20 bg-black"></div>
            </div>
            <Link href="/productos" className="text-xs font-bold uppercase tracking-widest border-b border-gray-300 hover:border-black transition-colors pb-1">
              Ver Todo
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.slice(0, 4).map((product, index) => (
            <FadeIn key={product.id} delay={index * 100}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-6">
                  <img 
                    src={product.imagen} 
                    alt={product.nombre} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Botón Overlay */}
                  <button 
                    onClick={(e) => { e.preventDefault(); addToCart(product); }}
                    className="absolute bottom-0 left-0 w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-black hover:bg-black hover:text-white"
                  >
                    Añadir al Carrito
                  </button>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.categoria}</p>
                  <h4 className="text-sm font-bold uppercase tracking-wide mb-1">{product.nombre}</h4>
                  <span className="text-sm font-medium">${product.precio.toLocaleString()}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TrendingCarousel({ products }) {
  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <FadeIn>
          <h3 className="text-3xl font-light uppercase tracking-tighter mb-2">Tendencias</h3>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Lo que todos están usando</p>
        </FadeIn>
      </div>
      
      {/* Scroll Snap Carousel Horizontal */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-12 scrollbar-hide">
        {/* Concatenamos los productos para dar sensación de "infinito" si son pocos */}
        {products.concat(products).map((product, index) => (
          <div key={`${product.id}-${index}`} className="snap-center shrink-0 w-[280px] md:w-[350px] group cursor-pointer">
             <div className="relative aspect-[3/4] bg-white overflow-hidden mb-4 shadow-sm hover:shadow-xl transition-shadow duration-500">
               <img src={product.imagen} alt={product.nombre} className="w-full h-full object-cover" />
               <div className="absolute top-4 right-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Hot</div>
             </div>
             <h4 className="text-xs font-bold uppercase tracking-wide text-center">{product.nombre}</h4>
             <p className="text-xs text-gray-500 text-center mt-1">${product.precio.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  )
}