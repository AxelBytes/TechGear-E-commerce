'use client'

import { useState, useEffect } from 'react'
import { useProducts } from '@/hooks/use-products'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, Filter } from 'lucide-react'

interface Brand {
  id: string
  name: string
  slug: string
  description?: string
  logoUrl?: string
  productCount: number
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const { products, loading, error } = useProducts({ 
    brand: selectedBrand || undefined,
    limit: 12 
  })

  // Cargar marcas desde la API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/brands')
        if (response.ok) {
          const data = await response.json()
          setBrands(data.brands)
        }
      } catch (error) {
        console.error('Error fetching brands:', error)
      }
    }
    fetchBrands()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Marcas</h1>
        <p className="text-lg text-muted-foreground">
          Descubre productos de las mejores marcas
        </p>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {brands.map((brand) => (
          <Card 
            key={brand.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedBrand === brand.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedBrand(brand.id === selectedBrand ? null : brand.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{brand.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {brand.description || 'Descripción de la marca'}
              </p>
              <Badge variant="secondary">
                {brand.productCount} productos
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Brand Products */}
      {selectedBrand && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Productos de {brands.find(b => b.id === selectedBrand)?.name}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => setSelectedBrand(null)}
            >
              Ver todas las marcas
            </Button>
          </div>
          
          <ProductGrid 
            products={products} 
            loading={loading}
            className="mb-8"
          />
        </div>
      )}

      {/* All Products (when no brand selected) */}
      {!selectedBrand && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Todos los Productos</h2>
          </div>
          
          <ProductGrid 
            products={products} 
            loading={loading}
            className="mb-8"
          />
        </div>
      )}
    </div>
  )
} 