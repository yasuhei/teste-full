/*
  Warnings:

  - You are about to drop the `_ComentarioToOrdemServico` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idOrdemServico` to the `Comentario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ComentarioToOrdemServico` DROP FOREIGN KEY `_ComentarioToOrdemServico_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ComentarioToOrdemServico` DROP FOREIGN KEY `_ComentarioToOrdemServico_B_fkey`;

-- AlterTable
ALTER TABLE `Comentario` ADD COLUMN `idOrdemServico` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_ComentarioToOrdemServico`;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_idOrdemServico_fkey` FOREIGN KEY (`idOrdemServico`) REFERENCES `OrdemServico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
