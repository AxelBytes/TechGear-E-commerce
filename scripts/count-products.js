const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function countProducts() {
  try {
    console.log('📊 Contando productos en la base de datos...')

    const totalProducts = await prisma.product.count()
    console.log(`✅ Total de productos: ${totalProducts}`)

    // Contar por categoría
    const productsByCategory = await prisma.product.groupBy({
      by: ['categoryId'],
      _count: {
        id: true
      }
    })

    console.log('\n📋 Productos por categoría:')
    for (const item of productsByCategory) {
      const category = await prisma.category.findUnique({
        where: { id: item.categoryId }
      })
      console.log(`- ${category?.name || 'Sin categoría'}: ${item._count.id} productos`)
    }

    // Contar productos destacados
    const featuredProducts = await prisma.product.count({
      where: {
        isFeatured: true
      }
    })

    console.log(`\n⭐ Productos destacados: ${featuredProducts}`)

    // Mostrar algunos productos de ejemplo
    const sampleProducts = await prisma.product.findMany({
      take: 5,
      include: {
        category: true,
        brand: true
      }
    })

    console.log('\n📝 Ejemplos de productos:')
    sampleProducts.forEach(product => {
      console.log(`- ${product.name} (${product.brand?.name || 'Sin marca'}) - $${product.price}`)
    })

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

countProducts() 