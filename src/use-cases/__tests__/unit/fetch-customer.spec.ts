import { InMemoryCustomerRepository } from '@/repositories/in-memory/in-memory-customer-repository'
import { FetchCustomerUseCase } from '@/use-cases/customers/fetch-customer'
import { beforeEach, describe, expect, it } from 'vitest'
import { createGeneralCustomerData } from '../helpers/CreateGeneralCustomerData'

describe('FetchCustomer use case tests', () => {
  let sut: FetchCustomerUseCase
  let customerRepository: InMemoryCustomerRepository
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let generalData: any

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository()
    sut = new FetchCustomerUseCase(customerRepository)
    generalData = createGeneralCustomerData()
  })

  it('Should to able to fetch customers', async () => {
    await customerRepository.create({
      nome: 'Otavio',
      telefone: '1198765-4321',
      dataNasc: new Date('1990-05-15'),
      cpf: '12345678901', // CPF fictício
      ...generalData,
    })

    await customerRepository.create({
      nome: 'Eunice',
      telefone: '1198765-4321',
      dataNasc: new Date('1990-05-15'),
      cpf: '12345678777', // CPF fictício
      ...generalData,
    })

    const { customers } = await sut.execute()

    expect(customers).toHaveLength(2)
    expect(customers).toEqual([
      expect.objectContaining({
        nome: 'Otavio',
      }),
      expect.objectContaining({
        nome: 'Eunice',
      }),
    ])
  })
})
