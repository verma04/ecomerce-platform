/*
  Warnings:

  - Changed the type of `discountedPrice` on the `productInformation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `productPerUnit` on the `productInformation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "productInformation" DROP COLUMN "discountedPrice",
ADD COLUMN     "discountedPrice" INTEGER NOT NULL,
DROP COLUMN "productPerUnit",
ADD COLUMN     "productPerUnit" INTEGER NOT NULL;
