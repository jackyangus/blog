---
title: oracle management
tags:
  - oracle
toc: true
abbrlink: 23656
date: 2017-03-23 16:51:24
---

# oracle 常用管理命令

## 环境变量
~~~~~~~~~~~~~~~~~~~~~~~~~~
export ORACLE_HOME=/opt/oracle/product/11.2.0/dbhome_1
export ORACLE_SID=orcl
#export NLS_LANG=AMERICAN_AMERICA.AL32UTF8
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/usr/lib:/usr/local/lib
export PATH=$PATH:$ORACLE_HOME/bin:$ORACLE_HOME/lib
~~~~~~~~~~~~~~~~~~~~~~~~~~

## 进入管理员
`su oracle `
`sqlplus / as sysdba`

## 密码有效期
### 查看指定概要文件（如default）的密码有效期设置：
sql> `SELECT * FROM dba_profiles s WHERE s.profile='DEFAULT' AND resource_name='PASSWORD_LIFE_TIME';`

### 将密码有效期由默认的180天修改成“无限制”：
sql> `ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;`

## 用户管理

### 创建用户
#### 简单创建用户
sql> `create user 用户名大写 identified by 密码;`

#### 创建用户指定表空间和临时空间
请结合 创建表空间 看
create user 用户名大写 identified by 密码 
default tablespace 空间名称 
temporary tablespace 临时空间名称;

### 授权
sql> `grant connect, resource, dba to 用户名大写;`
sql> `grant create view to 用户名大写;`

### 删除数据文件
sql> `alter database datafile 'c:\database\oradata\orcl\cdbwklw.dbf' offline drop;`

### 删除用户
sql> `drop user 用户名 cascade`

### 删除表空间和数据文件
sql> `DROP TABLESPACE 表空间名称 INCLUDING CONTENTS AND DATAFILES;`

## 空间管理
oracle空间管理文档[https://docs.oracle.com/cd/B28359_01/server.111/b28310/tspaces.htm#i1010516](https://docs.oracle.com/cd/B28359_01/server.111/b28310/tspaces.htm#i1010516 "空间管理")

### 创建临时空间
~~~~~~~~~~~~~~~~~~~~~~~~~~~
create temporary tablespace TEMP_YCDBA
tempfile 'TEMP_YCDBA.dbf' size 5m autoextend on;
~~~~~~~~~~~~~~~~~~~~~~~~~~~

### 创建表空间
默认空间最大32G
超过需要使用BIGFILE
~~~~~~~~~~~~~~~~~~~~~~~~~~~
create BIGFILE tablespace 空间名称 
logging 
datafile '/home/oracle/yc/YCDBA' 
size 512m 
autoextend on 
next 512m maxsize unlimited
extent management local;

create temporary tablespace 临时空间名称
tempfile 'TEMP_YCDBA.dbf' size 5m autoextend on;

create user 用户名大写 identified by 密码 
default tablespace 空间名称 
temporary tablespace 临时空间名称;
~~~~~~~~~~~~~~~~~~~~~~~~~~~

## 导入导出
导出权限:EXP_FULL_DATABASE
导入权限:IMP_FULL_DATABASE

### 导出
将数据库zxcc完全导出，用户名user 密码passwd 导出到D:\zxcc.dmp中
#### 本机导出: 
`exp user/passwd@service_name file=d:\zxcc.dmp full=y`

#### 导出其它机器上的数据库:
`exp user/password@host:port/service_name file=d:\zxcc.dmp full=y`

full=y 表示全库导出。full总共有2个可选项yes(y)/no(n)，缺省情况下full=no，这时只会将该用户下的对象导出。

### 导入
`imp user/passwd@service_name file=... FULL=Y`
`imp user/password@host:port/service_name file=... FULL=Y`

导入更换用户空间, 需要DBA权限
`imp user/password@host:port/service_name file=... fromuser=%s touser=%s`

## 连接管理
查看会话
`SELECT * from v$SESSION`

## 归档
### 打开归档

### 归档日志查看
sql> `archive log list;`

### 关闭Oracle实例
sql> `shutdown immediate;`

### 将Oracle节点启动到 mount状态
sql> `startup nomount;`
ORACLE instance started.
Total System Global Area  281018368 bytes
Fixed Size                  1267044 bytes
Variable Size             113248924 bytes
Database Buffers          163577856 bytes
Redo Buffers                2924544 bytes
sql> `alter database mount;`
Database altered.
### 修改归档模式
sql> `alter database archivelog;`
Database altered.
### 并将数据库置于open状态
sql> `alter database open;`
Database altered.
### 指定归档目标
sql> `alter system set LOG_ARCHIVE_DEST_1=’LOCATION=/archive’;`
System altered.

### 归档日志定时删除
需要在数据库机器上运行
dellog.log
~~~~~~~~~~~~~~~~~~~~~~~
connect target 用户名/密码
run{
delete noprompt archivelog all completed before 'sysdate-7';
crosscheck archivelog all;
delete expired archivelog all;
}
~~~~~~~~~~~~~~~~~~~~~~~

#### windows 使用计划任务
dellog.bat
~~~~~~~~~~~~~~~~~~~~~~~~
rman cmdfile=E:\delete_archive_log\dellog.txt > log.log
~~~~~~~~~~~~~~~~~~~~~~~~

#### linux 使用crontab
dellog.sh
~~~~~~~~~~~~~~~~~~~~~~~~
rman cmdfile=/delete_archive_log/dellog.txt > log.log
~~~~~~~~~~~~~~~~~~~~~~~~


## 自动启动

vim /etc/oratab
orcl:/opt/oracle/product/11.2.0/dbhome_1:Y

vim /etc/init.d/dbora 添加以下内容
~~~~~~~~~~~~~~~~~~~~~~~
#!/bin/sh
# chkconfig: 345 99 10
# description: Oracle auto start-stop script.
#
# Set ORA_HOME to be equivalent to the $ORACLE_HOME
# from which you wish to execute dbstart and dbshut;
#
# Set ORA_OWNER to the user id of the owner of the 
# Oracle database in ORA_HOME.

ORA_HOME=/opt/oracle/product/11.2.0/dbhome_1
ORA_OWNER=oracle
export ORACLE_UNQNAME=orcl

if [ ! -f $ORA_HOME/bin/dbstart ]
then
    echo "Oracle startup: cannot start"
    exit
fi

case "$1" in
    'start')
        # Start the Oracle databases:
        # The following command assumes that the oracle login 
        # will not prompt the user for any values
        # Remove "&" if you don't want startup as a background process.
        su $ORA_OWNER -c "$ORA_HOME/bin/dbstart $ORA_HOME"
        sleep 5s
        su $ORA_OWNER -c "$ORA_HOME/bin/lsnrctl start"
        touch /var/lock/subsys/dbora
        echo "启动成功, 请检查"
        ;;
    'stop')
        # Stop the Oracle databases:
        # The following command assumes that the oracle login 
        # will not prompt the user for any values
        su $ORA_OWNER -c "$ORA_HOME/bin/dbshut $ORA_HOME"
        su $ORA_OWNER -c "$ORA_HOME/bin/lsnrctl stop"
        rm -f /var/lock/subsys/dbora
        ;;
esac
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
授权
`chmod 777 /etc/init.d/dbora`
配置启动
`chkconfig dbora on`
测试
`service dbora restart`
