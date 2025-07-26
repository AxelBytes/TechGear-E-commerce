const { PrismaClient } = require('@prisma/client')
const { execSync } = require('child_process')

const prisma = new PrismaClient()

async function setupDatabase() {
  try {
    console.log('🗄️ Configurando base de datos...')

    // Ejecutar migraciones
    console.log('📦 Ejecutando migraciones...')
    execSync('npx prisma db push', { stdio: 'inherit' })

    // Generar cliente de Prisma
    console.log('🔧 Generando cliente de Prisma...')
    execSync('npx prisma generate', { stdio: 'inherit' })

    // Insertar datos iniciales
    console.log('📊 Insertando datos iniciales...')
    execSync('node scripts/insert-products.js', { stdio: 'inherit' })

    console.log('✅ Base de datos configurada exitosamente!')

  } catch (error) {
    console.error('❌ Error configurando base de datos:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase() 