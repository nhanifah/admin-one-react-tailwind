import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'
import prisma from '../../../../prisma/client'
import { compare, hash } from 'bcrypt'

const handler = NextAuth({
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      type: 'credentials',

      async authorize(credentials, req) {
        const { email, password } = credentials
        // perform your login logic
        // find user from db

        // check if email is valid with zod return boolean
        const emailSchema = z.string().email()
        const isValidEmail = emailSchema.safeParse(email)

        // Check if username is email
        const query = isValidEmail.success ? { email: email } : { username: email }

        // Check if user exists
        const userExists = await prisma.admins.findFirst({
          where: query,
        })
        if (!userExists)
          throw {
            status: 400,
            message: 'Username or email does not exist',
          }

        // Check if password is correct
        const passwordHash = await hash(password, 10)
        // console.log("PASSWORD:", passwordHash);
        const isPasswordCorrect = await compare(password, userExists.password)
        console.log('PASSWORD:', password)
        console.log('PASSWORD HASH:', passwordHash)
        if (!isPasswordCorrect) throw { status: 400, message: 'Incorrect password' }

        console.log('USER EXISTS:', userExists)

        // If everything is fine, return user data
        return userExists
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({ token, user, session }) => {
      const userExists = await prisma.admins.findFirst({
        where: { email: token.email },
      })
      if (user) {
        token.role = userExists.role
        token.name = user.name
      }
      // console.log("REFFERAL:", userExists.referral_id);
      console.log('TOKEN JWT:', token)
      console.log('USER JWT:', user)
      return token
    },
    session: async ({ session, token }) => {
      // Update session with user data
      const userExists = await prisma.admins.findFirst({
        where: { email: token.email },
      })
      if (session?.user) {
        session.user.id = userExists.id
        session.user.name = userExists.name
        session.user.email = userExists.email
      }
      return session
    },
    redirect: async ({ url, baseUrl }) => {
      // Redirect after authentication
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
})

export default handler
