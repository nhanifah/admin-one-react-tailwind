/*
  Warnings:

  - The primary key for the `cbt_questions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `cbt_questions` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`);
