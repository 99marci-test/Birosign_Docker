-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "files" JSONB NOT NULL DEFAULT '[]';
