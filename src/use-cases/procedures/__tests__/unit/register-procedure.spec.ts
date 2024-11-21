import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterProcedureUseCase } from '../../register-procedure'
import { ProcedureRepository } from '@/repositories/procedure-repository'
import { CustomerRepository } from '@/repositories/customer-repository'
import { InMemoryProcedureRepository } from '@/repositories/in-memory/in-memory-procedure-repository'
import { InMemoryCustomerRepository } from '@/repositories/in-memory/in-memory-customer-repository'
import { createGeneralCustomerData } from '@/use-cases/customers/__tests__/helpers/CreateGeneralCustomerData'
import { CustomerNotFoundError } from '@/use-cases/errors/customer-not-found-error'

describe('Register Procedure Use Case unit tests', () => {
  let sut: RegisterProcedureUseCase
  let procedureRepository: ProcedureRepository
  let customerRepository: CustomerRepository
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let generalData: any

  beforeEach(() => {
    procedureRepository = new InMemoryProcedureRepository()
    customerRepository = new InMemoryCustomerRepository()
    sut = new RegisterProcedureUseCase(procedureRepository, customerRepository)
  })

  it('Should to able create procedure', async () => {
    generalData = createGeneralCustomerData()

    const customer = await customerRepository.create({
      nome: 'Otavio',
      telefone: '1198765-4321',
      dataNasc: new Date('1990-05-15'),
      cpf: '08108174421', // CPF fictício
      ...generalData,
    })

    const { procedure } = await sut.execute({
      nome: 'botox',
      regiao: 'Facial',
      valor: 1200,
      produto: 'Paraguai',
      dataProcedimento: new Date('2024-10-16'),
      created_at: new Date(),
      customerId: customer.id, // id ficticio
    })

    expect(procedure).toHaveProperty('id')
    expect(procedure.nome).toStrictEqual('botox')
    expect(procedure.customerId).toStrictEqual(customer.id)
  })

  it('Should not to able register procedure with non existent customer', async () => {
    await customerRepository.create({
      nome: 'Otavio',
      telefone: '1198765-4321',
      dataNasc: new Date('1990-05-15'),
      cpf: '08108174421', // CPF fictício
      ...generalData,
    })

    await expect(() =>
      sut.execute({
        nome: 'botox',
        regiao: 'Facial',
        valor: 1200,
        produto: 'Paraguai',
        dataProcedimento: new Date('2024-10-16'),
        created_at: new Date(),
        customerId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError)
  })
})
