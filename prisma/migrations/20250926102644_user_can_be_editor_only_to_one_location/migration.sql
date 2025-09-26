/*
  Warnings:

  - You are about to drop the `EditorLocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."EditorLocation" DROP CONSTRAINT "EditorLocation_locationUuid_fkey";

-- DropForeignKey
ALTER TABLE "public"."EditorLocation" DROP CONSTRAINT "EditorLocation_userUuid_fkey";

-- AlterTable
ALTER TABLE "public"."Location" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "locationUuid" UUID,
ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "public"."UserEmailVerification" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- DropTable
DROP TABLE "public"."EditorLocation";

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_locationUuid_fkey" FOREIGN KEY ("locationUuid") REFERENCES "public"."Location"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
