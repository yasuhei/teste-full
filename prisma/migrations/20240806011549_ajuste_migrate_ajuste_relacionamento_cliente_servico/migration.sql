-- AlterTable
ALTER TABLE `OrdemServico` ADD COLUMN `clientId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `OrdemServico` ADD CONSTRAINT `OrdemServico_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
