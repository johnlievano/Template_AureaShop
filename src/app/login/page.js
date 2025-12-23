'use client'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { 
  Mail, Lock, ArrowRight, AlertCircle, 
  Sun, Moon, Eye, EyeOff 
} from 'lucide-react'

// Componente Toggle Theme
const ThemeToggle = ({ darkMode, toggle }) => (
  <button 
    onClick={toggle}
    className="fixed top-8 right-8 z-50 bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-3 rounded-full hover:scale-110 transition-transform"
  >
    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
  </button>
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // Nuevo estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [darkMode, setDarkMode] = useState(true)

  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(async () => {
        const result = await login(email, password)
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

        {/* --- LADO IZQUIERDO: VISUAL --- */}
        <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-black">
           {/* Imagen de fondo estable (Pexels) */}
           <img 
             src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200" 
             className="absolute inset-0 w-full h-full object-cover opacity-50"
             alt="Background"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
           
           <div className="relative z-10 w-full flex flex-col justify-end p-20">
              <div className="animate-slide-up">
                 <h2 className="text-6xl font-black uppercase text-white leading-none mb-6">
                   Legacy <br/> Member.
                 </h2>
                 <p className="text-gray-300 text-lg max-w-md font-medium mb-8">
                   Accede a lanzamientos exclusivos, historial de compras detallado y beneficios nivel socio.
                 </p>
                 <div className="flex gap-3">
                    <div className="flex -space-x-4">
                       {[1,2,3].map(i => (
                         <img key={i} src={`https://randomuser.me/api/portraits/men/${i+10}.jpg`} className="w-10 h-10 rounded-full border-2 border-black" alt="member" />
                       ))}
                    </div>
                    <div className="flex flex-col justify-center">
                       <span className="text-white font-bold text-sm">+2k Miembros</span>
                       <span className="text-gray-400 text-xs">Unidos esta semana</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* --- LADO DERECHO: FORMULARIO --- */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative">
           
           <div className="w-full max-w-md animate-fade-in">
              <div className="mb-10">
                 <Link href="/" className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8 block">
                   ← Volver a la tienda
                 </Link>
                 <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 dark:text-white">
                   Acceso <span className="text-red-600">Privado</span>
                 </h1>
                 <p className="text-gray-500 dark:text-gray-400 font-medium">
                   Ingresa tus credenciales para continuar.
                 </p>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wide animate-shake">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email Input */}
                <div className="group space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Email</label>
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

                {/* Password Input (CON OJO) */}
                <div className="group space-y-2">
                   <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Contraseña</label>
                      <Link href="/recuperar" className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-black dark:hover:text-white transition-colors">¿Olvidaste tu clave?</Link>
                   </div>
                   <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                      <input 
                        type={showPassword ? "text" : "password"} // Tipo dinámico
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-gray-50 dark:bg-[#151515] border-2 border-transparent focus:border-black dark:focus:border-white rounded-xl py-4 pl-12 pr-12 outline-none font-bold text-sm transition-all dark:text-white placeholder-gray-300 dark:placeholder-gray-700"
                        placeholder="••••••••"
                      />
                      {/* Botón Ojo */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                   </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                   {loading ? 'Verificando...' : (
                     <>Ingresar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                   )}
                </button>
              </form>

              {/* Separador */}
              <div className="relative my-10">
                 <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                 </div>
                 <div className="relative flex justify-center text-xs uppercase tracking-widest">
                    <span className="bg-white dark:bg-[#0a0a0a] px-4 text-gray-400 font-bold">O continúa con</span>
                 </div>
              </div>

              {/* Botones Sociales */}
              <div className="grid grid-cols-2 gap-4">
                 <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-100 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-colors font-bold text-sm dark:text-white">
                    Google
                 </button>
                 <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-100 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-colors font-bold text-sm dark:text-white">
                    Apple
                 </button>
              </div>

              {/* Registro Link */}
              <div className="text-center mt-12">
                 <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-2">¿Aún no eres miembro?</p>
                 <Link href="/registro" className="text-sm font-black uppercase tracking-widest border-b-2 border-red-600 pb-1 hover:text-red-600 transition-colors dark:text-white">
                   REGISTRARSE
                 </Link>
              </div>

           </div>
        </div>
      </div>
    </div>
  )
}