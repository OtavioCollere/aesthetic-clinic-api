/*
  Warnings:

  - Added the required column `regiao` to the `procedures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "procedures" ADD COLUMN     "regiao" TEXT NOT NULL;
