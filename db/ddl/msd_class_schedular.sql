delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_class_schedular` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_time` varchar(10) NOT NULL,
  `end_time` varchar(10) NOT NULL,
  `weekday` int(11) NOT NULL,
  `msd_class_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_class_schedular_class1_idx` (`msd_class_id`),
  CONSTRAINT `fk_class_schedular_class1` FOREIGN KEY (`msd_class_id`) REFERENCES `msd_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=latin1$$

