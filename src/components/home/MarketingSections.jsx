import FadeIn from '../ui/FadeIn'
import { Icons } from '../ui/Icons'

export function QualitySection() {
  return (
    <section className="py-0">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-black text-white p-16 lg:p-24 flex flex-col justify-center">
          <FadeIn>
            <p className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-6">Craftsmanship</p>
            <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8">CALIDAD QUE <br/> <span className="font-bold">PERDURA</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">Utilizamos algodón orgánico 100% certificado y tejidos de origen ético confeccionados en Bogotá.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-medium"><span className="w-2 h-2 bg-white rounded-full"></span>Algodón Pima Peruano</li>
              <li className="flex items-center gap-3 text-sm font-medium"><span className="w-2 h-2 bg-white rounded-full"></span>Hilos de alta resistencia</li>
            </ul>
          </FadeIn>
        </div>
        <div className="h-[500px] md:h-auto bg-gray-200">
          <img src="https://images.unsplash.com/photo-1604176354204-9268737828fa?q=80&w=2070&auto=format&fit=crop" alt="Textura" className="w-full h-full object-cover grayscale"/>
        </div>
      </div>
    </section>
  )
}

export function GlobalSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 -skew-x-12 translate-x-1/4 -z-0"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
             <FadeIn>
               <div className="inline-block p-3 bg-black text-white rounded-full mb-6"><Icons.Globe className="w-8 h-8" /></div>
               <h2 className="text-4xl font-light uppercase tracking-tight mb-6">De Colombia <br/><span className="font-bold">Para el Mundo</span></h2>
               <p className="text-gray-600 text-sm leading-relaxed mb-8">Exportamos nuestras colecciones a EE.UU., México y Europa, manteniendo nuestra identidad local.</p>
               <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-8">
                 <div><h4 className="text-3xl font-bold">15+</h4><p className="text-[10px] uppercase tracking-widest text-gray-500">Países</p></div>
                 <div><h4 className="text-3xl font-bold">10k+</h4><p className="text-[10px] uppercase tracking-widest text-gray-500">Clientes</p></div>
               </div>
             </FadeIn>
          </div>
          <div className="md:w-1/2 relative">
             <FadeIn delay={200}>
               <img src="https://images.unsplash.com/photo-1528731708534-816fe59f90cb?q=80&w=2070&auto=format&fit=crop" alt="Global" className="w-full h-auto shadow-2xl"/>
             </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TeamSection() {
    const team = [
        { name: "Ana María", role: "Directora Creativa", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" },
        { name: "Carlos Ruiz", role: "Jefe de Producción", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" },
        { name: "Sofía Vergara", role: "Marketing Global", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop" }
    ]
    return (
        <section className="py-24 bg-stone-100">
            <div className="container mx-auto px-6 text-center">
                <FadeIn><h3 className="text-3xl font-light uppercase tracking-tighter mb-12">Mentes Creativas</h3></FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {team.map((member, i) => (
                        <FadeIn key={i} delay={i * 150}>
                            <div className="flex flex-col items-center group">
                                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg relative">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <h4 className="text-lg font-bold uppercase tracking-wide">{member.name}</h4>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">{member.role}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function TestimonialsSection() {
    return (
        <section className="py-20 bg-black text-white">
            <div className="container mx-auto px-6 text-center">
                <div className="flex flex-col items-center">
                    <div className="flex text-yellow-500 mb-6 gap-1">{[1,2,3,4,5].map(s => <Icons.Star key={s} className="w-6 h-6" />)}</div>
                    <p className="text-xl md:text-3xl font-light italic max-w-2xl leading-relaxed mb-8">"La calidad de las telas es impresionante. Es ropa que no solo se ve bien, sino que se siente increíble."</p>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">— Valentina M., Cliente Verificada</p>
                </div>
                <div className="mt-16 pt-16 border-t border-gray-800 flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale">
                    {['VOGUE', 'ELLE', 'BAZAAR', 'GQ'].map(brand => <span key={brand} className="text-2xl font-serif font-bold tracking-widest">{brand}</span>)}
                </div>
            </div>
        </section>
    )
}