import { CustomerRepository } from '@/repositories/customer-repository'
import { ProcedureRepository } from '@/repositories/procedure-repository'
import { Procedure } from '@prisma/client'
import { CustomerNotFoundError } from '../errors/customer-not-found-error'

interface FetchProcedureUseCaseByCustomerIdResponse {
  procedures: Procedure[]
}

interface FetchProcedureUseCaseByCustomerIdRequest {
  customer_id: string
}

export class FetchProcedureUseCaseByCustomerId {
  constructor(
    private procedureRepository: ProcedureRepository,
    private customerRepository: CustomerRepository,
  ) {}

  async execute({
    customer_id,
  }: FetchProcedureUseCaseByCustomerIdRequest): Promise<FetchProcedureUseCaseByCustomerIdResponse> {
    const costumer = await this.customerRepository.findById(customer_id)

    if (!costumer) {
      throw new CustomerNotFoundError()
    }

    const procedures =
      await this.procedureRepository.findByCustomerId(customer_id)

    return { procedures }
  }
}
