import { Prisma } from '@prisma/client'
import { ProcedureRepository } from '../procedure-repository'
import { prisma } from '@/lib/prisma'

export class PrismaProcedureRepository implements ProcedureRepository {
  async findAll() {
    const procedures = await prisma.procedure.findMany()

    return procedures
  }

  async findByCustomerId(customer_id: string) {
    const procedures = await prisma.procedure.findMany({
      where: {
        customerId: customer_id,
      },
    })

    return procedures
  }

  async findById(id: string) {
    const procedure = await prisma.procedure.findUnique({
      where: {
        id,
      },
    })

    return procedure
  }

  async create(data: Prisma.ProcedureUncheckedCreateInput) {
    const procedure = await prisma.procedure.create({
      data,
    })

    return procedure
  }
}
