-- 创建数据库
CREATE DATABASE IF NOT EXISTS hire_data;

use hire_data;

/*
Navicat Premium Data Transfer

Source Server         : mysql
Source Server Type    : MySQL
Source Server Version : 80036 (8.0.36)
Source Host           : localhost:3306
Source Schema         : hire_data

Target Server Type    : MySQL
Target Server Version : 80036 (8.0.36)
File Encoding         : 65001

Date: 24/05/2025 21:39:33
*/

SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for info
-- ----------------------------
DROP TABLE IF EXISTS `info`;

CREATE TABLE `info` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `email` char(255) NOT NULL,
    `github_id` char(255) NOT NULL,
    `github_pj_add` char(255) DEFAULT NULL,
    `project_online_add` char(255) DEFAULT NULL,
    `create_time` date DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;