-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: hospital_management_db
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `availability_from_time` varchar(255) NOT NULL,
  `availability_to_time` varchar(255) NOT NULL,
  `consulting_fees` bigint NOT NULL,
  `consulting_hrs` bigint NOT NULL,
  `designation` varchar(255) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `specialization` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `years_of_exp` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_jdtgexk368pq6d2yb3neec59d` (`email`),
  UNIQUE KEY `UK_25rbvlce70qpi6i47tm3nmx4r` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'14/42c-367 upstairs, Amarnath Colony, Nearby Sangeetha sabha, Mukkudal - 627601, Tirunelveli district','10:00','20:30',500,30,'Cardiologist','1999-12-06','ambiga@gmail.com','Ambiga','Female','$2a$10$RNGcMj54HWg2CB/xMdWGJuBPDSehhOJP01JygoPithwgG6lYM119y','9517532846','Cardio','Approved','3'),(2,'Mukkudal','10:00','17:00',400,30,'physiotherapy','1997-11-14','raji@gmail.com','Raji','Female','$2a$10$SGLdux.EyvhSuNV20QYW9.9My5Z8p0WiALLqP54OTZjPWUQ7Bxj9a','9845726310','physiotherapy','pending','3'),(3,'Nagercoil','11:00','18:00',400,30,'Neurologist','1992-08-07','priya@gmail.com','Priya K','Female','$2a$10$yhcJG8GTzi5pE5qPK9hSp.375R3Fs8PXXmTbNsgpgIG6hVfotur0e','9845726311','Neurologist','pending','5');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-25 21:58:58
