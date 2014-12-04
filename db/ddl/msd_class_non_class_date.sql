delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_class_non_class_date` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `non_class_date` datetime NOT NULL,
  `msd_class_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_class_non_class_date_idx` (`msd_class_id`),
  CONSTRAINT `fk_class_non_class_date` FOREIGN KEY (`msd_class_id`) REFERENCES `msd_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1$$

