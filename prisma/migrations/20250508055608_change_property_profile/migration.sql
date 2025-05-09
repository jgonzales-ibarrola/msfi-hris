/*
  Warnings:

  - You are about to drop the column `qrCode` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userQrCode]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userQrCode` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_qrCode_fkey";

-- DropIndex
DROP INDEX "Profile_qrCode_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "qrCode",
ADD COLUMN     "userQrCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userQrCode_key" ON "Profile"("userQrCode");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userQrCode_fkey" FOREIGN KEY ("userQrCode") REFERENCES "User"("qrCode") ON DELETE CASCADE ON UPDATE CASCADE;
