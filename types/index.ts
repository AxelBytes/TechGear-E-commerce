export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: 'customer' | 'admin'
  avatarUrl?: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  imageUrl?: string
  parentId?: string
  isActive: boolean
  sortOrder: number
  createdAt: string
}

export interface Brand {
  id: string
  name: string
  slug: string
  description?: string
  logoUrl?: string
  websiteUrl?: string
  isActive: boolean
  createdAt: string
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  imageUrl?: string
  categoryId?: string
  brandId?: string
  stock: number
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  category?: Category
  brand?: Brand
  avgRating?: number
  reviewCount?: number
}

export interface ProductImage {
  id: string
  productId: string
  imageUrl: string
  altText?: string
  sortOrder: number
  isPrimary: boolean
  createdAt: string
}

export interface CartItem {
  id: string
  userId: string
  productId: string
  quantity: number
  price: number
  createdAt: string
  updatedAt: string
  product?: Product
}

export interface Order {
  id: string
  userId?: string
  orderNumber: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod?: string
  paymentIntentId?: string
  subtotal: number
  taxAmount: number
  shippingAmount: number
  discountAmount: number
  totalAmount: number
  currency: string
  notes?: string
  shippedAt?: string
  deliveredAt?: string
  createdAt: string
  updatedAt: string
  items?: OrderItem[]
  user?: User
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  productName: string
  productSku: string
  quantity: number
  unitPrice: number
  totalPrice: number
  createdAt: string
  product?: Product
}

export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  title?: string
  comment?: string
  isVerifiedPurchase: boolean
  isApproved: boolean
  helpfulCount: number
  createdAt: string
  updatedAt: string
  user?: User
  product?: Product
}

export interface Address {
  id: string
  userId: string
  type: 'shipping' | 'billing'
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  createdAt: string
  product?: Product
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface ProductFilters {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  featured?: boolean
  search?: string
  sortBy?: 'price' | 'name' | 'rating' | 'newest' | 'popularity'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}