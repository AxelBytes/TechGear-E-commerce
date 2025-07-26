# TechGear E-Commerce - Arquitectura del Proyecto

## Estructura de Carpetas

```
techgear-ecommerce/
├── app/                          # App Router de Next.js 14
│   ├── (auth)/                   # Grupo de rutas de autenticación
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (shop)/                   # Grupo de rutas principales
│   │   ├── products/
│   │   │   ├── [slug]/
│   │   │   └── category/[slug]/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── account/
│   │   │   ├── orders/
│   │   │   ├── wishlist/
│   │   │   └── profile/
│   │   └── search/
│   ├── admin/                    # Panel de administración
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── customers/
│   │   └── analytics/
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── users/
│   │   ├── cart/
│   │   ├── reviews/
│   │   ├── upload/
│   │   └── webhooks/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
├── components/                   # Componentes reutilizables
│   ├── ui/                      # Componentes base (shadcn/ui)
│   ├── layout/                  # Componentes de layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   ├── product/                 # Componentes relacionados con productos
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── ProductImages.tsx
│   │   ├── ProductReviews.tsx
│   │   └── ProductFilters.tsx
│   ├── cart/                    # Componentes del carrito
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartDrawer.tsx
│   ├── checkout/                # Componentes de checkout
│   │   ├── CheckoutForm.tsx
│   │   ├── PaymentForm.tsx
│   │   └── OrderSummary.tsx
│   ├── auth/                    # Componentes de autenticación
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── AuthGuard.tsx
│   └── admin/                   # Componentes del admin
│       ├── AdminLayout.tsx
│       ├── ProductForm.tsx
│       └── OrdersTable.tsx
├── lib/                         # Utilidades y configuraciones
│   ├── auth.ts                  # Configuración de autenticación
│   ├── db.ts                    # Configuración de base de datos
│   ├── stripe.ts                # Configuración de Stripe
│   ├── validations.ts           # Schemas de validación (Zod)
│   ├── utils.ts                 # Utilidades generales
│   └── constants.ts             # Constantes de la aplicación
├── hooks/                       # Custom hooks
│   ├── use-cart.ts
│   ├── use-wishlist.ts
│   ├── use-auth.ts
│   └── use-products.ts
├── store/                       # Estado global (Zustand)
│   ├── cart-store.ts
│   ├── auth-store.ts
│   └── ui-store.ts
├── types/                       # Definiciones de tipos TypeScript
│   ├── product.ts
│   ├── user.ts
│   ├── order.ts
│   └── api.ts
└── styles/                      # Estilos adicionales
    └── components.css
```

## Arquitectura de Componentes

### 1. Layout Components
- **Header**: Navegación principal, búsqueda, carrito, usuario
- **Footer**: Enlaces, información legal, suscripción newsletter
- **Sidebar**: Filtros de productos, categorías
- **Navigation**: Menú de navegación responsivo

### 2. Product Components
- **ProductCard**: Tarjeta de producto para grid/lista
- **ProductGrid**: Grid responsivo de productos
- **ProductDetails**: Detalles completos del producto
- **ProductImages**: Galería de imágenes con zoom
- **ProductReviews**: Sistema de reseñas y calificaciones
- **ProductFilters**: Filtros avanzados (precio, marca, categoría)

### 3. Cart & Checkout Components
- **CartItem**: Item individual del carrito
- **CartSummary**: Resumen de precios y totales
- **CartDrawer**: Carrito lateral deslizante
- **CheckoutForm**: Formulario de checkout multi-step
- **PaymentForm**: Integración con Stripe Elements
- **OrderSummary**: Resumen final de la orden

### 4. Authentication Components
- **LoginForm**: Formulario de inicio de sesión
- **RegisterForm**: Formulario de registro
- **AuthGuard**: Protección de rutas privadas

### 5. Admin Components
- **AdminLayout**: Layout del panel administrativo
- **ProductForm**: CRUD de productos
- **OrdersTable**: Gestión de órdenes
- **Dashboard**: Métricas y analytics

## Patrones de Diseño Implementados

### 1. Compound Components
```typescript
<ProductDetails>
  <ProductDetails.Images />
  <ProductDetails.Info />
  <ProductDetails.Actions />
  <ProductDetails.Reviews />
</ProductDetails>
```

### 2. Custom Hooks para Lógica de Negocio
```typescript
const useCart = () => {
  // Lógica del carrito
  return { items, addItem, removeItem, updateQuantity, total }
}

const useProducts = (filters) => {
  // Lógica de productos con filtros
  return { products, loading, error, hasMore, loadMore }
}
```

### 3. Context + Zustand para Estado Global
```typescript
// Estado del carrito persistente
const useCartStore = create(persist(
  (set, get) => ({
    items: [],
    addItem: (product) => set((state) => ({ 
      items: [...state.items, product] 
    })),
  }),
  { name: 'cart-storage' }
))
```