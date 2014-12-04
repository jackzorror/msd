delimiter $$

CREATE TABLE IF NOT EXISTS `msd`.`msd_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKUSERUSERROLE_idx` (`user_id`),
  CONSTRAINT `FKUSERUSERROLE` FOREIGN KEY (`user_id`) REFERENCES `msd_user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1$$

