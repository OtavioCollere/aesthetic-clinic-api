-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataNasc" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT NOT NULL,
    "profissao" TEXT,
    "telefoneEmergencia" TEXT,
    "tratamentoEsteticoAnterior" BOOLEAN NOT NULL,
    "toxinaBotulinica" BOOLEAN NOT NULL,
    "toxinaBotulinicaRegiao" TEXT,
    "preenchimento" BOOLEAN NOT NULL,
    "preenchimentoRegiao" TEXT,
    "preenchimentoProduto" TEXT,
    "fiosDeSustentacao" BOOLEAN NOT NULL,
    "fiosDeSustentacaoRegiao" TEXT,
    "fiosDeSustentacaoProduto" TEXT,
    "liftCirurgico" BOOLEAN NOT NULL,
    "liftRegiao" TEXT,
    "liftProduto" TEXT,
    "peelingQuimico" BOOLEAN NOT NULL,
    "peelingQuimicoRegiao" TEXT,
    "peelingQuimicoProduto" TEXT,
    "laser" BOOLEAN NOT NULL,
    "laserRegiao" TEXT,
    "laserProduto" TEXT,
    "trabalhoExposto" BOOLEAN NOT NULL,
    "trabalhoExpostoRegiao" TEXT,
    "trabalhoExpostoProduto" TEXT,
    "usaMedicamento" BOOLEAN NOT NULL,
    "usaMedicamentoQual" TEXT,
    "alergia" BOOLEAN NOT NULL,
    "gestanteOuLactante" BOOLEAN NOT NULL,
    "intoleranciaLactose" BOOLEAN NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "roacutam" BOOLEAN NOT NULL,
    "fumante" BOOLEAN NOT NULL,
    "disturbioCirculatorio" BOOLEAN NOT NULL,
    "epilepsia" BOOLEAN NOT NULL,
    "cicloMenstrualRegular" BOOLEAN NOT NULL,
    "funcionamentoIntestinalRegular" BOOLEAN NOT NULL,
    "tratamentoMedico" BOOLEAN NOT NULL,
    "tratamentoMedicoDetalhes" TEXT,
    "cirurgiaRecente" BOOLEAN NOT NULL,
    "cirurgiaRecenteDetalhes" TEXT,
    "problemasDePele" BOOLEAN NOT NULL,
    "problemasDePeleDetalhes" TEXT,
    "proteseCorporalOuFacial" BOOLEAN NOT NULL,
    "proteseCorporalOuFacialDetalhes" TEXT,
    "gestantes" BOOLEAN NOT NULL,
    "gestantesDetalhes" TEXT,
    "tumor" BOOLEAN NOT NULL,
    "tumorDetalhes" TEXT,
    "problemaOrtopedico" BOOLEAN NOT NULL,
    "problemaOrtopedicoDetalhes" TEXT,
    "utilizandoAcidos" BOOLEAN NOT NULL,
    "utilizandoAcidosDetalhes" TEXT,
    "observacaoProblema" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedures" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "produto" TEXT,
    "dataProcedimento" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "procedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "dataMarcada" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "procedures" ADD CONSTRAINT "procedures_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
