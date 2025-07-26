# TechGear E-Commerce - Documentación de API Routes

## Autenticación

### POST /api/auth/register
Registro de nuevo usuario
```typescript
Body: {
  email: string
  password: string
  firstName: string
  lastName: string
}
Response: {
  user: User
  token: string
}
```

### POST /api/auth/login
Inicio de sesión
```typescript
Body: {
  email: string
  password: string
}
Response: {
  user: User
  token: string
}
```

### POST /api/auth/logout
Cerrar sesión
```typescript
Response: {
  message: string
}
```

## Productos

### GET /api/products
Obtener lista de productos con filtros
```typescript
Query: {
  page?: number
  limit?: number
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'price' | 'name' | 'rating' | 'newest'
  sortOrder?: 'asc' | 'desc'
  search?: string
}
Response: {
  products: Product[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

### GET /api/products/[slug]
Obtener producto específico
```typescript
Response: {
  product: Product & {
    images: ProductImage[]
    attributes: ProductAttribute[]
    reviews: Review[]
    avgRating: number
    reviewCount: number
  }
}
```

### POST /api/products (Admin)
Crear nuevo producto
```typescript
Body: {
  name: string
  description: string
  price: number
  categoryId: string
  brandId: string
  stockQuantity: number
  images: string[]
  attributes: { name: string, value: string }[]
}
Response: {
  product: Product
}
```

### PUT /api/products/[id] (Admin)
Actualizar producto
```typescript
Body: Partial<Product>
Response: {
  product: Product
}
```

### DELETE /api/products/[id] (Admin)
Eliminar producto
```typescript
Response: {
  message: string
}
```

## Carrito de Compras

### GET /api/cart
Obtener carrito del usuario
```typescript
Response: {
  items: CartItem[]
  subtotal: number
  itemCount: number
}
```

### POST /api/cart
Agregar item al carrito
```typescript
Body: {
  productId: string
  quantity: number
}
Response: {
  item: CartItem
}
```

### PUT /api/cart/[itemId]
Actualizar cantidad de item
```typescript
Body: {
  quantity: number
}
Response: {
  item: CartItem
}
```

### DELETE /api/cart/[itemId]
Eliminar item del carrito
```typescript
Response: {
  message: string
}
```

### DELETE /api/cart
Vaciar carrito completo
```typescript
Response: {
  message: string
}
```

## Órdenes

### GET /api/orders
Obtener órdenes del usuario
```typescript
Query: {
  page?: number
  limit?: number
  status?: string
}
Response: {
  orders: Order[]
  pagination: PaginationInfo
}
```

### GET /api/orders/[id]
Obtener orden específica
```typescript
Response: {
  order: Order & {
    items: OrderItem[]
    shippingAddress: Address
    billingAddress: Address
  }
}
```

### POST /api/orders
Crear nueva orden
```typescript
Body: {
  items: { productId: string, quantity: number }[]
  shippingAddressId: string
  billingAddressId?: string
  paymentMethodId: string
}
Response: {
  order: Order
  clientSecret: string // para Stripe
}
```

### PUT /api/orders/[id] (Admin)
Actualizar estado de orden
```typescript
Body: {
  status: OrderStatus
  trackingNumber?: string
}
Response: {
  order: Order
}
```

## Reseñas

### GET /api/products/[productId]/reviews
Obtener reseñas de producto
```typescript
Query: {
  page?: number
  limit?: number
  sortBy?: 'newest' | 'oldest' | 'rating'
}
Response: {
  reviews: Review[]
  pagination: PaginationInfo
  stats: {
    avgRating: number
    totalReviews: number
    ratingDistribution: { [key: number]: number }
  }
}
```

### POST /api/products/[productId]/reviews
Crear nueva reseña
```typescript
Body: {
  rating: number
  title: string
  comment: string
}
Response: {
  review: Review
}
```

### PUT /api/reviews/[id]
Actualizar reseña propia
```typescript
Body: {
  rating?: number
  title?: string
  comment?: string
}
Response: {
  review: Review
}
```

### DELETE /api/reviews/[id]
Eliminar reseña propia
```typescript
Response: {
  message: string
}
```

## Direcciones

### GET /api/addresses
Obtener direcciones del usuario
```typescript
Response: {
  addresses: Address[]
}
```

### POST /api/addresses
Crear nueva dirección
```typescript
Body: {
  type: 'shipping' | 'billing'
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  isDefault?: boolean
}
Response: {
  address: Address
}
```

### PUT /api/addresses/[id]
Actualizar dirección
```typescript
Body: Partial<Address>
Response: {
  address: Address
}
```

### DELETE /api/addresses/[id]
Eliminar dirección
```typescript
Response: {
  message: string
}
```

## Lista de Deseos

### GET /api/wishlist
Obtener lista de deseos
```typescript
Response: {
  items: WishlistItem[]
}
```

### POST /api/wishlist
Agregar producto a lista de deseos
```typescript
Body: {
  productId: string
}
Response: {
  item: WishlistItem
}
```

### DELETE /api/wishlist/[productId]
Eliminar de lista de deseos
```typescript
Response: {
  message: string
}
```

## Pagos (Stripe)

### POST /api/payments/create-intent
Crear payment intent
```typescript
Body: {
  orderId: string
}
Response: {
  clientSecret: string
  paymentIntentId: string
}
```

### POST /api/payments/confirm
Confirmar pago
```typescript
Body: {
  paymentIntentId: string
  orderId: string
}
Response: {
  order: Order
  paymentStatus: string
}
```

## Webhooks

### POST /api/webhooks/stripe
Webhook de Stripe para eventos de pago
```typescript
Headers: {
  stripe-signature: string
}
Body: StripeEvent
```

## Admin APIs

### GET /api/admin/dashboard
Métricas del dashboard
```typescript
Response: {
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  totalProducts: number
  recentOrders: Order[]
  topProducts: Product[]
  salesChart: ChartData[]
}
```

### GET /api/admin/orders
Obtener todas las órdenes (Admin)
```typescript
Query: {
  page?: number
  limit?: number
  status?: string
  startDate?: string
  endDate?: string
}
Response: {
  orders: Order[]
  pagination: PaginationInfo
}
```

### GET /api/admin/customers
Obtener lista de clientes
```typescript
Query: {
  page?: number
  limit?: number
  search?: string
}
Response: {
  customers: User[]
  pagination: PaginationInfo
}
```