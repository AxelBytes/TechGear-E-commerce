# Configuración de Autenticación Simplificada

## ✅ Sistema de Autenticación Actual

El sistema de autenticación está configurado para usar **solo email y contraseña**, sin complicaciones de OAuth externo.

## Variables de Entorno Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

## Generación de NEXTAUTH_SECRET

Para generar un NEXTAUTH_SECRET seguro, puedes usar:

```bash
openssl rand -base64 32
```

O en Node.js:

```javascript
require('crypto').randomBytes(32).toString('base64')
```

## Funcionalidades Disponibles

### ✅ **Login con Email y Contraseña**
- Formulario simple y directo
- Validación de credenciales
- Mensajes de error claros

### ✅ **Registro de Usuarios**
- Formulario de registro completo
- Validación de contraseñas
- Auto-login después del registro

### ✅ **Gestión de Sesiones**
- Sesiones persistentes
- Logout seguro
- Protección de rutas

## Verificación de la Configuración

1. Asegúrate de que las variables de entorno estén configuradas
2. Reinicia el servidor de desarrollo
3. Ve a `/auth/login` y prueba el login
4. Ve a `/auth/register` y crea una cuenta
5. Verifica que los usuarios se creen correctamente en la base de datos

## Ventajas de esta Configuración

- ✅ **Simple y directo** - Sin complicaciones externas
- ✅ **Sin costos** - No hay APIs externas que pagar
- ✅ **Fácil de mantener** - Menos dependencias
- ✅ **Control total** - Tú manejas toda la autenticación
- ✅ **Privacidad** - Los datos se quedan en tu aplicación

## Solución de Problemas

### Error "Invalid credentials"
- Verifica que el usuario exista en la base de datos
- Asegúrate de que la contraseña sea correcta

### Error de base de datos
- Verifica que la base de datos esté configurada y accesible
- Ejecuta las migraciones de Prisma si es necesario: `npx prisma migrate dev`

### Error de NEXTAUTH_SECRET
- Asegúrate de que NEXTAUTH_SECRET esté configurado
- Verifica que sea una cadena segura y única 