DROP TABLE IF EXISTS `reseller`;
CREATE TABLE `reseller` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `purchase`;
CREATE TABLE `purchase` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `resellerId` mediumint(9) NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(13) NOT NULL,
  `cashback_value` decimal(10,2) NOT NULL,
  `cashback_percentage` decimal(3,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`code`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`resellerId`) REFERENCES `reseller` (`id`)
);
