---
title: yuncai-dev-doc
tags:
  - oracle
abbrlink: 42176
date: 2017-02-15 14:49:25
---

oracle 创建大数据空间

```
create BIGFILE tablespace YCDBA 
logging 
datafile '/home/oracle/yc/YCDBA' 
size 512m 
autoextend on 
next 512m maxsize unlimited
extent management local;

create temporary tablespace TEMP_YCDBA
tempfile 'TEMP_YCDBA.dbf' size 5m autoextend on;


create BIGFILE tablespace YCDATA 
logging 
datafile '/home/oracle/yc/YCDATA' 
size 512m 
autoextend on 
next 512m maxsize unlimited
extent management local;

create temporary tablespace TEMP_YCDATA
tempfile 'TEMP_YCDATA.dbf' size 5m autoextend on;


create user YCDBA identified by YCDBA 
default tablespace YCDBA 
temporary tablespace TEMP_YCDBA;

create user YCDATA identified by password 
default tablespace YCDATA 
temporary tablespace TEMP_YCDATA;


```