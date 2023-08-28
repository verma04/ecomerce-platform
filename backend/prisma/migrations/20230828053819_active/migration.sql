/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `productColor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `productSize` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "array" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "productSizeId" TEXT NOT NULL,
    "productColorId" TEXT,

    CONSTRAINT "array_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "productColor_productId_key" ON "productColor"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "productSize_productId_key" ON "productSize"("productId");

-- AddForeignKey
ALTER TABLE "array" ADD CONSTRAINT "array_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "productSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "array" ADD CONSTRAINT "array_productColorId_fkey" FOREIGN KEY ("productColorId") REFERENCES "productColor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
