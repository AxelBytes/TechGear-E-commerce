'use client'

import { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { Button } from '@/components/ui/button'
import { Loader2, Package } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  hasMore?: boolean
  onLoadMore?: () => void
  className?: string
}

export function ProductGrid({ 
  products, 
  loading = false, 
  hasMore = false, 
  onLoadMore,
  className = '' 
}: ProductGridProps) {
  if (products.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <Package className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
        <p className="text-muted-foreground">
          Intenta ajustar los filtros o buscar algo diferente.
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && onLoadMore && (
        <div className="flex justify-center py-8">
          <Button onClick={onLoadMore} variant="outline">
            Cargar más productos
          </Button>
        </div>
      )}
    </div>
  )
}