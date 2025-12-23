'use client'
import { useState, useEffect } from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { Sun, Moon, Bell, Shield, Smartphone, Zap, CheckCircle } from 'lucide-react'

const SettingToggle = ({ icon: Icon, title, desc, isActive, onClick }) => (
  <div 
    onClick={onClick} // Hacemos que toda la tarjeta sea clickeable
    className="flex items-center justify-between p-6 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-gray-800 cursor-pointer group transition-all hover:border-gray-300 dark:hover:border-gray-600"
  >
     <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full transition-colors duration-300 ${isActive ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
           <Icon size={24} />
        </div>
        <div>
           <h3 className="font-bold uppercase dark:text-white group-hover:text-red-600 transition-colors">{title}</h3>
           <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
        </div>
     </div>
     
     {/* Switch Simulado */}
     <div className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${isActive ? 'bg-red-600 justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}>
        <div className="w-6 h-6 bg-white rounded-full shadow-md transition-transform"></div>
     </div>
  </div>
)

export default function ConfiguracionPage() {
  const { theme, toggleTheme } = useTheme()
  const isDarkMode = theme === 'dark'
  
  // Estado para notificaciones (simulado)
  const [showToast, setShowToast] = useState(false)

  // 1. ESTADO INICIAL DE LAS CONFIGURACIONES
  const [settings, setSettings] = useState({
    orderAlerts: true,
    flashOffers: false,
    twoFactor: false
  })

  // 2. CARGAR CONFIGURACIÓN AL INICIAR
  useEffect(() => {
    const savedSettings = localStorage.getItem('aurea_settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // 3. FUNCIÓN PARA CAMBIAR Y GUARDAR
  const toggleSetting = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] }
    setSettings(newSettings)
    
    // Guardar en el navegador (Persistencia)
    localStorage.setItem('aurea_settings', JSON.stringify(newSettings))

    // Feedback visual (Toast)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <div className="relative">
      <h1 className="text-3xl font-black uppercase mb-2 dark:text-white">Configuración</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-12">Gestiona tus preferencias de la aplicación.</p>

      <div className="space-y-8 max-w-3xl">
         
         {/* SECCIÓN APARIENCIA (Usa Contexto Global) */}
         <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Apariencia</h2>
            <SettingToggle 
               icon={isDarkMode ? Moon : Sun}
               title="Modo Oscuro"
               desc={isDarkMode ? "Activado. Estilo nocturno High-End." : "Desactivado. Interfaz clara y luminosa."}
               isActive={isDarkMode}
               onClick={toggleTheme}
            />
         </div>

         {/* SECCIÓN NOTIFICACIONES (Usa Estado Local Simulado) */}
         <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 mt-8">Notificaciones</h2>
            <div className="space-y-4">
               <SettingToggle 
                 icon={Bell} 
                 title="Alertas de Pedidos" 
                 desc="Recibe actualizaciones sobre el estado de tus compras." 
                 isActive={settings.orderAlerts} 
                 onClick={() => toggleSetting('orderAlerts')} 
               />
               <SettingToggle 
                 icon={Zap} 
                 title="Ofertas Relámpago" 
                 desc="Notificaciones push sobre ventas flash exclusivas." 
                 isActive={settings.flashOffers} 
                 onClick={() => toggleSetting('flashOffers')} 
               />
            </div>
         </div>

         {/* SECCIÓN SEGURIDAD (Usa Estado Local Simulado) */}
         <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 mt-8">Seguridad</h2>
            <SettingToggle 
              icon={Shield} 
              title="Autenticación en 2 Pasos" 
              desc="Añade una capa extra de seguridad a tu cuenta." 
              isActive={settings.twoFactor} 
              onClick={() => toggleSetting('twoFactor')} 
            />
         </div>
      </div>

      {/* TOAST DE CONFIRMACIÓN FLOTANTE */}
      <div className={`fixed bottom-8 right-8 bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
          <CheckCircle size={20} className="text-green-500" />
          <span className="text-xs font-black uppercase tracking-widest">Configuración Guardada</span>
      </div>
    </div>
  )
}