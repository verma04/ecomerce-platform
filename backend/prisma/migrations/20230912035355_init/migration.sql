-- DropForeignKey
ALTER TABLE "sellerCategory" DROP CONSTRAINT "sellerCategory_imageId_fkey";

-- AlterTable
ALTER TABLE "sellerCategory" ALTER COLUMN "imageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "sellerCategory" ADD CONSTRAINT "sellerCategory_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
