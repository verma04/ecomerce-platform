-- CreateTable
CREATE TABLE "costomer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "costomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "costomerAddress" (
    "id" TEXT NOT NULL,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "landMark" TEXT,
    "state" TEXT,
    "city" TEXT,
    "pinCode" TEXT,
    "country" TEXT,
    "costomerId" TEXT NOT NULL,

    CONSTRAINT "costomerAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "costomerAddress_costomerId_key" ON "costomerAddress"("costomerId");

-- AddForeignKey
ALTER TABLE "costomerAddress" ADD CONSTRAINT "costomerAddress_costomerId_fkey" FOREIGN KEY ("costomerId") REFERENCES "costomer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
