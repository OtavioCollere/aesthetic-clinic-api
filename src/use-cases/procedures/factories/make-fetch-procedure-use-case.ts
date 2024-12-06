import { PrismaProcedureRepository } from '@/repositories/prisma/prisma-procedure-repository'
import { FetchProcedureUseCase } from '../fetch-procedures'

export function makeFetchProcedureUseCase() {
  const procedureRepository = new PrismaProcedureRepository()
  const useCase = new FetchProcedureUseCase(procedureRepository)

  return useCase
}
