
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { page, q } = searchGymQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchGymsUseCase.execute({ page, query: q })

  return reply.status(200).send({
    gyms
  })
}