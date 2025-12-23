import Link from 'next/link'
// CAMBIO: Usamos ruta relativa (subir una carpeta y entrar a ui)
import FadeIn from '../ui/FadeIn'
import { Icons } from '../ui/Icons'

export default function Hero() {
  return (
    <section className="relative py-20 px-6 min-h-[85vh] flex items-center bg-[#f4f4f4]">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 space-y-8 pl-4 lg:pl-0">
          <FadeIn>
            <p className="text-xs font-bold tracking-[0.4em] text-gray-500 uppercase mb-4">Nueva Temporada 2025</p>
            <h1 className="text-5xl md:text-8xl font-light leading-[0.9] tracking-tight text-black mb-6">
              DISEÑO <br/> <span className="font-bold">PURO</span>
            </h1>
            <p className="text-gray-600 max-w-md text-sm leading-relaxed border-l-2 border-black pl-6 mb-8">
              Elegancia minimalista. Materiales sostenibles. Diseñado en Colombia para quienes valoran la autenticidad.
            </p>
            <Link href="/productos" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-all hover:gap-4">
              Explorar <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
        <div className="order-1 lg:order-2 relative h-[500px] lg:h-[700px] w-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Fashion"
            className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>
      </div>
    </section>
  )
}