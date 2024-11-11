import { Procedure, Prisma } from '@prisma/client'
import { ProcedureRepository } from '../procedure-repository'
import { randomUUID } from 'crypto'

export class InMemoryProcedureRepository implements ProcedureRepository {
  public items: Procedure[] = []

  async findAll() {
    const procedures = this.items

    return procedures
  }

  async findById(id: string) {
    const procedure = this.items.find((item) => item.id === id)

    if (!procedure) {
      return null
    }

    return procedure
  }

  async create(data: Prisma.ProcedureUncheckedCreateInput) {
    const procedure = {
      id: randomUUID(),
      nome: data.nome,
      regiao: data.regiao,
      valor: data.valor,
      produto: data.produto ?? null,
      dataProcedimento:
        data.dataProcedimento instanceof Date
          ? data.dataProcedimento
          : new Date(data.dataProcedimento),
      created_at: new Date(),
      customerId: data.customerId,
    }

    this.items.push(procedure)

    return procedure
  }
}
