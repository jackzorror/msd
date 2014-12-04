delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_student_checkin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msd_student_id` int(11) NOT NULL,
  `msd_class_id` int(11) NOT NULL,
  `checkin_time` datetime NOT NULL,
  `is_makeup` tinyint(4) DEFAULT '0',
  `is_fivehoursmore` tinyint(4) DEFAULT '0',
  `is_other` tinyint(4) DEFAULT '0',
  `note` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`,`msd_student_id`,`msd_class_id`),
  KEY `fk_msd_student_checkin_msd_student1_idx` (`msd_student_id`),
  KEY `fk_msd_student_checkin_msd_class1_idx` (`msd_class_id`),
  CONSTRAINT `fk_msd_student_checkin_msd_class1` FOREIGN KEY (`msd_class_id`) REFERENCES `msd_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_msd_student_checkin_msd_student1` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=latin1$$

