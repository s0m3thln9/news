-- DropForeignKey
ALTER TABLE "public"."News" DROP CONSTRAINT "News_locationUuid_fkey";

-- DropForeignKey
ALTER TABLE "public"."News" DROP CONSTRAINT "News_userUuid_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_locationUuid_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserEmailVerification" DROP CONSTRAINT "UserEmailVerification_userUuid_fkey";

-- AlterTable
ALTER TABLE "public"."Location" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."News" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."UserEmailVerification" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_locationUuid_fkey" FOREIGN KEY ("locationUuid") REFERENCES "public"."Location"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserEmailVerification" ADD CONSTRAINT "UserEmailVerification_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "public"."User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."News" ADD CONSTRAINT "News_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "public"."User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."News" ADD CONSTRAINT "News_locationUuid_fkey" FOREIGN KEY ("locationUuid") REFERENCES "public"."Location"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
