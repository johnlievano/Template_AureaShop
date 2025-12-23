'use client'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { 
  User, Mail, Lock, Phone, ArrowRight, AlertCircle, 
  CheckCircle, Sun, Moon, Star 
} from 'lucide-react'

// Toggle Dark/Light
const ThemeToggle = ({ darkMode, toggle }) => (
  <button 
    onClick={toggle}
    className="fixed top-8 right-8 z-50 bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-3 rounded-full hover:scale-110 transition-transform"
  >
    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
  </button>
)

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [darkMode, setDarkMode] = useState(true) // Default Dark Mode

  const { register } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña es muy corta (mínimo 6 caracteres).')
      return
    }

    setLoading(true)
    
    // Simular pequeña espera para UX
    setTimeout(async () => {
        const result = await register(formData)
        if (result.success) {
            window.location.href = '/'
        } else {
            setError(result.error)
            setLoading(false)
        }
    }, 1000)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500 font-sans">
        
        <ThemeToggle darkMode={darkMode} toggle={() => setDarkMode(!darkMode)} />

        {/* --- LADO IZQUIERDO: IMAGEN & BENEFICIOS --- */}
        <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-black">
           <img 
             src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1500" 
             className="absolute inset-0 w-full h-full object-cover opacity-50"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
           
           <div className="relative z-10 w-full flex flex-col justify-center p-20">
              <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 animate-fade-in">Join the Club</span>
              <h2 className="text-6xl font-black uppercase text-white leading-[0.9] mb-12 animate-slide-up">
                Unlock <br/> The Future.
              </h2>
              
              <div className="space-y-8 max-w-md animate-slide-up" style={{ animationDelay: '100ms' }}>
                 {[
                   { title: "Early Access", desc: "Acceso prioritario a nuevos lanzamientos y restocks." },
                   { title: "Member Only", desc: "Colecciones exclusivas solo visibles para miembros." },
                   { title: "Free Shipping", desc: "Envíos gratuitos en todos tus pedidos sin mínimo." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="bg-white/10 p-3 rounded-xl h-fit">
                         <Star className="text-white" size={20} fill="white" />
                      </div>
                      <div>
                         <h3 className="text-white font-bold uppercase text-lg">{item.title}</h3>
                         <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* --- LADO DERECHO: FORMULARIO --- */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 overflow-y-auto">
           <div className="w-full max-w-md animate-fade-in my-auto">
              
              <div className="mb-8">
                 <Link href="/" className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-6 block">
                   ← Cancelar
                 </Link>
                 <h1 className="text-4xl font-black uppercase tracking-tight mb-2 dark:text-white">
                   Crear <span className="text-red-600">Cuenta</span>
                 </h1>
                 <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                   Completa tus datos para unirte a Áurea.
                 </p>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wide animate-shake">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Nombre */}
                <div className="group space-y-1">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Nombre Completo</label>
                   <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                      <input 
                        type="text" 
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 dark:bg-[#151515] border-2 border-transparent focus:border-black dark:focus:border-white rounded-xl py-4 pl-12 pr-4 outline-none font-bold text-sm transition-all dark:text-white placeholder-gray-300 dark:placeholder-gray-700"
                        placeholder="TU NOMBRE"
                      />
                   </div>
                </div>

                {/* Grid Email / Teléfono */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-50 dark:bg-[#151515] border-2 border-transparent focus:border-black dark:focus:border-white rounded-xl py-4 pl-12 pr-4 outline-none font-bold text-sm transition-all dark:text-white placeholder-gray-300 dark:placeholder-gray-700"
                                placeholder="EMAIL"
                            />
                        </div>
                    </div>
                    <div className="group space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Teléfono</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                            <input 
                                type="tel" 
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-[#151515] border-2 border-transparent focus:border-black dark:focus:border-white rounded-xl py-4 pl-12 pr-4 outline-none font-bold text-sm transition-all dark:text-white placeholder-gray-300 dark:placeholder-gray-700"
                                placeholder="+57..."
                            />
                        </div>
                    </div>
                </div>

                {/* Contraseña */}
                <div className="group space-y-1">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Contraseña</label>
                   <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                      <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 dark:bg-[#151515] border-2 border-transparent focus:border-black dark:focus:border-white rounded-xl py-4 pl-12 pr-4 outline-none font-bold text-sm transition-all dark:text-white placeholder-gray-300 dark:placeholder-gray-700"
                        placeholder="MÍNIMO 6 CARACTERES"
                      />
                   </div>
                </div>

                {/* Confirmar Contraseña */}
                <div className="group space-y-1">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Confirmar</label>
                   <div className="relative">
                      <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                      <input 
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 dark:bg-[#151515] border-2 border-transparent focus:border-black dark:focus:border-white rounded-xl py-4 pl-12 pr-4 outline-none font-bold text-sm transition-all dark:text-white placeholder-gray-300 dark:placeholder-gray-700"
                        placeholder="REPITE TU CLAVE"
                      />
                   </div>
                </div>

                {/* Checkbox Legal */}
                <div className="flex items-start gap-3 pt-2">
                   <div className="flex items-center h-5">
                      <input id="terms" type="checkbox" required className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" />
                   </div>
                   <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Acepto los <a href="#" className="underline hover:text-black dark:hover:text-white">Términos y Condiciones</a> y la <a href="#" className="underline hover:text-black dark:hover:text-white">Política de Privacidad</a>.
                   </label>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group disabled:opacity-50 mt-4"
                >
                   {loading ? 'Procesando...' : (
                     <>Registrarme <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                   )}
                </button>
              </form>

              {/* Footer Login */}
              <div className="text-center mt-8">
                 <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
                   ¿Ya tienes cuenta?
                 </p>
                 <Link href="/login" className="inline-block border-b-2 border-red-600 pb-1 text-xs font-black uppercase tracking-widest hover:text-red-600 transition-colors dark:text-white">
                   Iniciar Sesión
                 </Link>
              </div>

           </div>
        </div>
      </div>
    </div>
  )
}