-- AlterTable
ALTER TABLE "public"."Location" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."UserEmailVerification" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- CreateTable
CREATE TABLE "public"."News" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "images" TEXT[],
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "userUuid" UUID NOT NULL,
    "locationUuid" UUID NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "public"."News" ADD CONSTRAINT "News_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "public"."User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."News" ADD CONSTRAINT "News_locationUuid_fkey" FOREIGN KEY ("locationUuid") REFERENCES "public"."Location"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
