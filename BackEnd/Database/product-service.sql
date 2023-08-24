SET FOREIGN_KEY_CHECKS = 0;
DROP SCHEMA IF EXISTS `product-service`;
CREATE SCHEMA IF NOT EXISTS `product-service`;
USE `product-service`;
CREATE TABLE IF NOT EXISTS `product` (
		`id` VARCHAR ( 36 ) NOT NULL,
        `name` VARCHAR (50) CHARACTER SET 'utf8mb4' NOT NULL,
        `price` DECIMAL (19,4),
        `description` TEXT,
        `quantity` INT,
        `unit` CHAR (10),
        `status` CHAR (50),
        `createdAt` BIGINT,
	     PRIMARY KEY ( `id` )
	);
INSERT INTO `product` VALUES (uuid(),'Canh cua thịt bò',100000,'ngon',5, 'VND','ACTIVE',UNIX_TIMESTAMP());
INSERT INTO `product` VALUES (uuid(),'Canh cua thịt heo',200000,'ngon',5, 'VND','ACTIVE',UNIX_TIMESTAMP());
INSERT INTO `product` VALUES (uuid(),'Canh cua mắm',300000,'ngon',5, 'VND','ACTIVE',UNIX_TIMESTAMP());
CREATE TABLE IF NOT EXISTS `image` (
		`id` INT NOT NULL AUTO_INCREMENT,
        `url` VARCHAR (255) NOT NULL,
        `description` TEXT,
        `productID` VARCHAR ( 36 ),
	    PRIMARY KEY ( `id` ),
	    FOREIGN KEY (`productID`) REFERENCES `product`(`id`)ON DELETE CASCADE
	);
INSERT INTO `image` (url, description, productID) VALUES ('https://giadinh.mediacdn.vn/296230595582509056/2022/12/30/toi-nay-an-gi-167236732141564694536.jpg','ngon','280f6cec-f303-11ed-97fe-0242ac140002');
INSERT INTO `image` (url, description, productID)  VALUES ('https://giadinh.mediacdn.vn/296230595582509056/2022/12/30/toi-nay-an-gi-167236732141564694536.jpg','ngon','280f6cec-f303-11ed-97fe-0242ac140002');
INSERT INTO `image` (url, description, productID)  VALUES ('https://giadinh.mediacdn.vn/296230595582509056/2022/12/30/toi-nay-an-gi-167236732141564694536.jpg','ngon','280f6cec-f303-11ed-97fe-0242ac140002');
CREATE TABLE IF NOT EXISTS `category` (
		`id` VARCHAR ( 36 ) NOT NULL,
        `name` VARCHAR (50)  CHARACTER SET 'utf8mb4' NOT NULL,
        `description` TEXT,
        `createdAt` BIGINT,
	     PRIMARY KEY ( `id` )
	);
INSERT INTO `category` VALUES (uuid(),'đồ ăn','ngon lắm',UNIX_TIMESTAMP());
INSERT INTO `category` VALUES (uuid(),'đồ ăn 3','ngon lắm 1',UNIX_TIMESTAMP());
INSERT INTO `category` VALUES (uuid(),'đồ ăn2 ','ngon lắm 2',UNIX_TIMESTAMP());
CREATE TABLE IF NOT EXISTS `product_category` (
		`productID` VARCHAR ( 36 ),
		`categoryID` VARCHAR ( 36 ),
		PRIMARY KEY (`productID`,`categoryID`),
        FOREIGN KEY (`productID`) REFERENCES `product`(`id`) ON DELETE CASCADE,
	    FOREIGN KEY (`categoryID`) REFERENCES `category`(`id`) ON DELETE CASCADE
	);
INSERT INTO `product_category` VALUES ('4dff3756-f46b-11ed-8d7d-0242ac140002','4e70ba85-f46b-11ed-8d7d-0242ac140002');
INSERT INTO `product_category` VALUES ('897ffec0-a348-406e-b08d-0a92e09f8e54','4e70ba85-f46b-11ed-8d7d-0242ac140002');


SELECT * FROM product WHERE createdAt BETWEEN ROUND( UNIX_TIMESTAMP() / 86400)*86400 AND  UNIX_TIMESTAMP()
