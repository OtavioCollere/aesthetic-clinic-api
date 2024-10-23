import { Customer } from "@prisma/client"


interface RegisterCustomerUseCaseRequest {
  id : string
  nome : string               
  telefone: string           
  dataNasc     : Date    
  cpf                : string
  profissao         : string
  telefoneEmergencia : string
  tratamentoEsteticoAnterior : Boolean
  toxinaBotulinica       :Boolean
  toxinaBotulinicaRegiao?: string
  preenchimento        : Boolean
  preenchimentoRegiao?  : string
  preenchimentoProduto? : string
  fiosDeSustentacao :        Boolean
  fiosDeSustentacaoRegiao?: string
  fiosDeSustentacaoProduto? : string
  liftCirurgico : Boolean
  liftRegiao?   : string
  liftProduto?  : string
  peelingQuimico      : Boolean
  peelingQuimicoRegiao?  : string
  peelingQuimicoProduto? : string
  laser : Boolean
  laserRegiao?  : string
  laserProduto? : string
  trabalhoExposto        : Boolean
  trabalhoExpostoRegiao?  : string
  trabalhoExpostoProduto? : string
  usaMedicamento       : Boolean
  usaMedicamentoQual : string
  alergia               : Boolean
  gestanteOuLactante    : Boolean
  intoleranciaLactose   : Boolean
  diabetes             : Boolean
  roacutam             : Boolean
  fumante                       : Boolean  
  disturbioCirculatorio           : Boolean
  epilepsia                       : Boolean
  cicloMenstrualRegular           : Boolean
  funcionamentoIntestinalRegular  : Boolean
  tratamentoMedico          : Boolean
  tratamentoMedicoDetalhes? : string
  cirurgiaRecente          : Boolean
  cirurgiaRecenteDetalhes? : string
  problemasDePele          : Boolean
  problemasDePeleDetalhes? : string
  proteseCorporalOuFacial          : Boolean
  proteseCorporalOuFacialDetalhes? : string
  gestantes          : Boolean
  gestantesDetalhes? : string
  tumor          : Boolean
  tumorDetalhes? : string
  problemaOrtopedico          : Boolean
  problemaOrtopedicoDetalhes? : string
  utilizandoAcidos          : Boolean
  utilizandoAcidosDetalhes? : string
  observacaoProblema : string
  created_at  :Date
}

interface RegisterCustomerUseCaseResponse {
    customer : Customer
}

export class RegisterCustomerUseCase  {

    constructor(private customerRepository : CustomerRepository) {}

    async execute({} : RegisterCustomerUseCaseRequest) : Promise<RegisterCustomerUseCaseResponse> {

        // verificar se o CPF e email já não está cadastrado
        
    }
}