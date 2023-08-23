/*
  Warnings:

  - Made the column `merchantId` on table `merchantWareHouse` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "merchantWareHouse" DROP CONSTRAINT "merchantWareHouse_merchantId_fkey";

-- AlterTable
ALTER TABLE "merchantWareHouse" ALTER COLUMN "merchantId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "merchantWareHouse" ADD CONSTRAINT "merchantWareHouse_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
