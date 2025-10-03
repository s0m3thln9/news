-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('RU', 'EN');

-- AlterTable
ALTER TABLE "public"."Location" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."News" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "language" "public"."Language",
ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."UserEmailVerification" ALTER COLUMN "createdAt" SET DEFAULT NOW();
