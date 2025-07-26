import { z } from 'zod'

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  phone: z.string().optional(),
})

// Product schemas
export const productSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  sku: z.string().min(1, 'El SKU es requerido'),
  price: z.number().min(0, 'El precio debe ser mayor a 0'),
  comparePrice: z.number().optional(),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
  stockQuantity: z.number().min(0, 'El stock no puede ser negativo'),
  weight: z.number().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
})

// Cart schemas
export const addToCartSchema = z.object({
  productId: z.string().min(1, 'ID de producto requerido'),
  quantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
})

export const updateCartSchema = z.object({
  quantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
})

// Review schemas
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5, 'La calificación debe estar entre 1 y 5'),
  title: z.string().optional(),
  comment: z.string().optional(),
})

// Order schemas
export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
  })),
  shippingAddress: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    addressLine1: z.string().min(1),
    addressLine2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().default('US'),
    phone: z.string().optional(),
  }),
  paymentMethodId: z.string().min(1),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ProductInput = z.infer<typeof productSchema>
export type AddToCartInput = z.infer<typeof addToCartSchema>
export type UpdateCartInput = z.infer<typeof updateCartSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type CreateOrderInput = z.infer<typeof createOrderSchema>