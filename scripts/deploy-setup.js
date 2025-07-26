const { PrismaClient } = require('@prisma/client')
const { execSync } = require('child_process')

const prisma = new PrismaClient()

async function deploySetup() {
  try {
    console.log('🚀 Configurando base de datos para producción...')

    // Generar cliente de Prisma
    console.log('🔧 Generando cliente de Prisma...')
    execSync('npx prisma generate', { stdio: 'inherit' })

    // Ejecutar migraciones
    console.log('📦 Ejecutando migraciones...')
    execSync('npx prisma db push', { stdio: 'inherit' })

    // Verificar conexión
    console.log('🔍 Verificando conexión...')
    await prisma.$connect()
    console.log('✅ Conexión exitosa')

    // Contar productos existentes
    const productCount = await prisma.product.count()
    console.log(`📊 Productos en la base de datos: ${productCount}`)

    // Si no hay productos, insertarlos
    if (productCount === 0) {
      console.log('📝 Insertando productos...')
      execSync('node scripts/insert-products.js', { stdio: 'inherit' })
      console.log('✅ Productos insertados')
    } else {
      console.log('✅ Productos ya existen')
    }

    console.log('🎉 Configuración completada exitosamente!')

  } catch (error) {
    console.error('❌ Error en la configuración:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

deploySetup() 