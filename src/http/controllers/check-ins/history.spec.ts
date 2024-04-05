import { app } from '@/app'
import { prisma } from "@/lib/prisma"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from "vitest"


describe('Check-in history (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to list check-in history', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091
      }
    })
    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id
        },
        {
          gym_id: gym.id,
          user_id: user.id
        }
      ]
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toHaveLength(2)
    expect(response.body.checkIns[0].gym_id).toEqual(gym.id)
    expect(response.body.checkIns[1].gym_id).toEqual(gym.id)


  })
})