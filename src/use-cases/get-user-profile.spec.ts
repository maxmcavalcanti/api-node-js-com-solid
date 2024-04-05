import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFound } from "./errors/resource-not-found";
import { GetUserProfileUseCase } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const { id } = await usersRepository.create({
      name: 'John Doe',
      email: 'jP9bZ@example.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      userId: id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.id).toEqual(id)
    expect(user.name).toEqual('John Doe')
    expect(user.email).toEqual('jP9bZ@example.com')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })



})