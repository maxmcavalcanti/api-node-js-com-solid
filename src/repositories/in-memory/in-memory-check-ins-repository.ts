import { CheckIn, Prisma } from "@prisma/client"
import { randomUUID } from "node:crypto"
import { CheckInsRespository } from "../check-ins-repository"

export class InMemoryCheckInsRepository implements CheckInsRespository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSameDate = this.items.find(
      (checkIn) => checkIn.user_id === userId,
    )

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      gym_id: data.gym_id,
      user_id: data.user_id
    }

    this.items.push(checkIn)
    return checkIn
  }


}