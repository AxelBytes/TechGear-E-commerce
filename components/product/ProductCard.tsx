'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@/types'
import { useCartStore } from '@/store/cart-store'
import { useAuthStore } from '@/store/auth-store'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()

  const primaryImage = product.imageUrl
  const discountPercentage = 0 // Sin descuentos por ahora

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (product.stock <= 0) {
      toast.error('Producto sin stock')
      return
    }

    setIsLoading(true)
    try {
      await addItem(product, 1)
      toast.success('Producto agregado al carrito')
    } catch (error) {
      toast.error('Error al agregar al carrito')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar a favoritos')
      return
    }

    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Eliminado de favoritos' : 'Agregado a favoritos')
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : i < rating
            ? 'fill-yellow-400/50 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isFeatured && (
              <Badge variant="secondary" className="text-xs">
                Destacado
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discountPercentage}%
              </Badge>
            )}
            {product.stock <= 0 && (
              <Badge variant="outline" className="text-xs bg-background">
                Sin Stock
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8"
              onClick={handleWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <Button
              className="w-full rounded-none"
              onClick={handleAddToCart}
              disabled={isLoading || product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isLoading ? 'Agregando...' : 'Agregar al Carrito'}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-muted-foreground mb-1">
              {product.brand.name}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.avgRating && product.reviewCount ? (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {renderStars(product.avgRating)}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>
          ) : null}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              ${Number(product.price).toFixed(2)}
            </span>
            {/* Precio original removido por simplicidad */}
          </div>

          {/* Stock Status */}
          <div className="mt-2">
            {product.stock > 0 ? (
              <p className="text-xs text-green-600">
                ✓ En stock ({product.stock} disponibles)
              </p>
            ) : (
              <p className="text-xs text-red-600">
                ✗ Sin stock
              </p>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}