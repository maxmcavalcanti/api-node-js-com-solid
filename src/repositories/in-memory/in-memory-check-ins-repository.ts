import { CheckIn, Prisma } from "@prisma/client"
import { randomUUID } from "node:crypto"
import { CheckInsRespository } from "../check-ins-repository"
import dayjs from "dayjs"

export class InMemoryCheckInsRepository implements CheckInsRespository {
  public items: CheckIn[] = []
  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
  async findById(checkInId: string) {
    const checkIn = this.items.find((item) => item.id === checkInId)
    if (!checkIn) return null
    return checkIn
  }
  async countByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }
  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    }
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