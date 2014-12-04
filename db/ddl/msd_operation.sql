delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_operation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `object_id` int(11) NOT NULL,
  `object_type` varchar(45) NOT NULL,
  `operation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `operation_description` varchar(256) NOT NULL,
  `old_value` varchar(1024) DEFAULT NULL,
  `new_value` varchar(1024) DEFAULT NULL,
  `operation_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4175 DEFAULT CHARSET=latin1$$

