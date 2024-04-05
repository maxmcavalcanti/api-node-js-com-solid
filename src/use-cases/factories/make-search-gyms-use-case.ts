import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymUseCase } from "../create-gym"
import { SearchGymsUseCase } from "../search-gyms"

export function makeSearchGymsUseCase() {
  const GymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(GymsRepository)

  return useCase
}