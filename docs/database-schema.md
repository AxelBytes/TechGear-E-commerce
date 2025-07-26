# TechGear E-Commerce - Esquema de Base de Datos

## Tablas Principales

### 1. Users (Usuarios)
```sql
users (
  id: uuid PRIMARY KEY,
  email: text UNIQUE NOT NULL,
  password_hash: text NOT NULL,
  first_name: text NOT NULL,
  last_name: text NOT NULL,
  phone: text,
  role: text DEFAULT 'customer', -- 'customer', 'admin'
  avatar_url: text,
  email_verified: boolean DEFAULT false,
  created_at: timestamptz DEFAULT now(),
  updated_at: timestamptz DEFAULT now()
)
```

### 2. Categories (Categorías)
```sql
categories (
  id: uuid PRIMARY KEY,
  name: text NOT NULL,
  slug: text UNIQUE NOT NULL,
  description: text,
  image_url: text,
  parent_id: uuid REFERENCES categories(id),
  is_active: boolean DEFAULT true,
  sort_order: integer DEFAULT 0,
  created_at: timestamptz DEFAULT now()
)
```

### 3. Brands (Marcas)
```sql
brands (
  id: uuid PRIMARY KEY,
  name: text NOT NULL,
  slug: text UNIQUE NOT NULL,
  description: text,
  logo_url: text,
  website_url: text,
  is_active: boolean DEFAULT true,
  created_at: timestamptz DEFAULT now()
)
```

### 4. Products (Productos)
```sql
products (
  id: uuid PRIMARY KEY,
  name: text NOT NULL,
  slug: text UNIQUE NOT NULL,
  description: text,
  short_description: text,
  sku: text UNIQUE NOT NULL,
  price: decimal(10,2) NOT NULL,
  compare_price: decimal(10,2), -- precio original para descuentos
  cost_price: decimal(10,2),
  category_id: uuid REFERENCES categories(id),
  brand_id: uuid REFERENCES brands(id),
  stock_quantity: integer DEFAULT 0,
  min_stock_level: integer DEFAULT 0,
  weight: decimal(8,2),
  dimensions: jsonb, -- {length, width, height}
  is_active: boolean DEFAULT true,
  is_featured: boolean DEFAULT false,
  meta_title: text,
  meta_description: text,
  created_at: timestamptz DEFAULT now(),
  updated_at: timestamptz DEFAULT now()
)
```

### 5. Product Images (Imágenes de Productos)
```sql
product_images (
  id: uuid PRIMARY KEY,
  product_id: uuid REFERENCES products(id) ON DELETE CASCADE,
  image_url: text NOT NULL,
  alt_text: text,
  sort_order: integer DEFAULT 0,
  is_primary: boolean DEFAULT false,
  created_at: timestamptz DEFAULT now()
)
```

### 6. Product Attributes (Atributos de Productos)
```sql
product_attributes (
  id: uuid PRIMARY KEY,
  product_id: uuid REFERENCES products(id) ON DELETE CASCADE,
  name: text NOT NULL,
  value: text NOT NULL,
  created_at: timestamptz DEFAULT now()
)
```

### 7. Reviews (Reseñas)
```sql
reviews (
  id: uuid PRIMARY KEY,
  product_id: uuid REFERENCES products(id) ON DELETE CASCADE,
  user_id: uuid REFERENCES users(id) ON DELETE CASCADE,
  rating: integer CHECK (rating >= 1 AND rating <= 5),
  title: text,
  comment: text,
  is_verified_purchase: boolean DEFAULT false,
  is_approved: boolean DEFAULT true,
  helpful_count: integer DEFAULT 0,
  created_at: timestamptz DEFAULT now(),
  updated_at: timestamptz DEFAULT now(),
  UNIQUE(product_id, user_id)
)
```

### 8. Shopping Cart (Carrito de Compras)
```sql
cart_items (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id) ON DELETE CASCADE,
  product_id: uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity: integer NOT NULL DEFAULT 1,
  price: decimal(10,2) NOT NULL, -- precio al momento de agregar
  created_at: timestamptz DEFAULT now(),
  updated_at: timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
)
```

### 9. Orders (Órdenes)
```sql
orders (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id),
  order_number: text UNIQUE NOT NULL,
  status: text DEFAULT 'pending', -- 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
  payment_status: text DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  payment_method: text,
  payment_intent_id: text, -- Stripe payment intent ID
  subtotal: decimal(10,2) NOT NULL,
  tax_amount: decimal(10,2) DEFAULT 0,
  shipping_amount: decimal(10,2) DEFAULT 0,
  discount_amount: decimal(10,2) DEFAULT 0,
  total_amount: decimal(10,2) NOT NULL,
  currency: text DEFAULT 'USD',
  notes: text,
  shipped_at: timestamptz,
  delivered_at: timestamptz,
  created_at: timestamptz DEFAULT now(),
  updated_at: timestamptz DEFAULT now()
)
```

### 10. Order Items (Items de Orden)
```sql
order_items (
  id: uuid PRIMARY KEY,
  order_id: uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id: uuid REFERENCES products(id),
  product_name: text NOT NULL, -- snapshot del nombre
  product_sku: text NOT NULL, -- snapshot del SKU
  quantity: integer NOT NULL,
  unit_price: decimal(10,2) NOT NULL,
  total_price: decimal(10,2) NOT NULL,
  created_at: timestamptz DEFAULT now()
)
```

### 11. Addresses (Direcciones)
```sql
addresses (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id) ON DELETE CASCADE,
  type: text NOT NULL, -- 'shipping', 'billing'
  first_name: text NOT NULL,
  last_name: text NOT NULL,
  company: text,
  address_line_1: text NOT NULL,
  address_line_2: text,
  city: text NOT NULL,
  state: text NOT NULL,
  postal_code: text NOT NULL,
  country: text NOT NULL DEFAULT 'US',
  phone: text,
  is_default: boolean DEFAULT false,
  created_at: timestamptz DEFAULT now(),
  updated_at: timestamptz DEFAULT now()
)
```

### 12. Wishlists (Lista de Deseos)
```sql
wishlist_items (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id) ON DELETE CASCADE,
  product_id: uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at: timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
)
```

## Índices Recomendados

```sql
-- Índices para mejorar performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_cart_user ON cart_items(user_id);
```