SET FOREIGN_KEY_CHECKS = 0;
DROP SCHEMA IF EXISTS `payment-service`;
CREATE SCHEMA IF NOT EXISTS `payment-service`;
USE `payment-service`;
CREATE TABLE IF NOT EXISTS `receiptOrder` (
		`id` VARCHAR ( 36 ) NOT NULL,
        `orderID` VARCHAR (36),
        `total` DECIMAL (19,4),
        `totalReceive` DECIMAL (19,4),
        `totalReturn` DECIMAL (19,4),
        `description` TEXT,
        `paymentType` CHAR (100),
        `accountSend` CHAR(100),
        `accountReceive` CHAR(100),
        `status` CHAR (50),
        `createdAt` BIGINT,
	     PRIMARY KEY ( `id` )
);

CREATE TABLE IF NOT EXISTS `receiptInventory` (
		`id` VARCHAR ( 36 ) NOT NULL,
        `materialID` VARCHAR (36),
        `total` DECIMAL (19,4),
        `totalReceive` DECIMAL (19,4),
         `totalReturn` DECIMAL (19,4),
        `description` TEXT,
        `paymentType` CHAR (100),
        `accountSend` CHAR(100),
        `accountReceive` CHAR(100),
        `status` CHAR (50),
        `createdAt` BIGINT,
	     PRIMARY KEY ( `id` )
);

CREATE TABLE IF NOT EXISTS `paySlipOrder` (
		`id` VARCHAR ( 36 ) NOT NULL,
        `orderReturnID` VARCHAR (36),
        `total` DECIMAL (19,4),
        `totalReceive` DECIMAL (19,4),
         `totalReturn` DECIMAL (19,4),
        `description` TEXT,
        `paymentType` CHAR (100),
        `accountSend` CHAR(100),
        `accountReceive` CHAR(100),
        `status` CHAR (50),
        `createdAt` BIGINT,
	     PRIMARY KEY ( `id` )
);

CREATE TABLE IF NOT EXISTS `paySlipInventory` (
		`id` VARCHAR ( 36 ) NOT NULL,
        `materialReturnID` VARCHAR (36),
        `total` DECIMAL (19,4),
        `totalReceive` DECIMAL (19,4),
         `totalReturn` DECIMAL (19,4),
        `description` TEXT,
        `paymentType` CHAR (100),
        `accountSend` CHAR(100),
        `accountReceive` CHAR(100),
        `status` CHAR (50),
        `createdAt` BIGINT,
	     PRIMARY KEY ( `id` )
);
