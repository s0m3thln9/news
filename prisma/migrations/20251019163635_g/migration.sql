-- AlterTable
ALTER TABLE "public"."Location" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."News" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."UserEmailVerification" ALTER COLUMN "createdAt" SET DEFAULT NOW();
