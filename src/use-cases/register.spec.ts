import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jP9bZ@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jP9bZ@example.com',
      password: '123456'
    })
    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(user.password_hash).not.toBe('123456')
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const email = 'jP9bZ@example.com'

    await sut.execute({
      name: 'John Doe',
      email: email,
      password: '123456'
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: email,
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})