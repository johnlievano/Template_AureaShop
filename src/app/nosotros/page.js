'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { 
  Users, Globe, Star, TrendingUp, ArrowRight, 
  Target, ShieldCheck, Zap, PenTool 
} from 'lucide-react'

// --- DATOS MOCK ---
const STATS = [
  { number: "15K+", label: "Clientes Felices", icon: Users },
  { number: "4.9", label: "Rating Promedio", icon: Star },
  { number: "24h", label: "Tiempo de Despacho", icon: Zap },
  { number: "05", label: "Países Alcanzados", icon: Globe },
]

const TEAM = [
  { name: "ALEX M.", role: "CEO & FOUNDER", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600", quote: "No vendemos ropa, vendemos actitud." },
  { name: "SARAH J.", role: "HEAD OF DESIGN", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600", quote: "El detalle lo es todo. La perfección no es negociable." },
  { name: "DAVID R.", role: "BRAND MANAGER", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600", quote: "Conectando la cultura urbana con el lujo accesible." },
]

const VALUES = [
  { title: "CALIDAD SUPREMA", desc: "Telas premium seleccionadas a mano. Si no dura, no es Áurea.", icon: ShieldCheck },
  { title: "DISEÑO DE AUTOR", desc: "Piezas limitadas. No seguimos tendencias, las creamos.", icon: PenTool },
  { title: "VISIÓN GLOBAL", desc: "Inspiración internacional con manufactura local de excelencia.", icon: Globe },
  { title: "OBJETIVO CLARO", desc: "Redefinir el streetwear de lujo en Latinoamérica.", icon: Target },
]

// --- COMPONENTE: SCROLL REVEAL ---
const ScrollReveal = ({ children, delay = 0 }) => {
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
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      {children}
    </div>
  )
}

export default function Nosotros() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white min-h-screen font-sans transition-colors duration-500">
      
      {/* --- 1. HERO IMPONENTE --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Fondo de Video/Imagen con Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2000" 
            className="w-full h-full object-cover grayscale opacity-40 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#0a0a0a] dark:via-transparent dark:to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1 border border-black dark:border-white rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6">
              Est. 2020
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
              We Are <br/> <span className="text-red-600">Áurea</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Más que una marca, un movimiento. Fusionamos la rebeldía urbana con la sofisticación del diseño de alta gama.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* --- 2. BARRA DE ESTADÍSTICAS (Confianza) --- */}
      <section className="bg-black dark:bg-white text-white dark:text-black py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="text-center border-r border-white/20 dark:border-black/20 last:border-0">
                  <stat.icon className="mx-auto mb-4 opacity-50" size={32} />
                  <h3 className="text-4xl md:text-5xl font-black mb-2">{stat.number}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. MANIFIESTO (Imagen + Texto) --- */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            
            {/* Imagen Estilo Editorial */}
            <div className="w-full md:w-1/2 relative">
              <ScrollReveal>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                   <img 
                     src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000" 
                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                   />
                   {/* Elemento Flotante */}
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600 rounded-full blur-[60px] opacity-50 pointer-events-none"></div>
                </div>
              </ScrollReveal>
            </div>

            {/* Texto Poderoso */}
            <div className="w-full md:w-1/2">
               <ScrollReveal delay={200}>
                 <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-8">
                   No seguimos <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">reglas.</span>
                 </h2>
                 <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 font-medium">
                   <p>
                     Nacimos en un garaje con una idea simple: la ropa debe empoderarte. 
                     No se trata solo de cubrir el cuerpo, sino de expresar quién eres sin decir una palabra.
                   </p>
                   <p>
                     Cada costura, cada botón y cada textura en Áurea está pensada para resistir el ritmo de la ciudad. 
                     Diseñamos para los líderes, los creadores y los que no tienen miedo a destacar.
                   </p>
                 </div>
                 
                 <div className="mt-10 flex gap-6">
                   <div className="flex flex-col gap-1">
                     <span className="text-4xl font-black">100%</span>
                     <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Diseño Original</span>
                   </div>
                   <div className="w-px bg-gray-200 dark:bg-gray-800"></div>
                   <div className="flex flex-col gap-1">
                     <span className="text-4xl font-black">0%</span>
                     <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Fast Fashion</span>
                   </div>
                 </div>
               </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* --- 4. VALORES (Grid Bento) --- */}
      <section className="py-24 bg-gray-50 dark:bg-[#111]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Nuestro ADN</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-white dark:bg-black p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full border border-gray-100 dark:border-gray-800 group">
                   <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                     <val.icon size={28} />
                   </div>
                   <h3 className="text-xl font-black uppercase mb-3">{val.title}</h3>
                   <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                     {val.desc}
                   </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. EQUIPO (The Squad) --- */}
      <section className="py-24">
        <div className="container mx-auto px-6">
           <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-none">The <br/> Squad</h2>
              <Link href="/contacto" className="hidden md:flex items-center gap-2 font-bold uppercase tracking-widest border-b-2 border-red-600 pb-1 hover:text-red-600 transition-colors">
                 Únete al equipo <ArrowRight size={16} />
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEAM.map((member, i) => (
                 <ScrollReveal key={i} delay={i * 150}>
                   <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
                      <div className="aspect-[3/4] overflow-hidden bg-gray-200">
                         <img src={member.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                      </div>
                      
                      {/* Overlay Info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity flex flex-col justify-end p-8 text-white">
                         <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-1">{member.role}</span>
                         <h3 className="text-3xl font-black uppercase mb-4">{member.name}</h3>
                         <p className="text-sm text-gray-300 italic opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                           "{member.quote}"
                         </p>
                      </div>
                   </div>
                 </ScrollReveal>
              ))}
           </div>
        </div>
      </section>

      {/* --- 6. CTA FINAL --- */}
      <section className="py-32 bg-red-600 text-white text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-8">¿Listo para subir de nivel?</h2>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90">
              La colección 2025 ya está disponible. Unidades limitadas para mantener la exclusividad.
            </p>
            <Link 
              href="/productos" 
              className="inline-flex items-center gap-4 bg-white text-red-600 px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-2xl transform hover:scale-105"
            >
              Ver Tienda <ArrowRight size={20} />
            </Link>
         </div>
      </section>

    </div>
  )
}