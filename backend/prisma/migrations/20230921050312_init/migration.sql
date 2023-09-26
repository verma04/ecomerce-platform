/*
  Warnings:

  - You are about to drop the column `landMark` on the `wareHouse` table. All the data in the column will be lost.
  - Added the required column `contactPerson` to the `wareHouse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNumber` to the `wareHouse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wareHouseName` to the `wareHouse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wareHouse" DROP COLUMN "landMark",
ADD COLUMN     "contactPerson" TEXT NOT NULL,
ADD COLUMN     "mobileNumber" TEXT NOT NULL,
ADD COLUMN     "wareHouseName" TEXT NOT NULL;
