import client from '@/client'
import { User } from 'next-auth'

const users = client.db().collection<User>('users')

export default users
