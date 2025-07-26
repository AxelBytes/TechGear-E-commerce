'use client'

import { create } from 'zustand'

interface UIState {
  isMobileMenuOpen: boolean
  isCartDrawerOpen: boolean
  isSearchOpen: boolean
  searchQuery: string
  setMobileMenuOpen: (open: boolean) => void
  setCartDrawerOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setSearchQuery: (query: string) => void
  toggleMobileMenu: () => void
  toggleCartDrawer: () => void
  toggleSearch: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  isMobileMenuOpen: false,
  isCartDrawerOpen: false,
  isSearchOpen: false,
  searchQuery: '',

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setCartDrawerOpen: (open) => set({ isCartDrawerOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}))