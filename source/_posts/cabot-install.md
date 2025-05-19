---
title: cabot install

categories: Programming
tags:
  - cabot
  - 监控
toc: true
abbrlink: 19961
date: 2017-03-29 13:28:59
---

# cabot 安装
## 环境
* centos6.5 64
* python: 2.7

### python2.7 安装参考
[graphite-install-on-centos](/graphite-install-on-centos/)
### cabot安装参考
[https://gist.github.com/Gromph/5f4db73b0f38775bc2f0#file-gistfile1-txt-L35](https://gist.github.com/Gromph/5f4db73b0f38775bc2f0#file-gistfile1-txt-L35)
[http://blog.gaoyuan.xyz/2014/10/01/use-graphite-and-alter-build-monitor-system/](http://blog.gaoyuan.xyz/2014/10/01/use-graphite-and-alter-build-monitor-system/)

## 安装依赖
`yum install -y openldap openldap-devel libffi libffi-devel mysql-server mysql-devel`

## [安装mysql](/mysql-management/)

## 创建mysql用户
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
create database if not exists cabot default character set utf8;
GRANT ALL PRIVILEGES ON `cabot`.* TO 'cabot'@'%' IDENTIFIED BY 'cabot';

SET old_passwords = 0;

UPDATE mysql.user SET Password = PASSWORD('cabot') WHERE User = 'weibo' limit 1;

SELECT LENGTH(Password) FROM mysql.user WHERE User = 'cabot';
 FLUSH PRIVILEGES;

GRANT ALL PRIVILEGES ON `cabot`.* TO 'cabot'@'localhost' IDENTIFIED BY 'cabot';
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## 测试msyql用户
`mysql -ucabot -pcabot`

## 特别说明
foreman命令使用隐藏文件.foreman
foreman为ruby的工具,需要安装ruby才能使用
用来把不同的配置文件写入环境变量中,可以不使用
~~~~~~~~~~~~~~~~~~~~~~~~
# vi: set ft=yaml :

procfile: Procfile.dev
#env: conf/development.env 开发环境
env: conf/production.env #正式环境
~~~~~~~~~~~~~~~~~~~~~~~~
sh -ac ' . ./conf/production.env ...
是把production.env 写入运行时环境变量,然后运行
和foreman同样的意思

syncdb django 1.9 已经抛弃, 使用migrate
~~~~~~~~~~~~~~~~~~~~~~~
sh -ac ' . ./conf/production.env; python2.7 manage.py migrate'
sh -ac ' . ./conf/production.env; python2.7 manage.py collectstatic --noinput'
sh -ac ' . ./conf/production.env; python2.7 manage.py compress'
~~~~~~~~~~~~~~~~~~~~~~~

## 安装
~~~~~~~~~~~~~~~~~~~~~~~
cd /var/www
wget http://ip/software_new/cabot.tar
tar -vxf cabot.tar
~~~~~~~~~~~~~~~~~~~~~~~

/var/www/cabot/requir_lib 是python依赖用于离线安装

### 安装依赖 requirements.txt
~~~~~~~~~~~~~~~~~~~~~~~
coverage==4.2
django_coverage_plugin==1.4.2
mock==1.0.1
sqlalchemy==1.1.5
ipdb
amqp<2.0
anyjson==0.3.3
argparse==1.2.1
celery[redis]==3.1.23
dj-database-url==0.4.2
django-appconf==1.0.2
django-auth-ldap==1.2.6
django-celery==3.1.17
django-compressor==2.1.1
django-filter==1.0.1
django-jsonify==0.3.0
django-mptt==0.6.0
django-polymorphic==1.1
Django>=1.9,<1.10
djangorestframework>=3.5,<3.6
freezegun==0.3.8
gevent==1.0.1
gunicorn==19.6.0
httplib2==0.7.7
icalendar==3.2
Markdown==2.5
ndg-httpsclient==0.4.2
psycogreen==1.0
psycopg2==2.5.1
pyasn1==0.1.9
PyJWT==0.1.2
pyOpenSSL==16.1.0
python-dateutil==2.1
pytz==2014.10
requests==2.7.0
twilio==3.4.1
whitenoise==3.3.0
wsgiref==0.1.2
cabot_alert_email==1.4.3
cabot_alert_hipchat==1.8.3
cabot_alert_twilio==1.3.0
~~~~~~~~~~~~~~~~~~~~~~~

## 修改配置
~~~~~~~~~~~~~~~~~~~~~~~~
cd /var/www/cabot/conf
cp production.env.example production.env
vim /var/www/cabot/conf/production.env
~~~~~~~~~~~~~~~~~~~~~~~~

## redis配置
[redis 安装](https://github.com/judasn/Linux-Tutorial/blob/master/Redis-Install-And-Settings.md)
~~~~~~~~~~~~~~~~
# Django settings
CELERY_BROKER_URL=redis://:vastio@172.16.60.201:6379/1
DJANGO_SECRET_KEY=2FL6ORhHwr5eX34pP9mMugnIOd3jzVuT45f7w430Mt5PnEwbcJgma0q8zUXNZ68A
~~~~~~~~~~~~~~~~

## graphite配置
[graphite 安装](/graphite-install-on-centos/)
~~~~~~~~~~~~~~~~
GRAPHITE_API=http://127.0.0.1:81/
GRAPHITE_USER=vastio
GRAPHITE_PASS=vastio
~~~~~~~~~~~~~~~~

## 启动

### 手动启动
`cd /var/www/cabot`
~~~~~~~~~~~~~~~~
sh -ac ' . ./conf/production.env; nohup python2.7 manage.py runserver 0.0.0.0:8000 > run.log &'
~~~~~~~~~~~~~~~~


### 自动启动
start.sh
~~~~~~~~~~~~~~~~~~~~~~~
PROJECT_HOME=/var/www/cabot
cd $PROJECT_HOME
source /etc/profile
#依赖数据库,等10s
sleep 10s

sh -ac ' . ./conf/production.env; nohup python2.7 manage.py runserver 0.0.0.0:8000 > run.log &'
#nohup python2.7 manage.py runserver 0.0.0.0:8000 > run.log &
~~~~~~~~~~~~~~~~~~~~~~

`vim /etc/rc.local`
~~~~~~~~~~~~~~~~~~~~~~
bash /var/www/cabot/start.sh
~~~~~~~~~~~~~~~~~~~~~~