'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Package, 
  Star,
  Eye,
  Heart,
  MessageSquare,
  Settings,
  Plus,
  Edit,
  Trash2,
  Download,
  Filter
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { toast } from 'sonner'
import jsPDF from 'jspdf'
import { useAuthStore } from '@/store/auth-store'

// Datos mock para el dashboard
const salesData = [
  { name: 'Ene', ventas: 4000, pedidos: 2400, usuarios: 2400 },
  { name: 'Feb', ventas: 3000, pedidos: 1398, usuarios: 2210 },
  { name: 'Mar', ventas: 2000, pedidos: 9800, usuarios: 2290 },
  { name: 'Abr', ventas: 2780, pedidos: 3908, usuarios: 2000 },
  { name: 'May', ventas: 1890, pedidos: 4800, usuarios: 2181 },
  { name: 'Jun', ventas: 2390, pedidos: 3800, usuarios: 2500 },
  { name: 'Jul', ventas: 3490, pedidos: 4300, usuarios: 2100 },
]

const topProducts = [
  { name: 'iPhone 15 Pro', ventas: 234, stock: 45, rating: 4.8 },
  { name: 'MacBook Air M2', ventas: 189, stock: 32, rating: 4.9 },
  { name: 'Samsung Galaxy S24', ventas: 156, stock: 28, rating: 4.7 },
  { name: 'iPad Pro 12.9"', ventas: 134, stock: 15, rating: 4.6 },
  { name: 'AirPods Pro', ventas: 98, stock: 67, rating: 4.5 },
]

const categoryData = [
  { name: 'Smartphones', value: 35, color: '#8884d8' },
  { name: 'Laptops', value: 25, color: '#82ca9d' },
  { name: 'Tablets', value: 20, color: '#ffc658' },
  { name: 'Accesorios', value: 15, color: '#ff7300' },
  { name: 'Otros', value: 5, color: '#00C49F' },
]

