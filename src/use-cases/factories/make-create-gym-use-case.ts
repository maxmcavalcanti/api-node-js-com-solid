import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymUseCase } from "../create-gym"

export function makeCreateGymUseCase() {
  const GymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(GymsRepository)

  return useCase
}