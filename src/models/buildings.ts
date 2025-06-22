import client from '@/client'
import { ObjectId } from 'mongodb'

export interface Building {
  _id?: ObjectId | string
  name: string
  dormitory: string
  floor: number
}

const buildings = client.db().collection<Building>('buildings')

export default buildings