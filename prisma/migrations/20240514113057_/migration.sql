/*
  Warnings:

  - You are about to drop the column `amount` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `expenseAmount` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "amount",
DROP COLUMN "createdBy",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expenseAmount" INTEGER NOT NULL;
