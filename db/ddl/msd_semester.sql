delimiter $$

CREATE  TABLE IF NOT EXISTS `msd`.`msd_semester` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  `start_date` DATETIME NOT NULL ,
  PRIMARY KEY (`id`) )
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1$$
