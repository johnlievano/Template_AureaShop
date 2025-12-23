'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Settings, ShoppingBag, Heart, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const sidebarLinks = [
  { name: 'Mis Datos', href: '/perfil', icon: User },
  { name: 'Mis Pedidos', href: '/perfil/pedidos', icon: ShoppingBag },
  { name: 'Wishlist', href: '/perfil/wishlist', icon: Heart },
  { name: 'Configuración', href: '/perfil/configuracion', icon: Settings },
]

export default function PerfilLayout({ children }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  if (!user) {
    return <div className="min-h-screen pt-32 text-center">Cargando perfil...</div>
  }
  
  // 1. CORRECCIÓN: Definir el avatar correctamente
  const userAvatarStr = user?.avatar || `https://ui-avatars.com/api/?name=${user.nombre}&background=random`

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-20 transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* --- SIDEBAR --- */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sticky top-28">
              
              {/* 2. CORRECCIÓN: Usar userAvatarStr en la imagen */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-red-600 overflow-hidden">
                   <img src={userAvatarStr} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-black uppercase text-sm dark:text-white">{user.nombre}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">{user.email}</p>
                </div>
              </div>

              {/* Links de Navegación */}
              <nav className="space-y-2">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href
                  return (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all
                        ${isActive 
                          ? 'bg-black dark:bg-white text-white dark:text-black shadow-md' 
                          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'}
                      `}
                    >
                      <Icon size={18} />
                      {link.name}
                    </Link>
                  )
                })}
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all mt-6"
                >
                  <LogOut size={18} /> Cerrar Sesión
                </button>
              </nav>
            </div>
          </aside>

          {/* --- CONTENIDO PRINCIPAL --- */}
          <main className="flex-1">
            <div className="bg-white dark:bg-[#111] rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12 animate-fade-in">
              {children}
            </div>
          </main>

        </div>
      </div>
    </div>
  )
}