/*
  Warnings:

  - You are about to drop the `costomer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `costomerAddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "costomerAddress" DROP CONSTRAINT "costomerAddress_costomerId_fkey";

-- DropTable
DROP TABLE "costomer";

-- DropTable
DROP TABLE "costomerAddress";

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customerAddress" (
    "id" TEXT NOT NULL,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "landMark" TEXT,
    "state" TEXT,
    "city" TEXT,
    "pinCode" TEXT,
    "country" TEXT,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "customerAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customerAddress_customerId_key" ON "customerAddress"("customerId");

-- AddForeignKey
ALTER TABLE "customerAddress" ADD CONSTRAINT "customerAddress_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
