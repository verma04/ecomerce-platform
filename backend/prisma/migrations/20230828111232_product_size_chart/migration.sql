-- CreateTable
CREATE TABLE "productSizeChart" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "productSizeChart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "productSizeChart_productId_key" ON "productSizeChart"("productId");

-- AddForeignKey
ALTER TABLE "productSizeChart" ADD CONSTRAINT "productSizeChart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
