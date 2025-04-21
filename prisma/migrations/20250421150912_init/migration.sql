-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "chedrauijs";

-- CreateTable
CREATE TABLE "chedrauijs"."RegistroActividad" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "RegistroActividad_pkey" PRIMARY KEY ("id")
);
