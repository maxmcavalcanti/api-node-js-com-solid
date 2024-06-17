import { afterAll, beforeAll, describe, expect, test } from "vitest"
import request from 'supertest'
import { app } from '@/app'


describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to get user profile', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'pHxP8@example.com',
        password: '123456'
      })

    const authResponse = await request(app.server)
      .post('/sessions')
      .send(
        {
          email: 'pHxP8@example.com',
          password: '123456'
        })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user.id).toEqual(expect.any(String))
    expect(profileResponse.body.user.email).toEqual('pHxP8@example.com')
  })
})