-- AlterTable
ALTER TABLE "product" ADD COLUMN     "imageId" TEXT;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
