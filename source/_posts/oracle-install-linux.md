---
title: oracle-install-linux
tags:
  - oracle
abbrlink: 10524
date: 2017-02-15 15:59:14
---
## linux oracle数据库无图形界面安装
### 1 准备安装路径和用户
~~~~~~~~~~~~~~~~~~~~~~~~
/usr/sbin/groupadd oinstall
/usr/sbin/groupadd dba
/usr/sbin/useradd -g oinstall -G dba oracle

mkdir -p /opt/oracle
chown -R oracle:oinstall /opt/oracle
chmod -R 775 /opt/oracle
mkdir -p /opt/oraInventory
chown oracle:oinstall /opt/oraInventory
chmod -R 775 /opt/oraInventory
mkdir  /oradata
chown oracle:oinstall /oradata
chmod 775 /oradata
mkdir /recovery_area
chown oracle:oinstall /recovery_area
chmod 775 /recovery_area

~~~~~~~~~~~~~~~~~~~~~~~~

### 2 配置linux系统环境
#### root用户：修改 /etc/sysctl.conf 文件，加上如下参数
~~~~~~~~~~~~~~~~~~~~~~~~
fs.aio-max-nr = 1048576
fs.file-max = 6815744
kernel.shmall = 2097152
kernel.shmmax = 536870912
kernel.shmmni = 4096
kernel.sem = 250 32000 100 128
net.ipv4.ip_local_port_range = 9000 65500
net.core.rmem_default = 262144
net.core.rmem_max = 4194304
net.core.wmem_default = 262144
net.core.wmem_max = 1048586

为使上述配置生效而不重启系统，执行如下命令
/sbin/sysctl -p
~~~~~~~~~~~~~~~~~~~~~~~~

#### 修改用户限制root用户：修改 /etc/security/limits.conf 文件，加上下面的参数
~~~~~~~~~~~~~~~~~~~~~~~~
oracle           soft    nproc   2047
oracle           hard    nproc   16384
oracle           soft    nofile  1024
oracle           hard    nofile  65536
~~~~~~~~~~~~~~~~~~~~~~~~

#### 修改用户验证选项root用户下：修改/etc/pam.d/login文件加上如下参数
~~~~~~~~~~~~~~~~~~~~~~~~
session    required     pam_limits.so
~~~~~~~~~~~~~~~~~~~~~~~~
#### 修改用户配置文件root用户下：修改/etc/profile文件加入如下参数：
~~~~~~~~~~~~~~~~~~~~~~~~
if [ $USER = "oracle" ]; then
        if [ $SHELL = "/bin/ksh" ]; then
              ulimit -p 16384
              ulimit -n 65536
        else
              ulimit -u 16384 -n 65536
        fi
fi
~~~~~~~~~~~~~~~~~~~~~~~~

#### 安装依赖包
~~~~~~~~~~~~~~~~~~~~~~~~
yum -y install binutils compat-libcap1 compat-libstdc++ gcc gcc-c++ glibc glibc-devel ksh libgcc libstdc++ libstdc++-devel libaio sysstat libaio-devel elfutils-libelf-devel unixODBC unixODBC-devel, compat-libstdc++-33
~~~~~~~~~~~~~~~~~~~~~~~~

