delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_class_fee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cost` decimal(5,2) NOT NULL,
  `cost_type_id` int(11) NOT NULL,
  `msd_class_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_class_cost_idx` (`cost_type_id`),
  KEY `fk_class_idx` (`msd_class_id`),
  CONSTRAINT `fk_class` FOREIGN KEY (`msd_class_id`) REFERENCES `msd_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_class_cost` FOREIGN KEY (`cost_type_id`) REFERENCES `msd_cost_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1$$

ALTER TABLE `msd`.`msd_class_fee` CHANGE COLUMN `cost` `cost` DECIMAL(8,2) NOT NULL  ;
ALTER TABLE `msd`.`msd_class_fee` CHANGE COLUMN `name` `name` VARCHAR(256) NOT NULL  ;

