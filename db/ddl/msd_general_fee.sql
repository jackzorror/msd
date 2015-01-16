delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_general_fee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cost_type_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `cost` decimal(7,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cost_type_id_idx` (`cost_type_id`),
  CONSTRAINT `fk_cost_type_id` FOREIGN KEY (`cost_type_id`) REFERENCES `msd_cost_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1$$

ALTER TABLE `msd`.`msd_general_fee` CHANGE COLUMN `name` `name` VARCHAR(256) NOT NULL  , CHANGE COLUMN `cost` `cost` DECIMAL(8,2) NOT NULL  ;

INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('1 Hour/Week', '2', '1', '253');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('1.5 Hour/Week', '2', '1', '379');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('2 Hour/Week', '2', '1', '505');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('2.5 Hour/Week', '2', '1', '632');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('3 Hour/Week', '2', '1', '758');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('3.5 Hour/Week', '2', '1', '821');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('4 Hour/Week', '2', '1', '903');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('4.5 Hour/Week', '2', '1', '1015');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('5+ Hour/Week', '2', '1', '1083');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('0.5 Hour One Student (one)', '3', '1', '50');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('1 Hour One Student (one)', '3', '1', '100');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('0.5 Hour One Student (two)', '3', '1', '100');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('0.5 Hour One Student (three)', '3', '1', '150');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('0.5 Hour One Student (four)', '3', '1', '200');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('0.5 Hour One Student (five)', '3', '1', '250');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('1 Hour One Student (two)', '3', '1', '200');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('1 Hour One Student (three)', '3', '1', '300');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('1 Hour One Studnet (four)', '3', '1', '400');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('1 Hour One Student (five)', '3', '1', '500');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('0.5 Hour One/Two Student/Mr. Chen', '3', '1', '50.00');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('0.5 Hour Three/Four Student/Mr. Chen', '3', '1', '60.00');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('1 Hour One/Two Student/Mr.Chen', '3', '1', '100.00');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('1 Hour Three/Four Student/Mr.Chen', '3', '1', '120.00');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('0.5 Hour One Student', '3', '1', '30.00');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('0.5 Hour Two/Three/Four Student', '3', '1', '40.00');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('1 Hour One Student', '3', '1', '60.00');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('1 Hour Two/Three/Four Student', '3', '1', '80.00');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('0.5 Hour One Student/Assist.', '3', '1', '15.00');
INSERT INTO `msd`.`msd_general_fee` (`name`, `cost_type_id`, `is_active`, `cost`) VALUES ('1 Hour One Student/Assis.', '3', '1', '30.00');
