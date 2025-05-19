---
title: mysql management
tags:
  - mysql
toc: true
abbrlink: 37381
date: 2017-03-24 16:48:27
---


# mysql 管理
## linux
### 安装

`yum install mysql mysql-server mysql-devel mysql-libs`

### 配置文件
/etc/my.ini

### 启动
`service mysqld start|stop|restart`

### 自动启动
chkconfig mysqld on

### 管理
mysql

### 设置数据库引擎
[引擎差异](http://www.cnblogs.com/0201zcr/p/5296843.html 引擎差异)
默认为MYISAM, 某些情况下需要修改为InnoDB
mysql> `SET storage_engine=InnoDB;`

### 创建用户和授权
用户名: weibo
数据库: weibo
密码: 3c38f920d8bf11c96c09023fe49c8917
~~~~~~~~~~~~~~~~~~~~~~~~~~
create database if not exists weibo default character set utf8;
GRANT ALL PRIVILEGES ON `weibo`.* TO 'weibo'@'%' IDENTIFIED BY '3c38f920d8bf11c96c09023fe49c8917';
GRANT ALL PRIVILEGES ON `weibo`.* TO 'weibo'@'localhost' IDENTIFIED BY '3c38f920d8bf11c96c09023fe49c8917';
SET old_passwords = 0; 
UPDATE mysql.user SET Password = PASSWORD('3c38f920d8bf11c96c09023fe49c8917') WHERE User = 'weibo' limit 1;
SELECT LENGTH(Password) FROM mysql.user WHERE User = 'weibo';
 FLUSH PRIVILEGES;
~~~~~~~~~~~~~~~~~~~~~~~~~~

### 测试
`mysql -uweibo -p3c38f920d8bf11c96c09023fe49c8917`


## windows

```
mysqld --romve 删除mysql服务
mysqld --install 安装mysql服务
mysqld --initialize 一定要初始化
net start mysql 启动服务
```
my.ini
```
[mysql]
; 设置mysql客户端默认字符集
default-character-set=utf8
[mysqld]
;设置3306端口
port = 3306
; 设置mysql的安装目录

basedir=F:\mysql-5.7.18-winx64

; 设置mysql数据库的数据的存放目录

datadir=F:\mysql-5.7.18-winx64\data

; 允许最大连接数

max_connections=200

; 服务端使用的字符集默认为8比特编码的latin1字符集

character-set-server=utf8

; 创建新表时将使用的默认存储引擎

default-storage-engine=INNODB
```