CREATE  TABLE IF NOT EXISTS `msd`.`msd_class_schedular` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `start_time` VARCHAR(10) NOT NULL ,
  `end_time` VARCHAR(10) NOT NULL ,
  `weekday` INT NOT NULL ,
  `msd_class_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_class_schedular_class1_idx` (`msd_class_id` ASC) ,
  CONSTRAINT `fk_class_schedular_class1`
    FOREIGN KEY (`msd_class_id` )
    REFERENCES `msd`.`msd_class` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
