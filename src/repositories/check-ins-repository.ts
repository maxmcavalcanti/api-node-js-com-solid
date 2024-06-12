import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRespository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}