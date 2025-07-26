# 🚀 Guía de Despliegue en Netlify

## Configuración del Proyecto

### 1. Variables de Entorno Requeridas

Configura las siguientes variables de entorno en Netlify:

```env
# NextAuth Configuration
NEXTAUTH_URL=https://your-app-name.netlify.app
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"

# Stripe Configuration (opcional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 2. Configuración de Base de Datos

Para el portafolio, puedes usar:
- **Supabase** (recomendado para portafolios)
- **PlanetScale**
- **Railway**
- **Vercel Postgres**

### 3. Pasos para el Despliegue

1. **Conecta tu repositorio de GitHub a Netlify**
2. **Configura las variables de entorno** en Netlify Dashboard
3. **Configura la base de datos** y actualiza `DATABASE_URL`
4. **Genera un NEXTAUTH_SECRET** usando: `openssl rand -base64 32`
5. **Actualiza NEXTAUTH_URL** con tu dominio de Netlify

### 4. Configuración de Build

Netlify detectará automáticamente que es un proyecto Next.js y usará:
- **Build command**: `npm run build`
- **Publish directory**: `.next`

### 5. Dominio Personalizado (Opcional)

Puedes configurar un dominio personalizado en Netlify Dashboard.

## 🎯 Para Portafolio

Este proyecto está optimizado para mostrar en tu portafolio con:
- ✅ Imágenes profesionales de productos
- ✅ Funcionalidad completa de e-commerce
- ✅ Diseño responsive y moderno
- ✅ Performance optimizada
- ✅ SEO optimizado

## 🔧 Troubleshooting

Si tienes problemas:
1. Verifica que todas las variables de entorno estén configuradas
2. Revisa los logs de build en Netlify
3. Asegúrate de que la base de datos esté accesible
4. Verifica que NEXTAUTH_URL coincida con tu dominio

## 📝 Notas Importantes

- El proyecto usa Next.js 14 con App Router
- Base de datos PostgreSQL con Prisma ORM
- Autenticación con NextAuth.js
- UI con Shadcn/ui y Tailwind CSS 