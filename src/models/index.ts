import client from '@/client'
import { User } from 'next-auth'
import { Building } from '@/schemas/building-schema'

const users = client.db().collection<User>('users')
const buildings = client.db().collection<Building>('buildings')

export { users, buildings }
