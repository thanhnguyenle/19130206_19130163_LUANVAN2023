SET FOREIGN_KEY_CHECKS = 0;
DROP SCHEMA IF EXISTS `resource-service`;
CREATE SCHEMA IF NOT EXISTS `resource-service`;
USE `resource-service`;
CREATE TABLE IF NOT EXISTS `image`  (
    `id` VARCHAR ( 36 ) NOT NULL,
    `data` MEDIUMBLOB,
     PRIMARY KEY ( `id` )
);
