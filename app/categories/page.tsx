'use client'

import { useState, useEffect } from 'react'
import { useProducts } from '@/hooks/use-products'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Package, Filter } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  imageUrl?: string
  productCount: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { products, loading, error } = useProducts({ 
    category: selectedCategory || undefined,
    limit: 12 
  })

  // Cargar categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data.categories)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Categorías</h1>
        <p className="text-lg text-muted-foreground">
          Explora productos por categoría
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedCategory === category.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {category.description || 'Descripción de la categoría'}
              </p>
              <Badge variant="secondary">
                {category.productCount} productos
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Category Products */}
      {selectedCategory && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Productos en {categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => setSelectedCategory(null)}
            >
              Ver todas las categorías
            </Button>
          </div>
          
          <ProductGrid 
            products={products} 
            loading={loading}
            className="mb-8"
          />
        </div>
      )}

      {/* All Products (when no category selected) */}
      {!selectedCategory && (
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