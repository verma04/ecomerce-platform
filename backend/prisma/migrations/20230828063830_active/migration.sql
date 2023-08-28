/*
  Warnings:

  - You are about to drop the `productFilter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "productFilter" DROP CONSTRAINT "productFilter_productId_fkey";

-- DropForeignKey
ALTER TABLE "productFilter" DROP CONSTRAINT "productFilter_productSizeId_fkey";

-- DropTable
DROP TABLE "productFilter";

-- CreateTable
CREATE TABLE "productColor" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productSizeId" TEXT NOT NULL,

    CONSTRAINT "productColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productSize" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productSizeId" TEXT NOT NULL,

    CONSTRAINT "productSize_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productColor" ADD CONSTRAINT "productColor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productSize" ADD CONSTRAINT "productSize_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
