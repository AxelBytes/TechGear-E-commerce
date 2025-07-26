'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Truck, Shield, Headphones, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductGrid } from '@/components/product/ProductGrid'
import { useProducts } from '@/hooks/use-products'

export default function Home() {
  const { products: featuredProducts, loading } = useProducts({ 
    featured: true, 
    limit: 15 
  })
  
  const [categories, setCategories] = useState<any[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  // Cargar categorías reales desde la API
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
      } finally {
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const features = [
    {
      icon: Truck,
      title: 'Envío Gratis',
      description: 'En compras mayores a $50'
    },
    {
      icon: Shield,
      title: 'Garantía Extendida',
      description: 'Hasta 2 años de garantía'
    },
    {
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Atención al cliente siempre'
    },
    {
      icon: Package,
      title: 'Devoluciones Fáciles',
      description: '30 días para devolver'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              ✨ Nuevos productos cada semana
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              La Mejor Tecnología
              <span className="block text-yellow-400">a Tu Alcance</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">
              Descubre productos de última generación con precios increíbles y servicio excepcional
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/products">
                  Explorar Productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/deals">
                  Ver Ofertas
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Explora por Categorías
            </h2>
            <p className="text-lg text-muted-foreground">
              Encuentra exactamente lo que necesitas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-square bg-muted animate-pulse" />
                </Card>
              ))
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <Link key={category.id} href={`/categories?category=${category.id}`}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-square">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                      <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white">
                        <Package className="h-12 w-12 mb-4 opacity-80" />
                        <h3 className="text-xl font-bold mb-1 text-center">{category.name}</h3>
                        <p className="text-sm opacity-90">{category.productCount} productos</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hay categorías disponibles</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-muted-foreground">
              Los más populares y mejor valorados
            </p>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            loading={loading}
            className="mb-8"
          />
          
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/products">
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Mantente Actualizado
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Suscríbete y recibe ofertas exclusivas y novedades tecnológicas
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-2 rounded-md text-foreground"
            />
            <Button variant="secondary">
              Suscribirse
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
