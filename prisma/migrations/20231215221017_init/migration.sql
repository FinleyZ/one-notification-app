/*
  Warnings:

  - You are about to drop the column `object` on the `email_notifications` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `email_notifications` table. All the data in the column will be lost.
  - Added the required column `subject` to the `email_notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "email_notifications" DROP CONSTRAINT "email_notifications_userId_fkey";

-- AlterTable
ALTER TABLE "email_notifications" DROP COLUMN "object",
DROP COLUMN "userId",
ADD COLUMN     "subject" TEXT NOT NULL;
