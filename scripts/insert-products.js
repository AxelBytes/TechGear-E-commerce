const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function insertProducts() {
  try {
    console.log('🌱 Insertando productos en la base de datos...')

    // Crear categorías
    const categories = await Promise.all([
      prisma.category.create({
        data: { name: 'Smartphones', slug: 'smartphones', description: 'Teléfonos inteligentes de última generación' }
      }),
      prisma.category.create({
        data: { name: 'Laptops', slug: 'laptops', description: 'Computadoras portátiles para trabajo y gaming' }
      }),
      prisma.category.create({
        data: { name: 'Tablets', slug: 'tablets', description: 'Tablets para productividad y entretenimiento' }
      }),
      prisma.category.create({
        data: { name: 'Auriculares', slug: 'auriculares', description: 'Auriculares inalámbricos y con cable' }
      }),
      prisma.category.create({
        data: { name: 'Smartwatches', slug: 'smartwatches', description: 'Relojes inteligentes y wearables' }
      }),
      prisma.category.create({
        data: { name: 'Accesorios', slug: 'accesorios', description: 'Accesorios y periféricos tecnológicos' }
      }),
      prisma.category.create({
        data: { name: 'Gaming', slug: 'gaming', description: 'Productos especializados para gaming' }
      }),
      prisma.category.create({
        data: { name: 'Audio', slug: 'audio', description: 'Sistemas de audio y altavoces' }
      })
    ])

    console.log('✅ Categorías creadas:', categories.length)

    // Crear marcas
    const brands = await Promise.all([
      prisma.brand.create({ data: { name: 'Apple', slug: 'apple' } }),
      prisma.brand.create({ data: { name: 'Samsung', slug: 'samsung' } }),
      prisma.brand.create({ data: { name: 'Sony', slug: 'sony' } }),
      prisma.brand.create({ data: { name: 'Microsoft', slug: 'microsoft' } }),
      prisma.brand.create({ data: { name: 'Dell', slug: 'dell' } }),
      prisma.brand.create({ data: { name: 'HP', slug: 'hp' } }),
      prisma.brand.create({ data: { name: 'Lenovo', slug: 'lenovo' } }),
      prisma.brand.create({ data: { name: 'ASUS', slug: 'asus' } }),
      prisma.brand.create({ data: { name: 'Bose', slug: 'bose' } }),
      prisma.brand.create({ data: { name: 'JBL', slug: 'jbl' } }),
      prisma.brand.create({ data: { name: 'Logitech', slug: 'logitech' } }),
      prisma.brand.create({ data: { name: 'Razer', slug: 'razer' } }),
      prisma.brand.create({ data: { name: 'Xiaomi', slug: 'xiaomi' } }),
      prisma.brand.create({ data: { name: 'Huawei', slug: 'huawei' } }),
      prisma.brand.create({ data: { name: 'Google', slug: 'google' } })
    ])

    console.log('✅ Marcas creadas:', brands.length)

    // Productos principales con imágenes específicas y profesionales
    const products = [
      {
        name: 'iPhone 15 Pro Max',
        description: 'El iPhone más avanzado con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR de 6.7".',
        price: 1199.99,
        imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[0].id,
        brandId: brands[0].id,
        stock: 25,
        isFeatured: true
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Flagship de Samsung con S Pen integrado, cámara de 200MP y pantalla Dynamic AMOLED 2X.',
        price: 1299.99,
        imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[0].id,
        brandId: brands[1].id,
        stock: 30,
        isFeatured: true
      },
      {
        name: 'MacBook Pro 16" M3 Max',
        description: 'La laptop más potente de Apple con chip M3 Max, hasta 128GB de memoria unificada.',
        price: 3499.99,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[1].id,
        brandId: brands[0].id,
        stock: 10,
        isFeatured: true
      },
      {
        name: 'Dell XPS 15',
        description: 'Laptop premium con pantalla OLED 4K, Intel Core i9 y NVIDIA RTX 4070.',
        price: 2499.99,
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[1].id,
        brandId: brands[4].id,
        stock: 12,
        isFeatured: true
      },
      {
        name: 'iPad Pro 12.9" M2',
        description: 'Tablet profesional con chip M2, pantalla Liquid Retina XDR y soporte para Apple Pencil.',
        price: 1099.99,
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[2].id,
        brandId: brands[0].id,
        stock: 22,
        isFeatured: true
      },
      {
        name: 'AirPods Pro 2',
        description: 'Auriculares inalámbricos con cancelación activa de ruido y audio espacial.',
        price: 249.99,
        imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[3].id,
        brandId: brands[0].id,
        stock: 50,
        isFeatured: true
      },
      {
        name: 'Sony WH-1000XM5',
        description: 'Los auriculares con mejor cancelación de ruido del mercado y 30 horas de batería.',
        price: 399.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[3].id,
        brandId: brands[2].id,
        stock: 35,
        isFeatured: true
      },
      {
        name: 'Apple Watch Series 9',
        description: 'Smartwatch con monitor cardíaco, GPS y hasta 18 horas de batería.',
        price: 399.99,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[4].id,
        brandId: brands[0].id,
        stock: 40,
        isFeatured: true
      },
      {
        name: 'Logitech MX Master 3S',
        description: 'Mouse inalámbrico premium con sensor de 8000 DPI y hasta 70 días de batería.',
        price: 99.99,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[5].id,
        brandId: brands[10].id,
        stock: 60,
        isFeatured: true
      },
      {
        name: 'Razer BlackShark V2 Pro',
        description: 'Auriculares gaming con micrófono removible y hasta 24 horas de batería.',
        price: 179.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[6].id,
        brandId: brands[11].id,
        stock: 25,
        isFeatured: true
      },
      {
        name: 'Bose SoundLink Revolve+',
        description: 'Altavoz Bluetooth portátil con sonido 360° y hasta 16 horas de reproducción.',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[7].id,
        brandId: brands[8].id,
        stock: 35,
        isFeatured: true
      },
      {
        name: 'Google Pixel 8 Pro',
        description: 'Smartphone con la mejor cámara del mercado y Android puro con actualizaciones garantizadas.',
        price: 999.99,
        imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[0].id,
        brandId: brands[14].id,
        stock: 20,
        isFeatured: false
      },
      {
        name: 'ASUS ROG Strix G16',
        description: 'Laptop gaming con Intel Core i9, NVIDIA RTX 4080 y pantalla de 240Hz.',
        price: 2199.99,
        imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[1].id,
        brandId: brands[7].id,
        stock: 8,
        isFeatured: false
      },
      {
        name: 'Samsung Galaxy Tab S9 Ultra',
        description: 'Tablet Android premium con pantalla de 14.6", S Pen incluido y procesador Snapdragon 8 Gen 2.',
        price: 999.99,
        imageUrl: 'https://images.unsplash.com/photo-1585790050237-1f3b3c414635?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[2].id,
        brandId: brands[1].id,
        stock: 15,
        isFeatured: false
      },
      {
        name: 'Bose QuietComfort 45',
        description: 'Auriculares premium con cancelación de ruido líder en la industria.',
        price: 329.99,
        imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop&crop=center',
        categoryId: categories[3].id,
        brandId: brands[8].id,
        stock: 28,
        isFeatured: false
      }
    ]

    // Insertar productos
    for (const product of products) {
      await prisma.product.create({
        data: product
      })
    }

    console.log('✅ Productos insertados:', products.length)
    console.log('🎉 Base de datos poblada exitosamente!')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

insertProducts() 