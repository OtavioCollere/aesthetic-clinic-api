import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { createGeneralCustomerData } from '@/use-cases/customers/__tests__/helpers/CreateGeneralCustomerData'

describe('Register Procedure E2E', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register procedure', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const generalData = createGeneralCustomerData()

    const customer = await prisma.customer.create({
      data: {
        nome: 'Otavio',
        telefone: '1198765-4321',
        dataNasc: new Date('1990-05-15'),
        cpf: '08108174421', // CPF fictício
        ...generalData,
      },
    })

    const response = await request(app.server).post('/procedures').send({
      nome: 'Botox',
      regiao: 'Facial',
      valor: 1250,
      produto: 'China',
      dataProcedimento: '2024-11-26',
      customerId: customer.id,
    })

    expect(response.statusCode).toEqual(201)
  })
})
