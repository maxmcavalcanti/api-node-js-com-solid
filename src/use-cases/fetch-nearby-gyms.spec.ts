import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyUseCase

describe('Fetch Nearby Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyUseCase(gymsRepository)
  })


  it('should be able to fetch neaby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -30.0381039,
      longitude: -51.1902004
    })
    await gymsRepository.create({
      title: 'Far away Gym',
      description: null,
      phone: null,
      latitude: -29.8861425,
      longitude: -50.787355
    })

    const { gyms } = await sut.execute({
      userLatitude: -30.0381039,
      userLongitude: -51.1902004
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({
      title: 'Near Gym'
    })])
  })


})