import { CustomerRepository } from '@/repositories/customer-repository'
import { Customer } from '@prisma/client'

interface FetchCustomerUseCaseResponse {
  customers: Customer[]
}

export class FetchCustomerUseCase {
  constructor(private customersRepository: CustomerRepository) {}

  async execute(): Promise<FetchCustomerUseCaseResponse> {
    const customers = await this.customersRepository.findAll()

    return { customers }
  }
}
