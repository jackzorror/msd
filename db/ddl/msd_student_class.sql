CREATE  TABLE IF NOT EXISTS `msd`.`msd_student_class` (
  `id` INT NOT NULL ,
  `msd_student_id` INT NOT NULL ,
  `msd_class_id` INT NOT NULL ,
  PRIMARY KEY (`id`, `msd_student_id`, `msd_class_id`) ,
  INDEX `fk_msd_student_class_msd_student1_idx` (`msd_student_id` ASC) ,
  INDEX `fk_msd_student_class_msd_class1_idx` (`msd_class_id` ASC) ,
  CONSTRAINT `fk_msd_student_class_msd_student1`
    FOREIGN KEY (`msd_student_id` )
    REFERENCES `msd`.`msd_student` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_msd_student_class_msd_class1`
    FOREIGN KEY (`msd_class_id` )
    REFERENCES `msd`.`msd_class` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB