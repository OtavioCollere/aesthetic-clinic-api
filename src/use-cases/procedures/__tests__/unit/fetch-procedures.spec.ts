import { InMemoryProcedureRepository } from '@/repositories/in-memory/in-memory-procedure-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchProcedureUseCase } from '../../fetch-procedures'

describe('FetchProcedure use case unit tests', () => {
  let sut: FetchProcedureUseCase
  let procedureRepository: InMemoryProcedureRepository

  beforeEach(() => {
    procedureRepository = new InMemoryProcedureRepository()
    sut = new FetchProcedureUseCase(procedureRepository)
  })

  it('Should to be able to fetch procedures', async () => {
    await procedureRepository.create({
      nome: 'lavien',
      regiao: 'Facial',
      valor: 1200,
      produto: 'Paraguai',
      dataProcedimento: new Date('2024-10-16'),
      created_at: new Date(),
      customerId: 'id1', // id ficticio
    })

    await procedureRepository.create({
      nome: 'botox',
      regiao: 'Facial',
      valor: 1200,
      produto: 'Paraguai',
      dataProcedimento: new Date('2024-10-16'),
      created_at: new Date(),
      customerId: 'id1', // id ficticio
    })

    const { procedures } = await sut.execute()

    expect(procedures).toHaveLength(2)
    expect(procedures).toEqual([
      expect.objectContaining({
        nome: 'lavien',
      }),
      expect.objectContaining({
        nome: 'botox',
      }),
    ])
  })
})
