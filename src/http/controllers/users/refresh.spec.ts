import { afterAll, beforeAll, describe, expect, test } from "vitest"
import request from 'supertest'
import { app } from '@/app'


describe('Refresh (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to refresh token', async () => {
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

    const cookies = authResponse.get('Set-Cookie')

    expect(cookies).toBeDefined()

    if (cookies) {
      const response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookies)
        .send()

      expect(response.statusCode).toEqual(200)
      expect(response.body.token).toEqual(expect.any(String))
      expect(response.get('Set-Cookie')).toEqual([expect.stringContaining('refreshToken=')])
    }


  })
})