delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_student_fee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msd_student_fee_object_name` varchar(45) NOT NULL,
  `msd_student_fee_object_id` int(11) NOT NULL,
  `is_waiver` tinyint(4) NOT NULL,
  `is_paid` tinyint(4) NOT NULL,
  `pay_time` datetime DEFAULT NULL,
  `pay_type` varchar(45) DEFAULT NULL,
  `pay_note` varchar(256) DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL,
  `msd_student_id` int(11) NOT NULL,
  `fee_note` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_student_fee_student_idx` (`msd_student_id`),
  CONSTRAINT `fk_student_fee_student` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=latin1$$

ALTER TABLE `msd`.`msd_student_fee` CHANGE COLUMN `pay_note` `pay_note` VARCHAR(512) NULL DEFAULT NULL  , CHANGE COLUMN `fee_note` `fee_note` VARCHAR(512) NULL DEFAULT NULL  ;

ALTER TABLE `msd`.`msd_student_fee` ADD COLUMN `fee` DECIMAL(8,2) NOT NULL  AFTER `fee_note` ;
