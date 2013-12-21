CREATE  TABLE IF NOT EXISTS `msd`.`msd_user_role` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `role` INT(11) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `FKUSERUSERROLE`
    FOREIGN KEY (`id` )
    REFERENCES `msd`.`msd_user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;