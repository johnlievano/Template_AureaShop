'use client'
import Link from 'next/link'
import { Instagram, Facebook, Twitter, ArrowUpRight, Send, CreditCard } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#050505] text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-900 transition-colors duration-500 pt-20 pb-10">
      
      {/* 1. SECCIÓN NEWSLETTER (Conversión) */}
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <div className="bg-gray-50 dark:bg-[#111] rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
           {/* Decoración de fondo */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

           <div className="w-full lg:w-1/2 relative z-10">
              <h3 className="text-4xl md:text-5xl font-black uppercase leading-none mb-4">
                Join the <span className="text-red-600">Club.</span>
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium max-w-md">
                Suscríbete para recibir acceso anticipado a drops exclusivos, descuentos secretos y novedades.
              </p>
           </div>

           <div className="w-full lg:w-1/2 relative z-10">
              <form className="flex flex-col sm:flex-row gap-4">
                 <input 
                   type="email" 
                   placeholder="TU CORREO ELECTRÓNICO" 
                   className="w-full bg-white dark:bg-black border-2 border-transparent focus:border-black dark:focus:border-white rounded-xl px-6 py-4 font-bold outline-none text-sm transition-all dark:text-white placeholder-gray-400"
                 />
                 <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all whitespace-nowrap flex items-center justify-center gap-2">
                    Suscribirse <Send size={16} />
                 </button>
              </form>
              <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-wide">
                Al suscribirte aceptas nuestra política de privacidad. Sin spam.
              </p>
           </div>
        </div>
      </div>

      {/* 2. ENLACES PRINCIPALES */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 mb-20">
          
          {/* Columna Marca (Grande) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-6">
            <Link href="/" className="block">
              <h2 className="text-3xl font-black uppercase tracking-tighter">ÁUREA</h2>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium max-w-xs">
              Redefiniendo el streetwear de lujo con diseño de autor y manufactura consciente. Bogotá, Colombia para el mundo.
            </p>
            <div className="flex gap-4">
               {[Instagram, Facebook, Twitter].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#111] flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                    <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          {/* Columna Explorar */}
          <div className="col-span-1 lg:col-span-2 lg:col-start-6">
             <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-gray-400">Explorar</h4>
             <ul className="space-y-4">
                {['Hombre', 'Mujer', 'Accesorios', 'New Arrivals', 'Sale'].map(link => (
                   <li key={link}>
                      <Link href="/productos" className="text-sm font-bold uppercase hover:text-red-600 transition-colors dark:text-gray-300 dark:hover:text-white">{link}</Link>
                   </li>
                ))}
             </ul>
          </div>

          {/* Columna Ayuda */}
          <div className="col-span-1 lg:col-span-2">
             <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-gray-400">Ayuda</h4>
             <ul className="space-y-4">
                {['Envíos', 'Cambios y Devoluciones', 'Guía de Tallas', 'FAQs', 'Contacto'].map(link => (
                   <li key={link}>
                      <Link href="/contacto" className="text-sm font-bold uppercase hover:text-red-600 transition-colors dark:text-gray-300 dark:hover:text-white">{link}</Link>
                   </li>
                ))}
             </ul>
          </div>

          {/* Columna Legal */}
          <div className="col-span-1 lg:col-span-2">
             <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-gray-400">Legal</h4>
             <ul className="space-y-4">
                {['Términos y Condiciones', 'Política de Privacidad', 'Tratamiento de Datos'].map(link => (
                   <li key={link}>
                      <Link href="#" className="text-sm font-bold uppercase hover:text-red-600 transition-colors dark:text-gray-300 dark:hover:text-white">{link}</Link>
                   </li>
                ))}
             </ul>
          </div>
        </div>

        {/* 3. BARRA INFERIOR (Créditos y Pagos) */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
           
           <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span>© 2025 Áurea Shop</span>
              <span className="hidden md:inline">•</span>
              <span>All Rights Reserved</span>
           </div>

           {/* Métodos de Pago (Simulados visualmente) */}
           <div className="flex items-center gap-3 opacity-70 grayscale hover:grayscale-0 transition-all">
              {['VISA', 'MC', 'AMEX', 'PSE'].map(card => (
                 <div key={card} className="bg-gray-100 dark:bg-[#1a1a1a] px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                    <span className="text-[9px] font-black">{card}</span>
                 </div>
              ))}
           </div>

           {/* Crédito Desarrollador */}
           <a 
             href="https://aurea-web.com" 
             target="_blank" 
             className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-red-600 transition-colors"
           >
             Built by Áurea Web
             <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
           </a>

        </div>
      </div>
    </footer>
  )
}