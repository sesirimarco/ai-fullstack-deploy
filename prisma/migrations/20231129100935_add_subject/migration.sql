/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `JournalEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subject` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "JournalEntry_userId_idx";

-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "subject" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_userId_id_key" ON "JournalEntry"("userId", "id");
