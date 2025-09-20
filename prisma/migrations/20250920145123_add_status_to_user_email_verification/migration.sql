/*
  Warnings:

  - Added the required column `status` to the `UserEmailVerification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserEmailVerificationStatus" AS ENUM ('PENDING', 'FULLFILLED');

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."UserEmailVerification" ADD COLUMN     "status" "public"."UserEmailVerificationStatus" NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT NOW();
