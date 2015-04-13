delimiter $$

CREATE  TABLE IF NOT EXISTS `msd`.`msd_student_fee_payment` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `msd_student_fee_id` INT NOT NULL ,
  `pay_time` DATETIME NULL ,
  `pay_type` VARCHAR(45) NULL ,
  `pay_note` VARCHAR(512) NULL ,
  `pay_fee` DECIMAL(8,2) NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_msd_student_fee_msd_student_payment_idx` (`msd_student_fee_id` ASC) ,
  CONSTRAINT `fk_msd_student_fee_msd_student_payment`
    FOREIGN KEY (`msd_student_fee_id` )
    REFERENCES `msd`.`msd_student_fee` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `msd`.`msd_student_fee_payment` ADD COLUMN `fee_description` VARCHAR(512) NULL  AFTER `pay_fee` ;
ALTER TABLE `msd`.`msd_student_fee_payment` ADD COLUMN `fee` DECIMAL(8,2) NULL  AFTER `fee_description` ;
ALTER TABLE `msd`.`msd_student_fee_payment` CHANGE COLUMN `fee_description` `payment_description` VARCHAR(512) NULL DEFAULT NULL  ;

