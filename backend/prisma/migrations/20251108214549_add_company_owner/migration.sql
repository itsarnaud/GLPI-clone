/*
  Warnings:

  - Added the required column `ownerId` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` ADD COLUMN `ownerId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `company` ADD CONSTRAINT `company_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
