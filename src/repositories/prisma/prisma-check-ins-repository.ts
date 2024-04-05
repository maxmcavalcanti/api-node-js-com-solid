import { Prisma } from "@prisma/client";
import { CheckInsRespository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRespository {
  async findById(checkInId: string) {
    const checkIn = await prisma.checkIn.findUnique({ where: { id: checkInId } })
    return checkIn
  }
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({ data })
    return checkIn
  }

  async save(checkIn: { id: string; created_at: Date; validated_at: Date | null; user_id: string; gym_id: string; }) {
    const checkInData = {
      id: checkIn.id,
      created_at: checkIn.created_at,
      validated_at: checkIn.validated_at,
      user_id: checkIn.user_id,
      gym_id: checkIn.gym_id
    }
    const checkInUpdated = await prisma.checkIn.update({ where: { id: checkIn.id }, data: checkInData })
    return checkInUpdated
  }
  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20
    })
    return checkIns
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })
    return checkIn
  }
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })
    return count

  }

}