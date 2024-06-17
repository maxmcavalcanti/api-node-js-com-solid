
import { makeCheckInsUseCase } from "@/use-cases/factories/make-check-in-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(value => { return Math.abs(value) <= 90 }),
    longitude: z.number().refine(value => { return Math.abs(value) <= 180 }),
  })


  const { latitude: userLatitude, longitude: userLongitude } = createCheckInBodySchema.parse(request.body)
  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const checkInUseCase = makeCheckInsUseCase()
  await checkInUseCase.execute({ gymId, userId: request.user.sub, userLatitude, userLongitude })

  return reply.status(201).send()
}