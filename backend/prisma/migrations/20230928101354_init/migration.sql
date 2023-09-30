-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "sellerId" TEXT;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;
