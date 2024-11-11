import { InMemoryCustomerRepository } from '@/repositories/in-memory/in-memory-customer-repository'
import { RegisterCustomerUseCase } from '@/use-cases/customers/register-customer'
import { CpfAlreadyExistsError } from '@/use-cases/errors/cpf-already-exists-error'
import { beforeEach, describe, expect, it } from 'vitest'
import { createGeneralCustomerData } from '../helpers/CreateGeneralCustomerData'

describe('RegisterCustomer use case tests', () => {
  let sut: RegisterCustomerUseCase
  let customerRepository: InMemoryCustomerRepository
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let generalData: any

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository()
    sut = new RegisterCustomerUseCase(customerRepository)
    generalData = createGeneralCustomerData()
  })

  it('Should to able create a customer', async () => {
    const customerData = {
      nome: 'João da Silva',
      telefone: '1198765-4321',
      dataNasc: new Date('1990-05-15'),
      cpf: '12345678901', // CPF fictício
      ...generalData,
    }

    const { customer } = await sut.execute(customerData)

    expect(customer).toHaveProperty('id')
    expect(customer.cpf).toStrictEqual('12345678901')
  })

  it('Should not to able create a customer with same cpf twice', async () => {
    const cpf = '12345678901'

    await sut.execute({
      nome: 'Otavio',
      telefone: '1198765-4321',
      dataNasc: new Date('1990-05-15'),
      cpf, // CPF fictício
      ...generalData,
    })

    await expect(() =>
      sut.execute({
        nome: 'Eunice',
        telefone: '1198765-9999',
        dataNasc: new Date('2003-05-20'),
        cpf, // CPF fictício
        ...generalData,
      }),
    ).rejects.toBeInstanceOf(CpfAlreadyExistsError)
  })
})
