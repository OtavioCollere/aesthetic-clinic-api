import { PrismaCustomerRepository } from '@/repositories/prisma/prisma-customer-repository'
import { PrismaProcedureRepository } from '@/repositories/prisma/prisma-procedure-repository'
import { RegisterProcedureUseCase } from '../register-procedure'

export function makeRegisterProcedureUseCase() {
  const procedureRepository = new PrismaProcedureRepository()
  const customerRepository = new PrismaCustomerRepository()

  const useCase = new RegisterProcedureUseCase(
    procedureRepository,
    customerRepository,
  )

  return useCase
}
