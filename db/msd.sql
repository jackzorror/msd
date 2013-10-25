{\rtf1\ansi\ansicpg1252\cocoartf1187\cocoasubrtf340
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f0\fs24 \cf0 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;\
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;\
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';\
\
CREATE SCHEMA IF NOT EXISTS `msd` DEFAULT CHARACTER SET latin1 ;\
USE `msd` ;\
\
-- -----------------------------------------------------\
-- Table `msd`.`user`\
-- -----------------------------------------------------\
CREATE  TABLE IF NOT EXISTS `msd`.`user` (\
  `id` INT(11) NOT NULL AUTO_INCREMENT ,\
  `username` VARCHAR(45) NOT NULL ,\
  `password` VARCHAR(45) NOT NULL ,\
  `status` INT(11) NOT NULL ,\
  PRIMARY KEY (`id`) )\
ENGINE = InnoDB\
AUTO_INCREMENT = 2\
DEFAULT CHARACTER SET = latin1;\
\
\
-- -----------------------------------------------------\
-- Table `msd`.`user_role`\
-- -----------------------------------------------------\
CREATE  TABLE IF NOT EXISTS `msd`.`user_role` (\
  `id` INT(11) NOT NULL AUTO_INCREMENT ,\
  `role` INT(11) NULL DEFAULT NULL ,\
  PRIMARY KEY (`id`) ,\
  CONSTRAINT `FKUSERUSERROLE`\
    FOREIGN KEY (`id` )\
    REFERENCES `msd`.`user` (`id` )\
    ON DELETE CASCADE\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB\
DEFAULT CHARACTER SET = latin1;\
\
\
-- -----------------------------------------------------\
-- Table `msd`.`class`\
-- -----------------------------------------------------\
CREATE  TABLE IF NOT EXISTS `msd`.`class` (\
  `id` INT NOT NULL AUTO_INCREMENT ,\
  `name` VARCHAR(45) NOT NULL ,\
  `location` VARCHAR(45) NULL ,\
  PRIMARY KEY (`id`) )\
ENGINE = InnoDB;\
\
\
-- -----------------------------------------------------\
-- Table `msd`.`student`\
-- -----------------------------------------------------\
CREATE  TABLE IF NOT EXISTS `msd`.`student` (\
  `id` INT NOT NULL AUTO_INCREMENT ,\
  `last_name` VARCHAR(45) NULL ,\
  `first_name` VARCHAR(45) NULL ,\
  `class_id` INT NOT NULL ,\
  PRIMARY KEY (`id`) ,\
  INDEX `fk_student_class1_idx` (`class_id` ASC) ,\
  CONSTRAINT `fk_student_class1`\
    FOREIGN KEY (`class_id` )\
    REFERENCES `msd`.`class` (`id` )\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
\
\
-- -----------------------------------------------------\
-- Table `msd`.`class_schedular`\
-- -----------------------------------------------------\
CREATE  TABLE IF NOT EXISTS `msd`.`class_schedular` (\
  `id` INT NOT NULL AUTO_INCREMENT ,\
  `class_time` TIMESTAMP NOT NULL ,\
  `class_weekday` INT NOT NULL ,\
  `class_id` INT NOT NULL ,\
  PRIMARY KEY (`id`) ,\
  INDEX `fk_class_schedular_class1_idx` (`class_id` ASC) ,\
  CONSTRAINT `fk_class_schedular_class1`\
    FOREIGN KEY (`class_id` )\
    REFERENCES `msd`.`class` (`id` )\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
\
USE `msd` ;\
\
\
SET SQL_MODE=@OLD_SQL_MODE;\
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;\
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;\
}