CREATE  TABLE IF NOT EXISTS `msd`.`msd_student` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `last_name` VARCHAR(45) NULL ,
  `first_name` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `lastnamefirstname` (`last_name` ASC, `first_name` ASC) )
ENGINE = InnoDB