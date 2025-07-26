const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.handler = async (event, context) => {
  try {
    console.log('🚀 Configurando base de datos...')

    // Verificar conexión
    await prisma.$connect()
    console.log('✅ Conexión exitosa')

    // Contar productos existentes
    const productCount = await prisma.product.count()
    console.log(`📊 Productos en la base de datos: ${productCount}`)

    // Si no hay productos, insertarlos
    if (productCount === 0) {
      console.log('📝 Insertando productos...')
      
      // Categorías
      const categories = await Promise.all([
        prisma.category.create({ data: { name: 'Smartphones', description: 'Teléfonos inteligentes' } }),
        prisma.category.create({ data: { name: 'Laptops', description: 'Computadoras portátiles' } }),
        prisma.category.create({ data: { name: 'Tablets', description: 'Tablets y iPads' } }),
        prisma.category.create({ data: { name: 'Auriculares', description: 'Auriculares y audífonos' } }),
        prisma.category.create({ data: { name: 'Smartwatches', description: 'Relojes inteligentes' } }),
        prisma.category.create({ data: { name: 'Accesorios', description: 'Accesorios tecnológicos' } }),
        prisma.category.create({ data: { name: 'Gaming', description: 'Productos para gaming' } }),
        prisma.category.create({ data: { name: 'Audio', description: 'Sistemas de audio' } })
      ])

      // Marcas
      const brands = await Promise.all([
        prisma.brand.create({ data: { name: 'Apple' } }),
        prisma.brand.create({ data: { name: 'Samsung' } }),
        prisma.brand.create({ data: { name: 'Sony' } }),
        prisma.brand.create({ data: { name: 'Google' } }),
        prisma.brand.create({ data: { name: 'Dell' } }),
        prisma.brand.create({ data: { name: 'HP' } }),
        prisma.brand.create({ data: { name: 'ASUS' } }),
        prisma.brand.create({ data: { name: 'Bose' } }),
        prisma.brand.create({ data: { name: 'JBL' } }),
        prisma.brand.create({ data: { name: 'Logitech' } }),
        prisma.brand.create({ data: { name: 'Razer' } }),
        prisma.brand.create({ data: { name: 'Microsoft' } }),
        prisma.brand.create({ data: { name: 'Lenovo' } }),
        prisma.brand.create({ data: { name: 'Acer' } }),
        prisma.brand.create({ data: { name: 'OnePlus' } })
      ])

      // Productos principales
      const products = [
        {
          name: 'iPhone 15 Pro Max',
          description: 'El iPhone más avanzado con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR de 6.7".',
          price: 1199.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_768125-MLA71783090116_092023-F.webp',
          categoryId: categories[0].id,
          brandId: brands[0].id,
          stock: 25,
          isFeatured: true
        },
        {
          name: 'Samsung Galaxy S24 Ultra',
          description: 'Flagship de Samsung con S Pen integrado, cámara de 200MP y pantalla Dynamic AMOLED 2X.',
          price: 1299.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_713598-MLA81067005837_112024-F.webp',
          categoryId: categories[0].id,
          brandId: brands[1].id,
          stock: 30,
          isFeatured: true
        },
        {
          name: 'MacBook Pro 16" M3 Max',
          description: 'La laptop más potente de Apple con chip M3 Max, hasta 128GB de memoria unificada.',
          price: 3499.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_747133-MLA74676488096_022024-F.webp',
          categoryId: categories[1].id,
          brandId: brands[0].id,
          stock: 10,
          isFeatured: true
        },
        {
          name: 'Dell XPS 15',
          description: 'Laptop premium con pantalla OLED 4K, Intel Core i9 y NVIDIA RTX 4070.',
          price: 2499.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_916799-MLA54007954186_022023-F.webp',
          categoryId: categories[1].id,
          brandId: brands[4].id,
          stock: 12,
          isFeatured: true
        },
        {
          name: 'iPad Pro 12.9" M2',
          description: 'Tablet profesional con chip M2, pantalla Liquid Retina XDR y soporte para Apple Pencil.',
          price: 1099.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_640783-MLA83007364576_032025-F.webp',
          categoryId: categories[2].id,
          brandId: brands[0].id,
          stock: 22,
          isFeatured: true
        },
        {
          name: 'AirPods Pro 2',
          description: 'Auriculares inalámbricos con cancelación activa de ruido y audio espacial.',
          price: 249.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_745973-MLA75078108915_032024-F.webp',
          categoryId: categories[3].id,
          brandId: brands[0].id,
          stock: 50,
          isFeatured: true
        },
        {
          name: 'Sony WH-1000XM5',
          description: 'Los auriculares con mejor cancelación de ruido del mercado y 30 horas de batería.',
          price: 399.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_794797-MLA50436072460_062022-F.webp',
          categoryId: categories[3].id,
          brandId: brands[2].id,
          stock: 35,
          isFeatured: true
        },
        {
          name: 'Apple Watch Series 9',
          description: 'Smartwatch con monitor cardíaco, GPS y hasta 18 horas de batería.',
          price: 399.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_761220-MLA72067378786_102023-F.webp',
          categoryId: categories[4].id,
          brandId: brands[0].id,
          stock: 40,
          isFeatured: true
        },
        {
          name: 'Logitech MX Master 3S',
          description: 'Mouse inalámbrico premium con sensor de 8000 DPI y hasta 70 días de batería.',
          price: 99.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_671941-MLU72854928744_112023-F.webp',
          categoryId: categories[5].id,
          brandId: brands[9].id,
          stock: 60,
          isFeatured: true
        },
        {
          name: 'Razer BlackShark V2 Pro',
          description: 'Auriculares gaming con micrófono removible y hasta 24 horas de batería.',
          price: 179.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_632977-MLU77405132762_072024-F.webp',
          categoryId: categories[6].id,
          brandId: brands[10].id,
          stock: 25,
          isFeatured: true
        },
        {
          name: 'Bose SoundLink Revolve+',
          description: 'Altavoz Bluetooth portátil con sonido 360° y hasta 16 horas de reproducción.',
          price: 299.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_784574-MLA84850490995_052025-F.webp',
          categoryId: categories[7].id,
          brandId: brands[7].id,
          stock: 35,
          isFeatured: true
        },
        {
          name: 'Google Pixel 8 Pro',
          description: 'Smartphone con la mejor cámara del mercado y Android puro con actualizaciones garantizadas.',
          price: 999.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_848978-MLA79207772962_092024-F.webp',
          categoryId: categories[0].id,
          brandId: brands[3].id,
          stock: 20,
          isFeatured: false
        },
        {
          name: 'ASUS ROG Strix G16',
          description: 'Laptop gaming con Intel Core i9, NVIDIA RTX 4080 y pantalla de 240Hz.',
          price: 2199.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_886217-MLA88397842437_072025-F.webp',
          categoryId: categories[1].id,
          brandId: brands[6].id,
          stock: 8,
          isFeatured: false
        },
        {
          name: 'Samsung Galaxy Tab S9 Ultra',
          description: 'Tablet Android premium con pantalla de 14.6", S Pen incluido y procesador Snapdragon 8 Gen 2.',
          price: 999.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_997662-MLA81073598953_112024-F.webp',
          categoryId: categories[2].id,
          brandId: brands[1].id,
          stock: 15,
          isFeatured: false
        },
        {
          name: 'Bose QuietComfort 45',
          description: 'Auriculares premium con cancelación de ruido líder en la industria.',
          price: 329.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_683597-MLU79138858307_092024-F.webp',
          categoryId: categories[3].id,
          brandId: brands[7].id,
          stock: 28,
          isFeatured: false
        }
      ]

      // Insertar productos
      await prisma.product.createMany({ data: products })
      console.log('✅ Productos insertados')
    } else {
      console.log('✅ Productos ya existen')
    }

    console.log('🎉 Configuración completada exitosamente!')

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Database setup completed successfully' })
    }

  } catch (error) {
    console.error('❌ Error en la configuración:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  } finally {
    await prisma.$disconnect()
  }
} 