import { makeFetchProcedureUseCase } from '@/use-cases/procedures/factories/make-fetch-procedure-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchProcedure(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchProcedureUseCase = makeFetchProcedureUseCase()

  const procedures = await fetchProcedureUseCase.execute()

  reply.status(201).send({ procedures })
}
