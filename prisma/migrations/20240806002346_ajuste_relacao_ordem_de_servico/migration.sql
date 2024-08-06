/*
  Warnings:

  - You are about to drop the column `comentarioId` on the `OrdemServico` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `OrdemServico` DROP FOREIGN KEY `OrdemServico_comentarioId_fkey`;

-- AlterTable
ALTER TABLE `OrdemServico` DROP COLUMN `comentarioId`;

-- CreateTable
CREATE TABLE `_ComentarioToOrdemServico` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ComentarioToOrdemServico_AB_unique`(`A`, `B`),
    INDEX `_ComentarioToOrdemServico_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ComentarioToOrdemServico` ADD CONSTRAINT `_ComentarioToOrdemServico_A_fkey` FOREIGN KEY (`A`) REFERENCES `Comentario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ComentarioToOrdemServico` ADD CONSTRAINT `_ComentarioToOrdemServico_B_fkey` FOREIGN KEY (`B`) REFERENCES `OrdemServico`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
