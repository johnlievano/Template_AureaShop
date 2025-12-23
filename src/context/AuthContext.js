'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 1. Al cargar la app, revisar si hay un usuario guardado en el navegador
  useEffect(() => {
    const storedUser = localStorage.getItem('aurea_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // 2. Simulación de LOGIN
  const login = async (email, password) => {
    // Simulamos un retraso de red de 1.5 segundos para que se vea el LoadingSpinner
    return new Promise((resolve) => {
      setTimeout(() => {
        // Lógica Fake: Aceptamos cualquier email, pero validamos la contraseña "admin123" o genérica
        // O simplemente dejamos pasar a cualquiera para pruebas de diseño:
        if (password.length < 6) {
          resolve({ success: false, error: 'La contraseña es incorrecta.' })
        } else {
          // Crear un usuario falso
          const mockUser = {
            id: 'user_123',
            nombre: 'Usuario Demo', // O extraer del email
            email: email,
            role: 'member',
            avatar: `https://ui-avatars.com/api/?name=${email}&background=random`
          }

          // Guardar en estado y en localStorage
          setUser(mockUser)
          localStorage.setItem('aurea_user', JSON.stringify(mockUser))
          
          resolve({ success: true })
        }
      }, 1500)
    })
  }

  // 3. Simulación de REGISTRO
  const register = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulamos que el email ya existe si es "error@test.com"
        if (userData.email === 'error@test.com') {
          resolve({ success: false, error: 'Este correo ya está registrado.' })
          return
        }

        const newUser = {
          id: 'user_' + Date.now(),
          nombre: userData.nombre,
          email: userData.email,
          telefono: userData.telefono,
          role: 'member'
        }

        setUser(newUser)
        localStorage.setItem('aurea_user', JSON.stringify(newUser))
        
        resolve({ success: true })
      }, 1500)
    })
  }

  // 4. LOGOUT
  const logout = () => {
    setUser(null)
    localStorage.removeItem('aurea_user')
    // Opcional: Redirigir al home
    window.location.href = '/'
  }

  // 5. ACTUALIZAR PERFIL (Simulación)
  const updateUser = async (newData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...user, ...newData }
        setUser(updatedUser)
        localStorage.setItem('aurea_user', JSON.stringify(updatedUser))
        resolve({ success: true })
      }, 1000)
    })
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      updateUser,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)