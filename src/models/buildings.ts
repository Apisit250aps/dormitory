import client from '@/client'
import { ObjectId } from 'mongodb'

export interface Building {
  _id?: ObjectId | string
  name: string
  dormitory: string
  floor: number
  createdAt: Date
  updatedAt: Date
}

const buildings = client.db().collection<Building>('buildings')

export default buildings