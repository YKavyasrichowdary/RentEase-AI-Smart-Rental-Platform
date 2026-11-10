-- CreateTable
CREATE TABLE "PropertyAssessment" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "trustScore" INTEGER NOT NULL,
    "signals" JSONB NOT NULL,
    "estimatedRentLow" DECIMAL(12,2) NOT NULL,
    "estimatedRentMid" DECIMAL(12,2) NOT NULL,
    "estimatedRentHigh" DECIMAL(12,2) NOT NULL,
    "listedRentOutsideRange" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PropertyAssessment_propertyId_idx" ON "PropertyAssessment"("propertyId");

-- CreateIndex
CREATE INDEX "PropertyAssessment_trustScore_idx" ON "PropertyAssessment"("trustScore");

-- AddForeignKey
ALTER TABLE "PropertyAssessment" ADD CONSTRAINT "PropertyAssessment_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
