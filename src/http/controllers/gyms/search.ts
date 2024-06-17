
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { page, query } = searchGymQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchGymsUseCase.execute({ page, query })

  return reply.status(201).send({
    gyms
  })
}