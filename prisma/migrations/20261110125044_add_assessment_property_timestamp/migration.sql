/*
  Warnings:

  - Added the required column `propertyUpdatedAt` to the `PropertyAssessment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PropertyAssessment" ADD COLUMN     "propertyUpdatedAt" TIMESTAMP(3) NOT NULL;
