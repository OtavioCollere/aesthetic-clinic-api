import { Prisma } from '@prisma/client'
import { CustomerRepository } from '../customer-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCustomerRepository implements CustomerRepository {
  async findAll() {
    const customers = await prisma.customer.findMany()

    return customers
  }

  async findByCpf(cpf: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        cpf,
      },
    })

    return customer
  }

  async findById(id: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    })
    return customer
  }

  async create(data: Prisma.CustomerUncheckedCreateInput) {
    const customer = await prisma.customer.create({ data })

    return customer
  }
}
