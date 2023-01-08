/*
  Warnings:

  - Added the required column `Vacancies` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "Vacancies" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Participants" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "activitiesId" INTEGER NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Activity_startsAt_idx" ON "Activity"("startsAt");

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_activitiesId_fkey" FOREIGN KEY ("activitiesId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
