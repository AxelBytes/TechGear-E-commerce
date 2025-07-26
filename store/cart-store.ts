'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  subtotal: number
  itemCount: number
  isLoading: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  loadCart: (userId?: string) => Promise<void>
  syncWithServer: (userId: string) => Promise<void>
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      itemCount: 0,
      isLoading: false,

      addItem: (product: Product, quantity = 1) => {
        const { items } = get()
        const existingItem = items.find(item => item.productId === product.id)

        let updatedItems: CartItem[]

        if (existingItem) {
          updatedItems = items.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        } else {
          const newItem: CartItem = {
            id: `temp-${Date.now()}`,
            userId: '',
            productId: product.id,
            quantity,
            price: product.price,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            product,
          }
          updatedItems = [...items, newItem]
        }

        const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)

        set({ items: updatedItems, subtotal, itemCount })
      },

      removeItem: (productId: string) => {
        const { items } = get()
        const updatedItems = items.filter(item => item.productId !== productId)
        const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)

        set({ items: updatedItems, subtotal, itemCount })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        const { items } = get()
        const updatedItems = items.map(item =>
          item.productId === productId
            ? { ...item, quantity, updatedAt: new Date().toISOString() }
            : item
        )

        const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)

        set({ items: updatedItems, subtotal, itemCount })
      },

      clearCart: () => {
        set({ items: [], subtotal: 0, itemCount: 0 })
      },

      loadCart: async (userId?: string) => {
        if (!userId) return

        set({ isLoading: true })

        try {
          // TODO: Implementar carga del carrito desde la nueva base de datos
          // Por ahora, el carrito se mantiene en localStorage
          set({ isLoading: false })
        } catch (error) {
          console.error('Error loading cart:', error)
          set({ isLoading: false })
        }
      },

      syncWithServer: async (userId: string) => {
        const { items } = get()
        const localItems = items.filter(item => item.id.startsWith('temp-'))

        try {
          // TODO: Implementar sincronización con la nueva base de datos
          // Por ahora, solo actualizamos los IDs locales
          const updatedItems = items.map(item =>
            item.id.startsWith('temp-')
              ? { ...item, id: `server-${Date.now()}`, userId }
              : item
          )
          
          set({ items: updatedItems })
        } catch (error) {
          console.error('Error syncing cart with server:', error)
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        items: state.items.filter(item => item.id.startsWith('temp-')),
        itemCount: state.itemCount,
        subtotal: state.subtotal,
      }),
    }
  )
)