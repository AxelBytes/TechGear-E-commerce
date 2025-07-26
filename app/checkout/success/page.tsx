'use client'

import Link from 'next/link'
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle className="h-8 w-8" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">¡Pago Exitoso!</h1>
          <p className="text-muted-foreground mb-6">
            Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación pronto.
          </p>
          
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-primary" />
                <span className="font-medium">Número de Pedido</span>
              </div>
              <p className="text-sm text-muted-foreground">
                #ORD-{Date.now().toString().slice(-8)}
              </p>
            </div>
            
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Volver al Inicio
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Seguir Comprando
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 