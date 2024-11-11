import { beforeEach, describe, expect, it } from 'vitest'
import { GetProcedureUseCase } from '../../get-procedure'
import { InMemoryProcedureRepository } from '@/repositories/in-memory/in-memory-procedure-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

describe('GetProcedure use case unit tests', () => {
  let sut: GetProcedureUseCase
  let procedureRepository: InMemoryProcedureRepository

  beforeEach(() => {
    procedureRepository = new InMemoryProcedureRepository()
    sut = new GetProcedureUseCase(procedureRepository)
  })

  it('Should to able to get procedure ', async () => {
    const createdProcedure = await procedureRepository.create({
      nome: 'Otavio',
      regiao: 'Facial',
      valor: 1200,
      produto: 'Paraguai',
      dataProcedimento: new Date('2024-10-16'),
      created_at: new Date(),
      customerId: '123',
    })

    const { procedure } = await sut.execute({
      procedureId: createdProcedure.id,
    })

    expect(procedure).toHaveProperty('id')
    expect(procedure.id).toStrictEqual(createdProcedure.id)
  })

  it('Should not to able get proceedure with non existent procedure id ', async () => {
    await procedureRepository.create({
      nome: 'Otavio',
      regiao: 'Facial',
      valor: 1200,
      produto: 'Paraguai',
      dataProcedimento: new Date('2024-10-16'),
      created_at: new Date(),
      customerId: '123',
    })

    await expect(() =>
      sut.execute({
        procedureId: 'non-existant-procedure-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
