delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_student_medical_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msd_student_id` int(11) DEFAULT NULL,
  `insurance_company` varchar(45) DEFAULT NULL,
  `policy_number` varchar(45) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `pediatrician_name` varchar(45) DEFAULT NULL,
  `emergency_name` varchar(45) DEFAULT NULL,
  `emergency_phone` varchar(15) DEFAULT NULL,
  `emergency_phone_alt` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_msd_student_medical_info_msd_student1_idx` (`msd_student_id`),
  CONSTRAINT `fk_msd_student_medical_info_msd_student1` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1$$

