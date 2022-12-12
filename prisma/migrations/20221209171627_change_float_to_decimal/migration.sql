/*
  Warnings:

  - You are about to alter the column `daily_rate` on the `cars` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `fine_amount` on the `cars` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "cars" ALTER COLUMN "daily_rate" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "fine_amount" SET DATA TYPE DECIMAL(65,30);
