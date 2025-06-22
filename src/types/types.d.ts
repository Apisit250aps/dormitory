import { MongooseCache } from '@/lib/db'
declare global {
  var mongoose: MongooseCache | undefined
}

export type IResponse<T = unknown> = {
  success: boolean
  message: string
  data?: T
}

export type IPagination<T = unknown> = {
  docs: T[]
  page: number
  limit: number
  totalDocs: number
  totalPages: number
}

export type Pagination = {
  page: number
  limit: number
  totalDocs: number
  totalPages: number
}

export type QueryParams = {
  params: Promise<{ id: string }>
}
