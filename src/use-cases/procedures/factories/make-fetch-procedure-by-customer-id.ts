import { PrismaProcedureRepository } from '@/repositories/prisma/prisma-procedure-repository'
import { FetchProcedureUseCaseByCustomerId } from '../fetch-procedures-by-customer-id'
import { PrismaCustomerRepository } from '@/repositories/prisma/prisma-customer-repository'

export function makeFetchProcedureUseCaseByCustomerId() {
  const procedureRepository = new PrismaProcedureRepository()
  const customerRepository = new PrismaCustomerRepository()
  const useCase = new FetchProcedureUseCaseByCustomerId(
    procedureRepository,
    customerRepository,
  )

  return useCase
}
