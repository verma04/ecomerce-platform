/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `array` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "array" ADD COLUMN     "imageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "array_imageId_key" ON "array"("imageId");

-- AddForeignKey
ALTER TABLE "array" ADD CONSTRAINT "array_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
