import { Prisma, Procedure } from '@prisma/client'

export interface ProcedureRepository {
  findAll(): Promise<Procedure[]>
  findByCustomerId(customer_id: string): Promise<Procedure[]>
  findById(id: string): Promise<Procedure | null>
  create(data: Prisma.ProcedureUncheckedCreateInput): Promise<Procedure>
}