const recentOrders = [
  { id: '#ORD-001', cliente: 'Juan Pérez', total: 1299.99, status: 'Entregado', fecha: '2024-01-15' },
  { id: '#ORD-002', cliente: 'María García', total: 899.99, status: 'En proceso', fecha: '2024-01-14' },
  { id: '#ORD-003', cliente: 'Carlos López', total: 599.99, status: 'Pendiente', fecha: '2024-01-13' },
  { id: '#ORD-004', cliente: 'Ana Martínez', total: 1499.99, status: 'Entregado', fecha: '2024-01-12' },
  { id: '#ORD-005', cliente: 'Luis Rodríguez', total: 799.99, status: 'En proceso', fecha: '2024-01-11' },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const { user } = useAuthStore()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregado': return 'bg-green-100 text-green-800'
      case 'En proceso': return 'bg-blue-100 text-blue-800'
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const exportReport = () => {
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
    doc.text('Reporte de Administración', 105, 30, { align: 'center' })
    
    // Información del reporte
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, 55)
    doc.text(`Hora: ${new Date().toLocaleTimeString('es-ES')}`, 20, 62)
    doc.text(`Generado por: ${user?.firstName} ${user?.lastName}`, 20, 69)
    
    // Línea separadora
    doc.setDrawColor(59, 130, 246)
    doc.setLineWidth(0.5)
    doc.line(20, 80, 190, 80)
    
    // Métricas principales con diseño mejorado
    doc.setFillColor(248, 250, 252) // Gray-50
    doc.rect(20, 90, 170, 15, 'F')
    
    doc.setFontSize(14)
    doc.setTextColor(59, 130, 246)
    doc.text('MÉTRICAS PRINCIPALES', 20, 100)
    
    // Línea bajo el header
    doc.setDrawColor(200, 200, 200)
    doc.line(20, 105, 190, 105)
    
    // Métricas en formato tabla
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.text('Ingresos Totales:', 25, 120)
    doc.text('$45,231.89', 170, 120)
    
    doc.text('Pedidos:', 25, 130)
    doc.text('2,350', 170, 130)
    
    doc.text('Usuarios Activos:', 25, 140)
    doc.text('12,234', 170, 140)
    
    doc.text('Productos:', 25, 150)
    doc.text('573', 170, 150)
    
    // Línea separadora
    doc.setDrawColor(200, 200, 200)
    doc.line(20, 160, 190, 160)
    
    // Productos más vendidos
    doc.setFillColor(248, 250, 252)
    doc.rect(20, 170, 170, 15, 'F')
    
    doc.setFontSize(14)
    doc.setTextColor(59, 130, 246)
    doc.text('PRODUCTOS MÁS VENDIDOS', 20, 180)
    
    doc.setDrawColor(200, 200, 200)
    doc.line(20, 185, 190, 185)
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    topProducts.forEach((product, index) => {
      const y = 200 + (index * 8)
      doc.text(`${index + 1}. ${product.name}`, 25, y)
      doc.text(`${product.ventas} ventas`, 170, y)
    })
    
    // Línea separadora
    const productsEndY = 200 + (topProducts.length * 8) + 10
    doc.setDrawColor(200, 200, 200)
    doc.line(20, productsEndY, 190, productsEndY)
    
    // Órdenes recientes
    doc.setFillColor(248, 250, 252)
    doc.rect(20, productsEndY + 10, 170, 15, 'F')
    
    doc.setFontSize(14)
    doc.setTextColor(59, 130, 246)
    doc.text('ÓRDENES RECIENTES', 20, productsEndY + 20)
    
    doc.setDrawColor(200, 200, 200)
    doc.line(20, productsEndY + 25, 190, productsEndY + 25)
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    recentOrders.forEach((order, index) => {
      const y = productsEndY + 40 + (index * 8)
      doc.text(`${order.id}`, 25, y)
      doc.text(order.cliente, 60, y)
      doc.text(`$${order.total}`, 120, y)
      doc.text(order.status, 170, y)
    })
    
    // Resumen final
    const ordersEndY = productsEndY + 40 + (recentOrders.length * 8) + 15
    doc.setFillColor(59, 130, 246)
    doc.rect(20, ordersEndY, 170, 20, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.text('RESUMEN DEL PERÍODO', 20, ordersEndY + 8)
    doc.text('Crecimiento: +15.3%', 20, ordersEndY + 16)
    doc.text('Meta alcanzada: 89%', 120, ordersEndY + 16)
    
    // Pie de página con diseño
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(8)
    doc.text('Reporte generado automáticamente por TechGear Dashboard', 105, 280, { align: 'center' })
    doc.text('www.techgear.com | admin@techgear.com | (123) 456-7890', 105, 287, { align: 'center' })
    
    // Descargar PDF
    doc.save(`reporte-admin-${new Date().toISOString().split('T')[0]}.pdf`)
    
    toast.success('Reporte PDF exportado exitosamente')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard de Administración</h1>
              <p className="text-gray-600">Panel de control y análisis de datos</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={exportReport}>
                <Download className="h-4 w-4 mr-2" />
                Exportar Reporte
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
          </TabsList>

          {/* Vista General */}
          <TabsContent value="overview" className="space-y-6">
            {/* Métricas Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+20.1%</span> desde el mes pasado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+180.1%</span> desde el mes pasado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+19%</span> desde el mes pasado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Productos</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+201</span> desde el mes pasado
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ventas Mensuales</CardTitle>
                  <CardDescription>Análisis de ventas y pedidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="ventas" fill="#8884d8" />
                      <Bar dataKey="pedidos" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Categorías</CardTitle>
                  <CardDescription>Ventas por categoría de producto</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Productos Top y Pedidos Recientes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Productos Más Vendidos</CardTitle>
                  <CardDescription>Top 5 productos por ventas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.ventas} ventas • Stock: {product.stock}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Recientes</CardTitle>
                  <CardDescription>Últimos 5 pedidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.cliente}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendencias de Ventas</CardTitle>
                <CardDescription>Análisis detallado de ventas en el tiempo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ventas" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="pedidos" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="usuarios" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Productos */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gestión de Productos</CardTitle>
                    <CardDescription>Administra tu catálogo de productos</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Producto
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.ventas} ventas • Stock: {product.stock}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pedidos */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gestión de Pedidos</CardTitle>
                    <CardDescription>Administra y rastrea todos los pedidos</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.cliente}</p>
                        <p className="text-xs text-muted-foreground">{order.fecha}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 