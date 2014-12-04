delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_competition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `register_deadline` datetime DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL,
  `competition_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`competition_type_id`),
  CONSTRAINT `fk_competition_type` FOREIGN KEY (`competition_type_id`) REFERENCES `msd_competition_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1$$

