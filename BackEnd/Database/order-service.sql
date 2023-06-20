SET FOREIGN_KEY_CHECKS = 0;
DROP SCHEMA IF EXISTS `order-service`;
CREATE SCHEMA IF NOT EXISTS `order-service`;
USE `order-service`;
CREATE TABLE IF NOT EXISTS `order` (
		`id` VARCHAR ( 36 ) NOT NULL,
        `userID` VARCHAR (36) NOT NULL,
        `numberOfPeople` INT,
        `group` CHAR(30),
        `orderDate` BIGINT ,
        `note` MEDIUMTEXT,
        `status` CHAR(30),
	     PRIMARY KEY ( `id` )
	);

CREATE TABLE IF NOT EXISTS `order_product`(
        `orderID` VARCHAR ( 36) NOT NULL,
        `productID` VARCHAR (36) NOT NULL,
        `quantity` INT,
        `price` DECIMAL (19,4),
        `discount` DECIMAL (19,4),
	     FOREIGN KEY (`orderID`) REFERENCES `order`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `orderReturn` (
		`id` VARCHAR ( 36 ) NOT NULL,
        `userID` VARCHAR (36) NOT NULL,
        `group` CHAR(30),
        `orderID` VARCHAR (36),
        `orderReturnDate` BIGINT ,
        `status` CHAR(30),
        `note` MEDIUMTEXT,
        FOREIGN KEY (`orderID`) REFERENCES `order`(`id`) ON DELETE CASCADE,
	     PRIMARY KEY ( `id` )
	);

CREATE TABLE IF NOT EXISTS `orderReturn_product`(
        `orderReturnID` VARCHAR ( 36) NOT NULL,
        `productID` VARCHAR (36) NOT NULL,
        `quantity` INT,
        `price` DECIMAL (19,4),
        `discount` DECIMAL (19,4),
	     FOREIGN KEY (`orderReturnID`) REFERENCES `orderReturn`(`id`) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS `group` (
		`id` VARCHAR ( 36 ) NOT NULL,
		`name` VARCHAR ( 36 ),
		`status` CHAR (30),
		`note` MEDIUMTEXT,
		PRIMARY KEY (`id`)
	);

CREATE TABLE IF NOT EXISTS `table` (
		`id` VARCHAR ( 36 ) NOT NULL,
		`name` VARCHAR ( 36 ),
		`numberOfPeople` INT,
		`status` CHAR (30),
		`note` MEDIUMTEXT,
		PRIMARY KEY (`id`)
	);

CREATE TABLE IF NOT EXISTS `group_table` (
		`tableID` VARCHAR ( 36 ) NOT NULL,
		`groupID` VARCHAR ( 36 ) NOT NULL,
		PRIMARY KEY (`tableID`,`groupID`),
         FOREIGN KEY (`tableID`) REFERENCES `table`(`id`) ON DELETE CASCADE,
	     FOREIGN KEY (`groupID`) REFERENCES `group`(`id`) ON DELETE CASCADE
	);

CREATE TABLE IF NOT EXISTS `tableReturn` (
		`id` VARCHAR ( 36 ) NOT NULL,
		`tableID` VARCHAR (36) NOT NULL,
		`status` CHAR (30),
		`note` MEDIUMTEXT,
		PRIMARY KEY (`id`)
	);

CREATE TABLE IF NOT EXISTS `order_table` (
		`orderID` VARCHAR ( 36 ) NOT NULL,
		`tableID` VARCHAR ( 36 ) NOT NULL,
		`note` MEDIUMTEXT,
		`status` CHAR (30),
		`startTime` BIGINT,
		`endTime` BIGINT,
		PRIMARY KEY (`orderID`,`tableID`),
         FOREIGN KEY (`orderID`) REFERENCES `order`(`id`) ON DELETE CASCADE,
	     FOREIGN KEY (`tableID`) REFERENCES `table`(`id`) ON DELETE CASCADE
	);
CREATE TABLE IF NOT EXISTS `orderReturn_table` (
		`orderReturnID` VARCHAR ( 36 ) NOT NULL,
		`tableReturnID` VARCHAR ( 36 ) NOT NULL,
		`note` MEDIUMTEXT,
		`startTime` BIGINT,
		`endTime` BIGINT,
		PRIMARY KEY (`orderReturnID`,`tableReturnID`),
		FOREIGN KEY (`tableReturnID`) REFERENCES `tableReturn`(`id`) ON DELETE CASCADE,
	    FOREIGN KEY (`orderReturnID`) REFERENCES `orderReturn`(`id`) ON DELETE CASCADE
	);
