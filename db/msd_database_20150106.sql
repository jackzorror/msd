-- MySQL dump 10.13  Distrib 5.6.11, for osx10.7 (x86_64)
--
-- Host: localhost    Database: msd
-- ------------------------------------------------------
-- Server version	5.6.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `msd_class`
--

DROP TABLE IF EXISTS `msd_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `location` varchar(45) DEFAULT NULL,
  `class_start_time` datetime DEFAULT NULL,
  `class_end_time` datetime DEFAULT NULL,
  `class_status` varchar(10) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_class`
--

LOCK TABLES `msd_class` WRITE;
/*!40000 ALTER TABLE `msd_class` DISABLE KEYS */;
INSERT INTO `msd_class` VALUES (1,'Beginner','2014 Full','2014-08-09 00:00:00','2014-12-20 00:00:00','ACTIVE',1),(2,'L1 Sat One','2014 Full','2014-08-09 00:00:00','2014-12-20 00:00:00','ACTIVE',1),(3,'L1 Sat Two','2014 Full','2014-08-09 00:00:00','2014-12-20 00:00:00','ACTIVE',1),(4,'L1 Sun','2014 Full','2014-08-09 00:00:00','2014-12-20 00:00:00','ACTIVE',1),(5,'L2 Sat','2014 Full','2014-08-09 00:00:00','2014-12-20 00:00:00','ACTIVE',1),(6,'L2 Sun','2014 Full','2014-08-09 00:00:00','2014-12-20 00:00:00','ACTIVE',1),(7,'L3 Sat','2014 Full','2014-08-09 00:00:00','2014-12-20 00:00:00','ACTIVE',1),(8,'L3 Sun','2014 Full','2014-08-09 00:00:00','2014-12-20 00:00:00','ACTIVE',1),(9,'L4 Sat','2014 Full','2014-08-09 00:00:00','2014-12-20 00:00:00','ACTIVE',1),(10,'L4 Sun','2014 Full','2014-08-09 00:00:00','2014-12-20 00:00:00','ACTIVE',1),(11,'L5','2014 Full','2014-08-09 00:00:00','2014-12-20 00:00:00','ACTIVE',1),(12,'PP','2014 Full','2014-08-09 00:00:00','2014-12-20 00:00:00','ACTIVE',1),(13,'Beginner Sat','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(14,'Beginner Sun','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(15,'Level 1 A (Sun)','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(16,'Level 1 B (Sat)','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(17,'Level 2 A (Sun)','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(18,'Level 2 B (Sat)','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(19,'Level 3 A (Sun)','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(20,'Level 3 B1 (Sat)','Spring 2015','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(21,'Level 3 B2 (Sat)','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(22,'Level 4 A (Sun)','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(23,'Level 4 B (Sat)','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(24,'Level 5','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(25,'Pre Professional','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1),(26,'Nin Nin Private ','2015 Spring','2015-01-06 00:00:00','2015-05-24 00:00:00','INACTIVE',1);
/*!40000 ALTER TABLE `msd_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_class_fee`
--

DROP TABLE IF EXISTS `msd_class_fee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_class_fee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cost` decimal(5,2) NOT NULL,
  `cost_type_id` int(11) NOT NULL,
  `msd_class_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_class_cost_idx` (`cost_type_id`),
  KEY `fk_class_idx` (`msd_class_id`),
  CONSTRAINT `fk_class` FOREIGN KEY (`msd_class_id`) REFERENCES `msd_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_class_cost` FOREIGN KEY (`cost_type_id`) REFERENCES `msd_cost_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_class_fee`
--

LOCK TABLES `msd_class_fee` WRITE;
/*!40000 ALTER TABLE `msd_class_fee` DISABLE KEYS */;
INSERT INTO `msd_class_fee` VALUES (1,'nn',100.00,3,26,0),(2,'nn',900.00,3,26,1);
/*!40000 ALTER TABLE `msd_class_fee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_class_non_class_date`
--

DROP TABLE IF EXISTS `msd_class_non_class_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_class_non_class_date` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `non_class_date` datetime NOT NULL,
  `msd_class_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_class_non_class_date_idx` (`msd_class_id`),
  CONSTRAINT `fk_class_non_class_date` FOREIGN KEY (`msd_class_id`) REFERENCES `msd_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_class_non_class_date`
--

LOCK TABLES `msd_class_non_class_date` WRITE;
/*!40000 ALTER TABLE `msd_class_non_class_date` DISABLE KEYS */;
INSERT INTO `msd_class_non_class_date` VALUES (1,'2015-04-06 00:00:00',13),(2,'2015-04-07 00:00:00',13),(3,'2015-04-08 00:00:00',13),(4,'2015-04-09 00:00:00',13),(5,'2015-04-10 00:00:00',13),(6,'2015-04-11 00:00:00',13),(7,'2015-04-12 00:00:00',13),(8,'2015-04-06 00:00:00',14),(9,'2015-04-07 00:00:00',14),(10,'2015-04-08 00:00:00',14),(11,'2015-04-09 00:00:00',14),(12,'2015-04-10 00:00:00',14),(13,'2015-04-11 00:00:00',14),(14,'2015-04-12 00:00:00',14),(15,'2015-04-06 00:00:00',15),(16,'2015-04-07 00:00:00',15),(17,'2015-04-08 00:00:00',15),(18,'2015-04-09 00:00:00',15),(19,'2015-04-10 00:00:00',15),(20,'2015-04-11 00:00:00',15),(21,'2015-04-12 00:00:00',15),(22,'2015-04-06 00:00:00',16),(23,'2015-04-07 00:00:00',16),(24,'2015-04-08 00:00:00',16),(25,'2015-04-09 00:00:00',16),(26,'2015-04-10 00:00:00',16),(27,'2015-04-11 00:00:00',16),(28,'2015-04-12 00:00:00',16),(29,'2015-04-06 00:00:00',17),(30,'2015-04-07 00:00:00',17),(31,'2015-04-08 00:00:00',17),(32,'2015-04-09 00:00:00',17),(33,'2015-04-10 00:00:00',17),(34,'2015-04-11 00:00:00',17),(35,'2015-04-12 00:00:00',17),(36,'2015-04-06 00:00:00',18),(37,'2015-04-07 00:00:00',18),(38,'2015-04-08 00:00:00',18),(39,'2015-04-09 00:00:00',18),(40,'2015-04-10 00:00:00',18),(41,'2015-04-11 00:00:00',18),(42,'2015-04-12 00:00:00',18),(43,'2015-04-06 00:00:00',19),(44,'2015-04-07 00:00:00',19),(45,'2015-04-08 00:00:00',19),(46,'2015-04-09 00:00:00',19),(47,'2015-04-10 00:00:00',19),(48,'2015-04-11 00:00:00',19),(49,'2015-04-12 00:00:00',19),(50,'2015-04-06 00:00:00',24),(51,'2015-04-07 00:00:00',24),(52,'2015-04-08 00:00:00',24),(53,'2015-04-09 00:00:00',24),(55,'2015-04-10 00:00:00',24),(56,'2015-04-11 00:00:00',24),(57,'2015-04-12 00:00:00',24),(58,'2015-04-06 00:00:00',22),(59,'2015-04-07 00:00:00',22),(62,'2015-04-08 00:00:00',22),(63,'2015-04-09 00:00:00',22),(64,'2015-04-10 00:00:00',22),(65,'2015-04-11 00:00:00',22),(66,'2015-04-12 00:00:00',22),(67,'2015-04-06 00:00:00',23),(68,'2015-04-07 00:00:00',23),(69,'2015-04-08 00:00:00',23),(70,'2015-04-09 00:00:00',23),(71,'2015-04-10 00:00:00',23),(72,'2015-04-11 00:00:00',23),(73,'2015-04-12 00:00:00',23);
/*!40000 ALTER TABLE `msd_class_non_class_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_class_schedular`
--

DROP TABLE IF EXISTS `msd_class_schedular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_class_schedular` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_time` varchar(10) NOT NULL,
  `end_time` varchar(10) NOT NULL,
  `weekday` int(11) NOT NULL,
  `msd_class_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_class_schedular_class1_idx` (`msd_class_id`),
  CONSTRAINT `fk_class_schedular_class1` FOREIGN KEY (`msd_class_id`) REFERENCES `msd_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_class_schedular`
--

LOCK TABLES `msd_class_schedular` WRITE;
/*!40000 ALTER TABLE `msd_class_schedular` DISABLE KEYS */;
INSERT INTO `msd_class_schedular` VALUES (1,'10:00','11:00',6,13),(2,'11:00','12:00',0,14),(3,'14:15','15:45',0,15),(4,'14:15','15:45',0,16),(5,'18:00','19:00',2,17),(6,'14:15','15:45',0,17),(7,'18:00','19:00',3,18),(8,'14:15','15:45',6,18),(9,'18:00','19:00',4,19),(10,'12:15','14:15',0,19),(11,'19:00','20:00',2,20),(12,'12:15','14:15',6,20),(13,'19:00','20:00',4,21),(14,'08:00','10:00',6,21),(15,'19:00','20:30',3,22),(16,'12:15','14:15',0,22),(17,'18:00','19:30',5,23),(18,'12:15','14:15',6,23),(19,'19:30','22:00',5,24),(20,'11:00','12:00',6,24),(23,'19:30','22:00',5,25),(24,'11:00','12:00',6,25),(25,'09:30','12:00',0,25),(26,'15:45','18:15',0,24),(27,'16:00','17:00',1,26),(28,'19:00','20:00',3,26);
/*!40000 ALTER TABLE `msd_class_schedular` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_competition`
--

DROP TABLE IF EXISTS `msd_competition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_competition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `register_deadline` datetime DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL,
  `competition_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`competition_type_id`),
  CONSTRAINT `fk_competition_type` FOREIGN KEY (`competition_type_id`) REFERENCES `msd_competition_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_competition`
--

LOCK TABLES `msd_competition` WRITE;
/*!40000 ALTER TABLE `msd_competition` DISABLE KEYS */;
/*!40000 ALTER TABLE `msd_competition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_competition_fee`
--

DROP TABLE IF EXISTS `msd_competition_fee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_competition_fee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cost` decimal(5,2) NOT NULL,
  `cost_type_id` int(11) NOT NULL,
  `msd_competition_id` int(11) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_competition_fee_idx` (`msd_competition_id`),
  CONSTRAINT `fk_competition_fee` FOREIGN KEY (`msd_competition_id`) REFERENCES `msd_competition` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_competition_fee`
--

LOCK TABLES `msd_competition_fee` WRITE;
/*!40000 ALTER TABLE `msd_competition_fee` DISABLE KEYS */;
/*!40000 ALTER TABLE `msd_competition_fee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_competition_type`
--

DROP TABLE IF EXISTS `msd_competition_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_competition_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_competition_type`
--

LOCK TABLES `msd_competition_type` WRITE;
/*!40000 ALTER TABLE `msd_competition_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `msd_competition_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_cost_type`
--

DROP TABLE IF EXISTS `msd_cost_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_cost_type` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_cost_type`
--

LOCK TABLES `msd_cost_type` WRITE;
/*!40000 ALTER TABLE `msd_cost_type` DISABLE KEYS */;
INSERT INTO `msd_cost_type` VALUES (1,'Registration'),(2,'Class Fee'),(3,'Priate Class'),(4,'Adult Ballet'),(5,'Adult Exe'),(6,'Join Two Classes'),(7,'Competition'),(8,'Costume Rental'),(9,'Performance');
/*!40000 ALTER TABLE `msd_cost_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_general_fee`
--

DROP TABLE IF EXISTS `msd_general_fee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_general_fee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cost_type_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `cost` decimal(7,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cost_type_id_idx` (`cost_type_id`),
  CONSTRAINT `fk_cost_type_id` FOREIGN KEY (`cost_type_id`) REFERENCES `msd_cost_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_general_fee`
--

LOCK TABLES `msd_general_fee` WRITE;
/*!40000 ALTER TABLE `msd_general_fee` DISABLE KEYS */;
INSERT INTO `msd_general_fee` VALUES (1,'One Hour Class Fee',2,1,200.00),(2,'Two hour',2,1,200.00),(3,'one month private fee',3,1,300.00);
/*!40000 ALTER TABLE `msd_general_fee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_operation`
--

DROP TABLE IF EXISTS `msd_operation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_operation` (
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
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_operation`
--

LOCK TABLES `msd_operation` WRITE;
/*!40000 ALTER TABLE `msd_operation` DISABLE KEYS */;
INSERT INTO `msd_operation` VALUES (1,'usera',9999,'LOGIN','2014-12-13 18:14:32','User successfully login system',NULL,NULL,'SUCCESS'),(2,'usera',1,'MSDClass','2014-12-13 18:14:58','Create New Class',NULL,'MSDClass ID: 1 Name: Beginner 2014 Full Location: Alpheratta Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(3,'anonymousUser',9999,'LOGIN','2014-12-13 18:50:59','User logout system',NULL,NULL,'LOGOUT'),(4,'usera',9999,'LOGIN','2014-12-13 18:52:40','User successfully login system',NULL,NULL,'SUCCESS'),(5,'usera',2,'MSDClass','2014-12-13 18:53:16','Create New Class',NULL,'MSDClass ID: 2 Name: L1 Sat One Location: Alpheratta Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(6,'usera',3,'MSDClass','2014-12-13 18:55:33','Create New Class',NULL,'MSDClass ID: 3 Name: L1 Sat Two 2014 Full Location: Alpheratta Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(7,'usera',4,'MSDClass','2014-12-13 18:59:09','Create New Class',NULL,'MSDClass ID: 4 Name: L1 Sun 2014 Full Location: Alpheratta Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(8,'usera',5,'MSDClass','2014-12-13 19:01:35','Create New Class',NULL,'MSDClass ID: 5 Name: L2 Sat 2014 Full Location: Alpheratta Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(9,'usera',6,'MSDClass','2014-12-13 19:02:56','Create New Class',NULL,'MSDClass ID: 6 Name: L2 Sun 2014 Full Location: Alpheratta Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(10,'usera',7,'MSDClass','2014-12-13 19:07:33','Create New Class',NULL,'MSDClass ID: 7 Name: L3 Sat 2014 Full Location: Alpheratta Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(11,'usera',8,'MSDClass','2014-12-13 19:07:57','Create New Class',NULL,'MSDClass ID: 8 Name: L3 Sun 2014 Full Location: Alpheratta Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(12,'usera',9,'MSDClass','2014-12-13 19:09:10','Create New Class',NULL,'MSDClass ID: 9 Name: L4 Sat 2014 Full Location: Alpheratta Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(13,'usera',10,'MSDClass','2014-12-13 19:10:48','Create New Class',NULL,'MSDClass ID: 10 Name: L4 Sun 2014 Full Location: Alpheratta Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(14,'usera',11,'MSDClass','2014-12-13 19:11:17','Create New Class',NULL,'MSDClass ID: 11 Name: L5 2014 Full Location: Alpheratta Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(15,'usera',12,'MSDClass','2014-12-13 19:11:47','Create New Class',NULL,'MSDClass ID: 12 Name: PP 2014 Full Location: Alpheratta Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(16,'usera',9999,'LOGIN','2014-12-13 22:15:35','User successfully login system',NULL,NULL,'SUCCESS'),(17,'usera',9999,'LOGIN','2014-12-13 22:22:54','User successfully login system',NULL,NULL,'SUCCESS'),(18,'usera',9999,'LOGIN','2014-12-13 22:23:22','User successfully login system',NULL,NULL,'SUCCESS'),(19,'usera',9999,'LOGIN','2014-12-13 22:33:23','User logout system',NULL,NULL,'LOGOUT'),(20,'usera',9999,'LOGIN','2014-12-13 22:56:26','User successfully login system',NULL,NULL,'SUCCESS'),(21,'usera',11,'MSDClass','2014-12-13 22:59:12','Change Class','MSDClass ID: 11 Name: L5 Location: Alpheratta Start: 2014-08-09 00:00:00.0 End: 2014-12-20 00:00:00.0 Status:ACTIVE IsActive: 1','MSDClass ID: 11 Name: L5 Location: 2014 Full Start: Sat Aug 09 00:00:00 EDT 2014 End: Sat Dec 20 00:00:00 EST 2014 Status:ACTIVE IsActive: 1','DATABASE'),(22,'anonymousUser',9999,'LOGIN','2014-12-14 01:00:31','User logout system',NULL,NULL,'LOGOUT'),(23,'usera',9999,'LOGIN','2014-12-23 15:12:57','User successfully login system',NULL,NULL,'SUCCESS'),(24,'usera',13,'MSDClass','2014-12-23 15:16:33','Create New Class',NULL,'MSDClass ID: 13 Name: Beginner Sat Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(25,'usera',13,'MSDClass','2014-12-23 15:19:04','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@26064952','DATABASE'),(26,'usera',14,'MSDClass','2014-12-23 15:21:35','Create New Class',NULL,'MSDClass ID: 14 Name: Beginner Sun Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(27,'usera',14,'MSDClass','2014-12-23 15:23:21','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@4c4ee2a','DATABASE'),(28,'usera',15,'MSDClass','2014-12-23 15:24:21','Create New Class',NULL,'MSDClass ID: 15 Name: Level 1 A (Sun) Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(29,'usera',15,'MSDClass','2014-12-23 15:25:34','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@73783e15','DATABASE'),(30,'usera',16,'MSDClass','2014-12-23 15:28:08','Create New Class',NULL,'MSDClass ID: 16 Name: Level 1 B (Sat) Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(31,'usera',16,'MSDClass','2014-12-23 15:28:31','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@397a38dc','DATABASE'),(32,'usera',17,'MSDClass','2014-12-23 15:30:57','Create New Class',NULL,'MSDClass ID: 17 Name: Level 2 A (Sun) Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(33,'usera',17,'MSDClass','2014-12-23 15:32:23','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@452f376b','DATABASE'),(34,'usera',17,'MSDClass','2014-12-23 15:32:49','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@b412c6a','DATABASE'),(35,'usera',18,'MSDClass','2014-12-23 15:36:48','Create New Class',NULL,'MSDClass ID: 18 Name: Level 2 B (Sat) Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(36,'usera',18,'MSDClass','2014-12-23 15:37:05','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@6fe8d9f','DATABASE'),(37,'usera',18,'MSDClass','2014-12-23 15:37:27','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@de5e89b','DATABASE'),(38,'usera',19,'MSDClass','2014-12-23 15:39:59','Create New Class',NULL,'MSDClass ID: 19 Name: Level 3 A (Sun) Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(39,'usera',19,'MSDClass','2014-12-23 15:40:24','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@56bcf627','DATABASE'),(40,'usera',19,'MSDClass','2014-12-23 15:40:57','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@e44c386','DATABASE'),(41,'usera',20,'MSDClass','2014-12-23 15:41:50','Create New Class',NULL,'MSDClass ID: 20 Name: Level 3 B1 (Sat) Location: Spring 2015 Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(42,'usera',20,'MSDClass','2014-12-23 15:42:13','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@6c7c7953','DATABASE'),(43,'usera',20,'MSDClass','2014-12-23 15:42:55','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@7b367ea9','DATABASE'),(44,'usera',21,'MSDClass','2014-12-23 15:44:06','Create New Class',NULL,'MSDClass ID: 21 Name: Level 3 B2 (Sat) Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(45,'usera',21,'MSDClass','2014-12-23 15:44:35','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@5bd89e0a','DATABASE'),(46,'usera',21,'MSDClass','2014-12-23 15:45:05','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@19c3343','DATABASE'),(47,'usera',22,'MSDClass','2014-12-23 15:48:36','Create New Class',NULL,'MSDClass ID: 22 Name: Level 4 A (Sun) Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(48,'usera',22,'MSDClass','2014-12-23 15:49:07','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@1cb97c0b','DATABASE'),(49,'usera',22,'MSDClass','2014-12-23 15:49:43','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@1d9a00fe','DATABASE'),(50,'usera',23,'MSDClass','2014-12-23 15:50:30','Create New Class',NULL,'MSDClass ID: 23 Name: Level 4 B (Sat) Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(51,'usera',23,'MSDClass','2014-12-23 15:51:20','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@1a3c1bee','DATABASE'),(52,'usera',23,'MSDClass','2014-12-23 15:51:41','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@20188ad8','DATABASE'),(53,'usera',24,'MSDClass','2014-12-23 15:52:39','Create New Class',NULL,'MSDClass ID: 24 Name: Level 5 Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(54,'usera',9999,'LOGIN','2014-12-23 16:04:30','User successfully login system',NULL,NULL,'SUCCESS'),(55,'usera',24,'MSDClass','2014-12-23 16:05:09','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@6c6faac1','DATABASE'),(56,'usera',24,'MSDClass','2014-12-23 16:05:24','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@63df09a8','DATABASE'),(57,'usera',24,'MSDClass','2014-12-23 16:05:45','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@67dc27ff','DATABASE'),(58,'usera',24,'MSDClass','2014-12-23 16:06:06','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@151358b5','DATABASE'),(59,'usera',25,'MSDClass','2014-12-23 16:06:45','Create New Class',NULL,'MSDClass ID: 25 Name: Pre Professional Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(60,'usera',25,'MSDClass','2014-12-23 16:07:12','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@1cf65fad','DATABASE'),(61,'usera',25,'MSDClass','2014-12-23 16:07:41','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@2800af2b','DATABASE'),(62,'usera',25,'MSDClass','2014-12-23 16:08:01','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@14e1fd6a','DATABASE'),(63,'usera',24,'MSDClass','2014-12-23 16:08:27','Delete Class Schedular','com.morningstardance.domain.entity.MSDClassSchedular@2682680c',NULL,'DATABASE'),(64,'usera',24,'MSDClass','2014-12-23 16:08:30','Delete Class Schedular','com.morningstardance.domain.entity.MSDClassSchedular@3ad853e7',NULL,'DATABASE'),(65,'usera',24,'MSDClass','2014-12-23 16:08:59','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@14ff37f4','DATABASE'),(66,'usera',9999,'LOGIN','2014-12-23 16:18:38','User logout system',NULL,NULL,'LOGOUT'),(67,'usera',9999,'LOGIN','2014-12-23 16:25:24','User successfully login system',NULL,NULL,'SUCCESS'),(68,'usera',9999,'LOGIN','2014-12-23 16:28:50','User successfully login system',NULL,NULL,'SUCCESS'),(69,'usera',9999,'LOGIN','2015-01-02 17:49:13','User successfully login system',NULL,NULL,'SUCCESS'),(70,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 1 to Class : 25',NULL,NULL,'DATABASE'),(71,'usera',1,'MSDStudent','2015-01-02 17:50:27','Register Student : 1 to Class : 25',NULL,NULL,'DATABASE'),(72,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 4 to Class : 25',NULL,NULL,'DATABASE'),(73,'usera',4,'MSDStudent','2015-01-02 17:50:27','Register Student : 4 to Class : 25',NULL,NULL,'DATABASE'),(74,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 15 to Class : 25',NULL,NULL,'DATABASE'),(75,'usera',15,'MSDStudent','2015-01-02 17:50:27','Register Student : 15 to Class : 25',NULL,NULL,'DATABASE'),(76,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 16 to Class : 25',NULL,NULL,'DATABASE'),(77,'usera',16,'MSDStudent','2015-01-02 17:50:27','Register Student : 16 to Class : 25',NULL,NULL,'DATABASE'),(78,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 23 to Class : 25',NULL,NULL,'DATABASE'),(79,'usera',23,'MSDStudent','2015-01-02 17:50:27','Register Student : 23 to Class : 25',NULL,NULL,'DATABASE'),(80,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 51 to Class : 25',NULL,NULL,'DATABASE'),(81,'usera',51,'MSDStudent','2015-01-02 17:50:27','Register Student : 51 to Class : 25',NULL,NULL,'DATABASE'),(82,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 52 to Class : 25',NULL,NULL,'DATABASE'),(83,'usera',52,'MSDStudent','2015-01-02 17:50:27','Register Student : 52 to Class : 25',NULL,NULL,'DATABASE'),(84,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 53 to Class : 25',NULL,NULL,'DATABASE'),(85,'usera',53,'MSDStudent','2015-01-02 17:50:27','Register Student : 53 to Class : 25',NULL,NULL,'DATABASE'),(86,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 70 to Class : 25',NULL,NULL,'DATABASE'),(87,'usera',70,'MSDStudent','2015-01-02 17:50:27','Register Student : 70 to Class : 25',NULL,NULL,'DATABASE'),(88,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 99 to Class : 25',NULL,NULL,'DATABASE'),(89,'usera',99,'MSDStudent','2015-01-02 17:50:27','Register Student : 99 to Class : 25',NULL,NULL,'DATABASE'),(90,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 103 to Class : 25',NULL,NULL,'DATABASE'),(91,'usera',103,'MSDStudent','2015-01-02 17:50:27','Register Student : 103 to Class : 25',NULL,NULL,'DATABASE'),(92,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 104 to Class : 25',NULL,NULL,'DATABASE'),(93,'usera',104,'MSDStudent','2015-01-02 17:50:27','Register Student : 104 to Class : 25',NULL,NULL,'DATABASE'),(94,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 110 to Class : 25',NULL,NULL,'DATABASE'),(95,'usera',110,'MSDStudent','2015-01-02 17:50:27','Register Student : 110 to Class : 25',NULL,NULL,'DATABASE'),(96,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 135 to Class : 25',NULL,NULL,'DATABASE'),(97,'usera',135,'MSDStudent','2015-01-02 17:50:27','Register Student : 135 to Class : 25',NULL,NULL,'DATABASE'),(98,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 150 to Class : 25',NULL,NULL,'DATABASE'),(99,'usera',150,'MSDStudent','2015-01-02 17:50:27','Register Student : 150 to Class : 25',NULL,NULL,'DATABASE'),(100,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 153 to Class : 25',NULL,NULL,'DATABASE'),(101,'usera',153,'MSDStudent','2015-01-02 17:50:27','Register Student : 153 to Class : 25',NULL,NULL,'DATABASE'),(102,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 154 to Class : 25',NULL,NULL,'DATABASE'),(103,'usera',154,'MSDStudent','2015-01-02 17:50:27','Register Student : 154 to Class : 25',NULL,NULL,'DATABASE'),(104,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 185 to Class : 25',NULL,NULL,'DATABASE'),(105,'usera',185,'MSDStudent','2015-01-02 17:50:27','Register Student : 185 to Class : 25',NULL,NULL,'DATABASE'),(106,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 178 to Class : 25',NULL,NULL,'DATABASE'),(107,'usera',178,'MSDStudent','2015-01-02 17:50:27','Register Student : 178 to Class : 25',NULL,NULL,'DATABASE'),(108,'usera',25,'MSDClass','2015-01-02 17:50:27','Register Student : 186 to Class : 25',NULL,NULL,'DATABASE'),(109,'usera',186,'MSDStudent','2015-01-02 17:50:27','Register Student : 186 to Class : 25',NULL,NULL,'DATABASE'),(110,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 14 to Class : 24',NULL,NULL,'DATABASE'),(111,'usera',14,'MSDStudent','2015-01-02 17:53:04','Register Student : 14 to Class : 24',NULL,NULL,'DATABASE'),(112,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 18 to Class : 24',NULL,NULL,'DATABASE'),(113,'usera',18,'MSDStudent','2015-01-02 17:53:04','Register Student : 18 to Class : 24',NULL,NULL,'DATABASE'),(114,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 42 to Class : 24',NULL,NULL,'DATABASE'),(115,'usera',42,'MSDStudent','2015-01-02 17:53:04','Register Student : 42 to Class : 24',NULL,NULL,'DATABASE'),(116,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 69 to Class : 24',NULL,NULL,'DATABASE'),(117,'usera',69,'MSDStudent','2015-01-02 17:53:04','Register Student : 69 to Class : 24',NULL,NULL,'DATABASE'),(118,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 102 to Class : 24',NULL,NULL,'DATABASE'),(119,'usera',102,'MSDStudent','2015-01-02 17:53:04','Register Student : 102 to Class : 24',NULL,NULL,'DATABASE'),(120,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 105 to Class : 24',NULL,NULL,'DATABASE'),(121,'usera',105,'MSDStudent','2015-01-02 17:53:04','Register Student : 105 to Class : 24',NULL,NULL,'DATABASE'),(122,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 115 to Class : 24',NULL,NULL,'DATABASE'),(123,'usera',115,'MSDStudent','2015-01-02 17:53:04','Register Student : 115 to Class : 24',NULL,NULL,'DATABASE'),(124,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 129 to Class : 24',NULL,NULL,'DATABASE'),(125,'usera',129,'MSDStudent','2015-01-02 17:53:04','Register Student : 129 to Class : 24',NULL,NULL,'DATABASE'),(126,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 130 to Class : 24',NULL,NULL,'DATABASE'),(127,'usera',130,'MSDStudent','2015-01-02 17:53:04','Register Student : 130 to Class : 24',NULL,NULL,'DATABASE'),(128,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 134 to Class : 24',NULL,NULL,'DATABASE'),(129,'usera',134,'MSDStudent','2015-01-02 17:53:04','Register Student : 134 to Class : 24',NULL,NULL,'DATABASE'),(130,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 164 to Class : 24',NULL,NULL,'DATABASE'),(131,'usera',164,'MSDStudent','2015-01-02 17:53:04','Register Student : 164 to Class : 24',NULL,NULL,'DATABASE'),(132,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 175 to Class : 24',NULL,NULL,'DATABASE'),(133,'usera',175,'MSDStudent','2015-01-02 17:53:04','Register Student : 175 to Class : 24',NULL,NULL,'DATABASE'),(134,'usera',24,'MSDClass','2015-01-02 17:53:04','Register Student : 180 to Class : 24',NULL,NULL,'DATABASE'),(135,'usera',180,'MSDStudent','2015-01-02 17:53:04','Register Student : 180 to Class : 24',NULL,NULL,'DATABASE'),(136,'usera',24,'MSDClass','2015-01-02 17:55:46','Delete non Class Date','com.morningstardance.domain.entity.MSDClassNonClassDate@dc7f304',NULL,'DATABASE'),(137,'anonymousUser',9999,'LOGIN','2015-01-02 18:11:35','User logout system',NULL,NULL,'LOGOUT'),(138,'usera',9999,'LOGIN','2015-01-02 18:11:41','User successfully login system',NULL,NULL,'SUCCESS'),(139,'usera',9999,'LOGIN','2015-01-02 18:16:16','User successfully login system',NULL,NULL,'SUCCESS'),(140,'usera',9999,'LOGIN','2015-01-02 18:33:44','User successfully login system',NULL,NULL,'SUCCESS'),(141,'usera',9999,'LOGIN','2015-01-02 18:44:01','User successfully login system',NULL,NULL,'SUCCESS'),(142,'usera',22,'MSDClass','2015-01-02 18:44:21','Delete non Class Date','com.morningstardance.domain.entity.MSDClassNonClassDate@245051ec',NULL,'DATABASE'),(143,'usera',22,'MSDClass','2015-01-02 18:44:25','Delete non Class Date','com.morningstardance.domain.entity.MSDClassNonClassDate@61b88330',NULL,'DATABASE'),(144,'usera',9999,'LOGIN','2015-01-02 18:50:37','User successfully login system',NULL,NULL,'SUCCESS'),(145,'usera',9999,'LOGIN','2015-01-02 18:55:59','User successfully login system',NULL,NULL,'SUCCESS'),(146,'usera',9999,'LOGIN','2015-01-02 18:58:00','User successfully login system',NULL,NULL,'SUCCESS'),(147,'anonymousUser',9999,'LOGIN','2015-01-02 18:58:09','User logout system',NULL,NULL,'LOGOUT'),(148,'usera',9999,'LOGIN','2015-01-02 18:58:15','User successfully login system',NULL,NULL,'SUCCESS'),(149,'usera',9999,'LOGIN','2015-01-02 19:08:25','User successfully login system',NULL,NULL,'SUCCESS'),(150,'usera',9999,'LOGIN','2015-01-02 19:08:42','User successfully login system',NULL,NULL,'SUCCESS'),(151,'usera',9999,'LOGIN','2015-01-02 19:08:58','User successfully login system',NULL,NULL,'SUCCESS'),(152,'usera',9999,'LOGIN','2015-01-02 19:09:29','User successfully login system',NULL,NULL,'SUCCESS'),(153,'anonymousUser',9999,'LOGIN','2015-01-02 19:37:10','User logout system',NULL,NULL,'LOGOUT'),(154,'usera',9999,'LOGIN','2015-01-02 19:38:42','User successfully login system',NULL,NULL,'SUCCESS'),(155,'usera',9999,'LOGIN','2015-01-02 19:44:02','User successfully login system',NULL,NULL,'SUCCESS'),(156,'usera',9999,'LOGIN','2015-01-02 19:49:28','User logout system',NULL,NULL,'LOGOUT'),(157,'userc',9999,'LOGIN','2015-01-02 20:42:34','User successfully login system',NULL,NULL,'SUCCESS'),(158,'userc',9999,'LOGIN','2015-01-02 20:42:39','User logout system',NULL,NULL,'LOGOUT'),(159,'userb',9999,'LOGIN','2015-01-02 20:42:46','User falure login system username: userb pw: Password2',NULL,NULL,'FALURE'),(160,'userb',9999,'LOGIN','2015-01-02 20:42:52','User successfully login system',NULL,NULL,'SUCCESS'),(161,'userb',9999,'LOGIN','2015-01-02 20:43:17','User logout system',NULL,NULL,'LOGOUT'),(162,'usera',9999,'LOGIN','2015-01-03 18:11:12','User successfully login system',NULL,NULL,'SUCCESS'),(163,'usera',24,'MSDClass','2015-01-03 18:13:10','Student : 14 Check in Class : 24',NULL,NULL,'DATABASE'),(164,'usera',14,'MSDStudent','2015-01-03 18:13:10','Student : 14 Check in Class : 24',NULL,NULL,'DATABASE'),(165,'usera',9999,'LOGIN','2015-01-03 18:14:00','User successfully login system',NULL,NULL,'SUCCESS'),(166,'usera',9999,'LOGIN','2015-01-03 18:19:05','User logout system',NULL,NULL,'LOGOUT'),(167,'usera',9999,'LOGIN','2015-01-03 20:15:32','User successfully login system',NULL,NULL,'SUCCESS'),(168,'uersa',9999,'LOGIN','2015-01-03 20:15:43','User falure login system username: uersa pw: Password1',NULL,NULL,'FALURE'),(169,'uersa',9999,'LOGIN','2015-01-03 20:15:50','User falure login system username: uersa pw: Password1',NULL,NULL,'FALURE'),(170,'uersa',9999,'LOGIN','2015-01-03 20:15:57','User falure login system username: uersa pw: Password1',NULL,NULL,'FALURE'),(171,'usera',9999,'LOGIN','2015-01-03 20:16:06','User successfully login system',NULL,NULL,'SUCCESS'),(172,'usera',9999,'LOGIN','2015-01-03 20:16:56','User successfully login system',NULL,NULL,'SUCCESS'),(173,'usera',9999,'LOGIN','2015-01-03 20:18:53','User successfully login system',NULL,NULL,'SUCCESS'),(174,'usera',9999,'LOGIN','2015-01-03 20:20:25','User successfully login system',NULL,NULL,'SUCCESS'),(175,'usera',9999,'LOGIN','2015-01-03 20:22:36','User successfully login system',NULL,NULL,'SUCCESS'),(176,'usera',9999,'LOGIN','2015-01-03 20:29:01','User logout system',NULL,NULL,'LOGOUT'),(177,'usera',9999,'LOGIN','2015-01-05 19:00:30','User successfully login system',NULL,NULL,'SUCCESS'),(178,'usera',14,'MSDStudent','2015-01-05 19:13:55','Add MSDGeneralFee Fee to Student Fee',NULL,'StudentFee--> id: 1 Student id: 14 Object Name: MSDGeneralFee Object Id: 1 IsActive: 1 IsPaid: 0 IsWaiver: 0 PayTime: n/a PayType: null PayNot: null FeeNot: Jasmine Chen L5 one hour class fee','DATABASE'),(179,'usera',14,'MSDStudent','2015-01-05 19:17:20','Paid Student Fee',NULL,'StudentFee--> id: 1 Student id: 14 Object Name: MSDGeneralFee Object Id: 1 IsActive: 1 IsPaid: 1 IsWaiver: 0 PayTime: 01/05/2015 14:16:00 PayType: Check PayNot: #123 FeeNot: Jasmine Chen L5 one hour class fee','DATABASE'),(180,'usera',9999,'LOGIN','2015-01-05 19:26:30','User logout system',NULL,NULL,'LOGOUT'),(181,'usera',9999,'LOGIN','2015-01-05 19:26:42','User successfully login system',NULL,NULL,'SUCCESS'),(182,'usera',9999,'LOGIN','2015-01-05 19:31:42','User logout system',NULL,NULL,'LOGOUT'),(183,'usera',9999,'LOGIN','2015-01-05 19:32:53','User successfully login system',NULL,NULL,'SUCCESS'),(184,'usera',14,'MSDStudent','2015-01-05 19:35:18','Add Student Credit',NULL,'StudentCredit--> id: 1 Student id: 14  IsActive: 1 IsConsumed: 0 creditNote: early pay creditDate: 01/05/2015 14:35:18 consumeNote: null consumeDate: n/a credit: 100.000000','DATABASE'),(185,'usera',14,'MSDStudent','2015-01-05 19:35:55','Consume Student Credit',NULL,'StudentCredit--> id: 1 Student id: 14  IsActive: 1 IsConsumed: 1 creditNote: early pay creditDate: 01/05/2015 14:35:18 consumeNote: adfadf consumeDate: 01/05/2015 00:00:00 credit: 100.000000','DATABASE'),(186,'usera',14,'MSDStudent','2015-01-05 19:41:17','Add Student Credit',NULL,'StudentCredit--> id: 2 Student id: 14  IsActive: 1 IsConsumed: 0 creditNote: From last semester creditDate: 01/05/2015 14:41:17 consumeNote: null consumeDate: n/a credit: 200.000000','DATABASE'),(187,'usera',14,'MSDStudent','2015-01-05 19:42:51','Add MSDGeneralFee Fee to Student Fee',NULL,'StudentFee--> id: 2 Student id: 14 Object Name: MSDGeneralFee Object Id: 2 IsActive: 1 IsPaid: 0 IsWaiver: 0 PayTime: n/a PayType: null PayNot: null FeeNot: L4','DATABASE'),(188,'anonymousUser',9999,'LOGIN','2015-01-05 20:01:54','User logout system',NULL,NULL,'LOGOUT'),(189,'usera',9999,'LOGIN','2015-01-05 20:06:26','User successfully login system',NULL,NULL,'SUCCESS'),(190,'usera',26,'MSDClass','2015-01-05 20:23:03','Create New Class',NULL,'MSDClass ID: 26 Name: Nin Nin Private  Location: 2015 Spring Start: Tue Jan 06 00:00:00 EST 2015 End: Sun May 24 00:00:00 EDT 2015 Status:INACTIVE IsActive: 1','DATABASE'),(191,'usera',26,'MSDClass','2015-01-05 20:24:03','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@3f16a879','DATABASE'),(192,'usera',26,'MSDClass','2015-01-05 20:24:51','Add Class Schedular',NULL,'com.morningstardance.domain.entity.MSDClassSchedular@528a7a9a','DATABASE'),(193,'usera',26,'MSDClass','2015-01-05 20:26:20','Register Student : 135 to Class : 26',NULL,NULL,'DATABASE'),(194,'usera',135,'MSDStudent','2015-01-05 20:26:20','Register Student : 135 to Class : 26',NULL,NULL,'DATABASE'),(195,'usera',26,'MSDClass','2015-01-05 20:27:19','Add Class Fee',NULL,'ID: 1 MSDClass ID: 26 Name: nn Cost: 100 CostType Id: 3is Active: 1','DATABASE'),(196,'usera',135,'MSDStudent','2015-01-05 20:27:19','Add MSDClassFee Fee to Student Fee',NULL,'StudentFee--> id: 3 Student id: 135 Object Name: MSDClassFee Object Id: 1 IsActive: 1 IsPaid: 0 IsWaiver: 0 PayTime: n/a PayType: null PayNot: null FeeNot: null','DATABASE'),(197,'usera',26,'MSDClass','2015-01-05 20:28:09','De active Class Fee','ID: 1 MSDClass ID: 26 Name: nn Cost: 100.00 CostType Id: 3is Active: 0',NULL,'DATABASE'),(198,'usera',135,'MSDStudent','2015-01-05 20:28:09','Remove Class Fee From Student Fee',NULL,'StudentFee--> id: 3 Student id: 135 Object Name: MSDClassFee Object Id: 1 IsActive: 0 IsPaid: 0 IsWaiver: 0 PayTime: n/a PayType: null PayNot: null FeeNot: null','DATABASE'),(199,'usera',26,'MSDClass','2015-01-05 20:28:35','Add Class Fee',NULL,'ID: 2 MSDClass ID: 26 Name: nn Cost: 900 CostType Id: 3is Active: 1','DATABASE'),(200,'usera',135,'MSDStudent','2015-01-05 20:28:35','Add MSDClassFee Fee to Student Fee',NULL,'StudentFee--> id: 4 Student id: 135 Object Name: MSDClassFee Object Id: 2 IsActive: 1 IsPaid: 0 IsWaiver: 0 PayTime: n/a PayType: null PayNot: null FeeNot: null','DATABASE'),(201,'usera',135,'MSDStudent','2015-01-05 20:31:04','Add MSDGeneralFee Fee to Student Fee',NULL,'StudentFee--> id: 5 Student id: 135 Object Name: MSDGeneralFee Object Id: 3 IsActive: 1 IsPaid: 0 IsWaiver: 0 PayTime: n/a PayType: null PayNot: null FeeNot: 2015/01 for hannah private class','DATABASE'),(202,'usera',9999,'LOGIN','2015-01-05 21:18:31','User successfully login system',NULL,NULL,'SUCCESS'),(203,'usera',9999,'LOGIN','2015-01-05 21:26:31','User logout system',NULL,NULL,'LOGOUT');
/*!40000 ALTER TABLE `msd_operation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_student`
--

DROP TABLE IF EXISTS `msd_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `home_phone` varchar(15) DEFAULT NULL,
  `cell_phone` varchar(15) DEFAULT NULL,
  `email_address` varchar(256) DEFAULT NULL,
  `school_name` varchar(256) DEFAULT NULL,
  `school_grade` varchar(45) DEFAULT NULL,
  `home_address` varchar(256) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `lastnamefirstname` (`last_name`,`first_name`)
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_student`
--

LOCK TABLES `msd_student` WRITE;
/*!40000 ALTER TABLE `msd_student` DISABLE KEYS */;
INSERT INTO `msd_student` VALUES (1,'Bian','Ronnie',NULL,NULL,'6783932203',NULL,'amyshih309@gmail.com',NULL,NULL,NULL,1),(2,'Cai','Emily',NULL,NULL,NULL,'6787178185','sdyangmingxia@163.com','Johns Creek Elem ming xia Yang',NULL,NULL,1),(3,'Cai','Joanna',NULL,NULL,NULL,'4047518408','jimc96@yahoo.com',' ',NULL,NULL,1),(4,'Chang','Erin',NULL,NULL,'7704957928',NULL,'changhui@bellsouth.net',NULL,NULL,NULL,1),(5,'Chen','Yifang',NULL,NULL,NULL,'6262025227','yutao.chen@hisense-usa.com','Wilson creek Elem',NULL,NULL,1),(6,'Chen','Isabel',NULL,NULL,NULL,'4046262000','wenli_qiao_7777@yahoo.com',' ',NULL,NULL,1),(7,'Chen','Yu-An',NULL,NULL,NULL,'4043989426','ccc.851@gmail.com',' ',NULL,NULL,1),(8,'Chen','Grace',NULL,NULL,NULL,NULL,'ding_shirley@hotmail.com',' ',NULL,NULL,1),(9,'Chen','Iris',NULL,NULL,NULL,'4047516593','chenlin321@yahoo.com','2nd grade',NULL,NULL,1),(10,'Chen','Emily',NULL,NULL,'4045102565',NULL,'cara_yxu@yahoo.com',NULL,NULL,NULL,1),(11,'Chen','Sophia',NULL,NULL,NULL,'6789399271','chenhong201@hotmail.com',NULL,NULL,NULL,1),(12,'Chen','Eileen',NULL,NULL,NULL,'6782189845','rongsun2010@gmail.com',NULL,NULL,NULL,1),(13,'Chen','Jaimie',NULL,NULL,'4042819245',NULL,'ailanyi@hotmail.com',' ',NULL,NULL,1),(14,'Chen','Jasmine',NULL,NULL,'7704976848',NULL,'mailcindy1@yahoo.com',NULL,NULL,NULL,1),(15,'Chen','Cassie',NULL,NULL,'7707409797',NULL,'aiping_huang@hotmail.com',NULL,NULL,NULL,1),(16,'Chen','Helen/haidel',NULL,NULL,NULL,NULL,'drjfchen@aol.com',' ',NULL,NULL,1),(17,'Cheng','Sophia',NULL,NULL,NULL,'5743392799','xia.lin@alum.emory.edu',NULL,NULL,NULL,1),(18,'Cheng','Christina',NULL,NULL,NULL,'6783019273','xcheng_2000@yahoo.com',' ',NULL,NULL,1),(19,'Chong','Eileen',NULL,NULL,NULL,'6786871109','weich2003@msn.com','Robert Elem- Grade K',NULL,NULL,1),(20,'Choo','Natalie',NULL,NULL,NULL,'7708619736','angelchia@yahoo.com','Mason Elementary G2',NULL,NULL,1),(21,'Chou','Nina',NULL,NULL,NULL,'4047909257','ching2ma@gmail.com','\" \'Ma- Chingching \"\"\"',NULL,NULL,1),(22,'Chu','ArWen',NULL,NULL,NULL,'4046611009','yuanchihchu@gmail.com',' ',NULL,NULL,1),(23,'Connie','Xiao',NULL,NULL,'7707541371',NULL,'lijingy@yahoo.com',' ',NULL,NULL,1),(24,'Coopeland','Kayli',NULL,NULL,'6785220076',NULL,'fafafa_1999@yahoo.com',' ',NULL,NULL,1),(25,'Den','Hillary',NULL,NULL,NULL,'8327480631','caifentang@yahoo.com',NULL,NULL,NULL,1),(26,'Deng','Ivy',NULL,NULL,'6784299641',NULL,'emma.yu@gmail.com','Peachtree Park Prep',NULL,NULL,1),(27,'Deng','Joanne',NULL,NULL,'6782303389',NULL,'pkuer@yahoo.com','medlock Brige Elementary School',NULL,NULL,1),(28,'Ding','Alexanvdria/Kate',NULL,NULL,NULL,NULL,'judyzhu720@gmail.com',NULL,NULL,NULL,1),(29,'Ding','Erin',NULL,NULL,NULL,NULL,'qding328@gmail.com',NULL,NULL,NULL,1),(30,'Ella','Fan',NULL,NULL,NULL,'6786206735','hya077@yahoo.com','Legacy Academy Hui Yao ',NULL,NULL,1),(31,'Esquivel','Pamela',NULL,NULL,NULL,NULL,'tanghui8@hotmail.com',' ',NULL,NULL,1),(32,'Fan','Ella',NULL,NULL,NULL,NULL,'Fan',NULL,NULL,NULL,1),(33,'Fan','Joy',NULL,NULL,NULL,'6786206735','hyao77@yahoo.com',' ',NULL,NULL,1),(34,'Fang','Emma',NULL,NULL,'7709382986',NULL,'qian.an1@gmail.com','Qian An',NULL,NULL,1),(35,'Fei','Grace/Angie',NULL,NULL,NULL,'4045764117','bianfang1@yahoo.com','State Bridge Crossing Elementer',NULL,NULL,1),(36,'Feng','Michelle',NULL,NULL,NULL,'6782301666','wf2000@gmail.com','State ridge Crossing- G1',NULL,NULL,1),(37,'Feng','Elizabeth',NULL,NULL,'6787728054',NULL,'bunnyds@hotmail.com','Pre-k- Ocee  ',NULL,NULL,1),(38,'Fu','Cindy/Kaelyn',NULL,NULL,'6784318298',NULL,'jingfu.g@gmail.com',NULL,NULL,NULL,1),(39,'Gao','Karen',NULL,NULL,'7707979021',NULL,'gf6801@hotmail.com',NULL,NULL,NULL,1),(40,'Gao','Allison',NULL,NULL,NULL,NULL,'funmarket2000@yahoo.com',NULL,NULL,NULL,1),(41,'Goins','Remie',NULL,NULL,NULL,'4047913838','randi@rlgoins.com','Georgia Cyber Academy',NULL,NULL,1),(42,'Gong','Cherry',NULL,NULL,NULL,NULL,'teri2009pb@yahoo.com',NULL,NULL,NULL,1),(43,'Gu','Doris',NULL,NULL,NULL,'4047253293','guohuigh1101@gmail.com','  ',NULL,NULL,1),(44,'Ho','Sophia',NULL,NULL,NULL,NULL,'nkee88@gmail.com','Lake Windward',NULL,NULL,1),(45,'Hsu','Mia',NULL,NULL,NULL,'7709055842 ','yujuan20@yahoo.com',' ',NULL,NULL,1),(46,'Hu','Helena',NULL,NULL,NULL,'9736525291','joydai129@gmail.com',' ',NULL,NULL,1),(47,'Hu','Michelle',NULL,NULL,'6787015168',NULL,'leishihu@gmail.com','Grade K ',NULL,NULL,1),(48,'Huang','Caroline',NULL,NULL,NULL,'4048315971','ruiyf02@gmail.com',' ',NULL,NULL,1),(49,'Huang','Ailin',NULL,NULL,'6787908288',NULL,'lily745260117@qq.com',NULL,NULL,NULL,1),(50,'Huang','Hannah',NULL,NULL,'7704958293',NULL,'hongtang@fico.com',NULL,NULL,NULL,1),(51,'Huang','Janet',NULL,NULL,NULL,NULL,'XAY5@cdc.gov',NULL,NULL,NULL,1),(52,'Huang','Angela',NULL,NULL,'6784471977',NULL,'huiming_li@yahoo.com',NULL,NULL,NULL,1),(53,'Huo','Wynne',NULL,NULL,NULL,NULL,'ting168@msn.com',NULL,NULL,NULL,1),(54,'Hustins','Olivia',NULL,NULL,NULL,'6784315868','Jiakli@gmail.com',NULL,NULL,NULL,1),(55,'Iau','Evonne',NULL,NULL,'6784176035',NULL,'pedro_iau@hotmail.com',NULL,NULL,NULL,1),(56,'Isabella','Favo.',NULL,NULL,NULL,'4044096688','cindycao819@hotmail.com','Duluth Montessori School Cindy Cao Chris Favo',NULL,NULL,1),(57,'Ji','Miya',NULL,NULL,'7708514396',NULL,'liya.zhang@gmail.com','parent: ',NULL,NULL,1),(58,'Jiang','Natalie',NULL,NULL,NULL,'6464173968','selalou@yahoo.com','Sela Lu/Alec Jiang  ',NULL,NULL,1),(59,'Jiang','Grace',NULL,NULL,'6784739429',NULL,'jiangchengliang@yahoo.com',NULL,NULL,NULL,1),(60,'Jiang','JinMeng',NULL,NULL,'6783601197',NULL,'yangao32@gmail.com',NULL,NULL,NULL,1),(61,'Joeleen','Reynolds',NULL,NULL,NULL,'6787613289','xin@mac.com',' ',NULL,NULL,1),(62,'Khanmamedov','Sophie',NULL,NULL,NULL,'2149293913','lin.khan.tx@gmail.com',NULL,NULL,NULL,1),(63,'Kim','Victoria',NULL,NULL,'6782766705',NULL,'ohgemma@yahoo.co.kr','wilson Creek 1st grade',NULL,NULL,1),(64,'Knudsen','Sophia',NULL,NULL,'6787709988',NULL,'bills@cubicleman.com','FSA',NULL,NULL,1),(65,'Ko','Emily/Alexis/Alison',NULL,NULL,NULL,'6788608917','Lanlu79@yahoo.com',NULL,NULL,NULL,1),(66,'Kong','Melody',NULL,NULL,'7708861204',NULL,'cwtanvivian@hotmail.com',' ',NULL,NULL,1),(67,'Lee','Nicole',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(68,'Lee','Megan',NULL,NULL,NULL,NULL,'mnlee@hotmail.com',NULL,NULL,NULL,1),(69,'Lee','Angela',NULL,NULL,'4048030499',NULL,'huayang100@yahoo.com','Trickun Middle School ',NULL,NULL,1),(70,'Lee','Maxine',NULL,NULL,NULL,NULL,'catlee31@yahoo.com',NULL,NULL,NULL,1),(71,'Li','Peng',NULL,NULL,'2145331744',NULL,'peng.vince@gmail.com','Barnwell Elementary Li- Peng',NULL,NULL,1),(72,'Li','Erin',NULL,NULL,NULL,'4043091399','mengxueping@hotmail.com',NULL,NULL,NULL,1),(73,'Li','Grace',NULL,NULL,NULL,'6783356606','bravejingz@gmail.com',' ',NULL,NULL,1),(74,'Li','Emily',NULL,NULL,NULL,'4047298074','junmountain@gmail.com','Camp Creek',NULL,NULL,1),(75,'Li','Carol',NULL,NULL,NULL,'6789073433','sllj31@hotmail.com',' ',NULL,NULL,1),(76,'Li','Fiona',NULL,NULL,NULL,'8656049436','leilei1229@yahoo.com','State Bridge- 4Th',NULL,NULL,1),(77,'Li','Christy',NULL,NULL,'4044571446',NULL,'jiangrong918@hotmail.com',NULL,NULL,NULL,1),(78,'Li','Anna',NULL,NULL,'7064249753',NULL,'ruizhang77@gmail.com',NULL,NULL,NULL,1),(79,'Li','Nicole',NULL,NULL,NULL,'4043207188','yuanhuiliu@yahoo.com',NULL,NULL,NULL,1),(80,'Lian','Daylia',NULL,NULL,NULL,NULL,'jrw1373@gmail.com',' ',NULL,NULL,1),(81,'Lian','Ellie',NULL,NULL,'4049186698',NULL,'ywu@everascent.com','Johns Creek elem. Grade 2.Wu- Yin',NULL,NULL,1),(82,'Liang','Yi',NULL,NULL,NULL,'6262173822','chenxiaokai@hisense.com','Wilson creek Ele',NULL,NULL,1),(83,'Lin','Tristan',NULL,NULL,NULL,'5853055785','patricia.chianglin@yahoo.com',' ',NULL,NULL,1),(84,'Lin','Annie',NULL,NULL,NULL,'7209391728','michelle@jiahost.com',NULL,NULL,NULL,1),(85,'Ling','Claire',NULL,NULL,NULL,'6782946888','leng.ling@gcsu-edu','Shakerage K Leng Ling pingping Song',NULL,NULL,1),(86,'Ling','Grace',NULL,NULL,NULL,'6782946888','pingping_song@hotmail.com',' ',NULL,NULL,1),(87,'Liu','Hope',NULL,NULL,'4048215058',NULL,'zoeqiao@gmail.com','shakerige',NULL,NULL,1),(88,'Liu','Ella',NULL,NULL,NULL,'7036096366','lvdongxu0502@hotmail.com','Johns Creek- G1',NULL,NULL,1),(89,'Liu','Luna',NULL,NULL,NULL,NULL,'danyang4648@gmail.com',NULL,NULL,NULL,1),(90,'Liu','Scarlett',NULL,NULL,NULL,'7702987763','mengxue02@gmail.com','Cobb',NULL,NULL,1),(91,'Liu','Amber',NULL,NULL,NULL,NULL,'xiaoli3@gmail.com',' ',NULL,NULL,1),(92,'Liu','Amy',NULL,NULL,NULL,'5173034513','carrie_xu@hotmail.com',' Medlock Bridge Elementary',NULL,NULL,1),(93,'Liu','Alexis',NULL,NULL,NULL,'4357572318','gracezhou2003@yahoo.com',' ',NULL,NULL,1),(94,'Liu','Sally',NULL,NULL,NULL,'2149348048','pig_duoduo@liwe.com',' ',NULL,NULL,1),(95,'Liu','Iris',NULL,NULL,'6787630940',NULL,'zhaoke74@gmail.com',NULL,NULL,NULL,1),(96,'Liu','Nicole',NULL,NULL,NULL,'6785348288','atl_james@yahoo.com',' ',NULL,NULL,1),(97,'Liu','Rachel',NULL,NULL,'4047912003',NULL,'xinhualiu@gmail.com',NULL,NULL,NULL,1),(98,'Liu','Jenny',NULL,NULL,'7706490265',NULL,'sxy_zhang@yahoo.com',NULL,NULL,NULL,1),(99,'Liu','Jessie',NULL,NULL,'4045450358',NULL,'shz2020@hotmail.com',NULL,NULL,NULL,1),(100,'Lu','Hannah',NULL,NULL,NULL,'6786501588','lemontree168600@yahoo.com',' ',NULL,NULL,1),(101,'Lu','Nichole',NULL,NULL,NULL,'6786779533','xiuwu1983@gmail.com','Dance Stop',NULL,NULL,1),(102,'Lu','Julia',NULL,NULL,NULL,'6784749242','shengkai_lu@yahoo.com','river trail  ',NULL,NULL,1),(103,'Luo','Christina',NULL,NULL,'4045435238',NULL,'llanyang@yahoo.com',NULL,NULL,NULL,1),(104,'Manning','Daphno',NULL,NULL,NULL,NULL,'weishu.manning@gmail.com',NULL,NULL,NULL,1),(105,'Mei','Calista',NULL,NULL,NULL,NULL,'leemee100@hotmail.com',NULL,NULL,NULL,1),(106,'Naomi','Ngyantun',NULL,NULL,NULL,'4049368646','van_sioung@hotmail.com',NULL,NULL,NULL,1),(107,'Nguyen','Vivi',NULL,NULL,'6784671867',NULL,'mrhoannguyen@yahoo.com',NULL,NULL,NULL,1),(108,'Niu','Roise',NULL,NULL,NULL,'7708426418','kai@kai-ts.com',NULL,NULL,NULL,1),(109,'Pammi','Kajni/Ranjani',NULL,NULL,NULL,'4046547878','pammi_triveni@yahoo.com','Wilson creek elemintay',NULL,NULL,1),(110,'Pan','Abbey',NULL,NULL,NULL,'7708421258','jc7036@yahoo.com',NULL,NULL,NULL,1),(111,'Pearson','Julia',NULL,NULL,NULL,NULL,'xiaobingp@hotmail.com',NULL,NULL,NULL,1),(112,'Peng','Grace',NULL,NULL,'7705400285',NULL,'gaoyan02@hotmail.com',NULL,NULL,NULL,1),(113,'Pierce','Kaelyn',NULL,NULL,NULL,'6785210293','bradannpierce@gmail.com',NULL,NULL,NULL,1),(114,'Praha','Irukulapati',NULL,NULL,NULL,'4043846836','irukulapati@gmail.com','Daves Creek Elementary',NULL,NULL,1),(115,'Presnell','Ashley',NULL,NULL,NULL,'6263194136','michellemlin88@gmail.com',NULL,NULL,NULL,1),(116,'Qi','Fiona',NULL,NULL,NULL,'4046441725','kunchen1231@gmail.com','Oak Meadow Montessori',NULL,NULL,1),(117,'Qiu','Phoebe',NULL,NULL,NULL,'6786226465','qiuwulin@yahoo.com','Brookwood Elemetery',NULL,NULL,1),(118,'Schwartz','Kayli',NULL,NULL,'6178218197',NULL,'seleric@yahoo.com','#VALUE!',NULL,NULL,1),(119,'Shee','Olivia',NULL,NULL,NULL,'7704951811','shenting800@yahoo.com',NULL,NULL,NULL,1),(120,'Shen','Rayne',NULL,NULL,NULL,NULL,'tu_wenjuan@yahoo.com','  ',NULL,NULL,1),(121,'Shen','Jasmine',NULL,NULL,NULL,'6787612376','easykimberlyhsu@gmail.com','Wilson Creek',NULL,NULL,1),(122,'Shen','Estelle',NULL,NULL,'6783132890',NULL,'hao_cd@yahoo.com','1st grade Johns creek Ele',NULL,NULL,1),(123,'Shen','Joy',NULL,NULL,NULL,'6785936399','plshen@post.harvard.edu','Abbortts Hill elementary  G3- ',NULL,NULL,1),(124,'Shi','Lucy',NULL,NULL,NULL,'6784990952','amymzhang@gmail.com','Big Creek ',NULL,NULL,1),(125,'Si','Ashley',NULL,NULL,NULL,NULL,'weidongsi@gmail.com',NULL,NULL,NULL,1),(126,'Si','Alyssa',NULL,NULL,'7709571889',NULL,'weidongsi@gmail.com',NULL,NULL,NULL,1),(127,'Sun','Arianna',NULL,NULL,NULL,'6122292421','d989898@gmail.com',NULL,NULL,NULL,1),(128,'Sun','Stephanie',NULL,NULL,NULL,NULL,'szhan01@yahoo.com',NULL,NULL,NULL,1),(129,'Sun','Christina',NULL,NULL,'7708373606',NULL,'szhan01@yahoo.com',NULL,NULL,NULL,1),(130,'Sun','Yu/Rui/Yao',NULL,NULL,NULL,NULL,'jacksun.2009@yahoo.com','three girls',NULL,NULL,1),(131,'Tang','Amy',NULL,NULL,NULL,'4042954466','angiexy@gmail.com',NULL,NULL,NULL,1),(132,'Tang','Amelia',NULL,NULL,NULL,'7708265800','adinazhou@yahoo.com',NULL,NULL,NULL,1),(133,'Tang','Jassica',NULL,NULL,'6787620481',NULL,'pingpsong@gmail.com',NULL,NULL,NULL,1),(134,'Tang','Sylvia',NULL,NULL,NULL,NULL,'deng0519@yahoo.com',' ',NULL,NULL,1),(135,'Tian','Leilani',NULL,NULL,NULL,NULL,'lanzhang111@gmail.com',NULL,NULL,NULL,1),(136,'Tong','Sophie',NULL,NULL,NULL,'4043508910','ditian@gmail.com',' ',NULL,NULL,1),(137,'Tong','Lillian',NULL,NULL,'4045635372',NULL,'JYU515@yahoo.com',NULL,NULL,NULL,1),(138,'Wang','Nancy',NULL,NULL,NULL,'6785773880','gswang1@yahoo.com',NULL,NULL,NULL,1),(139,'Wang','Rebecca',NULL,NULL,NULL,'6263533578','wang3001@gmail.com',' ',NULL,NULL,1),(140,'Wang','Elizabath',NULL,NULL,NULL,NULL,'wang_leyong@yahoo.com',' ',NULL,NULL,1),(141,'Wang','Michelle/Sophia',NULL,NULL,NULL,'4042755063','lisajohnms@gmail.com',NULL,NULL,NULL,1),(142,'Wang','Serena',NULL,NULL,NULL,'4046252826','lfpig2001@yahoo.com.hk','Johns Creek Elem',NULL,NULL,1),(143,'Wang','Annie',NULL,NULL,'7737995830',NULL,'changsheng.wang@gmail.com',NULL,NULL,NULL,1),(144,'Wang','Alyssa',NULL,NULL,NULL,'4044210858','phoebemao@gmail.com','Globe Academy 2nd ',NULL,NULL,1),(145,'Wang','Angie',NULL,NULL,'6786898896',NULL,'hchding@yahoo.com',NULL,NULL,NULL,1),(146,'Wang','Connie',NULL,NULL,NULL,'6788659663','asui4tong@gmail.com',' ',NULL,NULL,1),(147,'Wang','Grace',NULL,NULL,NULL,'6784471833','wangzg@gmail.com',NULL,NULL,NULL,1),(148,'Wang','Zara',NULL,NULL,NULL,NULL,'huiguan@yahoo.com',' ',NULL,NULL,1),(149,'Wang','Sophie',NULL,NULL,'4125850088',NULL,'emily_bian@yahoo.com','  ',NULL,NULL,1),(150,'Wang','Jannifer',NULL,NULL,NULL,NULL,'lipinglarry.wang@gmail.com',NULL,NULL,NULL,1),(151,'WangTie','Alyssa',NULL,NULL,NULL,'4049344674','tracytie@gmail.com','chattahoochee k',NULL,NULL,1),(152,'Wei','Audrey',NULL,NULL,NULL,'7706221102','lffu@yahoo.com',NULL,NULL,NULL,1),(153,'Wei','Grace/AvaWei/Margaret',NULL,NULL,'7703389358',NULL,'cgd011@gmail.com',NULL,NULL,NULL,1),(154,'Wong','Ellie',NULL,NULL,'6784676339',NULL,'serelence@yahoo.com',NULL,NULL,NULL,1),(155,'Wu','Johanna',NULL,NULL,'2144181096',NULL,'kaiwu25@gmail.com',NULL,NULL,NULL,1),(156,'Xia','Jennifer',NULL,NULL,'6787178318',NULL,'jianqingzheng@hotmail.com','4th- Sharkrage Ele.',NULL,NULL,1),(157,'Xiao','Angela',NULL,NULL,NULL,NULL,'shenxuezheng@hotmail.com',NULL,NULL,NULL,1),(158,'Xiao','Catherine',NULL,NULL,NULL,'4044097275','zhenlun@hotmail.com',' ',NULL,NULL,1),(159,'Xiao','Sofia',NULL,NULL,NULL,'5166202922','serahlou@gmail.com','SBCE',NULL,NULL,1),(160,'Xiao','Katherine',NULL,NULL,'6788974385',NULL,'yuxia_zhang@yahoo.com',NULL,NULL,NULL,1),(161,'Xu','Allison',NULL,NULL,NULL,'3127538104','jennyzhao5@gmail.com',' ',NULL,NULL,1),(162,'Xu','Amie',NULL,NULL,'7707539005',NULL,'hongshao@yahoo.com','5th grade- Dolvin Elem',NULL,NULL,1),(163,'Yan','Karen',NULL,NULL,NULL,'7708138803','shelleyatlanta@gmail.com',NULL,NULL,NULL,1),(164,'Yan','Joanna',NULL,NULL,'6785252266',NULL,'huikou@yahoo.com','  ',NULL,NULL,1),(165,'Yang','Evelyn',NULL,NULL,NULL,'4043959214','ruby_yu@hotmail.com','Shakerage',NULL,NULL,1),(166,'Yang','ZiChun',NULL,NULL,NULL,'8598061540','guojuan.cs@gmail.com','Roberts Elementary school',NULL,NULL,1),(167,'Yang','Bonnie',NULL,NULL,'4048619849',NULL,'ruby_yu@hotmail.com',NULL,NULL,NULL,1),(168,'Yang','Ivy',NULL,NULL,NULL,NULL,'lqqmmz@gmail.com',NULL,NULL,NULL,1),(169,'Ye','Samantha',NULL,NULL,NULL,'9312294599','cynthia.fengye@gmail.com',NULL,NULL,NULL,1),(170,'Young','Chelsea',NULL,NULL,'4783905567',NULL,'syga215@gmail.com',NULL,NULL,NULL,1),(171,'Yu','Rosanna',NULL,NULL,NULL,'6789259367','jingke2000@yahoo.com','CCES',NULL,NULL,1),(172,'Yu','Grace',NULL,NULL,'6786203715',NULL,'aayu09@gmail.com',NULL,NULL,NULL,1),(173,'Yuan','Abigall',NULL,NULL,NULL,'6789839956','pingwy@gmail.com','Zheng- Yuan/Ping Yuan ',NULL,NULL,1),(174,'Zeng','Jocelyn',NULL,NULL,NULL,'4044340045','nandingatl@gmail.com','Grade K- Dolvin Elementary',NULL,NULL,1),(175,'Zha','Jenny/Vivian',NULL,NULL,NULL,'7706967270','mzha@emory.edu',' ',NULL,NULL,1),(176,'Zhang','Sunny',NULL,NULL,NULL,'4045122389','yongpinghao@hotmail.com',' ',NULL,NULL,1),(177,'Zhang','Miao',NULL,NULL,NULL,'6786221803','657709876@qq.com','Chattahoochee Elementary',NULL,NULL,1),(178,'Zhang','Alice/Macleline',NULL,NULL,'6783157856',NULL,'flora.ding@gmail.com',' ',NULL,NULL,1),(179,'Zhang','Eileen',NULL,NULL,NULL,NULL,'cathyshny@yahoo.com',' ',NULL,NULL,1),(180,'Zhang','Jessica',NULL,NULL,NULL,NULL,'pattyxia@yahoo.com',NULL,NULL,NULL,1),(181,'Zhang','Emily',NULL,NULL,NULL,'6784809361','lisa.zhao1@gmail.com',' ',NULL,NULL,1),(182,'Zhang','Lillian',NULL,NULL,NULL,NULL,'zz9601@yahoo.com',NULL,NULL,NULL,1),(183,'Zhang','Olivia',NULL,NULL,'4047865083',NULL,'chongxi2001@yahoo.com',NULL,NULL,NULL,1),(184,'Zhang','Ruoyi',NULL,NULL,NULL,'6786098686','1134714446@qq.com',NULL,NULL,NULL,1),(185,'Zhang','Angela',NULL,NULL,NULL,NULL,'jian_zhang_at@yahoo.com',NULL,NULL,NULL,1),(186,'Zhang','Amy',NULL,NULL,NULL,NULL,'liangamy822003@yahoo.com',NULL,NULL,NULL,1),(187,'Zhao','Muhan',NULL,NULL,'4044096961',NULL,'yukanglihua@yahoo.com','Simpson elementary 3rd',NULL,NULL,1),(188,'Zhao','Teresa',NULL,NULL,NULL,'6784041882','hongzhang18@gmail.com','Preston Ridge Motersori',NULL,NULL,1),(189,'Zhao','Diane',NULL,NULL,NULL,'5055156949','yangshihui21@yahoo.com','Sharkrage Elemetary ',NULL,NULL,1),(190,'Zhao','Nora',NULL,NULL,'7708269588',NULL,'minzhu100@hotmail.com',NULL,NULL,NULL,1),(191,'Zhao','Emily',NULL,NULL,NULL,NULL,'hongwangus@hotmail.com',NULL,NULL,NULL,1),(192,'Zhao','Lydia',NULL,NULL,NULL,NULL,'lilizhu05@yahoo.com',NULL,NULL,NULL,1),(193,'Zheng','Sebina',NULL,NULL,NULL,'4044355161','sebina0403@gmail.com',NULL,NULL,NULL,1),(194,'Zhou','Yilan',NULL,NULL,NULL,'2018874322','huiwu46@gmail.com','Wilson creek elem',NULL,NULL,1),(195,'Zhou','Nathen',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(196,'Zhou','Victoria',NULL,NULL,'4045146924',NULL,'rosieli2006@gmail.com',NULL,NULL,NULL,1),(197,'Zhu','Hanna',NULL,NULL,NULL,'7576524459','ghzhu99@yahoo.com','Finldy Oak ',NULL,NULL,1),(198,'Zhu','Venetia',NULL,NULL,NULL,NULL,'laurenjane.realty@yahoo.com ::: shawn.zhu@gmail.com',' ',NULL,NULL,1),(199,'Zuo','Hannah',NULL,NULL,'7705788691',NULL,'jxu_2001@yahoo.com',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `msd_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_student_checkin`
--

DROP TABLE IF EXISTS `msd_student_checkin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_student_checkin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msd_student_id` int(11) NOT NULL,
  `msd_class_id` int(11) NOT NULL,
  `checkin_time` datetime NOT NULL,
  `is_makeup` tinyint(4) DEFAULT '0',
  `is_fivehoursmore` tinyint(4) DEFAULT '0',
  `is_other` tinyint(4) DEFAULT '0',
  `note` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`,`msd_student_id`,`msd_class_id`),
  KEY `fk_msd_student_checkin_msd_student1_idx` (`msd_student_id`),
  KEY `fk_msd_student_checkin_msd_class1_idx` (`msd_class_id`),
  CONSTRAINT `fk_msd_student_checkin_msd_class1` FOREIGN KEY (`msd_class_id`) REFERENCES `msd_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_msd_student_checkin_msd_student1` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_student_checkin`
--

LOCK TABLES `msd_student_checkin` WRITE;
/*!40000 ALTER TABLE `msd_student_checkin` DISABLE KEYS */;
INSERT INTO `msd_student_checkin` VALUES (1,14,24,'2015-01-03 13:13:10',0,0,0,'');
/*!40000 ALTER TABLE `msd_student_checkin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_student_class`
--

DROP TABLE IF EXISTS `msd_student_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_student_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msd_student_id` int(11) NOT NULL,
  `msd_class_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`,`msd_student_id`,`msd_class_id`),
  KEY `fk_msd_student_class_msd_student1_idx` (`msd_student_id`),
  KEY `fk_msd_student_class_msd_class1_idx` (`msd_class_id`),
  CONSTRAINT `fk_msd_student_class_msd_class1` FOREIGN KEY (`msd_class_id`) REFERENCES `msd_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_msd_student_class_msd_student1` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_student_class`
--

LOCK TABLES `msd_student_class` WRITE;
/*!40000 ALTER TABLE `msd_student_class` DISABLE KEYS */;
INSERT INTO `msd_student_class` VALUES (1,1,12,1),(2,2,1,1),(3,3,3,1),(4,4,12,1),(5,5,1,1),(6,6,4,1),(7,7,6,1),(8,8,7,1),(9,9,7,1),(10,10,7,1),(11,11,7,1),(12,12,9,1),(13,13,9,1),(14,14,10,1),(15,14,11,1),(16,15,12,1),(17,16,12,1),(18,17,7,1),(19,18,11,1),(20,19,5,1),(21,20,5,1),(22,21,1,1),(23,22,7,1),(24,23,12,1),(25,24,7,1),(26,25,4,1),(27,26,1,1),(28,27,2,1),(29,28,4,1),(30,28,6,1),(31,29,7,1),(32,30,1,1),(33,31,9,1),(34,32,4,1),(35,33,4,1),(36,34,5,1),(37,35,2,1),(38,36,4,1),(39,37,7,1),(40,38,6,1),(41,38,7,1),(42,39,5,1),(43,40,9,1),(44,41,10,1),(45,42,11,1),(46,43,5,1),(47,44,9,1),(48,45,9,1),(49,46,2,1),(50,47,7,1),(51,48,2,1),(52,49,5,1),(53,50,10,1),(54,51,12,1),(55,52,12,1),(56,53,12,1),(57,54,4,1),(58,55,10,1),(59,56,1,1),(60,57,6,1),(61,58,7,1),(62,59,9,1),(63,60,9,1),(64,61,3,1),(65,62,7,1),(66,63,5,1),(67,64,2,1),(68,65,4,1),(69,66,7,1),(70,67,4,1),(71,68,7,1),(72,69,11,1),(73,70,12,1),(74,71,1,1),(75,72,3,1),(76,73,3,1),(77,74,2,1),(78,75,5,1),(79,76,5,1),(80,77,7,1),(81,78,7,1),(82,79,7,1),(83,80,6,1),(84,81,7,1),(85,82,1,1),(86,83,2,1),(87,84,5,1),(88,85,1,1),(89,86,5,1),(90,87,1,1),(91,88,3,1),(92,89,3,1),(93,90,3,1),(94,91,4,1),(95,92,4,1),(96,93,6,1),(97,94,6,1),(98,95,7,1),(99,96,7,1),(100,97,9,1),(101,98,10,1),(102,99,12,1),(103,100,2,1),(104,101,5,1),(105,102,11,1),(106,103,12,1),(107,104,12,1),(108,105,11,1),(109,106,1,1),(110,107,7,1),(111,108,6,1),(112,109,1,1),(113,110,12,1),(114,111,7,1),(115,112,9,1),(116,113,5,1),(117,114,1,1),(118,115,9,1),(119,115,11,1),(120,116,4,1),(121,117,2,1),(122,118,2,1),(123,119,2,1),(124,120,3,1),(125,121,2,1),(126,122,5,1),(127,123,6,1),(128,124,5,1),(129,125,5,1),(130,126,9,1),(131,127,2,1),(132,128,7,1),(133,129,11,1),(134,130,11,1),(135,131,5,1),(136,132,7,1),(137,133,9,1),(138,134,11,1),(139,135,12,1),(140,136,3,1),(141,137,7,1),(142,138,2,1),(143,139,2,1),(144,140,4,1),(145,141,4,1),(146,142,4,1),(147,143,5,1),(148,144,6,1),(149,145,7,1),(150,146,7,1),(151,147,7,1),(152,148,7,1),(153,149,7,1),(154,150,12,1),(155,151,1,1),(156,152,3,1),(157,153,10,1),(158,153,12,1),(159,154,12,1),(160,155,7,1),(161,156,9,1),(162,157,4,1),(163,158,4,1),(164,159,4,1),(165,160,5,1),(166,161,5,1),(167,162,9,1),(168,163,6,1),(169,164,11,1),(170,165,2,1),(171,166,5,1),(172,167,7,1),(173,168,7,1),(174,169,7,1),(175,170,10,1),(176,171,1,1),(177,172,7,1),(178,173,1,1),(179,174,5,1),(180,175,11,1),(181,176,5,1),(182,177,6,1),(183,178,9,1),(184,179,9,1),(185,180,9,1),(186,181,10,1),(187,182,10,1),(188,183,10,1),(189,184,10,1),(190,180,11,1),(191,185,12,1),(192,178,12,1),(193,186,12,1),(194,187,6,1),(195,188,6,1),(196,189,7,1),(197,190,7,1),(198,191,7,1),(199,192,10,1),(200,193,4,1),(201,194,1,1),(202,195,2,1),(203,196,9,1),(204,197,6,1),(205,198,10,1),(206,199,9,1),(207,1,25,1),(208,4,25,1),(209,15,25,1),(210,16,25,1),(211,23,25,1),(212,51,25,1),(213,52,25,1),(214,53,25,1),(215,70,25,1),(216,99,25,1),(217,103,25,1),(218,104,25,1),(219,110,25,1),(220,135,25,1),(221,150,25,1),(222,153,25,1),(223,154,25,1),(224,185,25,1),(225,178,25,1),(226,186,25,1),(227,14,24,1),(228,18,24,1),(229,42,24,1),(230,69,24,1),(231,102,24,1),(232,105,24,1),(233,115,24,1),(234,129,24,1),(235,130,24,1),(236,134,24,1),(237,164,24,1),(238,175,24,1),(239,180,24,1),(240,135,26,1);
/*!40000 ALTER TABLE `msd_student_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_student_competition`
--

DROP TABLE IF EXISTS `msd_student_competition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_student_competition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msd_student_id` int(11) NOT NULL,
  `msd_competition_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_student_student_competition_idx` (`msd_student_id`),
  KEY `fk_competition_student_competition_idx` (`msd_competition_id`),
  CONSTRAINT `fk_competition_student_competition` FOREIGN KEY (`msd_competition_id`) REFERENCES `msd_competition` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_student_competition` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_student_competition`
--

LOCK TABLES `msd_student_competition` WRITE;
/*!40000 ALTER TABLE `msd_student_competition` DISABLE KEYS */;
/*!40000 ALTER TABLE `msd_student_competition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_student_credit`
--

DROP TABLE IF EXISTS `msd_student_credit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_student_credit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msd_student_id` int(11) NOT NULL,
  `credit` decimal(5,2) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `credit_note` varchar(256) DEFAULT NULL,
  `is_consumed` tinyint(4) DEFAULT NULL,
  `consume_note` varchar(45) DEFAULT NULL,
  `consumed_date` datetime DEFAULT NULL,
  `credit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_student_credit_student_idx` (`msd_student_id`),
  CONSTRAINT `fk_student_credit_student` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_student_credit`
--

LOCK TABLES `msd_student_credit` WRITE;
/*!40000 ALTER TABLE `msd_student_credit` DISABLE KEYS */;
INSERT INTO `msd_student_credit` VALUES (1,14,100.00,1,'early pay',1,'adfadf','2015-01-05 00:00:00','2015-01-05 14:35:18'),(2,14,200.00,1,'From last semester',0,NULL,NULL,'2015-01-05 14:41:17');
/*!40000 ALTER TABLE `msd_student_credit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_student_fee`
--

DROP TABLE IF EXISTS `msd_student_fee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_student_fee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msd_student_fee_object_name` varchar(45) NOT NULL,
  `msd_student_fee_object_id` int(11) NOT NULL,
  `is_waiver` tinyint(4) NOT NULL,
  `is_paid` tinyint(4) NOT NULL,
  `pay_time` datetime DEFAULT NULL,
  `pay_type` varchar(45) DEFAULT NULL,
  `pay_note` varchar(256) DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL,
  `msd_student_id` int(11) NOT NULL,
  `fee_note` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_student_fee_student_idx` (`msd_student_id`),
  CONSTRAINT `fk_student_fee_student` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_student_fee`
--

LOCK TABLES `msd_student_fee` WRITE;
/*!40000 ALTER TABLE `msd_student_fee` DISABLE KEYS */;
INSERT INTO `msd_student_fee` VALUES (1,'MSDGeneralFee',1,0,1,'2015-01-05 14:16:00','Check','#123',1,14,'Jasmine Chen L5 one hour class fee'),(2,'MSDGeneralFee',2,0,0,NULL,NULL,NULL,1,14,'L4'),(3,'MSDClassFee',1,0,0,NULL,NULL,NULL,0,135,NULL),(4,'MSDClassFee',2,0,0,NULL,NULL,NULL,1,135,NULL),(5,'MSDGeneralFee',3,0,0,NULL,NULL,NULL,1,135,'2015/01 for hannah private class');
/*!40000 ALTER TABLE `msd_student_fee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_student_medical_info`
--

DROP TABLE IF EXISTS `msd_student_medical_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_student_medical_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msd_student_id` int(11) DEFAULT NULL,
  `insurance_company` varchar(45) DEFAULT NULL,
  `policy_number` varchar(45) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `pediatrician_name` varchar(45) DEFAULT NULL,
  `emergency_name` varchar(45) DEFAULT NULL,
  `emergency_phone` varchar(15) DEFAULT NULL,
  `emergency_phone_alt` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_msd_student_medical_info_msd_student1_idx` (`msd_student_id`),
  CONSTRAINT `fk_msd_student_medical_info_msd_student1` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_student_medical_info`
--

LOCK TABLES `msd_student_medical_info` WRITE;
/*!40000 ALTER TABLE `msd_student_medical_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `msd_student_medical_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_student_parent`
--

DROP TABLE IF EXISTS `msd_student_parent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_student_parent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email_address` varchar(256) DEFAULT NULL,
  `cell_phone` varchar(15) DEFAULT NULL,
  `work_phone` varchar(15) DEFAULT NULL,
  `relationship` varchar(10) DEFAULT NULL,
  `msd_student_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `msd_student_id_idx` (`msd_student_id`),
  CONSTRAINT `fk_msd_student_parent_msd_student1` FOREIGN KEY (`msd_student_id`) REFERENCES `msd_student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=269 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_student_parent`
--

LOCK TABLES `msd_student_parent` WRITE;
/*!40000 ALTER TABLE `msd_student_parent` DISABLE KEYS */;
INSERT INTO `msd_student_parent` VALUES (1,NULL,NULL,NULL,'6786432203',NULL,NULL,1),(2,'Jim','Cai',NULL,NULL,'4045094978','FATHER',3),(3,NULL,NULL,'tianhuifu@yahoo.com','7703101721',NULL,NULL,4),(4,'Yutao','Chen',NULL,NULL,'6784468668','FATHER',5),(5,NULL,NULL,NULL,'4045102565',NULL,NULL,10),(6,NULL,NULL,'chenlu05@gmail.com',NULL,NULL,NULL,11),(7,NULL,NULL,NULL,'4042819226',NULL,NULL,13),(8,NULL,NULL,NULL,'4043883243',NULL,NULL,14),(9,NULL,NULL,NULL,'4043883243',NULL,NULL,14),(10,NULL,NULL,NULL,'6785239939',NULL,NULL,15),(11,NULL,NULL,'hechen96@gmail.com',NULL,NULL,NULL,16),(12,NULL,NULL,NULL,NULL,'6786870726',NULL,19),(13,NULL,NULL,NULL,NULL,'6786870726',NULL,19),(14,'Angel','Chia',NULL,NULL,NULL,'MOTHER',20),(15,'Angel','Chia',NULL,NULL,NULL,'MOTHER',20),(16,'Montessori','Academy',NULL,NULL,NULL,'MOTHER',21),(17,NULL,NULL,'christine@waterbabiesbikini.com/michaelchu@bellsouth.net',NULL,NULL,NULL,22),(18,NULL,NULL,'LiJing.Ying@siemens.com','4045105311',NULL,NULL,23),(19,NULL,NULL,NULL,'6785220076',NULL,NULL,24),(20,NULL,NULL,NULL,'4042290467',NULL,NULL,26),(21,NULL,NULL,NULL,'6782306978',NULL,NULL,27),(22,NULL,NULL,NULL,NULL,'6786206735',NULL,33),(23,NULL,NULL,NULL,'6128027559',NULL,NULL,34),(24,' Bian','Fang',NULL,NULL,NULL,'MOTHER',35),(25,'Weimin','Feng','ruth.lu@gmail.com',NULL,'6782301666','FATHER',36),(26,'Weimin','Feng',NULL,NULL,'4042759245','FATHER',36),(27,' Duan','Shu','fengsbr@hotmail.com/susanduan@cellairis.com',NULL,NULL,'MOTHER',37),(28,' Feng','Shi',NULL,NULL,NULL,'MOTHER',37),(29,' YanQing','Lu',NULL,'4044465689',NULL,'MOTHER',38),(30,' YanQing','Lu',NULL,'4044465689',NULL,'MOTHER',38),(31,NULL,NULL,NULL,'4045475441',NULL,NULL,39),(32,NULL,NULL,NULL,NULL,'4047295272',NULL,41),(33,NULL,NULL,'gatechgu@gmail.com','4044327809',NULL,NULL,43),(34,' Nicole','Kee',NULL,NULL,NULL,'MOTHER',44),(35,NULL,NULL,NULL,NULL,NULL,NULL,45),(36,NULL,NULL,'yongpeng02@yahoo.com','7703788573',NULL,NULL,47),(37,NULL,NULL,NULL,'7703801873',NULL,NULL,47),(38,NULL,NULL,NULL,'7708130063',NULL,NULL,49),(39,NULL,NULL,NULL,'6785592928',NULL,NULL,50),(40,NULL,NULL,NULL,'6784477687',NULL,NULL,50),(41,NULL,NULL,NULL,'6784471977',NULL,NULL,52),(42,NULL,NULL,'pedro_iau@hotmail.com','6785499970',NULL,NULL,55),(43,NULL,NULL,NULL,'6784636967',NULL,NULL,56),(44,'Liya','Zhang',NULL,'4046630805',NULL,'MOTHER',57),(45,NULL,NULL,'akjiang@gmail.com',NULL,NULL,NULL,58),(46,NULL,NULL,'jiangchengliang@yahoo.com','6784715213',NULL,NULL,59),(47,NULL,NULL,'xxjiang@gmail.com','6788527284',NULL,NULL,60),(48,'Young','Oh',NULL,'3343921587',NULL,'MOTHER',63),(49,NULL,NULL,NULL,'6787720334',NULL,NULL,64),(50,NULL,NULL,NULL,'7709100629',NULL,NULL,66),(51,' Hua ','Yang',NULL,NULL,NULL,'MOTHER',69),(52,NULL,NULL,NULL,'9726969358',NULL,NULL,71),(53,'Xueping','Meng',NULL,NULL,'3306223420','MOTHER',72),(54,NULL,NULL,'lpzhu09@gmail.com',NULL,'4047298074',NULL,74),(55,'Lei','Li','llloversjesus99@gmail.com',NULL,NULL,'FATHER',76),(56,NULL,NULL,NULL,'5736392068',NULL,NULL,77),(57,NULL,NULL,'hongchaoli@gmail.com','7064249756',NULL,NULL,78),(58,NULL,NULL,NULL,'4047020653',NULL,NULL,81),(59,NULL,NULL,NULL,NULL,'6262025227',NULL,82),(60,NULL,NULL,'steve999_ca@yahoo.com',NULL,NULL,NULL,83),(61,NULL,NULL,'wlin@jiahost.com','7707408930',NULL,NULL,84),(62,NULL,NULL,'songpingping@yahoo.com',NULL,'6787776912',NULL,85),(63,NULL,NULL,'leng.ling@gcsu.edu',NULL,NULL,NULL,86),(64,'Pingling','Qiao',NULL,'6784713501',NULL,'MOTHER',87),(65,' Dongxu','Lu',NULL,NULL,'7035098088','MOTHER',88),(66,'Jia','Xu',NULL,NULL,'7138182630','MOTHER',92),(67,NULL,NULL,NULL,'6787630940',NULL,NULL,95),(68,NULL,NULL,'lynntan88@hotmail.com',NULL,NULL,NULL,96),(69,NULL,NULL,NULL,'4044060027',NULL,NULL,98),(70,'Xiuyan','Wu',NULL,NULL,NULL,'MOTHER',101),(71,NULL,NULL,'shengkai.lu@att.com',NULL,NULL,NULL,102),(72,NULL,NULL,NULL,'6784175238',NULL,NULL,103),(73,'Ching','Ling',NULL,NULL,NULL,'MOTHER',106),(74,NULL,NULL,'trangdam@yahoo.com','4044091012',NULL,NULL,107),(75,'Ying','Ni',NULL,NULL,NULL,'MOTHER',108),(76,NULL,NULL,NULL,'7703642535',NULL,NULL,112),(77,'Grace','Chen',NULL,NULL,NULL,'MOTHER',116),(78,NULL,NULL,'wangsuya@yahoo.com',NULL,'4046066272',NULL,117),(79,NULL,NULL,NULL,NULL,'6782004034',NULL,118),(80,NULL,NULL,NULL,NULL,NULL,NULL,118),(81,'Xiaoqing','Chen',NULL,'7705036987',NULL,'MOTHER',118),(82,'Eric','Amiee',NULL,'6784738554',NULL,'MOTHER',118),(83,' Ting','Shen',NULL,NULL,NULL,'MOTHER',119),(84,'imberly','Hsu','bee.shen@gmail.com',NULL,'7704016437','MOTHER',121),(85,'Lydia','Li',NULL,NULL,NULL,'MOTHER',123),(86,NULL,NULL,'msi@ofsoptics.com','6789886206',NULL,NULL,126),(87,NULL,NULL,NULL,'7703105094',NULL,NULL,129),(88,NULL,NULL,'jyang1688@yahoo.com',NULL,NULL,NULL,130),(89,'Angie','Hu',NULL,NULL,NULL,'MOTHER',131),(90,NULL,NULL,NULL,'7703350648',NULL,NULL,133),(91,NULL,NULL,NULL,'4048198866',NULL,NULL,136),(92,NULL,NULL,NULL,'7708138778',NULL,NULL,137),(93,'Guoshen','Wang','wenli_wang2000@yahoo.com',NULL,'4239466710','FATHER',138),(94,'Fung','lau',NULL,NULL,NULL,'MOTHER',142),(95,NULL,NULL,NULL,'4045586113',NULL,NULL,143),(96,'Phoebe','Mao',NULL,NULL,'4044834348','MOTHER',144),(97,NULL,NULL,'hchding@gmail.com','6784284575',NULL,NULL,145),(98,NULL,NULL,'wangtonya@gmail.com',NULL,NULL,NULL,146),(99,NULL,NULL,'Bianemily@yahoo.com/allenwang@yahoo.com','4125850085',NULL,NULL,149),(100,NULL,NULL,NULL,NULL,'7706859683',NULL,151),(101,'Fung FU',' Ling',NULL,NULL,NULL,'MOTHER',152),(102,NULL,NULL,'liweiga@yahoo.com','6786428694',NULL,NULL,153),(103,NULL,NULL,'liweiga@yahoo.com','6786428694',NULL,NULL,153),(104,NULL,NULL,NULL,'4049667417',NULL,NULL,154),(105,'Lina','Jing','lina.jing@suntrust.com','9723650220',NULL,'MOTHER',155),(106,' Jianqing','Zheng',NULL,'6787079669',NULL,'MOTHER',156),(107,'Serah','Lu',NULL,NULL,'6784275350','MOTHER',159),(108,' yuxia','zhang',NULL,'9197201315',NULL,'MOTHER',160),(109,' Hong','Shao',NULL,'7702892232',NULL,'MOTHER',162),(110,NULL,NULL,'hongweiyan88@gmail.com','6785255536',NULL,NULL,164),(111,' Wan','Lu',NULL,NULL,'4048619849','MOTHER',165),(112,' Juan','Guo',NULL,NULL,'8595592912','MOTHER',166),(113,NULL,NULL,NULL,'4043959214',NULL,NULL,167),(114,NULL,NULL,NULL,'7707336108',NULL,NULL,170),(115,'Jing','Chen',NULL,NULL,NULL,'MOTHER',171),(116,' Arping','Yu','mintian2006@hotmail.com','7278041785',NULL,'FATHER',172),(117,'Min','Tian',NULL,'7278044545',NULL,'MOTHER',172),(118,'Qiang','Zeng','zeng_mail@yahoo.com',NULL,'4044340342','FATHER',174),(119,'Nannan','Ding',NULL,NULL,NULL,'MOTHER',174),(120,'Qingxiu','Zhang',NULL,NULL,'6789184286','FATHER',177),(121,NULL,NULL,NULL,'6782307725',NULL,NULL,178),(122,'Yan','Zeng',NULL,NULL,NULL,'MOTHER',181),(123,NULL,NULL,NULL,'6785706596',NULL,NULL,183),(124,'Siming','Zhang',NULL,NULL,NULL,'FATHER',184),(125,NULL,NULL,'Lei_fang_0226@yahoo.com',NULL,NULL,NULL,185),(126,NULL,NULL,NULL,'6782307725',NULL,NULL,178),(127,'Yu','Kang',NULL,'4044094603',NULL,'MOTHER',187),(128,NULL,NULL,'hongzhang28@gmail.com',NULL,NULL,NULL,188),(129,NULL,NULL,NULL,'4047710231',NULL,NULL,190),(130,NULL,NULL,NULL,NULL,'4043339909',NULL,193),(131,'Rosie','Li','ril6@cdc.gov/ zhouw2006@gmail.com','4043548361',NULL,'MOTHER',196),(132,'Guohua','Zhu',NULL,NULL,NULL,'FATHER',197),(133,NULL,NULL,'mimizheng@hotmail.com',NULL,NULL,NULL,198),(134,NULL,NULL,NULL,'4042348413',NULL,NULL,199),(135,NULL,NULL,NULL,'6786432203',NULL,NULL,1),(136,'Jim','Cai',NULL,NULL,'4045094978','FATHER',3),(137,NULL,NULL,'tianhuifu@yahoo.com','7703101721',NULL,NULL,4),(138,'Yutao','Chen',NULL,NULL,'6784468668','FATHER',5),(139,NULL,NULL,NULL,'4045102565',NULL,NULL,10),(140,NULL,NULL,'chenlu05@gmail.com',NULL,NULL,NULL,11),(141,NULL,NULL,NULL,'4042819226',NULL,NULL,13),(142,NULL,NULL,NULL,'4043883243',NULL,NULL,14),(143,NULL,NULL,NULL,'4043883243',NULL,NULL,14),(144,NULL,NULL,NULL,'6785239939',NULL,NULL,15),(145,NULL,NULL,'hechen96@gmail.com',NULL,NULL,NULL,16),(146,NULL,NULL,NULL,NULL,'6786870726',NULL,19),(147,NULL,NULL,NULL,NULL,'6786870726',NULL,19),(148,'Angel','Chia',NULL,NULL,NULL,'MOTHER',20),(149,'Angel','Chia',NULL,NULL,NULL,'MOTHER',20),(150,'Montessori','Academy',NULL,NULL,NULL,'MOTHER',21),(151,NULL,NULL,'christine@waterbabiesbikini.com/michaelchu@bellsouth.net',NULL,NULL,NULL,22),(152,NULL,NULL,'LiJing.Ying@siemens.com','4045105311',NULL,NULL,23),(153,NULL,NULL,NULL,'6785220076',NULL,NULL,24),(154,NULL,NULL,NULL,'4042290467',NULL,NULL,26),(155,NULL,NULL,NULL,'6782306978',NULL,NULL,27),(156,NULL,NULL,NULL,NULL,'6786206735',NULL,33),(157,NULL,NULL,NULL,'6128027559',NULL,NULL,34),(158,' Bian','Fang',NULL,NULL,NULL,'MOTHER',35),(159,'Weimin','Feng','ruth.lu@gmail.com',NULL,'6782301666','FATHER',36),(160,'Weimin','Feng',NULL,NULL,'4042759245','FATHER',36),(161,' Duan','Shu','fengsbr@hotmail.com/susanduan@cellairis.com',NULL,NULL,'MOTHER',37),(162,' Feng','Shi',NULL,NULL,NULL,'MOTHER',37),(163,' YanQing','Lu',NULL,'4044465689',NULL,'MOTHER',38),(164,' YanQing','Lu',NULL,'4044465689',NULL,'MOTHER',38),(165,NULL,NULL,NULL,'4045475441',NULL,NULL,39),(166,NULL,NULL,NULL,NULL,'4047295272',NULL,41),(167,NULL,NULL,'gatechgu@gmail.com','4044327809',NULL,NULL,43),(168,' Nicole','Kee',NULL,NULL,NULL,'MOTHER',44),(169,NULL,NULL,NULL,NULL,NULL,NULL,45),(170,NULL,NULL,'yongpeng02@yahoo.com','7703788573',NULL,NULL,47),(171,NULL,NULL,NULL,'7703801873',NULL,NULL,47),(172,NULL,NULL,NULL,'7708130063',NULL,NULL,49),(173,NULL,NULL,NULL,'6785592928',NULL,NULL,50),(174,NULL,NULL,NULL,'6784477687',NULL,NULL,50),(175,NULL,NULL,NULL,'6784471977',NULL,NULL,52),(176,NULL,NULL,'pedro_iau@hotmail.com','6785499970',NULL,NULL,55),(177,NULL,NULL,NULL,'6784636967',NULL,NULL,56),(178,'Liya','Zhang',NULL,'4046630805',NULL,'MOTHER',57),(179,NULL,NULL,'akjiang@gmail.com',NULL,NULL,NULL,58),(180,NULL,NULL,'jiangchengliang@yahoo.com','6784715213',NULL,NULL,59),(181,NULL,NULL,'xxjiang@gmail.com','6788527284',NULL,NULL,60),(182,'Young','Oh',NULL,'3343921587',NULL,'MOTHER',63),(183,NULL,NULL,NULL,'6787720334',NULL,NULL,64),(184,NULL,NULL,NULL,'7709100629',NULL,NULL,66),(185,' Hua ','Yang',NULL,NULL,NULL,'MOTHER',69),(186,NULL,NULL,NULL,'9726969358',NULL,NULL,71),(187,'Xueping','Meng',NULL,NULL,'3306223420','MOTHER',72),(188,NULL,NULL,'lpzhu09@gmail.com',NULL,'4047298074',NULL,74),(189,'Lei','Li','llloversjesus99@gmail.com',NULL,NULL,'FATHER',76),(190,NULL,NULL,NULL,'5736392068',NULL,NULL,77),(191,NULL,NULL,'hongchaoli@gmail.com','7064249756',NULL,NULL,78),(192,NULL,NULL,NULL,'4047020653',NULL,NULL,81),(193,NULL,NULL,NULL,NULL,'6262025227',NULL,82),(194,NULL,NULL,'steve999_ca@yahoo.com',NULL,NULL,NULL,83),(195,NULL,NULL,'wlin@jiahost.com','7707408930',NULL,NULL,84),(196,NULL,NULL,'songpingping@yahoo.com',NULL,'6787776912',NULL,85),(197,NULL,NULL,'leng.ling@gcsu.edu',NULL,NULL,NULL,86),(198,'Pingling','Qiao',NULL,'6784713501',NULL,'MOTHER',87),(199,' Dongxu','Lu',NULL,NULL,'7035098088','MOTHER',88),(200,'Jia','Xu',NULL,NULL,'7138182630','MOTHER',92),(201,NULL,NULL,NULL,'6787630940',NULL,NULL,95),(202,NULL,NULL,'lynntan88@hotmail.com',NULL,NULL,NULL,96),(203,NULL,NULL,NULL,'4044060027',NULL,NULL,98),(204,'Xiuyan','Wu',NULL,NULL,NULL,'MOTHER',101),(205,NULL,NULL,'shengkai.lu@att.com',NULL,NULL,NULL,102),(206,NULL,NULL,NULL,'6784175238',NULL,NULL,103),(207,'Ching','Ling',NULL,NULL,NULL,'MOTHER',106),(208,NULL,NULL,'trangdam@yahoo.com','4044091012',NULL,NULL,107),(209,'Ying','Ni',NULL,NULL,NULL,'MOTHER',108),(210,NULL,NULL,NULL,'7703642535',NULL,NULL,112),(211,'Grace','Chen',NULL,NULL,NULL,'MOTHER',116),(212,NULL,NULL,'wangsuya@yahoo.com',NULL,'4046066272',NULL,117),(213,NULL,NULL,NULL,NULL,'6782004034',NULL,118),(214,NULL,NULL,NULL,NULL,NULL,NULL,118),(215,'Xiaoqing','Chen',NULL,'7705036987',NULL,'MOTHER',118),(216,'Eric','Amiee',NULL,'6784738554',NULL,'MOTHER',118),(217,' Ting','Shen',NULL,NULL,NULL,'MOTHER',119),(218,'imberly','Hsu','bee.shen@gmail.com',NULL,'7704016437','MOTHER',121),(219,'Lydia','Li',NULL,NULL,NULL,'MOTHER',123),(220,NULL,NULL,'msi@ofsoptics.com','6789886206',NULL,NULL,126),(221,NULL,NULL,NULL,'7703105094',NULL,NULL,129),(222,NULL,NULL,'jyang1688@yahoo.com',NULL,NULL,NULL,130),(223,'Angie','Hu',NULL,NULL,NULL,'MOTHER',131),(224,NULL,NULL,NULL,'7703350648',NULL,NULL,133),(225,NULL,NULL,NULL,'4048198866',NULL,NULL,136),(226,NULL,NULL,NULL,'7708138778',NULL,NULL,137),(227,'Guoshen','Wang','wenli_wang2000@yahoo.com',NULL,'4239466710','FATHER',138),(228,'Fung','lau',NULL,NULL,NULL,'MOTHER',142),(229,NULL,NULL,NULL,'4045586113',NULL,NULL,143),(230,'Phoebe','Mao',NULL,NULL,'4044834348','MOTHER',144),(231,NULL,NULL,'hchding@gmail.com','6784284575',NULL,NULL,145),(232,NULL,NULL,'wangtonya@gmail.com',NULL,NULL,NULL,146),(233,NULL,NULL,'Bianemily@yahoo.com/allenwang@yahoo.com','4125850085',NULL,NULL,149),(234,NULL,NULL,NULL,NULL,'7706859683',NULL,151),(235,'Fung FU',' Ling',NULL,NULL,NULL,'MOTHER',152),(236,NULL,NULL,'liweiga@yahoo.com','6786428694',NULL,NULL,153),(237,NULL,NULL,'liweiga@yahoo.com','6786428694',NULL,NULL,153),(238,NULL,NULL,NULL,'4049667417',NULL,NULL,154),(239,'Lina','Jing','lina.jing@suntrust.com','9723650220',NULL,'MOTHER',155),(240,' Jianqing','Zheng',NULL,'6787079669',NULL,'MOTHER',156),(241,'Serah','Lu',NULL,NULL,'6784275350','MOTHER',159),(242,' yuxia','zhang',NULL,'9197201315',NULL,'MOTHER',160),(243,' Hong','Shao',NULL,'7702892232',NULL,'MOTHER',162),(244,NULL,NULL,'hongweiyan88@gmail.com','6785255536',NULL,NULL,164),(245,' Wan','Lu',NULL,NULL,'4048619849','MOTHER',165),(246,' Juan','Guo',NULL,NULL,'8595592912','MOTHER',166),(247,NULL,NULL,NULL,'4043959214',NULL,NULL,167),(248,NULL,NULL,NULL,'7707336108',NULL,NULL,170),(249,'Jing','Chen',NULL,NULL,NULL,'MOTHER',171),(250,' Arping','Yu','mintian2006@hotmail.com','7278041785',NULL,'FATHER',172),(251,'Min','Tian',NULL,'7278044545',NULL,'MOTHER',172),(252,'Qiang','Zeng','zeng_mail@yahoo.com',NULL,'4044340342','FATHER',174),(253,'Nannan','Ding',NULL,NULL,NULL,'MOTHER',174),(254,'Qingxiu','Zhang',NULL,NULL,'6789184286','FATHER',177),(255,NULL,NULL,NULL,'6782307725',NULL,NULL,178),(256,'Yan','Zeng',NULL,NULL,NULL,'MOTHER',181),(257,NULL,NULL,NULL,'6785706596',NULL,NULL,183),(258,'Siming','Zhang',NULL,NULL,NULL,'FATHER',184),(259,NULL,NULL,'Lei_fang_0226@yahoo.com',NULL,NULL,NULL,185),(260,NULL,NULL,NULL,'6782307725',NULL,NULL,178),(261,'Yu','Kang',NULL,'4044094603',NULL,'MOTHER',187),(262,NULL,NULL,'hongzhang28@gmail.com',NULL,NULL,NULL,188),(263,NULL,NULL,NULL,'4047710231',NULL,NULL,190),(264,NULL,NULL,NULL,NULL,'4043339909',NULL,193),(265,'Rosie','Li','ril6@cdc.gov/ zhouw2006@gmail.com','4043548361',NULL,'MOTHER',196),(266,'Guohua','Zhu',NULL,NULL,NULL,'FATHER',197),(267,NULL,NULL,'mimizheng@hotmail.com',NULL,NULL,NULL,198),(268,NULL,NULL,NULL,'4042348413',NULL,NULL,199);
/*!40000 ALTER TABLE `msd_student_parent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_type`
--

DROP TABLE IF EXISTS `msd_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_type`
--

LOCK TABLES `msd_type` WRITE;
/*!40000 ALTER TABLE `msd_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `msd_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_user`
--

DROP TABLE IF EXISTS `msd_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `status` int(11) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_user`
--

LOCK TABLES `msd_user` WRITE;
/*!40000 ALTER TABLE `msd_user` DISABLE KEYS */;
INSERT INTO `msd_user` VALUES (1,'usera',1,'y+DNaMvKOGglDAulRcSAMvQ+sOil5rq2A9EJJRSG93qR5GoxRtiH43QWxr22y+cBvVFN53hXPJsAaEg8HGJq7A=='),(2,'userb',1,'y+DNaMvKOGglDAulRcSAMvQ+sOil5rq2A9EJJRSG93qR5GoxRtiH43QWxr22y+cBvVFN53hXPJsAaEg8HGJq7A=='),(3,'userc',1,'SgScZoypJ+YmKtMvfkAv93wPCT2JW1oqTKbUq0M767IVVxn9COZhEAMgx0hwv0Ihg7Lvx0sqxdsJEOVxr6atJw==');
/*!40000 ALTER TABLE `msd_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msd_user_role`
--

DROP TABLE IF EXISTS `msd_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msd_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKUSERUSERROLE_idx` (`user_id`),
  CONSTRAINT `FKUSERUSERROLE` FOREIGN KEY (`user_id`) REFERENCES `msd_user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msd_user_role`
--

LOCK TABLES `msd_user_role` WRITE;
/*!40000 ALTER TABLE `msd_user_role` DISABLE KEYS */;
INSERT INTO `msd_user_role` VALUES (1,1,1),(2,1,2),(4,2,1),(5,1,3),(6,2,3);
/*!40000 ALTER TABLE `msd_user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-01-06  7:31:18
