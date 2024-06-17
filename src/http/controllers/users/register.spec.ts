import { afterAll, beforeAll, describe, expect, test } from "vitest"
import request from 'supertest'
import { app } from '@/app'


describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'pHxP8@example.com',
        password: '123456'
      })
    expect(response.statusCode).toEqual(201)
  })
})