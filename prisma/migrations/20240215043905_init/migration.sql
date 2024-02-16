-- CreateTable
CREATE TABLE `admins` (
    `id` CHAR(32) NOT NULL,
    `name` VARCHAR(255) NULL,
    `username` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `role` CHAR(32) NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `role`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_log` (
    `id` CHAR(32) NOT NULL,
    `table_name` VARCHAR(255) NULL,
    `record_id` CHAR(32) NULL,
    `action` VARCHAR(255) NULL,
    `field_name` VARCHAR(255) NULL,
    `old_value` TEXT NULL,
    `new_value` TEXT NULL,
    `user_id` CHAR(32) NULL,
    `timestamp` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `batch_registration` (
    `id` CHAR(32) NOT NULL,
    `batch_name` VARCHAR(255) NULL,
    `quota` VARCHAR(255) NULL,
    `end_date` DATETIME(0) NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cbt_answers` (
    `question_id` CHAR(32) NOT NULL,
    `student_id` CHAR(32) NOT NULL,
    `selected_option` TEXT NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`question_id`, `student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cbt_enrolled` (
    `id` CHAR(32) NOT NULL,
    `student_id` CHAR(32) NOT NULL,
    `exam_id` CHAR(32) NOT NULL,
    `token` VARCHAR(255) NULL,
    `time_start` DATETIME(0) NULL,
    `time_end` DATETIME(0) NULL,

    INDEX `exam_id`(`exam_id`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`id`, `student_id`, `exam_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cbt_examination` (
    `id` CHAR(32) NOT NULL,
    `name` VARCHAR(255) NULL,
    `minimal_value` VARCHAR(255) NULL,
    `leases_time` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cbt_questions` (
    `id` CHAR(32) NOT NULL,
    `type` ENUM('essay', 'multipleChoice') NULL,
    `exam_id` CHAR(32) NOT NULL,
    `question_text` TEXT NULL,
    `option_text` LONGTEXT NULL,
    `answer` TEXT NULL,
    `weight` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `cbt_questions_id_key`(`id`),
    INDEX `exam_id`(`exam_id`),
    PRIMARY KEY (`id`, `exam_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cbt_results` (
    `id` CHAR(32) NOT NULL,
    `student_id` CHAR(32) NOT NULL,
    `exam_id` CHAR(32) NOT NULL,
    `total_points` INTEGER NULL,
    `checked` ENUM('yes', 'no') NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `exam_id`(`exam_id`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`id`, `student_id`, `exam_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `installments` (
    `id` CHAR(32) NOT NULL,
    `student_id` CHAR(32) NULL,
    `package_id` CHAR(32) NULL,
    `batch_id` CHAR(32) NULL,
    `installment_number` INTEGER NULL,
    `amount` DECIMAL(10, 2) NULL,
    `category` VARCHAR(255) NULL,
    `discount` ENUM('yes', 'no') NULL DEFAULT 'no',
    `due_date` DATETIME(0) NULL,
    `payment_date` DATETIME(0) NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `batch_id`(`batch_id`),
    INDEX `package_id`(`package_id`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interview_schedule` (
    `id` CHAR(32) NOT NULL,
    `batch_id` CHAR(32) NULL,
    `interview_date` DATETIME(0) NULL,
    `interview_location` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `batch_id`(`batch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `learning_packages` (
    `id` CHAR(32) NOT NULL,
    `name` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10, 2) NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_referral` (
    `id` CHAR(32) NOT NULL,
    `name` VARCHAR(255) NULL,
    `type` ENUM('instagram', 'tiktok', 'youtube', 'facebook', 'website', 'friend', 'other') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_roles` (
    `id` CHAR(32) NOT NULL,
    `name` VARCHAR(255) NULL,
    `access` LONGTEXT NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_attachments` (
    `id` CHAR(32) NOT NULL,
    `student_id` CHAR(32) NULL,
    `file_name` VARCHAR(255) NULL,
    `file_url` VARCHAR(255) NULL,
    `uploaded_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_punishments` (
    `id` CHAR(32) NOT NULL,
    `student_id` CHAR(32) NULL,
    `punishment_type` ENUM('suspension', 'warning', 'expulsion', 'other') NULL,
    `description` TEXT NULL,
    `start_date` DATETIME(0) NULL,
    `end_date` DATETIME(0) NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` CHAR(32) NOT NULL,
    `full_name` VARCHAR(255) NULL,
    `whatsapp_number` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `nik` VARCHAR(255) NULL,
    `province` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `subdistrict` VARCHAR(255) NULL,
    `village` VARCHAR(255) NULL,
    `address_detail` VARCHAR(255) NULL,
    `batch_id` CHAR(32) NULL,
    `interview_schedule` DATETIME(0) NULL,
    `dormitory` ENUM('yes', 'no') NULL,
    `installment` ENUM('yes', 'no') NULL,
    `referral_id` CHAR(32) NULL,
    `guardian_name` VARCHAR(255) NULL,
    `guardian_phone` VARCHAR(255) NULL,
    `progress` ENUM('registering', 'psychotest', 'payment', 'success', 'blocked', 'hold', 'blacklist') NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `batch_id`(`batch_id`),
    INDEX `referral_id`(`referral_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`role`) REFERENCES `master_roles`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cbt_answers` ADD CONSTRAINT `cbt_answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `cbt_questions`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cbt_answers` ADD CONSTRAINT `cbt_answers_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cbt_enrolled` ADD CONSTRAINT `cbt_enrolled_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cbt_enrolled` ADD CONSTRAINT `cbt_enrolled_ibfk_2` FOREIGN KEY (`exam_id`) REFERENCES `cbt_examination`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cbt_questions` ADD CONSTRAINT `cbt_questions_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `cbt_examination`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cbt_results` ADD CONSTRAINT `cbt_results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cbt_results` ADD CONSTRAINT `cbt_results_ibfk_2` FOREIGN KEY (`exam_id`) REFERENCES `cbt_examination`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `installments` ADD CONSTRAINT `installments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `installments` ADD CONSTRAINT `installments_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `learning_packages`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `installments` ADD CONSTRAINT `installments_ibfk_3` FOREIGN KEY (`batch_id`) REFERENCES `batch_registration`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `interview_schedule` ADD CONSTRAINT `interview_schedule_ibfk_1` FOREIGN KEY (`batch_id`) REFERENCES `batch_registration`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `student_attachments` ADD CONSTRAINT `student_attachments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `student_punishments` ADD CONSTRAINT `student_punishments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`batch_id`) REFERENCES `batch_registration`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`referral_id`) REFERENCES `master_referral`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
