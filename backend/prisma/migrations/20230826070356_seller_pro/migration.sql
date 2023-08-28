/*
  Warnings:

  - You are about to drop the column `title` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `qrcode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sellerProfileId]` on the table `qrcode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `qrcode` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `sellerProfileId` to the `qrcode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "qrcode" DROP CONSTRAINT "qrcode_userId_fkey";

-- DropIndex
DROP INDEX "qrcode_userId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "title",
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "qrcode" DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "sellerProfileId" TEXT NOT NULL,
ADD CONSTRAINT "qrcode_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "qrcode_sellerProfileId_key" ON "qrcode"("sellerProfileId");

-- AddForeignKey
ALTER TABLE "qrcode" ADD CONSTRAINT "qrcode_sellerProfileId_fkey" FOREIGN KEY ("sellerProfileId") REFERENCES "sellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
