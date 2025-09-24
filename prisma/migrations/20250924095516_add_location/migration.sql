-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."UserEmailVerification" ALTER COLUMN "createdAt" SET DEFAULT NOW(),
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "public"."Location" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."EditorLocation" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userUuid" UUID NOT NULL,
    "locationUuid" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "EditorLocation_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "EditorLocation_userUuid_locationUuid_key" ON "public"."EditorLocation"("userUuid", "locationUuid");

-- AddForeignKey
ALTER TABLE "public"."EditorLocation" ADD CONSTRAINT "EditorLocation_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "public"."User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EditorLocation" ADD CONSTRAINT "EditorLocation_locationUuid_fkey" FOREIGN KEY ("locationUuid") REFERENCES "public"."Location"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
