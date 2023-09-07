-- DropForeignKey
ALTER TABLE "sellerProfile" DROP CONSTRAINT "sellerProfile_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "sellerProfile" DROP CONSTRAINT "sellerProfile_logoId_fkey";

-- AlterTable
ALTER TABLE "sellerProfile" ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "logoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
