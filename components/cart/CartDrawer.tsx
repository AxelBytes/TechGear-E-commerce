'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Package, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useCartStore } from '@/store/cart-store'
import { useUIStore } from '@/store/ui-store'
import { useAuthStore } from '@/store/auth-store'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function CartDrawer() {
  const { 
    items, 
    itemCount, 
    subtotal, 
    isLoading,
    removeItem, 
    updateQuantity,
    loadCart,
    syncWithServer,
    clearCart
  } = useCartStore()
  const { isCartDrawerOpen, setCartDrawerOpen } = useUIStore()
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart(user.id)
      syncWithServer(user.id)
    }
  }, [isAuthenticated, user, loadCart, syncWithServer])

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(itemId)
      toast.success('Producto eliminado del carrito')
    } else {
      await updateQuantity(itemId, newQuantity)
      toast.success('Cantidad actualizada')
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    await removeItem(itemId)
    toast.success('Producto eliminado del carrito')
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para continuar')
      return
    }
    
    if (items.length === 0) {
      toast.error('Tu carrito está vacío')
      return
    }

    setCartDrawerOpen(false)
    router.push('/checkout')
  }

  const handleClearCart = async () => {
    await clearCart()
    toast.success('Carrito vaciado')
  }

  return (
    <Sheet open={isCartDrawerOpen} onOpenChange={setCartDrawerOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Carrito de Compras
            {itemCount > 0 && (
              <Badge variant="secondary">{itemCount} items</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
              <p className="text-muted-foreground mb-4">
                Agrega algunos productos para comenzar
              </p>
              <Button asChild onClick={() => setCartDrawerOpen(false)}>
                <Link href="/products">
                  Explorar Productos
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    {item.product?.imageUrl ? (
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-muted">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.product?.name || 'Producto'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      ${Number(item.price).toFixed(2)}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={isLoading}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={isLoading}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="font-medium text-sm">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={isLoading}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleClearCart}
                disabled={isLoading}
              >
                Vaciar Carrito
              </Button>
              <Button 
                className="flex-1"
                onClick={handleCheckout}
                disabled={isLoading || !isAuthenticated}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {isAuthenticated ? 'Pagar' : 'Iniciar Sesión'}
              </Button>
            </div>
            
            {!isAuthenticated && (
              <p className="text-xs text-muted-foreground text-center">
                Inicia sesión para continuar con la compra
              </p>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}