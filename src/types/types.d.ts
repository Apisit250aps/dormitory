import { MongooseCache } from '@/lib/db'
declare global {
  var mongoose: MongooseCache | undefined
}

export type IResponse<T = unknown> = {
  success: boolean
  message: string
  data?: T
}
