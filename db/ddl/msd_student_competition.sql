delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_student_competition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msd_student_id` int(11) NOT NULL,
  `msd_competition_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_student_student_competition_idx` (`msd_student_id`),
  KEY `fk_competition_student_competition_idx` (`msd_competition_id`),
  CONSTRAINT `fk_competition_student_competition` FOREIGN KEY (`msd_competition_id`) REFERENCES `msd_competition` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_student_competition` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1$$

