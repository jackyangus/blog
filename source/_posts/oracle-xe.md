---
title: oracle_xe
tags:
  - oracle
abbrlink: 42570
date: 2016-12-26 11:00:50
---

## oracle xe
Oracle Database 11g Express Edition (Oracle Database XE) is an entry-level, small-footprint database based on the Oracle Database 11g Release 2 code base.  It's free to develop, deploy, and distribute; fast to download; and simple to administer.

This edition suitable for persona, this install package about 300m, supported version win32, win64, linux64.

download http://www.oracle.com/technetwork/database/database-technologies/express-edition/downloads/index.html

I install win64 version
#### 1. reday install
unzip OracleXE112_Win64.zip

#### 2. installing
cd Disk1
run setup.exe as administrator
The install Path use ORACLE_HOME
and you need set the system user password

#### 3. finish install
{% asset_img install_finish.png install_finish %}
{% asset_img install_finish_service.png install_finish_service %}


#### 4. check success?
{% asset_img check_success1.png check_success1 %}
{% asset_img check_success2.png check_success2 %}
{% asset_img finish_all.png finish_all %}

#### 5. set system variable path
ORACLE_SID=xe
ORACLE_HOME=C:\oraclexe\app\oracle\product\11.2.0\server
LD_LIBRARY_PATH=%ORACLE_HOME%\lib
path=%ORACLE_HOME%\bin;LD_LIBRARY_PATH;


#### 6. restart system
you need to restart system after you installed oracle-xe

