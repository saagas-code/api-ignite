/*
  Warnings:

  - You are about to drop the column `fine_amounte` on the `cars` table. All the data in the column will be lost.
  - Added the required column `fine_amount` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cars" DROP COLUMN "fine_amounte",
ADD COLUMN     "fine_amount" INTEGER NOT NULL;
