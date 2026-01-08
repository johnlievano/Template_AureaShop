'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingBag, User, Menu, X, Search, LogOut, Settings, TrendingUp, ChevronRight, Trash2, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

// --- DATOS MOCK PARA EL BUSCADOR (Si usas una API real, esto se reemplaza) ---
const SEARCH_DB = [
  { id: 101, nombre: "Cyber Jacket Pro", categoria: "Chaquetas", precio: 280000, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200" },
  { id: 102, nombre: "Sneakers Carbon", categoria: "Calzado", precio: 190000, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=200" },
  { id: 103, nombre: "Hoodie Oversized", categoria: "Hoodies", precio: 120000, img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=200" },
  { id: 104, nombre: "Smart Glasses V2", categoria: "Accesorios", precio: 350000, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=200" },
  { id: 105, nombre: "Urban Cargo Pants", categoria: "Pantalones", precio: 150000, img: "https://images.unsplash.com/photo-1763388542551-f6e278d2c1a7?w=500&auto=format&fit=crop&q=60" },
]

const TRENDING_TAGS = ["Chaquetas", "Sneakers", "Hoodies", "Pantalones", "Accesorios"]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // --- LÓGICA DEL BUSCADOR ---
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchInputRef = useRef(null)

  // CONTEXTOS
  const { user, logout } = useAuth()

  // --- AQUÍ CONECTAMOS EL CARRITO GLOBALMENTE ---
  const { getCartItemsCount, cart, removeFromCart, getCartTotal } = useCart()

  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  // Avatar Dinámico
  const userAvatarStr = user?.avatar || (user?.nombre ? `https://ui-avatars.com/api/?name=${user.nombre}&background=random&color=fff` : null)

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = (isOpen || searchOpen) ? 'hidden' : 'unset'
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100)
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen, searchOpen])

  // Filtrado del buscador
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([])
    } else {
      const results = SEARCH_DB.filter(product =>
        product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoria.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
    }
  }, [searchQuery])

  const handleProductClick = (id) => {
    setSearchOpen(false)
    setSearchQuery('')
    router.push(`/productos/${id}`)
  }

  const handleEnterSearch = (e) => {
    e.preventDefault()
    setSearchOpen(false)
    router.push(`/productos?search=${encodeURIComponent(searchQuery)}`)
    setSearchQuery('')
  }

  return (
    <>
      {/* --- HEADER DESKTOP --- */}
      <header className="fixed top-0 w-full z-[100] bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
        <div className="container mx-auto px-6 flex items-center justify-between h-20">

          {/* IZQUIERDA: Menú y Links */}
          <div className="flex items-center justify-start w-1/3">
            <button
              className="lg:hidden p-2 -ml-2 text-black dark:text-white hover:text-red-600 transition-colors transform active:scale-90 shrink-0"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>

            <nav className="hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">
              <Link href="/productos" className="hover:text-red-600 transition-colors">Colección</Link>
              <Link href="/nosotros" className="hover:text-red-600 transition-colors">Studio</Link>
              <Link href="/contacto" className="hover:text-red-600 transition-colors">Contáctanos</Link>
            </nav>
          </div>

          {/* CENTRO: Logo */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex flex-col items-center group" onClick={() => setIsOpen(false)}>
              <h1 className="text-3xl font-black uppercase tracking-tighter text-black dark:text-white transition-transform group-hover:scale-105">
                ÁUREA
              </h1>
            </Link>
          </div>

          {/* DERECHA: Iconos y Usuario */}
          <div className="flex items-center justify-end gap-5 text-black dark:text-white w-1/3">

            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:block hover:text-red-600 transition-colors"
            >
              <Search size={22} strokeWidth={1.5} />
            </button>

            {/* --- CARRITO GLOBAL CON HOVER PREVIEW --- */}
            <div className="relative group h-full flex items-center z-50">
              <Link href="/carrito" className="relative hover:text-red-600 transition-colors p-2">
                <ShoppingBag size={22} strokeWidth={1.5} />
                {getCartItemsCount() > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black animate-bounce">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>

              {/* MENÚ FLOTANTE DEL CARRITO */}
              <div className="absolute top-full right-0 w-80 bg-white dark:bg-[#111] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">

                {/* Triángulo decorativo */}
                <div className="absolute -top-2 right-3 w-4 h-4 bg-white dark:bg-[#111] rotate-45 border-t border-l border-gray-100 dark:border-gray-800"></div>

                <div className="flex justify-between items-end border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">Mi Bolsa</span>
                  <span className="text-xs font-bold dark:text-white">{getCartItemsCount()} Items</span>
                </div>

                {(!cart || cart.length === 0) ? (
                  <p className="text-center text-xs text-gray-400 py-6">Tu bolsa está vacía.</p>
                ) : (
                  <div className="space-y-4">
                    {/* Lista de productos (Max 3) */}
                    <div className="flex flex-col gap-4 max-h-60 overflow-y-auto custom-scrollbar">
                      {cart.slice(0, 3).map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="flex gap-3 items-start group/item">
                          <div className="w-14 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                            <img src={item.img} className="w-full h-full object-cover" alt={item.nombre} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link href={`/productos/${item.id}`} className="text-xs font-bold uppercase truncate dark:text-white block hover:text-red-600 transition-colors">
                              {item.nombre}
                            </Link>
                            <p className="text-[10px] text-gray-500 mt-0.5">
                              Talla: <span className="font-bold">{item.size || 'U'}</span> · Cant: {item.quantity}
                            </p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs font-black text-red-600">${item.precio.toLocaleString()}</span>
                              <button
                                onClick={(e) => { e.preventDefault(); removeFromCart(item.id, item.size); }}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {cart.length > 3 && (
                      <p className="text-center text-[10px] text-gray-400 italic pt-1">
                        + {cart.length - 3} productos más...
                      </p>
                    )}

                    {/* Footer del carrito */}
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-2 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500">Subtotal:</span>
                        <span className="text-sm font-black dark:text-white">
                          ${(typeof getCartTotal === 'function' ? getCartTotal() : 0).toLocaleString()}
                        </span>
                      </div>
                      <Link href="/carrito" className="block w-full bg-black dark:bg-white text-white dark:text-black text-center py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:opacity-80 transition-opacity flex items-center justify-center gap-2">
                        Ver Bolsa Completa <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* LÓGICA USUARIO DESKTOP */}
            <div className="hidden lg:block relative">
              {!user ? (
                <Link href="/login" className="hover:text-red-600 transition-colors block">
                  <User size={22} strokeWidth={1.5} />
                </Link>
              ) : (
                <>
                  <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center gap-2 focus:outline-none">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-800 hover:border-red-600 transition-colors">
                      {userAvatarStr ? <img src={userAvatarStr} alt="Perfil" className="w-full h-full object-cover" /> : <User size={18} className="m-auto mt-1" />}
                    </div>
                  </button>
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-4 w-56 bg-white dark:bg-[#111] rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 py-2 animate-in fade-in slide-in-from-top-2">
                      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-xs font-black uppercase text-gray-900 dark:text-white truncate">{user.nombre}</p>
                        <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link href="/perfil" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white transition-colors" onClick={() => setProfileMenuOpen(false)}>
                        <User size={16} /> Mis Datos
                      </Link>
                      <Link href="/perfil/configuracion" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white transition-colors" onClick={() => setProfileMenuOpen(false)}>
                        <Settings size={16} /> Configuración
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2">
                        <button onClick={() => { logout(); setProfileMenuOpen(false); }} className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
                          <LogOut size={16} /> Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- OVERLAY DE BÚSQUEDA --- */}
      <div className={`fixed inset-0 z-[1001] bg-white/95 dark:bg-black/95 backdrop-blur-md transition-all duration-300 flex flex-col items-center ${searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>

        <button
          onClick={() => setSearchOpen(false)}
          className="absolute top-6 right-6 p-3 bg-gray-100 dark:bg-[#1a1a1a] rounded-full hover:rotate-90 transition-all duration-300 text-black dark:text-white"
        >
          <X size={24} />
        </button>

        <div className="w-full max-w-4xl px-6 mt-32">
          <form onSubmit={handleEnterSearch} className="relative mb-12">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="BUSCAR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white text-4xl md:text-6xl font-black uppercase py-4 outline-none placeholder-gray-300 dark:placeholder-gray-800 dark:text-white transition-colors"
            />
          </form>

          <div className="animate-fade-in">
            {searchQuery === '' && (
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                  <TrendingUp size={14} /> Tendencias ahora
                </span>
                <div className="flex flex-wrap gap-3">
                  {TRENDING_TAGS.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-6 py-3 rounded-full border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all text-sm font-bold uppercase dark:text-white"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchQuery !== '' && (
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 block">
                  {searchResults.length > 0 ? `Resultados (${searchResults.length})` : 'Sin resultados'}
                </span>

                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                    {searchResults.map(product => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] cursor-pointer group transition-colors"
                      >
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-900 rounded-lg overflow-hidden shrink-0">
                          <img src={product.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={product.nombre} />
                        </div>
                        <div>
                          <h4 className="font-bold uppercase text-sm dark:text-white group-hover:text-red-600 transition-colors">{product.nombre}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{product.categoria}</p>
                          <p className="text-sm font-black mt-1 dark:text-white">${product.precio.toLocaleString()}</p>
                        </div>
                        <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-red-600" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 opacity-50">
                    <Search size={48} className="mx-auto mb-4" />
                    <p className="text-xl font-bold uppercase dark:text-white">No encontramos nada</p>
                    <p className="text-sm">Intenta con "Chaquetas" o "Sneakers"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MENÚ MÓVIL (SCROLL INTEGRADO) --- */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-full md:w-[400px] bg-white dark:bg-[#0a0a0a] z-[1001] flex flex-col transition-transform duration-500 cubic-bezier(0.19, 1, 0.22, 1) ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* CABECERA FIJA */}
        <div className="flex items-center justify-between p-8 shrink-0">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Navegación</span>
          <button onClick={() => setIsOpen(false)} className="p-3 bg-gray-100 dark:bg-[#1a1a1a] rounded-full text-black dark:text-white hover:rotate-90 transition-all duration-300">
            <X size={24} />
          </button>
        </div>

        {/* ÁREA SCROLLEABLE (TODO ENTRA AQUÍ) */}
        <div className="flex-1 flex flex-col px-8 overflow-y-auto pb-10">

          {/* Buscador Móvil */}
          <button
            onClick={() => { setIsOpen(false); setSearchOpen(true); }}
            className="w-full flex items-center justify-between bg-gray-50 dark:bg-[#1a1a1a] border border-transparent hover:border-black dark:hover:border-white rounded-xl p-4 mb-8 font-bold uppercase text-sm text-gray-400 hover:text-black dark:hover:text-white transition-all shrink-0"
          >
            <span>Buscar...</span>
            <Search size={20} />
          </button>

          {/* Links */}
          <div className="space-y-4 mb-10 shrink-0">
            {[
              { name: "Inicio", href: "/" },
              { name: "Colección", href: "/productos" },
              { name: "Studio", href: "/nosotros" },
              { name: "Contáctanos", href: "/contacto" }
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between py-2"
              >
                <span className="text-4xl font-black uppercase tracking-tighter text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* SECCIÓN USUARIO DENTRO DEL SCROLL */}
          {user && (
            <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800 animate-fade-in shrink-0">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6 block">Mi Cuenta</span>

              {/* Tarjeta Usuario */}
              <div className="flex items-center gap-4 mb-8 bg-gray-50 dark:bg-[#111] p-4 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden shrink-0 border-2 border-white dark:border-gray-700">
                  {userAvatarStr ? <img src={userAvatarStr} className="w-full h-full object-cover" alt="Avatar" /> : <User className="m-auto mt-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black uppercase dark:text-white leading-none mb-1 truncate">{user.nombre}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Link href="/perfil" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all font-bold uppercase text-xs dark:text-gray-300">
                  <User size={18} /> Mis Datos
                </Link>

                <Link href="/perfil/configuracion" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all font-bold uppercase text-xs dark:text-gray-300">
                  <Settings size={18} /> Configuración
                </Link>

                <button onClick={() => { logout(); setIsOpen(false); }} className="w-full flex items-center gap-4 p-4 rounded-xl border border-red-100 dark:border-red-900/30 text-red-600 hover:bg-red-600 hover:text-white transition-all font-bold uppercase text-xs mt-4">
                  <LogOut size={18} /> Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER FIJO SOLO PARA NO LOGUEADOS */}
        {!user && (
          <div className="p-8 bg-gray-50 dark:bg-[#050505] shrink-0">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/login" onClick={() => setIsOpen(false)} className="py-4 text-center border-2 border-black dark:border-white rounded-xl font-black uppercase text-xs dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">Iniciar</Link>
              <Link href="/registro" onClick={() => setIsOpen(false)} className="py-4 text-center bg-black dark:bg-white text-white dark:text-black rounded-xl font-black uppercase text-xs hover:opacity-80 transition-opacity">Registro</Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}