import { Procedure } from '@prisma/client'
import { ProcedureRepository } from '@/repositories/procedure-repository'
import { CustomerRepository } from '@/repositories/customer-repository'
import { CustomerNotFoundError } from '../errors/customer-not-found-error'

interface RegisterProcedureUseCaseRequest {
  nome: string
  regiao: string
  valor: number
  produto?: string
  dataProcedimento: Date
  customerId: string
}

interface RegisterProcedureUseCaseResponse {
  procedure: Procedure
}

export class RegisterProcedureUseCase {
  constructor(
    private procedureRepository: ProcedureRepository,
    private customerRepository: CustomerRepository,
  ) {}

  async execute(
    data: RegisterProcedureUseCaseRequest,
  ): Promise<RegisterProcedureUseCaseResponse> {
    // Nao pode criar com um customerId nao existente
    const customer = await this.customerRepository.findById(data.customerId)

    if (!customer) {
      throw new CustomerNotFoundError()
    }

    const procedure = await this.procedureRepository.create({
      nome: data.nome,
      regiao: data.regiao,
      valor: data.valor,
      produto: data.produto ?? null,
      dataProcedimento: data.dataProcedimento,
      customerId: data.customerId,
    })

    return {
      procedure,
    }
  }
}
