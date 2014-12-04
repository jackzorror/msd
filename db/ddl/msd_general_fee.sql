delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_general_fee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cost_type_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `cost` decimal(7,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cost_type_id_idx` (`cost_type_id`),
  CONSTRAINT `fk_cost_type_id` FOREIGN KEY (`cost_type_id`) REFERENCES `msd_cost_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1$$

