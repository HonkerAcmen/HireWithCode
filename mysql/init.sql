-- 创建数据库
create database hire_data;

-- 创建用户数据表
use hire_data;

create table `users` (
    `id` BIGINT PRIMARY KEY auto_increment,
    `name` varchar(20) not null,
    `email` varchar(20) not null,
    `desc` char(255) not null
);

-- 插入默认数据
insert INTO
    `users`
VALUES (
        1,
        "小杨",
        "haker0x04@163.com",
        "一个普通的人"
    );