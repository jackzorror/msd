CREATE  TABLE IF NOT EXISTS `msd`.`msd_class` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  `location` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;

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
