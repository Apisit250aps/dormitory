import NextAuth from 'next-auth'

import { MongoDBAdapter } from '@auth/mongodb-adapter'
import client from './client'
import authConfig from './auth.config';

export const { handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: 'jwt' },
  ...authConfig,
})
