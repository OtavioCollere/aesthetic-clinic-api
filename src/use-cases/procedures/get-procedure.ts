import { Procedure } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ProcedureRepository } from '@/repositories/procedure-repository'

interface GetProcedureUseCaseRequest {
  procedureId: string
}

interface GetProcedureUseCaseResponse {
  procedure: Procedure
}

export class GetProcedureUseCase {
  constructor(private procedureRepository: ProcedureRepository) {}

  async execute({
    procedureId,
  }: GetProcedureUseCaseRequest): Promise<GetProcedureUseCaseResponse> {
    const procedure = await this.procedureRepository.findById(procedureId)

    if (!procedure) {
      throw new ResourceNotFoundError()
    }

    return { procedure }
  }
}
