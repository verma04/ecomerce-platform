/*
  Warnings:

  - You are about to drop the `varinatList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "varinatList" DROP CONSTRAINT "varinatList_variantId_fkey";

-- DropTable
DROP TABLE "varinatList";

-- CreateTable
CREATE TABLE "variantList" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "variantId" TEXT,

    CONSTRAINT "variantList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "variantList" ADD CONSTRAINT "variantList_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
