import { InMemoryProcedureRepository } from '@/repositories/in-memory/in-memory-procedure-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchProcedureUseCaseByCustomerId } from '../../fetch-procedures-by-customer-id'
import { InMemoryCustomerRepository } from '@/repositories/in-memory/in-memory-customer-repository'
import { createGeneralCustomerData } from '@/use-cases/customers/__tests__/helpers/CreateGeneralCustomerData'
import { CustomerNotFoundError } from '@/use-cases/errors/customer-not-found-error'

describe('FetchProcedure use case unit tests', () => {
  let sut: FetchProcedureUseCaseByCustomerId
  let procedureRepository: InMemoryProcedureRepository
  let customerRepository: InMemoryCustomerRepository
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let generalData: any

  beforeEach(() => {
    procedureRepository = new InMemoryProcedureRepository()
    customerRepository = new InMemoryCustomerRepository()
    sut = new FetchProcedureUseCaseByCustomerId(
      procedureRepository,
      customerRepository,
    )
    generalData = createGeneralCustomerData()
  })

  it('Should to be able to fetch procedures by customer id', async () => {
    const customer = await customerRepository.create({
      nome: 'Otavio',
      telefone: '1198765-4321',
      dataNasc: new Date('1990-05-15'),
      cpf: '12345678901', // CPF fictício
      ...generalData,
    })

    await procedureRepository.create({
      nome: 'botox',
      regiao: 'Facial',
      valor: 1200,
      produto: 'Paraguai',
      dataProcedimento: new Date('2024-10-16'),
      created_at: new Date(),
      customerId: customer.id, // id ficticio
    })

    const { procedures } = await sut.execute({ customer_id: customer.id })

    expect(procedures).toHaveLength(1)
    expect(procedures).toEqual([
      expect.objectContaining({
        customerId: customer.id,
        nome: 'botox',
        produto: 'Paraguai',
      }),
    ])
  })

  it('Should not to be able to fetch procedures with non existent customer id', async () => {
    const customer = await customerRepository.create({
      nome: 'Otavio',
      telefone: '1198765-4321',
      dataNasc: new Date('1990-05-15'),
      cpf: '12345678901', // CPF fictício
      ...generalData,
    })

    await procedureRepository.create({
      nome: 'botox',
      regiao: 'Facial',
      valor: 1200,
      produto: 'Paraguai',
      dataProcedimento: new Date('2024-10-16'),
      created_at: new Date(),
      customerId: customer.id, // id ficticio
    })

    await expect(() =>
      sut.execute({ customer_id: 'non-existent-id' }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError)
  })
})
