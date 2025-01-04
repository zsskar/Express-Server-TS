/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "discount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "createdAt",
ADD COLUMN     "purchaseAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
