import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRespository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}