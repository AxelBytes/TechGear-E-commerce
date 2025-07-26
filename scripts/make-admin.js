const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function makeUserAdmin(email) {
  try {
    const user = await prisma.user.update({
      where: { email: email },
      data: { role: 'admin' }
    })
    
    console.log(`✅ Usuario ${email} ahora es administrador`)
    console.log('Usuario:', user)
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

// Reemplaza con tu email
const userEmail = 'tu-email@ejemplo.com'

if (userEmail === 'tu-email@ejemplo.com') {
  console.log('❌ Por favor, cambia el email en el script')
} else {
  makeUserAdmin(userEmail)
} 