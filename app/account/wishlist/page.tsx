'use client'

import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, ArrowLeft, ShoppingCart, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export default function WishlistPage() {
  const { user } = useAuthStore()
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999.99,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      category: 'Smartphones',
      inStock: true
    },
    {
      id: 2,
      name: 'MacBook Air M2',
      price: 1199.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      category: 'Laptops',
      inStock: true
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      category: 'Audio',
      inStock: false
    }
  ])

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-4">Necesitas iniciar sesión para ver tu lista de deseos.</p>
          <Button asChild>
            <Link href="/auth/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </div>
    )
  }

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
    toast.success('Producto eliminado de la lista de deseos')
  }

  const addToCart = (item: any) => {
    // Aquí se integraría con el store del carrito
    toast.success(`${item.name} agregado al carrito`)
  }

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/account">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Mi Cuenta
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold">Lista de Deseos</h1>
          <p className="text-muted-foreground">Guarda tus productos favoritos para comprarlos después</p>
        </div>

        {/* Estadísticas */}
        <div className="grid gap-4 mb-8 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total de Productos</p>
                  <p className="text-2xl font-bold">{wishlistItems.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Disponibles</p>
                  <p className="text-2xl font-bold">
                    {wishlistItems.filter(item => item.inStock).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Productos */}
        <div className="space-y-4">
          {wishlistItems.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Tu lista de deseos está vacía</h3>
                <p className="text-muted-foreground mb-4">
                  Agrega productos que te gusten para verlos aquí.
                </p>
                <Button asChild>
                  <Link href="/products">Explorar Productos</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {!item.inStock && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary">Agotado</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-lg font-bold text-primary mb-3">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        disabled={!item.inStock}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        disabled={!item.inStock}
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Agregar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Acciones */}
        {wishlistItems.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button size="lg" className="px-8">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Agregar Todo al Carrito
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 