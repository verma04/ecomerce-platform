-- DropForeignKey
ALTER TABLE "sellerProfile" DROP CONSTRAINT "sellerProfile_businessCategoryId_fkey";

-- AlterTable
ALTER TABLE "sellerProfile" ALTER COLUMN "businessCategoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_businessCategoryId_fkey" FOREIGN KEY ("businessCategoryId") REFERENCES "businessCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
