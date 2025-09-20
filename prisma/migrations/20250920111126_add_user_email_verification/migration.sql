-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- CreateTable
CREATE TABLE "public"."UserEmailVerification" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "userUuid" UUID NOT NULL,

    CONSTRAINT "UserEmailVerification_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "public"."UserEmailVerification" ADD CONSTRAINT "UserEmailVerification_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "public"."User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
