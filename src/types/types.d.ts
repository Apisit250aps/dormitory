import { MongooseCache } from '@/lib/db'
declare global {
  var mongoose: MongooseCache | undefined
}
