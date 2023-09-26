/*
  Warnings:

  - You are about to drop the `list` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "list" DROP CONSTRAINT "list_variantId_fkey";

-- DropTable
DROP TABLE "list";

-- CreateTable
CREATE TABLE "varinatList" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "variantId" TEXT,

    CONSTRAINT "varinatList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "varinatList" ADD CONSTRAINT "varinatList_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
