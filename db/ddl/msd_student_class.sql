delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_student_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msd_student_id` int(11) NOT NULL,
  `msd_class_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`,`msd_student_id`,`msd_class_id`),
  KEY `fk_msd_student_class_msd_student1_idx` (`msd_student_id`),
  KEY `fk_msd_student_class_msd_class1_idx` (`msd_class_id`),
  CONSTRAINT `fk_msd_student_class_msd_class1` FOREIGN KEY (`msd_class_id`) REFERENCES `msd_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_msd_student_class_msd_student1` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=357 DEFAULT CHARSET=latin1$$

