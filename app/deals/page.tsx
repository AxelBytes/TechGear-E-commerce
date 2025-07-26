'use client'

import { useProducts } from '@/hooks/use-products'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Flame, Percent, Clock } from 'lucide-react'

export default function DealsPage() {
  const { products, loading, error } = useProducts({ 
    featured: true,
    limit: 20 
  })

  // Mostrar productos destacados como ofertas
  const discountedProducts = products.filter(product => product.isFeatured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Flame className="h-8 w-8 text-red-500" />
          <h1 className="text-4xl font-bold">Ofertas Especiales</h1>
          <Flame className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-lg text-muted-foreground mb-6">
          ¡Aprovecha los mejores descuentos en tecnología!
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Percent className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Hasta 50% OFF</span>
              </div>
              <p className="text-sm text-muted-foreground">Descuentos increíbles</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className="font-semibold">Tiempo Limitado</span>
              </div>
              <p className="text-sm text-muted-foreground">Ofertas por tiempo limitado</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-red-500" />
                <span className="font-semibold">{discountedProducts.length} Ofertas</span>
              </div>
              <p className="text-sm text-muted-foreground">Productos en descuento</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Deals Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">🔥 Flash Sale 🔥</h2>
          <p className="text-xl mb-6">
            ¡Descuentos increíbles en productos seleccionados!
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            ¡No te lo pierdas!
          </Badge>
        </div>
      </div>

      {/* Products with Discounts */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Flame className="h-6 w-6 text-red-500" />
          <h2 className="text-2xl font-bold">Productos con Descuento</h2>
          <Badge variant="destructive" className="ml-2">
            {discountedProducts.length} ofertas
          </Badge>
        </div>
        
        {discountedProducts.length > 0 ? (
          <ProductGrid 
            products={discountedProducts} 
            loading={loading}
            className="mb-8"
          />
        ) : (
          <div className="text-center py-12">
            <Flame className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No hay ofertas disponibles</h3>
            <p className="text-muted-foreground">
              Vuelve más tarde para ver nuevas ofertas
            </p>
          </div>
        )}
      </div>

      {/* All Featured Products */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Percent className="h-6 w-6 text-green-500" />
          <h2 className="text-2xl font-bold">Todos los Productos Destacados</h2>
        </div>
        
        <ProductGrid 
          products={products} 
          loading={loading}
          className="mb-8"
        />
      </div>
    </div>
  )
} 