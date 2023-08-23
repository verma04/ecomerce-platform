-- AlterTable
ALTER TABLE "merchantCategory" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "merchantWareHouse" (
    "id" TEXT NOT NULL,
    "gstIn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "merchantId" TEXT,
    "addressLin1" TEXT NOT NULL,
    "addressLine2" TEXT NOT NULL,
    "landMark" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "merchantWareHouse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "merchantWareHouse" ADD CONSTRAINT "merchantWareHouse_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
