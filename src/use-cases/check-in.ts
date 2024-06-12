import { CheckInsRespository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";
import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}
interface CheckInUseCaseResponse {
  checkIn: CheckIn
}
export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRespository
  ) { }

  async execute({ gymId, userId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
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