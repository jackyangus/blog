---
title: centos repo
tags:
  - centos
  - yum
toc: true
abbrlink: 6011
date: 2017-03-29 12:11:10
---

# 公司centos源
centos源列表(翻墙): [https://www.centos.org/download/mirrors/](https://www.centos.org/download/mirrors/)
epel源列表(翻墙): [https://fedoraproject.org/wiki/EPEL](https://fedoraproject.org/wiki/EPEL)
163源: [http://mirrors.163.com/.help/centos.html](http://mirrors.163.com/.help/centos.html)


## 网路安装服务器172.16.60.203 centos6.5

## centos6 源
~~~~~~~~~~~~~~~~~~~~~~~~~
[vastio_centos6.5]
name=install centos6.5
baseurl=http://172.16.60.203/centos6.5/
enabled=1
gpgcheck=0
~~~~~~~~~~~~~~~~~~~~~~~~~

## epel6 源
~~~~~~~~~~~~~~~~~~~~~~~~~
[vastio_epel6.8]
name=install epel6.8
baseurl=http://172.16.60.100/epel/
enabled=1
gpgcheck=0
~~~~~~~~~~~~~~~~~~~~~~~~~

## centos7 源
~~~~~~~~~~~~~~~~~~~~~~~~~
[vastio_centos7]
name=install centos7
baseurl=http://172.16.60.203/centos7/
enabled=1
gpgcheck=0
~~~~~~~~~~~~~~~~~~~~~~~~~

## hadoop源 ambari
~~~~~~~~~~~~~~~~~~~~~~~~~
[vastio_ambari2.4]
name=install ambari2.4
baseurl=http://172.16.60.100/ambari/ambari2.4/AMBARI-2.4.2.0/centos6/2.4.2.0-136/
enabled=1
gpgcheck=0

[HDP-2.5]
name=HDP-2.5
baseurl=http://172.16.60.100/ambari/ambari2.4/HDP/centos6
path=/
enabled=1
gpgcheck=0

[HDP-UTILS-1.1.0.21]
name=HDP-UTILS-1.1.0.21
baseurl=http://172.16.60.100/ambari/ambari2.4/HDP-UTILS-1.1.0.21/repos/centos6
path=/
enabled=1
gpgcheck=0

~~~~~~~~~~~~~~~~~~~~~~~~~

## yum 使用官方源使用代理加速
`vim /etc/yum.conf`
~~~~~~~~~~~~~~~~~~~~~~~~~
http_proxy="http://172.16.60.151:1080"
~~~~~~~~~~~~~~~~~~~~~~~~~

