import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Configurar la ruta como dinámica para evitar errores de static generation
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parámetros de paginación
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = (page - 1) * limit

    // Parámetros de filtros
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined
    const inStock = searchParams.get('inStock') === 'true'
    const featured = searchParams.get('featured') === 'true'
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Construir query base
    const where: any = {}

    // Aplicar filtros
    if (category) {
      where.categoryId = category
    }

    if (brand) {
      where.brandId = brand
    }

    if (minPrice !== undefined) {
      where.price = { ...where.price, gte: minPrice }
    }

    if (maxPrice !== undefined) {
      where.price = { ...where.price, lte: maxPrice }
    }

    if (inStock) {
      where.stock = { gt: 0 }
    }

    if (featured) {
      where.isFeatured = true
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { name: { contains: search, mode: 'insensitive' } } },
        { brand: { name: { contains: search, mode: 'insensitive' } } },
      ]
    }

    // Construir ordenamiento
    const orderBy: any = {}
    if (sortBy === 'price') {
      orderBy.price = sortOrder
    } else if (sortBy === 'name') {
      orderBy.name = sortOrder
    } else if (sortBy === 'newest') {
      orderBy.createdAt = sortOrder
    } else {
      orderBy.createdAt = 'desc'
    }

    // Obtener productos con relaciones
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          brand: true,
        },
        orderBy,
        skip: offset,
        take: limit,
      }),
      prisma.product.count({ where })
    ])

    // Procesar productos
    const processedProducts = products.map((product: any) => ({
      ...product,
      avgRating: 4.5, // Rating mock para demostración
      reviewCount: Math.floor(Math.random() * 100) + 10, // Reviews mock
    }))

    // Calcular paginación
    const totalPages = Math.ceil(totalCount / limit)
    const pagination = {
      page,
      limit,
      total: totalCount,
      totalPages,
    }

    return NextResponse.json({
      products: processedProducts,
      pagination,
    })

  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 