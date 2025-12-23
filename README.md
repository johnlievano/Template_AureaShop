ÁUREA WEB - Frontend High-End Store
Este repositorio contiene el núcleo visual y lógico de la plataforma eCommerce de Áurea Web. El desarrollo se basa en una arquitectura de alto rendimiento, diseño minimalista y una experiencia de usuario orientada a la conversión y escalabilidad.

💻 Stack Tecnológico
Framework: Next.js 14+ (App Router).

Lenguaje: JavaScript (ES6+).

Estilos: Tailwind CSS (Arquitectura Utility-First).

Iconografía: Lucide React.

Estado Global: React Context API.

🛠️ Módulos e Implementaciones Técnicas
1. Arquitectura de Estado Global (Context API)
El sistema utiliza un diseño de Providers jerárquicos para garantizar la consistencia de datos en toda la aplicación:

AuthContext: Gestión de sesiones, persistencia de usuarios registrados y control de acceso.

CartContext: Lógica de negocio para la bolsa de compras (CRUD de artículos, cálculo de totales y persistencia).

WishlistContext: Sistema de favoritos con persistencia en localStorage.

ThemeContext: Gestión nativa de Modo Oscuro/Claro.

2. Core de Componentes
Navbar Pro: Barra de navegación con buscador en vivo (Live Search), overlay de tendencias y menús de perfil dinámicos.

Galería de Producto: Implementación de visualización avanzada con efecto de Zoom-In dinámico y manejo de múltiples miniaturas.

Checkout Flow: Interfaz de carrito optimizada con controles de cantidad y validación de stock visual.

3. Sistema de Rutas y Navegación
Rutas Dinámicas: Uso de [id] para la generación de páginas de detalle de producto.

Rutas Privadas: Estructura en /perfil para la gestión de datos sensibles y listas de deseos del usuario.

Alias de Directorios: Configuración de @/ para importaciones limpias desde la raíz de src.

⚙️ Configuración del Entorno
Requisitos
Node.js 18.0 o superior.

npm o yarn.

Instalación
Clonar el proyecto:

Bash

git clone [url-del-repo]
Instalar dependencias:

Bash

npm install
Iniciar entorno de desarrollo:

Bash

npm run dev
Configuración de Imágenes (next.config.js)
Para permitir la carga de recursos visuales de alta calidad, se han habilitado los siguientes dominios:

images.unsplash.com

images.pexels.com

ui-avatars.com

🎨 Estándares de Diseño
Tipografía: Inter (Configurada vía next/font).

Paleta de Colores: Monocromática (Blanco/Negro) con acentos en Rojo (#DC2626) para llamadas a la acción (CTAs).

UX: Micro-interacciones en botones y transiciones suaves entre rutas para simular una aplicación nativa.

Desarrollado por: Áurea Web - Studio de Software.
