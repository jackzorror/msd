delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_competition_fee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cost` decimal(5,2) NOT NULL,
  `cost_type_id` int(11) NOT NULL,
  `msd_competition_id` int(11) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_competition_fee_idx` (`msd_competition_id`),
  CONSTRAINT `fk_competition_fee` FOREIGN KEY (`msd_competition_id`) REFERENCES `msd_competition` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1$$

