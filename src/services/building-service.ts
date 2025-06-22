import { Building } from '@/models/buildings'
import { BuildingFormValues } from '@/schemas/building-schema';
import { IResponse, IPagination } from '@/types/types'
import axios from 'axios'
import { AxiosError } from 'axios'

/**
 * CREATE: Add a new building
 */
export async function AdminCreateBuilding(
  data: BuildingFormValues
): Promise<IResponse<Building>> {
  try {
    const result = await axios.post<IResponse<Building>>(
      '/api/admin/building',
      data
    )
    return result.data
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof AxiosError
          ? error.response?.data?.message || 'Failed to create building'
          : 'Unknown error occurred',
    }
  }
}

/**
 * READ: Get multiple buildings with pagination
 */
export async function AdminGetBuildings({
  page = 1,
  limit = 10,
}: {
  page?: number
  limit?: number
} = {}): Promise<IResponse<IPagination<Building>>> {
  try {
    const result = await axios.get<IResponse<IPagination<Building>>>(
      '/api/admin/building',
      {
        params: { page, limit },
      }
    )
    return result.data
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof AxiosError
          ? error.response?.data?.message || 'Failed to fetch buildings'
          : 'Unknown error occurred',
    }
  }
}

/**
 * READ: Get a single building by ID
 */
export async function AdminGetBuildingById({
  id,
}: {
  id: string
}): Promise<IResponse<Building>> {
  try {
    const result = await axios.get<IResponse<Building>>(
      `/api/admin/building/${id}`
    )
    return result.data
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof AxiosError
          ? error.response?.data?.message || 'Failed to fetch building'
          : 'Unknown error occurred',
    }
  }
}

/**
 * UPDATE: Modify building by ID
 */
export async function AdminUpdateBuilding({
  id,
  data,
}: {
  id: string
  data: Building
}): Promise<IResponse<Building>> {
  try {
    const result = await axios.put<IResponse<Building>>(
      `/api/admin/building/${id}`,
      data
    )
    return result.data
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof AxiosError
          ? error.response?.data?.message || 'Failed to update building'
          : 'Unknown error occurred',
    }
  }
}

/**
 * DELETE: Remove building by ID
 */
export async function AdminDeleteBuilding({
  id,
}: {
  id: string
}): Promise<IResponse> {
  try {
    const result = await axios.delete<IResponse<Building>>(
      `/api/admin/building/${id}`
    )
    return result.data
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof AxiosError
          ? error.response?.data?.message || 'Failed to delete building'
          : 'Unknown error occurred',
    }
  }
}
