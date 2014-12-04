delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `home_phone` varchar(15) DEFAULT NULL,
  `cell_phone` varchar(15) DEFAULT NULL,
  `email_address` varchar(45) DEFAULT NULL,
  `school_name` varchar(45) DEFAULT NULL,
  `school_grade` varchar(45) DEFAULT NULL,
  `home_address` varchar(45) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `lastnamefirstname` (`last_name`,`first_name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1$$

