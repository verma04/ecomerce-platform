/*
  Warnings:

  - You are about to drop the `productInformtion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "productInformtion" DROP CONSTRAINT "productInformtion_productId_fkey";

-- DropTable
DROP TABLE "productInformtion";

-- CreateTable
CREATE TABLE "productInformation" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discountedPrice" TEXT NOT NULL,
    "productPerUnitString" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "productInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "productInformation_productId_key" ON "productInformation"("productId");

-- AddForeignKey
ALTER TABLE "productInformation" ADD CONSTRAINT "productInformation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
