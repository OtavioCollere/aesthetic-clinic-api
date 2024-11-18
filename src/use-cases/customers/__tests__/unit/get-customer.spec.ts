import { InMemoryCustomerRepository } from '@/repositories/in-memory/in-memory-customer-repository'
import { GetCustomerUseCase } from '@/use-cases/customers/get-customer'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { beforeEach, describe, expect, it } from 'vitest'
import { createGeneralCustomerData } from '../helpers/CreateGeneralCustomerData'

describe('GetCustomer use case tests', () => {
  let sut: GetCustomerUseCase
  let customerRepository: InMemoryCustomerRepository
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let generalData: any

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository()
    sut = new GetCustomerUseCase(customerRepository)
    generalData = createGeneralCustomerData()
  })

  it('Should to able to get customer profile', async () => {
    const createdCustomer = await customerRepository.create({
      nome: 'Otavio',
      telefone: '1198765-4321',
      dataNasc: new Date('1990-05-15'),
      cpf: '12345678901', // CPF fictício
      ...generalData,
    })

    const { customer } = await sut.execute({ customerId: createdCustomer.id })

    expect(customer).toHaveProperty('id')
    expect(customer.nome).toEqual('Otavio')
  })

  it('Should not be able to get customer profile with wrong id', async () => {
    await customerRepository.create({
      nome: 'Otavio',
      telefone: '1198765-4321',
      dataNasc: new Date('1990-05-15'),
      cpf: '12345678901', // CPF fictício
      ...generalData,
    })

    await expect(() =>
      sut.execute({ customerId: 'invalid-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
