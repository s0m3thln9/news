-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."UserEmailVerification" ALTER COLUMN "code" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DEFAULT NOW();
