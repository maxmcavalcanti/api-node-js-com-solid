import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymUseCase } from "../create-gym"
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms"

export function makeFetchNearbyGymsUseCase() {
  const GymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(GymsRepository)

  return useCase
}