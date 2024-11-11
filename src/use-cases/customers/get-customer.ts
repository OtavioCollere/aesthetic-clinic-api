import { CustomerRepository } from '@/repositories/customer-repository'
import { Customer } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetCustomerUseCaseRequest {
  customerId: string
}

interface GetCustomerUseCaseResponse {
  customer: Customer
}

export class GetCustomerUseCase {
  constructor(private customersRepository: CustomerRepository) {}

  async execute({
    customerId,
  }: GetCustomerUseCaseRequest): Promise<GetCustomerUseCaseResponse> {
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new ResourceNotFoundError()
    }

    return { customer }
  }
}
