import { CustomerRepository } from '@/repositories/customer-repository'
import { Customer } from '@prisma/client'
import { CpfAlreadyExistsError } from '../errors/cpf-already-exists-error'

export interface RegisterCustomerUseCaseRequest {
  id: string
  nome: string
  telefone: string
  dataNasc: Date
  cpf: string
  profissao?: string // Tornar opcional
  telefoneEmergencia?: string // Tornar opcional
  tratamentoEsteticoAnterior: boolean
  toxinaBotulinica: boolean
  toxinaBotulinicaRegiao?: string
  preenchimento: boolean
  preenchimentoRegiao?: string
  preenchimentoProduto?: string
  fiosDeSustentacao: boolean
  fiosDeSustentacaoRegiao?: string
  fiosDeSustentacaoProduto?: string
  liftCirurgico: boolean
  liftRegiao?: string
  liftProduto?: string
  peelingQuimico: boolean
  peelingQuimicoRegiao?: string
  peelingQuimicoProduto?: string
  laser: boolean
  laserRegiao?: string
  laserProduto?: string
  trabalhoExposto: boolean
  trabalhoExpostoRegiao?: string
  trabalhoExpostoProduto?: string
  usaMedicamento: boolean
  usaMedicamentoQual?: string
  alergia: boolean
  gestanteOuLactante: boolean
  intoleranciaLactose: boolean
  diabetes: boolean
  roacutam: boolean
  fumante: boolean
  disturbioCirculatorio: boolean
  epilepsia: boolean
  cicloMenstrualRegular: boolean
  funcionamentoIntestinalRegular: boolean
  tratamentoMedico: boolean
  tratamentoMedicoDetalhes?: string
  cirurgiaRecente: boolean
  cirurgiaRecenteDetalhes?: string
  problemasDePele: boolean
  problemasDePeleDetalhes?: string
  proteseCorporalOuFacial: boolean
  proteseCorporalOuFacialDetalhes?: string
  gestantes: boolean
  gestantesDetalhes?: string
  tumor: boolean
  tumorDetalhes?: string
  problemaOrtopedico: boolean
  problemaOrtopedicoDetalhes?: string
  utilizandoAcidos: boolean
  utilizandoAcidosDetalhes?: string
  observacaoProblema?: string // Tornar opcional
  created_at: Date
}

interface RegisterCustomerUseCaseResponse {
  customer: Customer
}

export class RegisterCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(
    data: RegisterCustomerUseCaseRequest,
  ): Promise<RegisterCustomerUseCaseResponse> {
    // verificar se o CPF e email já não está cadastrado
    const cpfExists = await this.customerRepository.findByCpf(data.cpf)

    if (cpfExists) {
      throw new CpfAlreadyExistsError()
    }

    const customer = await this.customerRepository.create({
      id: data.id,
      nome: data.nome,
      telefone: data.telefone,
      dataNasc: data.dataNasc,
      cpf: data.cpf,
      profissao: data.profissao,
      telefoneEmergencia: data.telefoneEmergencia,
      tratamentoEsteticoAnterior: data.tratamentoEsteticoAnterior,
      toxinaBotulinica: data.toxinaBotulinica,
      toxinaBotulinicaRegiao: data.toxinaBotulinicaRegiao || '',
      preenchimento: data.preenchimento,
      preenchimentoRegiao: data.preenchimentoRegiao || '',
      preenchimentoProduto: data.preenchimentoProduto || '',
      fiosDeSustentacao: data.fiosDeSustentacao,
      fiosDeSustentacaoRegiao: data.fiosDeSustentacaoRegiao || '',
      fiosDeSustentacaoProduto: data.fiosDeSustentacaoProduto || '',
      liftCirurgico: data.liftCirurgico,
      liftRegiao: data.liftRegiao || '',
      liftProduto: data.liftProduto || '',
      peelingQuimico: data.peelingQuimico,
      peelingQuimicoRegiao: data.peelingQuimicoRegiao || '',
      peelingQuimicoProduto: data.peelingQuimicoProduto || '',
      laser: data.laser,
      laserRegiao: data.laserRegiao || '',
      laserProduto: data.laserProduto || '',
      trabalhoExposto: data.trabalhoExposto,
      trabalhoExpostoRegiao: data.trabalhoExpostoRegiao || '',
      trabalhoExpostoProduto: data.trabalhoExpostoProduto || '',
      usaMedicamento: data.usaMedicamento,
      usaMedicamentoQual: data.usaMedicamentoQual || '',
      alergia: data.alergia,
      gestanteOuLactante: data.gestanteOuLactante,
      intoleranciaLactose: data.intoleranciaLactose,
      diabetes: data.diabetes,
      roacutam: data.roacutam,
      fumante: data.fumante,
      disturbioCirculatorio: data.disturbioCirculatorio,
      epilepsia: data.epilepsia,
      cicloMenstrualRegular: data.cicloMenstrualRegular,
      funcionamentoIntestinalRegular: data.funcionamentoIntestinalRegular,
      tratamentoMedico: data.tratamentoMedico,
      tratamentoMedicoDetalhes: data.tratamentoMedicoDetalhes || '',
      cirurgiaRecente: data.cirurgiaRecente,
      cirurgiaRecenteDetalhes: data.cirurgiaRecenteDetalhes || '',
      problemasDePele: data.problemasDePele,
      problemasDePeleDetalhes: data.problemasDePeleDetalhes || '',
      proteseCorporalOuFacial: data.proteseCorporalOuFacial,
      proteseCorporalOuFacialDetalhes:
        data.proteseCorporalOuFacialDetalhes || '',
      gestantes: data.gestantes,
      gestantesDetalhes: data.gestantesDetalhes || '',
      tumor: data.tumor,
      tumorDetalhes: data.tumorDetalhes || '',
      problemaOrtopedico: data.problemaOrtopedico,
      problemaOrtopedicoDetalhes: data.problemaOrtopedicoDetalhes || '',
      utilizandoAcidos: data.utilizandoAcidos,
      utilizandoAcidosDetalhes: data.utilizandoAcidosDetalhes || '',
      observacaoProblema: data.observacaoProblema || '',
      created_at: data.created_at,
    })

    return {
      customer,
    }
  }
}
