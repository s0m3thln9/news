-- AlterTable
ALTER TABLE "public"."Location" ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."UserEmailVerification" ALTER COLUMN "createdAt" SET DEFAULT NOW();
