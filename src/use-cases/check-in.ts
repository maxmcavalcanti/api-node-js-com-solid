import { CheckInsRespository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";
import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { GymsRepository } from "@/repositories/gym-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}
interface CheckInUseCaseResponse {
  checkIn: CheckIn
}
export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRespository,
    private gymsRepository: GymsRepository
  ) { }

  async execute({ gymId, userId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFound()
    }

    //calcular a distancia entre user e gym



    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDate) {
      throw new Error()
    }
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })
    return {
      checkIn
    }
  }

}