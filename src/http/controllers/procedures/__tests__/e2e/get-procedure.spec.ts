import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createGeneralCustomerData } from '@/use-cases/customers/__tests__/helpers/CreateGeneralCustomerData'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Procedure E2E ', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get procedure', async () => {
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

    const procedure = await prisma.procedure.create({
      data: {
        nome: 'Botox',
        regiao: 'Facial',
        valor: 1250,
        produto: 'China',
        dataProcedimento: '2024-11-26',
        customerId: customer.id,
      },
    })

    const response = await request(app.server)
      .get(`/procedures/${procedure.id}`)
      .send()

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual([
      expect.objectContaining({
        nome: 'Botox',
      }),
      expect.objectContaining({
        customerId: customer.id,
      }),
    ])
  })
})
