/*
  Warnings:

  - You are about to drop the `productSizeChart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_userId_fkey";

-- DropForeignKey
ALTER TABLE "productSizeChart" DROP CONSTRAINT "productSizeChart_productId_fkey";

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "userId" DROP NOT NULL;

-- DropTable
DROP TABLE "productSizeChart";

-- CreateTable
CREATE TABLE "sizeChart" (
    "id" TEXT NOT NULL,

    CONSTRAINT "sizeChart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
