'use client'

import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Package, ArrowLeft, Eye, Download } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import jsPDF from 'jspdf'

export default function OrdersPage() {
  const { user } = useAuthStore()

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-4">Necesitas iniciar sesión para ver tus órdenes.</p>
          <Button asChild>
            <Link href="/auth/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Datos de ejemplo - en una aplicación real vendrían de la API
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'completed',
      total: 299.99,
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 149.99,
      items: 1
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'pending',
      total: 89.99,
      items: 2
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completada</Badge>
      case 'shipped':
        return <Badge variant="default" className="bg-blue-500">Enviada</Badge>
      case 'pending':
        return <Badge variant="secondary">Pendiente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const downloadInvoice = (order: any) => {
    // Crear PDF
    const doc = new jsPDF()
    
    // Color de fondo para el header
    doc.setFillColor(59, 130, 246) // Blue-500
    doc.rect(0, 0, 210, 40, 'F')
    
    // Logo/Título en el header
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.text('TECHGEAR', 105, 20, { align: 'center' })
    doc.setFontSize(12)
    doc.text('Tu tienda de tecnología de confianza', 105, 30, { align: 'center' })
    
    // Información de la empresa (izquierda)
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.text('TechGear S.A.', 20, 55)
    doc.text('Av. Tecnología 123, Ciudad Tech', 20, 62)
    doc.text('CP 12345, Argentina', 20, 69)
    doc.text('Tel: (123) 456-7890', 20, 76)
    doc.text('Email: info@techgear.com', 20, 83)
    
    // Información del cliente (derecha)
    doc.setFontSize(12)
    doc.text('FACTURA PARA:', 120, 55)
    doc.setFontSize(10)
    doc.text(`${user?.firstName} ${user?.lastName}`, 120, 65)
    doc.text(user?.email || '', 120, 72)
    doc.text(`Fecha: ${new Date(order.date).toLocaleDateString('es-ES')}`, 120, 79)
    doc.text(`Orden: ${order.id}`, 120, 86)
    
    // Línea separadora
    doc.setDrawColor(59, 130, 246)
    doc.setLineWidth(0.5)
    doc.line(20, 95, 190, 95)
    
    // Tabla de productos con diseño mejorado
    doc.setFillColor(248, 250, 252) // Gray-50
    doc.rect(20, 105, 170, 15, 'F')
    
    doc.setFontSize(12)
    doc.setTextColor(59, 130, 246)
    doc.text('PRODUCTOS', 20, 115)
    doc.text('Cantidad', 100, 115)
    doc.text('Precio Unit.', 140, 115)
    doc.text('Total', 170, 115)
    
    // Línea bajo el header de la tabla
    doc.setDrawColor(200, 200, 200)
    doc.line(20, 120, 190, 120)
    
    // Productos (ejemplo con múltiples productos)
    const products = [
      { name: 'iPhone 15 Pro', price: order.total / order.items, quantity: order.items }
    ]
    
    let yPos = 130
    products.forEach((product, index) => {
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      doc.text(product.name, 25, yPos)
      doc.text(product.quantity.toString(), 100, yPos)
      doc.text(`$${product.price.toFixed(2)}`, 140, yPos)
      doc.text(`$${(product.price * product.quantity).toFixed(2)}`, 170, yPos)
      yPos += 8
    })
    
    // Línea separadora antes de totales
    doc.setDrawColor(200, 200, 200)
    doc.line(20, yPos + 5, 190, yPos + 5)
    
    // Totales con diseño mejorado
    const subtotal = order.total * 0.9
    const iva = order.total * 0.1
    
    doc.setFontSize(12)
    doc.setTextColor(59, 130, 246)
    doc.text('RESUMEN DE PAGO', 20, yPos + 20)
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.text('Subtotal:', 120, yPos + 20)
    doc.text(`$${subtotal.toFixed(2)}`, 170, yPos + 20)
    
    doc.text('IVA (10%):', 120, yPos + 27)
    doc.text(`$${iva.toFixed(2)}`, 170, yPos + 27)
    
    // Total final destacado
    doc.setFillColor(59, 130, 246)
    doc.rect(115, yPos + 30, 75, 12, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(14)
    doc.text('TOTAL:', 120, yPos + 38)
    doc.text(`$${order.total.toFixed(2)}`, 170, yPos + 38)
    
    // Pie de página con diseño
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(8)
    doc.text('Gracias por elegir TechGear para tus necesidades tecnológicas', 105, 250, { align: 'center' })
    doc.text('www.techgear.com | info@techgear.com | (123) 456-7890', 105, 257, { align: 'center' })
    
    // Descargar PDF
    doc.save(`factura-${order.id}-${new Date().toISOString().split('T')[0]}.pdf`)
    
    toast.success('Factura PDF descargada exitosamente')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold">Mis Órdenes</h1>
          <p className="text-muted-foreground">Historial de todas tus compras</p>
        </div>

        {/* Estadísticas */}
        <div className="grid gap-4 mb-8 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total de Órdenes</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Completadas</p>
                  <p className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Pendientes</p>
                  <p className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Órdenes */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No tienes órdenes aún</h3>
                <p className="text-muted-foreground mb-4">
                  Cuando hagas tu primera compra, aparecerá aquí.
                </p>
                <Button asChild>
                  <Link href="/products">Explorar Productos</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.items} {order.items === 1 ? 'producto' : 'productos'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                        {getStatusBadge(order.status)}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                        {order.status === 'completed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => downloadInvoice(order)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Factura
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 