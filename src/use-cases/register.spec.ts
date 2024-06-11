import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register Use Case', () => {

  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'jP9bZ@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'jP9bZ@example.com',
      password: '123456'
    })
    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(user.password_hash).not.toBe('123456')
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'jP9bZ@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email: email,
      password: '123456'
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email: email,
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})