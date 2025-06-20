import NextAuth from 'next-auth'
import { authConfig } from './config'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import client from './client'

export const { handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: 'jwt' },
  ...authConfig,
})
