'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import { 
  Mail, Phone, MapPin, Send, Check, ArrowRight, 
  MessageSquare, Clock, HelpCircle, ChevronDown, ChevronUp 
} from 'lucide-react'

// --- DATOS FAQ ---
const FAQS = [
  { q: "¿Cuánto tarda el envío?", a: "Para ciudades principales: 24-48 horas hábiles. Resto del país: 3-5 días hábiles. Todos los envíos son Express." },
  { q: "¿Tienen tienda física?", a: "Sí, nuestro Flagship Store está ubicado en la Zona Rosa de Bogotá (Calle 81 # 11-08). Te esperamos." },
  { q: "¿Cómo funcionan las devoluciones?", a: "Tienes 30 días de garantía total. Si no te queda o no te gusta, lo cambiamos sin costo adicional." },
]

// --- COMPONENTES ---

// Accordion FAQ (Estilizado)
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className="text-lg font-bold text-gray-800 dark:text-gray-200 group-hover:text-red-600 transition-colors">{question}</span>
        {isOpen ? <ChevronUp className="text-red-600" /> : <ChevronDown className="text-gray-400" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mb-6' : 'max-h-0'}`}>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{answer}</p>
      </div>
    </div>
  )
}

export default function Contacto() {
  const router = useRouter()
  const { user } = useAuth()
  
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  const [formData, setFormData] = useState({ 
    nombre: '', 
    email: '', 
    asunto: '', 
    mensaje: '' 
  })

  // Pre-llenar datos si el usuario está logueado
  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, nombre: user.nombre || '', email: user.email || '' }))
    }
  }, [user])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simular envío
    setTimeout(() => {
      setLoading(false)
      setShowSuccessModal(true)
      setTimeout(() => {
        setShowSuccessModal(false)
        router.push('/')
      }, 4000)
    }, 1500)
  }

  return (
    // Quitamos el div wrapper con lógica local. El tema lo maneja el layout global.
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-500 pt-24">
      
      {/* --- MODAL ÉXITO --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#111] p-8 md:p-12 max-w-md rounded-3xl text-center shadow-2xl border border-gray-200 dark:border-gray-800 animate-slide-up">
            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
              <Check size={40} strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-black uppercase mb-4 dark:text-white">¡Mensaje Enviado!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">
              Gracias <span className="text-black dark:text-white font-bold">{formData.nombre}</span>. Nuestro equipo de soporte te responderá en menos de 2 horas.
            </p>
            <button onClick={() => setShowSuccessModal(false)} className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform">
              Volver al inicio
            </button>
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="bg-black dark:bg-[#111] text-white py-20 px-6 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
         <div className="container mx-auto relative z-10 text-center">
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-sm mb-6 animate-pulse">
              Soporte 24/7
            </span>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6">
              Hablemos <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Claro</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium">
              ¿Dudas con tu talla? ¿Problemas con un envío? Estamos listos para ayudarte.
            </p>
         </div>
      </section>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="container mx-auto px-6 md:px-12 -mt-10 relative z-20 pb-24">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* IZQUIERDA: TARJETAS DE CONTACTO & INFO */}
          <div className="w-full lg:w-5/12 space-y-8">
            
            {/* Card Principal: WhatsApp (Llamativo) */}
            <div className="bg-[#25D366] text-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform cursor-pointer group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
                  <MessageSquare size={100} />
               </div>
               <h3 className="text-2xl font-black uppercase mb-2 relative z-10">Chat en Vivo</h3>
               <p className="font-medium opacity-90 mb-6 relative z-10">Respuesta inmediata por WhatsApp.</p>
               <button className="bg-white text-[#128C7E] px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-colors relative z-10 shadow-lg">
                 Iniciar Chat
               </button>
            </div>

            {/* Grid de Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-white dark:bg-[#111] p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 hover:border-red-600 dark:hover:border-red-600 transition-colors group">
                  <Mail size={32} className="text-gray-400 group-hover:text-red-600 mb-4 transition-colors" />
                  <h4 className="font-bold uppercase text-sm mb-1 dark:text-white">Email</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">ayuda@aureashop.com</p>
               </div>
               <div className="bg-white dark:bg-[#111] p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 hover:border-red-600 dark:hover:border-red-600 transition-colors group">
                  <MapPin size={32} className="text-gray-400 group-hover:text-red-600 mb-4 transition-colors" />
                  <h4 className="font-bold uppercase text-sm mb-1 dark:text-white">Showroom</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Calle 81 #11-08, Bogotá</p>
               </div>
            </div>

            {/* FAQ Section (Accordion) */}
            <div className="bg-white dark:bg-[#111] p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800">
               <div className="flex items-center gap-2 mb-6 text-gray-400">
                  <HelpCircle size={20} />
                  <span className="text-xs font-black uppercase tracking-widest">Preguntas Frecuentes</span>
               </div>
               {FAQS.map((faq, i) => (
                  <FaqItem key={i} question={faq.q} answer={faq.a} />
               ))}
            </div>

          </div>

          {/* DERECHA: FORMULARIO HIGH-END */}
          <div className="w-full lg:w-7/12">
             <div className="bg-white dark:bg-[#111] p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 h-full">
                <h2 className="text-3xl font-black uppercase mb-8 dark:text-white">Envíanos un <span className="text-red-600">Ticket</span></h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Tu Nombre</label>
                         <input 
                           type="text" 
                           name="nombre" 
                           required
                           value={formData.nombre}
                           onChange={handleChange}
                           className="w-full bg-gray-50 dark:bg-[#1a1a1a] border-2 border-transparent focus:border-red-600 rounded-xl px-5 py-4 font-bold outline-none transition-all dark:text-white placeholder-gray-300"
                           placeholder="EJ: JUAN PÉREZ"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Tu Email</label>
                         <input 
                           type="email" 
                           name="email" 
                           required
                           value={formData.email}
                           onChange={handleChange}
                           className="w-full bg-gray-50 dark:bg-[#1a1a1a] border-2 border-transparent focus:border-red-600 rounded-xl px-5 py-4 font-bold outline-none transition-all dark:text-white placeholder-gray-300"
                           placeholder="EJ: HOLA@GMAIL.COM"
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Asunto</label>
                      <select
                         name="asunto"
                         value={formData.asunto}
                         onChange={handleChange}
                         className="w-full bg-gray-50 dark:bg-[#1a1a1a] border-2 border-transparent focus:border-red-600 rounded-xl px-5 py-4 font-bold outline-none transition-all dark:text-white cursor-pointer"
                      >
                         <option value="">SELECCIONA UNA OPCIÓN</option>
                         <option value="pedido">ESTADO DE MI PEDIDO</option>
                         <option value="devolucion">CAMBIOS Y GARANTÍAS</option>
                         <option value="collab">PRENSA / COLABORACIONES</option>
                         <option value="otro">OTRO TEMA</option>
                      </select>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Mensaje</label>
                      <textarea 
                         name="mensaje"
                         required
                         rows="5"
                         value={formData.mensaje}
                         onChange={handleChange}
                         className="w-full bg-gray-50 dark:bg-[#1a1a1a] border-2 border-transparent focus:border-red-600 rounded-xl px-5 py-4 font-bold outline-none transition-all dark:text-white resize-none placeholder-gray-300"
                         placeholder="CUÉNTANOS CÓMO PODEMOS AYUDARTE..."
                      ></textarea>
                   </div>

                   <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-xl font-black uppercase tracking-[0.2em] hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 group"
                   >
                      {loading ? 'ENVIANDO...' : (
                         <>ENVIAR MENSAJE <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                   </button>
                </form>
             </div>
          </div>

        </div>
      </div>

      {/* --- MAPA ESTILIZADO (Grayscale + Dark Mode Aware) --- */}
      <div className="w-full h-80 bg-gray-200 dark:bg-[#1a1a1a] relative group overflow-hidden border-t border-gray-200 dark:border-gray-800">
         {/* Placeholder de Mapa */}
         <img 
           src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000" 
           className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
           alt="Mapa"
         />
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white dark:bg-black p-4 rounded-full shadow-2xl animate-bounce">
               <MapPin className="text-red-600" size={32} fill="currentColor" />
            </div>
         </div>
      </div>

    </div>
  )
}