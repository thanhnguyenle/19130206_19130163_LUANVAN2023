SET FOREIGN_KEY_CHECKS = 0;
DROP SCHEMA IF EXISTS `inventory-service`;
CREATE SCHEMA IF NOT EXISTS `inventory-service`;
USE `inventory-service`;
CREATE TABLE IF NOT EXISTS `material`  (
    `id` VARCHAR ( 36 ) NOT NULL,
    `name` VARCHAR (100) NOT NULL,
    `price` DECIMAL (19,4),
    `unit` CHAR (10) ,
    `quantity` INT,
    `status` CHAR (50),
    `description` TEXT,
    `expiredDate` BIGINT,
    `manufacturerDate` BIGINT,
     PRIMARY KEY ( `id` )
);

CREATE TABLE IF NOT EXISTS `material_default_setup`(
		`id` VARCHAR (36) NOT NULL,
        `materialID` VARCHAR (36) NOT NULL,
        `unit` CHAR (20),
        `quantity` INT,
        `status` CHAR (50),
        `description` TEXT,
	    PRIMARY KEY (`id` ),
        FOREIGN KEY (`materialID`) REFERENCES `material`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `material_product`(
        `productID` VARCHAR ( 36) NOT NULL,
        `materialID` VARCHAR (36) NOT NULL,
        `unit` CHAR (10),
        `quantity` INT,
        `status` CHAR (50),
        `description` TEXT,
	    PRIMARY KEY ( `productID`,`materialID` ),
        FOREIGN KEY (`materialID`) REFERENCES `material`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `image`  (
		`id` VARCHAR ( 36 ) NOT NULL,
        `url` VARCHAR (200),
        `description` TEXT,
        `materialID` VARCHAR (36) NOT NULL,
         FOREIGN KEY (`materialID`) REFERENCES `material`(`id`) ON DELETE CASCADE,
	     PRIMARY KEY ( `id` )
);

# CREATE TABLE IF NOT EXISTS `material_image`(
#         `imageID` VARCHAR ( 36) NOT NULL,
#         `materialID` VARCHAR (36) NOT NULL,
# 	    PRIMARY KEY ( `imageID`,`materialID` ),
# 	    FOREIGN KEY (`imageID`) REFERENCES `image`(`id`) ON DELETE CASCADE,
#         FOREIGN KEY (`materialID`) REFERENCES `material`(`id`) ON DELETE CASCADE
# );

CREATE TABLE IF NOT EXISTS `supplier`(
        `id` VARCHAR ( 36) NOT NULL,
        `name` VARCHAR (100) NOT NULL,
        `address` TEXT,
        `phone` CHAR (11),
        `email` CHAR (50),
        `website` CHAR (200),
        `status` CHAR (50),
        `description` TEXT,
	     PRIMARY KEY ( `id`)
);

CREATE TABLE IF NOT EXISTS `material_supplier`(
        `materialID` VARCHAR ( 36) NOT NULL,
        `supplierID` VARCHAR ( 36) NOT NULL,
        `supplyDate` BIGINT,
        `status` CHAR (50),
        `description` TEXT,
	     PRIMARY KEY ( `materialID`,`supplierID`),
	     FOREIGN KEY (`materialID`) REFERENCES `material`(`id`) ON DELETE CASCADE,
	     FOREIGN KEY (`supplierID`) REFERENCES `supplier`(`id`) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS `manufacturer` (
		 `id` VARCHAR ( 36) NOT NULL,
        `name` VARCHAR (100) NOT NULL,
        `address` TEXT,
        `phone` CHAR (11),
        `email` CHAR (50),
        `website` CHAR (200),
	     PRIMARY KEY ( `id` )
	);

CREATE TABLE IF NOT EXISTS `materialReturn`  (
    `id` VARCHAR ( 36 ) NOT NULL,
    `materialID` VARCHAR ( 36 ) NOT NULL,
    `price` DECIMAL (19,4),
    `unit` CHAR (10) ,
    `quantity` INT,
    `status` CHAR (50),
    `description` TEXT,
    `returnDate` BIGINT,
     PRIMARY KEY ( `id` ),
     FOREIGN KEY (`materialID`) REFERENCES `material`(`id`) ON DELETE CASCADE
);

