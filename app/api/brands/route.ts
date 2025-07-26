import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    const processedBrands = brands.map((brand: any) => ({
      id: brand.id,
      name: brand.name,
      productCount: brand._count.products,
    }))

    return NextResponse.json({
      brands: processedBrands,
    })

  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 