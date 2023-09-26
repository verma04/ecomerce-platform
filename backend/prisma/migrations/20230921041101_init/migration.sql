/*
  Warnings:

  - You are about to drop the `sellerWareHouse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sellerWareHouse" DROP CONSTRAINT "sellerWareHouse_sellerId_fkey";

-- DropTable
DROP TABLE "sellerWareHouse";

-- CreateTable
CREATE TABLE "wareHouse" (
    "id" TEXT NOT NULL,
    "gstIn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sellerId" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT NOT NULL,
    "landMark" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "wareHouse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wareHouse" ADD CONSTRAINT "wareHouse_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
