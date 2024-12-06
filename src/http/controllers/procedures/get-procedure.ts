import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetProcedureUseCase } from '@/use-cases/procedures/factories/meke-get-procedure-use-case'
import { FastifyReply } from 'fastify'
import { FastifyRequestType } from 'fastify/types/type-provider'
import { z } from 'zod'

export async function getProcedure(
  request: FastifyRequestType,
  reply: FastifyReply,
) {
  const getProcedureSchema = z.object({
    procedureId: z.string().uuid(),
  })

  const { procedureId } = getProcedureSchema.parse(request.params)

  try {
    const getProcedureUseCase = makeGetProcedureUseCase()

    const procedure = await getProcedureUseCase.execute({ procedureId })

    return reply.status(201).send(procedure)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ err: err.message })
    }
  }
}
