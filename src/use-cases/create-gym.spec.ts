import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      description: null,
      latitude: -30.037369,
      longitude: -51.1899153,
      phone: null,
      title: 'JavaScript Gym'
    })

    expect(gym.id).toEqual(expect.any(String))
  })

})