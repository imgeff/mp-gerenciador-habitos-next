-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "alterado_em" TIMESTAMP(3) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habitos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "habitos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registros_habito" (
    "id" SERIAL NOT NULL,
    "id_habito" INTEGER NOT NULL,
    "data" DATE NOT NULL,

    CONSTRAINT "registros_habito_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
