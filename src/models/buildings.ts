import client from '@/client'
import { ObjectId } from 'mongodb'

export interface Building {
  _id?: ObjectId
  name: string
  type: string
  step: number
}

const buildings = client.db().collection<Building>('buildings')

export default buildings