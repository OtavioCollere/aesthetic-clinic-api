import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: '10m' }
})


app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "Validation error.", issues: error.format() })
    }
})

app.register(appRoutes)
