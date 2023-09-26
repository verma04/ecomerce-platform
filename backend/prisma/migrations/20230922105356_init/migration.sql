-- AlterTable
ALTER TABLE "product" ADD COLUMN     "inventoryId" TEXT;

-- CreateTable
CREATE TABLE "inventory" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sku" TEXT NOT NULL,
    "wareHouseId" TEXT,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productInformtion" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discountedPrice" TEXT NOT NULL,
    "productPerUnitString" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "productInformtion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "productInformtion_productId_key" ON "productInformtion"("productId");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_wareHouseId_fkey" FOREIGN KEY ("wareHouseId") REFERENCES "wareHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productInformtion" ADD CONSTRAINT "productInformtion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
