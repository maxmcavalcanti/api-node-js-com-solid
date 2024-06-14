import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { CheckInUseCase } from "../check-in"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const GymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, GymsRepository)

  return useCase
}