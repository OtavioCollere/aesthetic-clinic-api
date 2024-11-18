import { ProcedureRepository } from '@/repositories/procedure-repository'
import { Procedure } from '@prisma/client'

interface FetchProcedureUseCaseResponse {
  procedures: Procedure[]
}

export class FetchProcedureUseCase {
  constructor(private procedureRepository: ProcedureRepository) {}

  async execute(): Promise<FetchProcedureUseCaseResponse> {
    const procedures = await this.procedureRepository.findAll()

    return { procedures }
  }
}
