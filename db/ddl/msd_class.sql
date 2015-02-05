delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `location` varchar(45) DEFAULT NULL,
  `class_start_time` datetime DEFAULT NULL,
  `class_end_time` datetime DEFAULT NULL,
  `class_status` varchar(10) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1$$

ALTER TABLE `msd`.`msd_class` CHANGE COLUMN `location` `semester` VARCHAR(45) NOT NULL  , ADD COLUMN `class_type` INT NOT NULL  AFTER `is_active` ;

ALTER TABLE `msd`.`msd_class` CHANGE COLUMN `semester` `location` VARCHAR(45) NOT NULL  ;

ALTER TABLE `msd`.`msd_class` ADD COLUMN `semester` INT(11) NOT NULL  AFTER `class_type` ;

DELIMITER $$
CREATE PROCEDURE sp_alterTable()
BEGIN
	DECLARE _count INT;
	SET _count = (SELECT count(*)
					FROM INFORMATION_SCHEMA.COLUMNS
				   WHERE TABLE_SCHEMA = 'msd'
					 AND TABLE_NAME = 'msd_class' 
					 AND COLUMN_NAME = 'class_start_time');
	IF _count = 0 THEN
		ALTER TABLE msd.msd_class
			ADD COLUMN class_start_time DATETIME DEFAULT NULL,
			ADD COLUMN class_end_time DATETIME DEFAULT NULL,
			ADD COLUMN class_status VARCHAR(10) DEFAULT NULL;
	END IF;

	COMMIT;
END $$

DELIMITER ;

DROP PROCEDURE sp_alterTable;
