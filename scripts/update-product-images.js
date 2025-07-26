const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function updateProductImages() {
  try {
    console.log('🖼️ Actualizando imágenes de productos con URLs específicas...')

    // Mapeo de productos con imágenes específicas de MercadoLibre
    const productImageUpdates = [
      {
        name: 'iPhone 15 Pro Max',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_768125-MLA71783090116_092023-F.webp'
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_713598-MLA81067005837_112024-F.webp'
      },
      {
        name: 'Google Pixel 8 Pro',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_848978-MLA79207772962_092024-F.webp'
      },
      {
        name: 'MacBook Pro 16" M3 Max',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_747133-MLA74676488096_022024-F.webp'
      },
      {
        name: 'Dell XPS 15',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_916799-MLA54007954186_022023-F.webp'
      },
      {
        name: 'ASUS ROG Strix G16',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_886217-MLA88397842437_072025-F.webp'
      },
      {
        name: 'iPad Pro 12.9" M2',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_640783-MLA83007364576_032025-F.webp'
      },
      {
        name: 'Samsung Galaxy Tab S9 Ultra',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_997662-MLA81073598953_112024-F.webp'
      },
      {
        name: 'AirPods Pro 2',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_745973-MLA75078108915_032024-F.webp'
      },
      {
        name: 'Sony WH-1000XM5',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_794797-MLA50436072460_062022-F.webp'
      },
      {
        name: 'Bose QuietComfort 45',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_683597-MLU79138858307_092024-F.webp'
      },
      {
        name: 'Razer BlackShark V2 Pro',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_632977-MLU77405132762_072024-F.webp'
      },
      {
        name: 'Bose SoundLink Revolve+',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_784574-MLA84850490995_052025-F.webp'
      },
      {
        name: 'Apple Watch Series 9',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_761220-MLA72067378786_102023-F.webp'
      },
      {
        name: 'Logitech MX Master 3S',
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_671941-MLU72854928744_112023-F.webp'
      }
    ]

    // Actualizar cada producto
    for (const update of productImageUpdates) {
      await prisma.product.updateMany({
        where: { name: update.name },
        data: { imageUrl: update.imageUrl }
      })
      console.log(`✅ Actualizada imagen para: ${update.name}`)
    }

    console.log('🎉 ¡Imágenes actualizadas exitosamente con URLs específicas!')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateProductImages() 