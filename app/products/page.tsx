'use client'

import { useState } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { useProducts } from '@/hooks/use-products'
import { ProductFilters } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Grid, List } from 'lucide-react'

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: undefined,
    brand: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: 'newest',
    sortOrder: 'desc'
  })

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const { products, loading, error, pagination, hasMore, refetch, loadMore } = useProducts({
    ...filters,
    limit: 15
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      
      if (key === 'minPrice' || key === 'maxPrice') {
        const numValue = value ? parseFloat(value) : undefined
        if (key === 'minPrice') {
          newFilters.minPrice = numValue
        } else {
          newFilters.maxPrice = numValue
        }
      } else if (key === 'category' && value === 'all') {
        newFilters.category = undefined
      } else if (key === 'brand' && value === 'all') {
        newFilters.brand = undefined
      } else {
        newFilters[key as keyof ProductFilters] = value as any
      }
      
      return newFilters
    })
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: undefined,
      brand: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: 'newest',
      sortOrder: 'desc'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">Productos</h1>
              <p className="text-muted-foreground mt-2">
                {pagination ? `${pagination.total} productos encontrados` : 'Cargando...'}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Buscar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar productos..."
                      value={filters.search || ''}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Categoría</label>
                  <Select value={filters.category || 'all'} onValueChange={(value: string) => handleFilterChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="smartphones">Smartphones</SelectItem>
                      <SelectItem value="laptops">Laptops</SelectItem>
                      <SelectItem value="tablets">Tablets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Marca</label>
                  <Select value={filters.brand || 'all'} onValueChange={(value: string) => handleFilterChange('brand', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las marcas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las marcas</SelectItem>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="samsung">Samsung</SelectItem>
                      <SelectItem value="dell">Dell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Rango de Precio</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Mín"
                      type="number"
                      value={filters.minPrice || ''}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                    <Input
                      placeholder="Máx"
                      type="number"
                      value={filters.maxPrice || ''}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                  <Select value={filters.sortBy || 'newest'} onValueChange={(value: string) => handleFilterChange('sortBy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Más recientes</SelectItem>
                      <SelectItem value="price">Precio</SelectItem>
                      <SelectItem value="name">Nombre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Limpiar Filtros
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {error && (
              <div className="text-center py-8">
                <p className="text-destructive">Error: {error}</p>
                <Button onClick={refetch} className="mt-4">
                  Reintentar
                </Button>
              </div>
            )}

            <ProductGrid 
              products={products} 
              loading={loading}
              hasMore={hasMore}
              onLoadMore={loadMore}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 