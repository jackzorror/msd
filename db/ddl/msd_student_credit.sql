delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_student_credit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msd_student_id` int(11) NOT NULL,
  `credit` decimal(5,2) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `credit_note` varchar(256) DEFAULT NULL,
  `is_consumed` tinyint(4) DEFAULT NULL,
  `consume_note` varchar(45) DEFAULT NULL,
  `consumed_date` datetime DEFAULT NULL,
  `credit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_student_credit_student_idx` (`msd_student_id`),
  CONSTRAINT `fk_student_credit_student` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1$$

ALTER TABLE `msd`.`msd_student_credit` CHANGE COLUMN `consume_note` `consume_note` VARCHAR(512) NULL DEFAULT NULL  ;

ALTER TABLE `msd`.`msd_student_credit` CHANGE COLUMN `credit_note` `credit_note` VARCHAR(512) NULL DEFAULT NULL  ;

ALTER TABLE `msd`.`msd_student_credit` CHANGE COLUMN `credit` `credit` DECIMAL(8,2) NOT NULL  ;

ALTER TABLE `msd`.`msd_student_credit` ADD COLUMN `semester` INT(11) NOT NULL  AFTER `credit_date` ;


