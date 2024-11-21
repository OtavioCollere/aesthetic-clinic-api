import { Customer, Prisma } from '@prisma/client'
import { CustomerRepository } from '../customer-repository'

export class InMemoryCustomerRepository implements CustomerRepository {
  public items: Customer[] = []

  async findAll() {
    const customers = this.items

    return customers
  }

  async findByCpf(cpf: string) {
    const customer = this.items.find((item) => item.cpf === cpf)

    if (!customer) {
      return null
    }

    return customer
  }

  async findById(id: string) {
    const customer = this.items.find((item) => item.id === id)

    if (!customer) {
      return null
    }

    return customer
  }

  async create(data: Prisma.CustomerUncheckedCreateInput) {
    const customer = {
      id: data.id || '', // garantindo que `id` seja uma string
      nome: data.nome,
      telefone: data.telefone,
      dataNasc:
        data.dataNasc instanceof Date ? data.dataNasc : new Date(data.dataNasc),
      cpf: data.cpf,
      profissao: data.profissao || null,
      telefoneEmergencia: data.telefoneEmergencia || null,
      tratamentoEsteticoAnterior: data.tratamentoEsteticoAnterior || false,
      toxinaBotulinica: data.toxinaBotulinica || false,
      toxinaBotulinicaRegiao: data.toxinaBotulinicaRegiao || '',
      preenchimento: data.preenchimento || false,
      preenchimentoRegiao: data.preenchimentoRegiao || '',
      preenchimentoProduto: data.preenchimentoProduto || '',
      fiosDeSustentacao: data.fiosDeSustentacao || false,
      fiosDeSustentacaoRegiao: data.fiosDeSustentacaoRegiao || '',
      fiosDeSustentacaoProduto: data.fiosDeSustentacaoProduto || '',
      liftCirurgico: data.liftCirurgico || false,
      liftRegiao: data.liftRegiao || '',
      liftProduto: data.liftProduto || '',
      peelingQuimico: data.peelingQuimico || false,
      peelingQuimicoRegiao: data.peelingQuimicoRegiao || '',
      peelingQuimicoProduto: data.peelingQuimicoProduto || '',
      laser: data.laser || false,
      laserRegiao: data.laserRegiao || '',
      laserProduto: data.laserProduto || '',
      trabalhoExposto: data.trabalhoExposto || false,
      trabalhoExpostoRegiao: data.trabalhoExpostoRegiao || '',
      trabalhoExpostoProduto: data.trabalhoExpostoProduto || '',
      usaMedicamento: data.usaMedicamento || false,
      usaMedicamentoQual: data.usaMedicamentoQual || '',
      alergia: data.alergia || false,
      gestanteOuLactante: data.gestanteOuLactante || false,
      intoleranciaLactose: data.intoleranciaLactose || false,
      diabetes: data.diabetes || false,
      roacutam: data.roacutam || false,
      fumante: data.fumante || false,
      disturbioCirculatorio: data.disturbioCirculatorio || false,
      epilepsia: data.epilepsia || false,
      cicloMenstrualRegular: data.cicloMenstrualRegular || false,
      funcionamentoIntestinalRegular:
        data.funcionamentoIntestinalRegular || false,
      tratamentoMedico: data.tratamentoMedico || false,
      tratamentoMedicoDetalhes: data.tratamentoMedicoDetalhes || '',
      cirurgiaRecente: data.cirurgiaRecente || false,
      cirurgiaRecenteDetalhes: data.cirurgiaRecenteDetalhes || '',
      problemasDePele: data.problemasDePele || false,
      problemasDePeleDetalhes: data.problemasDePeleDetalhes || '',
      proteseCorporalOuFacial: data.proteseCorporalOuFacial || false,
      proteseCorporalOuFacialDetalhes:
        data.proteseCorporalOuFacialDetalhes || '',
      gestantes: data.gestantes || false,
      gestantesDetalhes: data.gestantesDetalhes || '',
      tumor: data.tumor || false,
      tumorDetalhes: data.tumorDetalhes || '',
      problemaOrtopedico: data.problemaOrtopedico || false,
      problemaOrtopedicoDetalhes: data.problemaOrtopedicoDetalhes || '',
      utilizandoAcidos: data.utilizandoAcidos || false,
      utilizandoAcidosDetalhes: data.utilizandoAcidosDetalhes || '',
      observacaoProblema: data.observacaoProblema || '',
      created_at: new Date(),
    }

    this.items.push(customer)

    return customer
  }
}
