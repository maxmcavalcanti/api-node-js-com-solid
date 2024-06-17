import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { gymRoutes } from "./http/controllers/gyms/route";
import { userRoutes } from "./http/controllers/users/routes";

export const app = fastify()
app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(userRoutes)
app.register(gymRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    //TODO Here should log to a external tool like datadog/newrelic/sentry
  }
  return reply.status(500).send({ message: 'Internal server error' })
})