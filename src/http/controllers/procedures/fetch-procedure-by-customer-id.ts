import { CustomerNotFoundError } from '@/use-cases/errors/customer-not-found-error'
import { makeFetchProcedureUseCaseByCustomerId } from '@/use-cases/procedures/factories/make-fetch-procedure-by-customer-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchProcedure(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const customerIdSchema = z.object({
    customer_id: z.string().uuid(),
  })

  const customer_id = customerIdSchema.parse(request.params)

  try {
    const fetchProcedureUseCase = makeFetchProcedureUseCaseByCustomerId()

    const procedures = await fetchProcedureUseCase.execute(customer_id)

    reply.status(201).send({ procedures })
  } catch (err) {
    if (err instanceof CustomerNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
