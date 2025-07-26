'use client'

import { useState, useEffect } from 'react'
import { Product, ProductFilters, PaginationInfo } from '@/types'

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
  pagination: PaginationInfo | null
  hasMore: boolean
  refetch: () => void
  loadMore: () => Promise<void>
}

export function useProducts(filters: ProductFilters = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchProducts = async (page = 1, append = false) => {
    try {
      setLoading(true)
      setError(null)

      // Construir URL con filtros
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('limit', filters.limit ? filters.limit.toString() : '15')
      
      if (filters.category) params.append('category', filters.category)
      if (filters.brand) params.append('brand', filters.brand)
      if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString())
      if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString())
      if (filters.inStock) params.append('inStock', 'true')
      if (filters.featured) params.append('featured', 'true')
      if (filters.search) params.append('search', filters.search)
      if (filters.sortBy) params.append('sortBy', filters.sortBy)
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)

      const url = `/api/products?${params.toString()}`

      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudieron cargar los productos`)
      }

      const data = await response.json()
      
      if (append) {
        setProducts(prev => [...prev, ...data.products])
      } else {
        setProducts(data.products || [])
      }

      setPagination(data.pagination)
      setCurrentPage(page)
      setHasMore(data.pagination && data.pagination.page < data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching products:', error)
      setError(error instanceof Error ? error.message : 'Error al cargar los productos')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    if (hasMore && !loading) {
      await fetchProducts(currentPage + 1, true)
    }
  }

  const refetch = () => {
    fetchProducts(1, false)
  }

  useEffect(() => {
    fetchProducts(1, false)
  }, [filters.category, filters.brand, filters.minPrice, filters.maxPrice, filters.inStock, filters.featured, filters.search, filters.sortBy, filters.sortOrder])

  return {
    products,
    loading,
    error,
    pagination,
    hasMore,
    refetch,
    loadMore,
  }
}