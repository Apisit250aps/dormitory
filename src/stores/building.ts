import { Building } from '@/models/buildings'
import {
  AdminGetBuildings,
  AdminGetBuildingById,
  AdminCreateBuilding,
  AdminUpdateBuilding,
  AdminDeleteBuilding,
} from '@/services/building-service'
import { Pagination } from '@/types/types'

import { create } from 'zustand'

type BuildingStore = {
  // State
  buildings: Building[]
  currentBuilding: Building | null
  loading: boolean
  error: string | null
  pagination: Pagination

  // Actions
  getBuildings: (page?: number, limit?: number) => Promise<void>
  getBuildingById: (id: string) => Promise<void>
  createBuilding: (building: Building) => Promise<boolean>
  updateBuilding: (id: string, building: Building) => Promise<boolean>
  deleteBuilding: (id: string) => Promise<boolean>
  clearError: () => void
  clearCurrentBuilding: () => void
  setLoading: (loading: boolean) => void
}

export const useBuildingStore = create<BuildingStore>()((set, get) => ({
  // Initial State
  buildings: [],
  currentBuilding: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  },

  // Get Buildings with Pagination
  getBuildings: async (page = 1, limit = 10) => {
    set({ loading: true, error: null })

    try {
      const response = await AdminGetBuildings({ page, limit })

      if (!response.success) {
        set({ error: response.message, loading: false })
        return
      }

      if (response.data) {
        set({
          buildings: response.data.docs,
          pagination: {
            page: response.data.page,
            limit: response.data.limit,
            totalDocs: response.data.totalDocs,
            totalPages: response.data.totalPages,
          },
          loading: false,
          error: null,
        })
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch buildings',
        loading: false,
      })
    }
  },

  // Get Building by ID
  getBuildingById: async (id: string) => {
    set({ loading: true, error: null })

    try {
      const response = await AdminGetBuildingById({ id })

      if (!response.success) {
        set({ error: response.message, loading: false })
        return
      }

      set({
        currentBuilding: response.data || null,
        loading: false,
        error: null,
      })
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch building',
        loading: false,
      })
    }
  },

  // Create Building
  createBuilding: async (building: Building) => {
    set({ loading: true, error: null })

    try {
      const response = await AdminCreateBuilding(building)

      if (!response.success) {
        set({ error: response.message, loading: false })
        return false
      }

      // Refresh buildings list after successful creation
      const { page, limit } = get().pagination
      await get().getBuildings(page, limit)

      set({ loading: false, error: null })
      return true
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to create building',
        loading: false,
      })
      return false
    }
  },

  // Update Building
  updateBuilding: async (id: string, building: Building) => {
    set({ loading: true, error: null })

    try {
      const response = await AdminUpdateBuilding({ id, data: building })

      if (!response.success) {
        set({ error: response.message, loading: false })
        return false
      }

      // Update building in the current list
      set((state) => ({
        buildings: state.buildings.map((b) =>
          b._id === id ? { ...b, ...building } : b
        ),
        currentBuilding:
          state.currentBuilding?._id === id
            ? { ...state.currentBuilding, ...building }
            : state.currentBuilding,
        loading: false,
        error: null,
      }))

      return true
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to update building',
        loading: false,
      })
      return false
    }
  },

  // Delete Building
  deleteBuilding: async (id: string) => {
    set({ loading: true, error: null })

    try {
      const response = await AdminDeleteBuilding({ id })

      if (!response.success) {
        set({ error: response.message, loading: false })
        return false
      }

      // Remove building from the current list
      set((state) => ({
        buildings: state.buildings.filter((b) => b._id !== id),
        currentBuilding:
          state.currentBuilding?._id === id ? null : state.currentBuilding,
        loading: false,
        error: null,
      }))

      return true
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to delete building',
        loading: false,
      })
      return false
    }
  },

  // Utility Actions
  clearError: () => set({ error: null }),

  clearCurrentBuilding: () => set({ currentBuilding: null }),

  setLoading: (loading: boolean) => set({ loading }),
}))

// Export hook with better name for consistency
export const useBuilding = useBuildingStore
