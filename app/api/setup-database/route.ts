import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
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
        prisma.category.create({ data: { name: 'Smartphones', description: 'Teléfonos inteligentes', slug: 'smartphones' } }),
        prisma.category.create({ data: { name: 'Laptops', description: 'Computadoras portátiles', slug: 'laptops' } }),
        prisma.category.create({ data: { name: 'Tablets', description: 'Tablets y iPads', slug: 'tablets' } }),
        prisma.category.create({ data: { name: 'Auriculares', description: 'Auriculares y audífonos', slug: 'auriculares' } }),
        prisma.category.create({ data: { name: 'Smartwatches', description: 'Relojes inteligentes', slug: 'smartwatches' } }),
        prisma.category.create({ data: { name: 'Accesorios', description: 'Accesorios tecnológicos', slug: 'accesorios' } }),
        prisma.category.create({ data: { name: 'Gaming', description: 'Productos para gaming', slug: 'gaming' } }),
        prisma.category.create({ data: { name: 'Audio', description: 'Sistemas de audio', slug: 'audio' } })
      ])

      // Marcas
      const brands = await Promise.all([
        prisma.brand.create({ data: { name: 'Apple', slug: 'apple' } }),
        prisma.brand.create({ data: { name: 'Samsung', slug: 'samsung' } }),
        prisma.brand.create({ data: { name: 'Sony', slug: 'sony' } }),
        prisma.brand.create({ data: { name: 'Google', slug: 'google' } }),
        prisma.brand.create({ data: { name: 'Dell', slug: 'dell' } }),
        prisma.brand.create({ data: { name: 'HP', slug: 'hp' } }),
        prisma.brand.create({ data: { name: 'ASUS', slug: 'asus' } }),
        prisma.brand.create({ data: { name: 'Bose', slug: 'bose' } }),
        prisma.brand.create({ data: { name: 'JBL', slug: 'jbl' } }),
        prisma.brand.create({ data: { name: 'Logitech', slug: 'logitech' } }),
        prisma.brand.create({ data: { name: 'Razer', slug: 'razer' } }),
        prisma.brand.create({ data: { name: 'Microsoft', slug: 'microsoft' } }),
        prisma.brand.create({ data: { name: 'Lenovo', slug: 'lenovo' } }),
        prisma.brand.create({ data: { name: 'Acer', slug: 'acer' } }),
        prisma.brand.create({ data: { name: 'OnePlus', slug: 'oneplus' } })
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
          isFeatured: true,
          slug: 'iphone-15-pro-max',
          sku: 'IPH15PM-001'
        },
        {
          name: 'Samsung Galaxy S24 Ultra',
          description: 'Flagship de Samsung con S Pen integrado, cámara de 200MP y pantalla Dynamic AMOLED 2X.',
          price: 1299.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_713598-MLA81067005837_112024-F.webp',
          categoryId: categories[0].id,
          brandId: brands[1].id,
          stock: 30,
          isFeatured: true,
          slug: 'samsung-galaxy-s24-ultra',
          sku: 'SGS24U-001'
        },
        {
          name: 'MacBook Pro 16" M3 Max',
          description: 'La laptop más potente de Apple con chip M3 Max, hasta 128GB de memoria unificada.',
          price: 3499.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_747133-MLA74676488096_022024-F.webp',
          categoryId: categories[1].id,
          brandId: brands[0].id,
          stock: 10,
          isFeatured: true,
          slug: 'macbook-pro-16-m3-max',
          sku: 'MBP16M3-001'
        },
        {
          name: 'Dell XPS 15',
          description: 'Laptop premium con pantalla OLED 4K, Intel Core i9 y NVIDIA RTX 4070.',
          price: 2499.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_916799-MLA54007954186_022023-F.webp',
          categoryId: categories[1].id,
          brandId: brands[4].id,
          stock: 12,
          isFeatured: true,
          slug: 'dell-xps-15',
          sku: 'DXPS15-001'
        },
        {
          name: 'iPad Pro 12.9" M2',
          description: 'Tablet profesional con chip M2, pantalla Liquid Retina XDR y soporte para Apple Pencil.',
          price: 1099.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_640783-MLA83007364576_032025-F.webp',
          categoryId: categories[2].id,
          brandId: brands[0].id,
          stock: 22,
          isFeatured: true,
          slug: 'ipad-pro-12-9-m2',
          sku: 'IPAD12M2-001'
        },
        {
          name: 'AirPods Pro 2',
          description: 'Auriculares inalámbricos con cancelación activa de ruido y audio espacial.',
          price: 249.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_745973-MLA75078108915_032024-F.webp',
          categoryId: categories[3].id,
          brandId: brands[0].id,
          stock: 50,
          isFeatured: true,
          slug: 'airpods-pro-2',
          sku: 'APP2-001'
        },
        {
          name: 'Sony WH-1000XM5',
          description: 'Los auriculares con mejor cancelación de ruido del mercado y 30 horas de batería.',
          price: 399.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_794797-MLA50436072460_062022-F.webp',
          categoryId: categories[3].id,
          brandId: brands[2].id,
          stock: 35,
          isFeatured: true,
          slug: 'sony-wh-1000xm5',
          sku: 'SWHXM5-001'
        },
        {
          name: 'Apple Watch Series 9',
          description: 'Smartwatch con monitor cardíaco, GPS y hasta 18 horas de batería.',
          price: 399.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_761220-MLA72067378786_102023-F.webp',
          categoryId: categories[4].id,
          brandId: brands[0].id,
          stock: 40,
          isFeatured: true,
          slug: 'apple-watch-series-9',
          sku: 'AWS9-001'
        },
        {
          name: 'Logitech MX Master 3S',
          description: 'Mouse inalámbrico premium con sensor de 8000 DPI y hasta 70 días de batería.',
          price: 99.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_671941-MLU72854928744_112023-F.webp',
          categoryId: categories[5].id,
          brandId: brands[9].id,
          stock: 60,
          isFeatured: true,
          slug: 'logitech-mx-master-3s',
          sku: 'LMX3S-001'
        },
        {
          name: 'Razer BlackShark V2 Pro',
          description: 'Auriculares gaming con micrófono removible y hasta 24 horas de batería.',
          price: 179.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_632977-MLU77405132762_072024-F.webp',
          categoryId: categories[6].id,
          brandId: brands[10].id,
          stock: 25,
          isFeatured: true,
          slug: 'razer-blackshark-v2-pro',
          sku: 'RBSV2P-001'
        },
        {
          name: 'Bose SoundLink Revolve+',
          description: 'Altavoz Bluetooth portátil con sonido 360° y hasta 16 horas de reproducción.',
          price: 299.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_784574-MLA84850490995_052025-F.webp',
          categoryId: categories[7].id,
          brandId: brands[7].id,
          stock: 35,
          isFeatured: true,
          slug: 'bose-soundlink-revolve-plus',
          sku: 'BSLRP-001'
        },
        {
          name: 'Google Pixel 8 Pro',
          description: 'Smartphone con la mejor cámara del mercado y Android puro con actualizaciones garantizadas.',
          price: 999.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_848978-MLA79207772962_092024-F.webp',
          categoryId: categories[0].id,
          brandId: brands[3].id,
          stock: 20,
          isFeatured: false,
          slug: 'google-pixel-8-pro',
          sku: 'GP8P-001'
        },
        {
          name: 'ASUS ROG Strix G16',
          description: 'Laptop gaming con Intel Core i9, NVIDIA RTX 4080 y pantalla de 240Hz.',
          price: 2199.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_886217-MLA88397842437_072025-F.webp',
          categoryId: categories[1].id,
          brandId: brands[6].id,
          stock: 8,
          isFeatured: false,
          slug: 'asus-rog-strix-g16',
          sku: 'AROGG16-001'
        },
        {
          name: 'Samsung Galaxy Tab S9 Ultra',
          description: 'Tablet Android premium con pantalla de 14.6", S Pen incluido y procesador Snapdragon 8 Gen 2.',
          price: 999.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_997662-MLA81073598953_112024-F.webp',
          categoryId: categories[2].id,
          brandId: brands[1].id,
          stock: 15,
          isFeatured: false,
          slug: 'samsung-galaxy-tab-s9-ultra',
          sku: 'SGTS9U-001'
        },
        {
          name: 'Bose QuietComfort 45',
          description: 'Auriculares premium con cancelación de ruido líder en la industria.',
          price: 329.99,
          imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_683597-MLU79138858307_092024-F.webp',
          categoryId: categories[3].id,
          brandId: brands[7].id,
          stock: 28,
          isFeatured: false,
          slug: 'bose-quietcomfort-45',
          sku: 'BQC45-001'
        }
      ]

      // Insertar productos
      await prisma.product.createMany({ data: products })
      console.log('✅ Productos insertados')
    } else {
      console.log('✅ Productos ya existen')
    }

    console.log('🎉 Configuración completada exitosamente!')

    return NextResponse.json({ 
      success: true, 
      message: 'Database setup completed successfully',
      productCount: await prisma.product.count()
    })

  } catch (error) {
    console.error('❌ Error en la configuración:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 