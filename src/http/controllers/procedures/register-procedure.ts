import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterProcedureUseCase } from '@/use-cases/procedures/factories/make-register-procedure-use-case'
import { CustomerNotFoundError } from '@/use-cases/errors/customer-not-found-error'

export async function registerProcedure(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerProcedureSchema = z.object({
    nome: z.string(),
    regiao: z.string(),
    valor: z.number(),
    produto: z.string().optional(),
    dataProcedimento: z.date(),
    customerId: z.string(),
  })

  const customerIdSchema = z.object({
    customerId: z.string().uuid(),
  })

  const { customerId } = customerIdSchema.parse(request.params)

  const { nome, regiao, valor, produto, dataProcedimento } =
    registerProcedureSchema.parse(request.body)

  try {
    const createProcedureUseCase = makeRegisterProcedureUseCase()

    await createProcedureUseCase.execute({
      nome,
      regiao,
      valor,
      produto,
      dataProcedimento,
      customerId,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof CustomerNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
