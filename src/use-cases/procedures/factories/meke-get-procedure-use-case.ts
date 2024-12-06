import { PrismaProcedureRepository } from '@/repositories/prisma/prisma-procedure-repository'
import { GetProcedureUseCase } from '../get-procedure'

export function makeGetProcedureUseCase() {
  const procedureRepository = new PrismaProcedureRepository()
  const useCase = new GetProcedureUseCase(procedureRepository)

  return useCase
}
