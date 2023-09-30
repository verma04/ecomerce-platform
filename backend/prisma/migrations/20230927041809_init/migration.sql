-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "productVariantId" TEXT;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "productVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
