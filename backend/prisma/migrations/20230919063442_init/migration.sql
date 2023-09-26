-- AlterTable
ALTER TABLE "businessCategory" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "subCategory" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
