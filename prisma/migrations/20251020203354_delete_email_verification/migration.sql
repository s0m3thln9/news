/*
  Warnings:

  - You are about to drop the column `emailVerificationAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserEmailVerification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserEmailVerification" DROP CONSTRAINT "UserEmailVerification_userUuid_fkey";

-- AlterTable
ALTER TABLE "public"."Location" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."News" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "emailVerificationAt",
ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- DropTable
DROP TABLE "public"."UserEmailVerification";

-- DropEnum
DROP TYPE "public"."UserEmailVerificationStatus";
