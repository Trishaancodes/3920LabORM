-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: lab_example
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet` (
  `pet_id` int NOT NULL AUTO_INCREMENT,
  `web_user_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `pet_type_id` int NOT NULL,
  `image_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`pet_id`),
  KEY `pet_pet_type_id_idx` (`pet_type_id`),
  KEY `pet_web_user_id_idx` (`web_user_id`),
  CONSTRAINT `pet_pet_type_id` FOREIGN KEY (`pet_type_id`) REFERENCES `pet_type` (`pet_type_id`),
  CONSTRAINT `pet_web_user_id` FOREIGN KEY (`web_user_id`) REFERENCES `web_user` (`web_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
INSERT INTO `pet` VALUES (1,1,'Spark',1,'4fed88ad-b8d1-4b17-a9ea-c752deac4d6c'),(2,1,'Corndog',2,'7ba956ab-c772-49c3-8721-352c2634e517');
/*!40000 ALTER TABLE `pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet_type`
--

DROP TABLE IF EXISTS `pet_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet_type` (
  `pet_type_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`pet_type_id`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_type`
--

LOCK TABLES `pet_type` WRITE;
/*!40000 ALTER TABLE `pet_type` DISABLE KEYS */;
INSERT INTO `pet_type` VALUES (1,'cat'),(2,'dog'),(3,'fish');
/*!40000 ALTER TABLE `pet_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_user`
--

DROP TABLE IF EXISTS `web_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `web_user` (
  `web_user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password_hash` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`web_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_user`
--

LOCK TABLES `web_user` WRITE;
/*!40000 ALTER TABLE `web_user` DISABLE KEYS */;
INSERT INTO `web_user` VALUES (1,'Joe','Acreman','jam@gmail.com','$2a$12$Tr70rVINT3Skq2PCwsOUGegt9AbNo3UtJDBjT2lbnH/y6ADzkTcAO');
/*!40000 ALTER TABLE `web_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-12 17:33:01
