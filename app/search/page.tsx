'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useProducts } from '@/hooks/use-products'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Grid3X3, 
  List,
  Package,
  Star,
  TrendingUp,
  Clock
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

interface SearchFilters {
  query: string
  category: string
  brand: string
  minPrice?: number
  maxPrice?: number
  sortBy: 'rating' | 'newest' | 'price' | 'name' | 'popularity'
  inStock: boolean
  onSale: boolean
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: initialQuery,
    category: 'all',
    brand: 'all',
    sortBy: 'popularity',
    inStock: false,
    onSale: false
  })
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [brands, setBrands] = useState<any[]>([])

  // Obtener productos con filtros
  const { products, loading, error, pagination, hasMore, loadMore } = useProducts({
    search: filters.query,
    category: filters.category === 'all' ? undefined : filters.category,
    brand: filters.brand === 'all' ? undefined : filters.brand,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sortBy: filters.sortBy,
    inStock: filters.inStock,
    limit: 15
  })

  // Cargar categorías y marcas
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

    fetchCategories()
    fetchBrands()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // La búsqueda se actualiza automáticamente con el estado
  }

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      query: filters.query,
      category: 'all',
      brand: 'all',
      sortBy: 'popularity',
      inStock: false,
      onSale: false
    })
  }

  const hasActiveFilters = (filters.category && filters.category !== 'all') || (filters.brand && filters.brand !== 'all') || filters.minPrice || filters.maxPrice || filters.inStock || filters.onSale

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {filters.query ? `Resultados para "${filters.query}"` : 'Buscar Productos'}
        </h1>
        <p className="text-muted-foreground">
          {products.length} productos encontrados
        </p>
      </div>

      {/* Search Bar */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos, marcas, categorías..."
                value={filters.query}
                onChange={(e) => handleFilterChange('query', e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-auto">
                    {Object.keys(filters).filter(key => 
                      key !== 'query' && key !== 'sortBy' && filters[key as keyof SearchFilters]
                    ).length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Categorías */}
              <div>
                <Label className="text-sm font-medium">Categoría</Label>
                                 <Select 
                   value={filters.category} 
                   onValueChange={(value: string) => handleFilterChange('category', value)}
                 >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                                     <SelectContent>
                     <SelectItem value="all">Todas las categorías</SelectItem>
                     {categories.filter(category => category.id && category.name).map((category) => (
                       <SelectItem key={category.id} value={category.id}>
                         {category.name} ({category.productCount})
                       </SelectItem>
                     ))}
                   </SelectContent>
                </Select>
              </div>

              {/* Marcas */}
              <div>
                <Label className="text-sm font-medium">Marca</Label>
                                 <Select 
                   value={filters.brand} 
                   onValueChange={(value: string) => handleFilterChange('brand', value)}
                 >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Todas las marcas" />
                  </SelectTrigger>
                                     <SelectContent>
                     <SelectItem value="all">Todas las marcas</SelectItem>
                     {brands.filter(brand => brand.id && brand.name).map((brand) => (
                       <SelectItem key={brand.id} value={brand.id}>
                         {brand.name} ({brand.productCount})
                       </SelectItem>
                     ))}
                   </SelectContent>
                </Select>
              </div>

              {/* Rango de Precios */}
              <div>
                <Label className="text-sm font-medium">Rango de Precios</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Mín"
                      value={filters.minPrice || ''}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <Input
                      type="number"
                      placeholder="Máx"
                      value={filters.maxPrice || ''}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                </div>
              </div>

              {/* Opciones */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="inStock" className="text-sm">Solo en stock</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="onSale"
                    checked={filters.onSale}
                    onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="onSale" className="text-sm">Solo ofertas</Label>
                </div>
              </div>

              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="w-full"
                >
                  Limpiar Filtros
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
                             <Select 
                 value={filters.sortBy} 
                 onValueChange={(value: string) => handleFilterChange('sortBy', value)}
               >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Más relevantes</SelectItem>
                  <SelectItem value="price_asc">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price_desc">Precio: mayor a menor</SelectItem>
                  <SelectItem value="rating">Mejor valorados</SelectItem>
                  <SelectItem value="newest">Más recientes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p>Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p>Error al cargar productos</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar tus filtros de búsqueda
              </p>
              <Button onClick={clearFilters}>
                Limpiar Filtros
              </Button>
            </div>
          ) : (
            <ProductGrid 
              products={products} 
              loading={loading}
              hasMore={hasMore}
              onLoadMore={loadMore}
              className={viewMode === 'list' ? 'grid-cols-1' : ''}
            />
          )}
        </div>
      </div>
    </div>
  )
} 