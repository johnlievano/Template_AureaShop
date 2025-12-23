'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
  Mail, ArrowRight, ArrowLeft, CheckCircle, 
  AlertCircle, Sun, Moon, ShieldCheck 
} from 'lucide-react'

// Componente Toggle Theme (Consistencia Visual)
const ThemeToggle = ({ darkMode, toggle }) => (
  <button 
    onClick={toggle}
    className="fixed top-8 right-8 z-50 bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-3 rounded-full hover:scale-110 transition-transform"
  >
    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
  </button>
)

export default function RecoverPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [darkMode, setDarkMode] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulación de envío de correo
    setTimeout(() => {
        if (!email.includes('@') || !email.includes('.')) {
            setError('Ingresa un email válido.')
            setLoading(false)
            return
        }
        setSuccess(true)
        setLoading(false)
    }, 1500)
  }

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500 font-sans">
        
        <ThemeToggle darkMode={darkMode} toggle={() => setDarkMode(!darkMode)} />

        {/* --- LADO IZQUIERDO: VISUAL (SECURITY THEME) --- */}
        <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-black">
           {/* Imagen Estilo Tech/Minimalista */}
           <img 
             src="https://images.pexels.com/photos/2608495/pexels-photo-2608495.jpeg?auto=compress&cs=tinysrgb&w=1200" 
             className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
             alt="Security Background"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-90"></div>
           
           <div className="relative z-10 w-full flex flex-col justify-center p-20">
              <div className="animate-slide-up border-l-4 border-red-600 pl-8">
                 <ShieldCheck size={48} className="text-white mb-6" />
                 <h2 className="text-5xl font-black uppercase text-white leading-none mb-6">
                   Secure <br/> Recovery.
                 </h2>
                 <p className="text-gray-400 text-lg max-w-md font-medium">
                   Sistema de recuperación encriptado. Te enviaremos un enlace temporal de un solo uso para restablecer tu acceso.
                 </p>
              </div>
           </div>
        </div>

        {/* --- LADO DERECHO: FORMULARIO --- */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative">
           
           <div className="w-full max-w-md animate-fade-in">
              
              {/* Header Navegación */}
              <div className="mb-10">
                 <Link href="/login" className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8">
                   <ArrowLeft size={14} /> Volver al Login
                 </Link>
                 
                 {!success ? (
                    <>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 dark:text-white">
                        Recuperar <span className="text-red-600">Cuenta</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Ingresa el email asociado a tu cuenta.
                        </p>
                    </>
                 ) : (
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-500 mb-6 animate-bounce">
                            <CheckCircle size={40} />
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tight mb-4 dark:text-white">
                            Correo Enviado
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">
                            Hemos enviado las instrucciones de recuperación a <span className="text-black dark:text-white font-bold">{email}</span>. Revisa tu bandeja de entrada o spam.
                        </p>
                        <Link href="/login" className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-2">
                            Volver a Iniciar Sesión
                        </Link>
                    </div>
                 )}
              </div>

              {/* Formulario (Solo visible si no hay éxito) */}
              {!success && (
                  <>
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wide animate-shake">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="group space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Email Registrado</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-gray-50 dark:bg-[#151515] border-2 border-transparent focus:border-black dark:focus:border-white rounded-xl py-4 pl-12 pr-4 outline-none font-bold text-sm transition-all dark:text-white placeholder-gray-300 dark:placeholder-gray-700"
                                placeholder="TU@EMAIL.COM"
                            />
                        </div>
                        </div>

                        <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                        {loading ? 'Enviando...' : (
                            <>Enviar Instrucciones <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                        )}
                        </button>
                    </form>
                  </>
              )}

              {/* Footer Ayuda */}
              {!success && (
                  <div className="text-center mt-12">
                     <p className="text-gray-400 text-xs">
                        ¿Necesitas ayuda adicional? <Link href="/contacto" className="underline hover:text-black dark:hover:text-white">Contáctanos</Link>
                     </p>
                  </div>
              )}

           </div>
        </div>
      </div>
    </div>
  )
}