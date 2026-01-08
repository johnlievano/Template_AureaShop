'use client'
import { useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Camera, Save, CheckCircle, Upload, Trash2, Palette, User } from 'lucide-react'
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react'

// 1. COLECCIÓN DE AVATARES PREDISEÑADOS
const AVATAR_PRESETS = [
  "https://api.dicebear.com/9.x/micah/svg?seed=Felix&backgroundColor=fdfbf7",
  "https://api.dicebear.com/9.x/notionists/svg?seed=Oliver&backgroundColor=e5e7eb",
  "https://api.dicebear.com/9.x/micah/svg?seed=Amaya&backgroundColor=ffdfbf",
  "https://api.dicebear.com/9.x/notionists/svg?seed=Molly&backgroundColor=b6e3f4",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Robert&backgroundColor=c0aede",
  "https://api.dicebear.com/9.x/notionists/svg?seed=Leo&backgroundColor=ffdfbf", 
]

// 2. PALETA DE COLORES
const BG_COLORS = [
  { name: 'Negro', hex: '000000', class: 'bg-black' },
  { name: 'Rojo', hex: 'DC2626', class: 'bg-red-600' },
  { name: 'Azul', hex: '2563EB', class: 'bg-blue-600' },
  { name: 'Verde', hex: '059669', class: 'bg-green-600' },
  { name: 'Amarillo', hex: 'D97706', class: 'bg-yellow-600' },
]

export default function MisDatosPage() {
  const { user, updateUser } = useAuth()
  const fileInputRef = useRef(null)
  
  // Estados
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    telefono: user?.telefono || '',
  })

  // Estado visual del avatar
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar || `https://ui-avatars.com/api/?name=${user?.nombre || 'User'}&background=000000&color=fff`
  )

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setAvatarPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const selectPreset = (url) => setAvatarPreview(url)

  const changeAvatarColor = (hex) => {
    const newUrl = `https://ui-avatars.com/api/?name=${formData.nombre || 'User'}&background=${hex}&color=fff&size=128`
    setAvatarPreview(newUrl)
  }

  const removePhoto = () => {
    setAvatarPreview(`https://ui-avatars.com/api/?name=${formData.nombre || 'User'}&background=random&color=fff`)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    await updateUser({ ...formData, avatar: avatarPreview })
    setIsSaving(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    // CORRECCIÓN AQUÍ: Agregamos clases de contenedor y padding-top (pt-24) 
    // para que el contenido baje y no estorbe al menú de hamburguesa.
    <div className="container mx-auto px-6 pt-24 pb-12 min-h-screen">
      
      <h1 className="text-3xl font-black uppercase mb-8 dark:text-white">Mis Datos Personales</h1>
      
      {/* --- ZONA DE PERSONALIZACIÓN DE AVATAR --- */}
      <div className="bg-gray-50 dark:bg-[#151515] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 mb-10">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
           
           {/* 1. La Imagen Grande */}
           <div className="relative group shrink-0">
              <div className="w-40 h-40 rounded-full border-4 border-white dark:border-[#111] shadow-2xl overflow-hidden bg-white">
                 <img src={avatarPreview} className="w-full h-full object-cover" alt="Avatar" />
              </div>
              
              <button 
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-1 right-1 bg-black dark:bg-white text-white dark:text-black p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                title="Subir foto propia"
              >
                 <Upload size={18} />
              </button>
              <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleFileUpload} 
                 accept="image/*" 
                 className="hidden" 
              />
           </div>

           {/* 2. Controles de Personalización */}
           <div className="flex-1 w-full">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <h3 className="text-lg font-black uppercase dark:text-white">Imagen de Perfil</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Personaliza cómo te ves en la tienda.</p>
                 </div>
                 <button onClick={removePhoto} className="text-xs text-red-500 font-bold uppercase hover:text-red-700 flex items-center gap-1">
                    <Trash2 size={14} /> Quitar
                 </button>
              </div>

              {/* Galería de Avatares */}
              <div className="mb-6">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">Avatares con Estilo</span>
                 <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {AVATAR_PRESETS.map((url, i) => (
                       <button 
                          key={i} 
                          onClick={() => selectPreset(url)}
                          className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all hover:scale-110 shrink-0 ${avatarPreview === url ? 'border-red-600 scale-110' : 'border-transparent hover:border-gray-300'}`}
                       >
                          <img src={url} className="w-full h-full object-cover" alt="preset" />
                       </button>
                    ))}
                 </div>
              </div>

              {/* Color de Iniciales */}
              <div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 block flex items-center gap-2">
                    <Palette size={12}/> Color de Fondo (Iniciales)
                 </span>
                 <div className="flex gap-3">
                    {BG_COLORS.map((color) => (
                       <button 
                          key={color.hex}
                          onClick={() => changeAvatarColor(color.hex)}
                          className={`w-8 h-8 rounded-full ${color.class} border-2 transition-transform hover:scale-110 ${avatarPreview.includes(color.hex) ? 'border-white ring-2 ring-black dark:ring-white scale-110' : 'border-transparent'}`}
                          title={color.name}
                       />
                    ))}
                 </div>
              </div>

           </div>
        </div>
      </div>
      
      {/* --- FORMULARIO DE TEXTO --- */}
      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 group">
               <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Nombre Completo</label>
               <input 
                 type="text" 
                 value={formData.nombre} 
                 onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                 className="w-full bg-gray-50 dark:bg-[#1a1a1a] border-2 border-transparent focus:border-black dark:focus:border-white rounded-xl px-4 py-4 font-bold text-sm dark:text-white outline-none transition-colors placeholder-gray-300" 
               />
            </div>
            <div className="space-y-2 group">
               <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Teléfono</label>
               <input 
                 type="tel" 
                 value={formData.telefono} 
                 onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                 placeholder="+57..." 
                 className="w-full bg-gray-50 dark:bg-[#1a1a1a] border-2 border-transparent focus:border-black dark:focus:border-white rounded-xl px-4 py-4 font-bold text-sm dark:text-white outline-none transition-colors placeholder-gray-300" 
               />
            </div>
         </div>
         
         <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Correo Electrónico</label>
            <div className="w-full bg-gray-100 dark:bg-[#111] border border-transparent rounded-xl px-4 py-4 font-bold text-sm text-gray-400 dark:text-gray-500 flex items-center justify-between cursor-not-allowed opacity-70">
               <span>{user?.email}</span>
               <LockIcon size={14}/>
            </div>
         </div>

         <div className="pt-4">
             <button 
               type="submit" 
               disabled={isSaving}
               className={`flex items-center gap-2 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 ${success ? 'bg-green-500 text-white' : 'bg-black dark:bg-white text-white dark:text-black'}`}
             >
                {isSaving ? 'Guardando...' : success ? (
                  <> <CheckCircle size={16}/> Cambios Guardados </>
                ) : (
                  <> <Save size={16} /> Guardar Cambios </>
                )}
             </button>
         </div>
      </form>
    </div>
  )
}

const LockIcon = ({size}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
)