### 3 下载解压安装文件
oralce下载地址: http://10.35.252.214/oracle
~~~~~~~~~~~~~~~~~~~~~~~~
su - oracle
cd /opt/oracle
unzip linux.x64_11gR2_database_1of2.zip
unzip linux.x64_11gR2_database_2of2.zip
mv database/* ./
rm –rf database
~~~~~~~~~~~~~~~~~~~~~~~~

### 4 安装
~~~~~~~~~~~~~~~~~~~~~~~~
下载安装响应文件

修改db.rsp
oracle.install.db.config.starterdb.password.ALL=system      system密码
oracle.install.db.config.starterdb.characterSet=ZHS16GBK   中文字符集
oracle.install.db.config.starterdb.SID=ORCL			        ORACLE_SID

安装
./runInstaller -silent -responseFile /opt/database/db.rsp -ignorePrereq
~~~~~~~~~~~~~~~~~~~~~~~~


## oracle创建表空间

### 第1步：创建临时表空间
~~~~~~~~~~~~~~~~~~~~~~~
create temporary tablespace user_temp 
tempfile 'D:\oracle\oradata\Oracle9i\user_temp.dbf' 
size 50m 
autoextend on 
next 50m maxsize 20480m 
extent management local; 
~~~~~~~~~~~~~~~~~~~~~~~

### 第2步：创建数据表空间
~~~~~~~~~~~~~~~~~~~~~~~
create tablespace user_data 
logging 
datafile 'D:\oracle\oradata\Oracle9i\user_data.dbf' 
size 50m 
autoextend on 
next 50m maxsize 20480m 
extent management local; 
~~~~~~~~~~~~~~~~~~~~~~~

### 第3步：创建用户并指定表空间
~~~~~~~~~~~~~~~~~~~~~~~
create user username identified by password 
default tablespace user_data 
temporary tablespace user_temp; 
~~~~~~~~~~~~~~~~~~~~~~~

### 第4步：给用户授予权限
~~~~~~~~~~~~~~~~~~~~~~~
grant connect,resource,dba to username;
grant create view to username;
~~~~~~~~~~~~~~~~~~~~~~~

### 简单创建用户(不要在线上环境使用)
~~~~~~~~~~~~~~~~~~~~~~~
create user username identified by password;
grant connect, resource, dba to username;
grant create view to username;
~~~~~~~~~~~~~~~~~~~~~~~

### oracle 管理
~~~~~~~~~~~~~~~~~~~~~~~
ssh 登陆oracl服务器

切换到oracle安装用户: su oracle
进入oracle后台      : sqlplus / as sysdba
关闭数据库          : shutdown immediate;
启动数据库          : startup mount;
修改数据库状态打开  : alter database open;
修改密码策略永不过期: ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;
~~~~~~~~~~~~~~~~~~~~~~~

## 安装中的问题

### 交换空间为0
~~~~~~~~~~~~~~~~~~~~~~~
cd /
dd  if=/dev/zero  of=swapfile  bs=1024  count=1000000
mkswap swapfile
swapon  swapfile
~~~~~~~~~~~~~~~~~~~~~~~

### db.rsp文件
```python

#-------------------------------------------------------------------------------
# Do not change the following system generated value. 
#-------------------------------------------------------------------------------
oracle.install.responseFileVersion=/oracle/install/rspfmt_dbinstall_response_schema_v11_2_0

#-------------------------------------------------------------------------------
# The installation option can be one of the following
# 1. INSTALL_DB_SWONLY
# 2. INSTALL_DB_AND_CONFIG
# 3. UPGRADE_DB
#-------------------------------------------------------------------------------
oracle.install.option=INSTALL_DB_AND_CONFIG

#-------------------------------------------------------------------------------
# This variable holds the hostname of the system as set by the user. 
# It can be used to force the installation to use an alternative   
# hostname rather than using the first hostname found on the system
# (e.g., for systems with multiple hostnames and network interfaces).
#-------------------------------------------------------------------------------
ORACLE_HOSTNAME=localhost

#-------------------------------------------------------------------------------
# Unix group to be set for the inventory directory.  
#-------------------------------------------------------------------------------
UNIX_GROUP_NAME=oinstall

#-------------------------------------------------------------------------------
# Inventory location.
#-------------------------------------------------------------------------------
INVENTORY_LOCATION=/opt/oraInventory

#-------------------------------------------------------------------------------
# Specify the languages in which the components will be installed.             
#
# en   : English                  ja   : Japanese                  
# fr   : French                   ko   : Korean                    
# ar   : Arabic                   es   : Latin American Spanish    
# bn   : Bengali                  lv   : Latvian                   
# pt_BR: Brazilian Portuguese     lt   : Lithuanian                
# bg   : Bulgarian                ms   : Malay                     
# fr_CA: Canadian French          es_MX: Mexican Spanish           
# ca   : Catalan                  no   : Norwegian                 
# hr   : Croatian                 pl   : Polish                    
# cs   : Czech                    pt   : Portuguese                
# da   : Danish                   ro   : Romanian                  
# nl   : Dutch                    ru   : Russian                   
# ar_EG: Egyptian                 zh_CN: Simplified Chinese        
# en_GB: English (Great Britain)  sk   : Slovak                    
# et   : Estonian                 sl   : Slovenian                 
# fi   : Finnish                  es_ES: Spanish                   
# de   : German                   sv   : Swedish                   
# el   : Greek                    th   : Thai                      
# iw   : Hebrew                   zh_TW: Traditional Chinese       
# hu   : Hungarian                tr   : Turkish                   
# is   : Icelandic                uk   : Ukrainian                 
# in   : Indonesian               vi   : Vietnamese                
# it   : Italian                                                   
#
# Example : SELECTED_LANGUAGES=en,fr,ja
#-------------------------------------------------------------------------------
SELECTED_LANGUAGES=en,zh_CN

#-------------------------------------------------------------------------------
# Complete path of the Oracle Home  
#-------------------------------------------------------------------------------
ORACLE_HOME=/opt/oracle/product/11.2.0/dbhome_1

#-------------------------------------------------------------------------------
# Complete path of the Oracle Base. 
#-------------------------------------------------------------------------------
ORACLE_BASE=/opt/oracle

#-------------------------------------------------------------------------------
# Installation Edition of the component.                        
#                                                             
# The value should contain only one of these choices.        
# EE     : Enterprise Edition                                
# SE     : Standard Edition                                  
# SEONE  : Standard Edition One
# PE     : Personal Edition (WINDOWS ONLY)
#-------------------------------------------------------------------------------
oracle.install.db.InstallEdition=EE

#-------------------------------------------------------------------------------
# This property is considered only if InstallEdition is EE.
#
# true  : Components mentioned as part of 'customComponents' property
#         are considered for install.
# false : Value for 'customComponents' is not considered.
#-------------------------------------------------------------------------------
oracle.install.db.isCustomInstall=false

#-------------------------------------------------------------------------------
# This property is considered only if 'IsCustomInstall' is set to true 
#
# Description: List of Enterprise Edition Options you would like to install.
#
#              The following choices are available. You may specify any
#              combination of these choices.  The components you choose should
#              be specified in the form "internal-component-name:version"
#              Below is a list of components you may specify to install.
#        
#              oracle.oraolap:11.2.0.0.2 - Oracle OLAP
#              oracle.rdbms.dm:11.2.0.0.2 - Oracle Data Mining RDBMS Files
#              oracle.rdbms.dv:11.2.0.0.2 - Oracle Database Vault option
#              oracle.rdbms.lbac:11.2.0.0.2 - Oracle Label Security
#              oracle.rdbms.partitioning:11.2.0.0.2 - Oracle Partitioning
#              oracle.rdbms.rat:11.2.0.0.2 - Oracle Real Application Testing
#              oracle.clrintg.ode_net:11.2.0.0.2 - Oracle Database Extensions for .NET 1.x (Windows)
#              oracle.clrintg.ode_net_2:11.2.0.0.2 - Oracle Database Extensions for .NET 2.0 (Windows)
#-------------------------------------------------------------------------------
oracle.install.db.customComponents=

#-------------------------------------------------------------------------------
oracle.install.db.DBA_GROUP=dba

#-------------------------------------------------------------------------------
oracle.install.db.OPER_GROUP=oinstall

#-------------------------------------------------------------------------------
# This variable represents the cluster node names selected by the .  
# user for installation                                      
#-------------------------------------------------------------------------------
oracle.install.db.CLUSTER_NODES=

#-------------------------------------------------------------------------------
# One of the following
# - GENERAL_PURPOSE                              
# - TRANSACTION_PROCESSING                       
# - DATAWAREHOUSE                                
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.type=GENERAL_PURPOSE

#-------------------------------------------------------------------------------
# Global Database Name 
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.globalDBName=xfdsj

#-------------------------------------------------------------------------------
# The Starter Database SID 
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.SID=

#-------------------------------------------------------------------------------
# Database character set
#                                               
#  One of the following
#  AL32UTF8, WE8ISO8859P15, WE8MSWIN1252, EE8ISO8859P2,
#  EE8MSWIN1250, NE8ISO8859P10, NEE8ISO8859P4, BLT8MSWIN1257,
#  BLT8ISO8859P13, CL8ISO8859P5, CL8MSWIN1251, AR8ISO8859P6,
#  AR8MSWIN1256, EL8ISO8859P7, EL8MSWIN1253, IW8ISO8859P8,
#  IW8MSWIN1255, JA16EUC, JA16EUCTILDE, JA16SJIS, JA16SJISTILDE,
#  KO16MSWIN949, ZHS16GBK, TH8TISASCII, ZHT32EUC, ZHT16MSWIN950,
#  ZHT16HKSCS, WE8ISO8859P9, TR8MSWIN1254, VN8MSWIN1258
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.characterSet=
#-------------------------------------------------------------------------------
# Specify the total memory allocation for the database. (in MB)
# Value should be at least 256 MB, and should not exceed the  
# total physical memory available on the system.
# Example: oracle.install.db.config.starterdb.memoryLimit=40
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.memoryLimit=738
oracle.install.db.config.starterdb.memoryOption=true

#-------------------------------------------------------------------------------
# This variable controls whether to load Example Schemas onto
# the starter database or not.
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.installExampleSchemas=false

#-------------------------------------------------------------------------------
# This include enabling audit settings, configuring password  
# profiles and revoking some grants to public. These settings 
# are provided by default.  You may choose to disable all.    
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.enableSecuritySettings=true

#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.password.ALL=

#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.password.SYS=

#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.password.SYSTEM=

#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.password.SYSMAN=

#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.password.DBSNMP=

#-------------------------------------------------------------------------------
# Can be one of the following 
# 1. GRID_CONTROL
# 2. DB_CONTROL
# 
oracle.install.db.config.starterdb.control=DB_CONTROL

#-------------------------------------------------------------------------------
# Determines the Management Service to use if Grid Control   
# is selected to manage the database.      
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.gridcontrol.gridControlServiceURL=

#-------------------------------------------------------------------------------
# Determines whether to receive email notification for       
# critical alerts when using DB control.   
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.dbcontrol.enableEmailNotification=false

#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.dbcontrol.emailAddress=

#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.dbcontrol.SMTPServer=

#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.automatedBackup.enable=false

#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.automatedBackup.osuid=

#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.automatedBackup.ospwd=

#-------------------------------------------------------------------------------
# Can be one of the following
# - FILE_SYSTEM_STORAGE
# - ASM_STORAGE
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.storageType=FILE_SYSTEM_STORAGE

#-------------------------------------------------------------------------------
# Database file location:                  
# directory for datafiles, control files, redo logs.         
#
# Applicable only when oracle.install.db.config.starterdb.storage=FILE_SYSTEM_STORAGE 
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.fileSystemStorage.dataLocation=/opt/oracle/oradata

#-------------------------------------------------------------------------------
# Backup and recovery location 
#
# Applicable only when oracle.install.db.config.starterdb.storage=FILE_SYSTEM_STORAGE 
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.fileSystemStorage.recoveryLocation=

#-------------------------------------------------------------------------------
# Name of ASM disk group to be used for storage.
#
# Applicable only when oracle.install.db.config.starterdb.storageType=ASM_STORAGE
#-------------------------------------------------------------------------------
oracle.install.db.config.asm.diskGroup=

#-------------------------------------------------------------------------------
# Password for ASMSNMP user of the ASM instance.                  
#
# Applicable only when oracle.install.db.config.starterdb.storage=ASM_STORAGE 
#-------------------------------------------------------------------------------
oracle.install.db.config.asm.ASMSNMPPassword=

#------------------------------------------------------------------------------
# Specify the My Oracle Support Account Username.
#
#  Example   : MYORACLESUPPORT_USERNAME=metalink
#------------------------------------------------------------------------------
MYORACLESUPPORT_USERNAME=

#------------------------------------------------------------------------------
# Specify the My Oracle Support Account Username password.
#
# Example    : MYORACLESUPPORT_PASSWORD=password
#------------------------------------------------------------------------------
MYORACLESUPPORT_PASSWORD=

#------------------------------------------------------------------------------
# Specify whether to enable the user to set the password for
# My Oracle Support credentials. The value can be either true or false.
# If left blank it will be assumed to be false.
#
# Example    : SECURITY_UPDATES_VIA_MYORACLESUPPORT=true
#------------------------------------------------------------------------------
SECURITY_UPDATES_VIA_MYORACLESUPPORT=false

#------------------------------------------------------------------------------
# Specify whether user wants to give any proxy details for connection. 
# The value can be either true or false. If left blank it will be assumed
# to be false.
#
# Example    : DECLINE_SECURITY_UPDATES=false
#------------------------------------------------------------------------------
DECLINE_SECURITY_UPDATES=true

#------------------------------------------------------------------------------
# Specify the Proxy server name. Length should be greater than zero.
#
# Example    : PROXY_HOST=proxy.domain.com 
#------------------------------------------------------------------------------
PROXY_HOST=

#------------------------------------------------------------------------------
# Specify the proxy port number. Should be Numeric and atleast 2 chars.
#
# Example    : PROXY_PORT=25 
#------------------------------------------------------------------------------
PROXY_PORT=

```