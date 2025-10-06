/*
  Warnings:

  - You are about to drop the column `converted_currency_code` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `converted_total` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `currency_code` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `files` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `merchant` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `transactions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "transactions_category_code_idx";

-- DropIndex
DROP INDEX "transactions_merchant_idx";

-- DropIndex
DROP INDEX "transactions_name_idx";

-- DropIndex
DROP INDEX "transactions_project_code_idx";

-- DropIndex
DROP INDEX "transactions_total_idx";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "converted_currency_code",
DROP COLUMN "converted_total",
DROP COLUMN "currency_code",
DROP COLUMN "description",
DROP COLUMN "files",
DROP COLUMN "merchant",
DROP COLUMN "name",
DROP COLUMN "note",
DROP COLUMN "total";
