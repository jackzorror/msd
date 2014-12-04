delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_student_parent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email_address` varchar(45) DEFAULT NULL,
  `cell_phone` varchar(15) DEFAULT NULL,
  `work_phone` varchar(15) DEFAULT NULL,
  `relationship` varchar(10) DEFAULT NULL,
  `msd_student_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `msd_student_id_idx` (`msd_student_id`),
  CONSTRAINT `fk_msd_student_parent_msd_student1` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1$$

