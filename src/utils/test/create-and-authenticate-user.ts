import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
import bcrypt from 'bcryptjs'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'pHxP8@example.com',
      password_hash: await bcrypt.hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER'
    }
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send(
      {
        email: 'pHxP8@example.com',
        password: '123456'
      })

  const { token } = authResponse.body

  return { token }
}