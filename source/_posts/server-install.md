---
title: server_install
tags:
  - 服务器
abbrlink: 55114
date: 2017-02-06 11:12:37
---


### linux

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
一 nginx
    nginx需要从源码编译
    安装目录/usr/local/nginx
    cd /root/
    wget http://software.vastio.com/nginx-1.7.9.rar
    tar -xf nginx-1.7.9.rar
    cd nginx
    yum -y install gcc pcre-devel openssl openssl-devel
    ./configure --prefix=/usr/local/nginx
    make
    make install
    
    安装后路径/usr/local/nginx/sbin/nginx 
    nginx 重启 nginx -s reload
    
二 tomcate
    目录/opt/
    cd /opt
    wget http://software.vastio.com/tomcat-7.0.27.tar
    jdk1.7 下oracle数据库连接经常启动不了
    配置 tomcate 下的 conf/env.properties
    db.url=jdbc:oracle:thin:@ip:1521:服务名
    db.username=用户名
    db.password=密码  
    
    关闭bash bin/shutdown.sh
    启动bash bin/startup.sh

三 设置无密码登陆
    ssh-keygen -t rsa
    cd ~/.ssh
    拷贝公钥到其它机器(为了实现能互相无密码登陆)
    scp id_rsa root@pps_*_*_*:~/.ssh/
    scp id_rsa.pub root@pps_*_*_*:~/.ssh/
    在所有机器上执行(包括本机器)
    cd ~/.ssh
    cat id_rsa.pub >> ~/.ssh/authorized_keys
    chmod 700 -R ~/.ssh
    chmod 600 authorized_keys
    
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### 其它工具

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
一 yum
    cd /etc/yum.repos.d

二 oracle 11g 
    数据库密码默认180天
    ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;
    
三 oracle 数据库连接客户端
    1. navicat 创建表时候表名使用名空间加双引号,并且表名大写
    2. oracle client
    3. plsql, 不要 plsql执行大量的 sql语句,运行不起来
    
四 文本编辑器
    1. notepad++
    2. sublime
    
五 web服务器
    1. nginx  
    2. tomcate
    
六 Linux 连接客户端
    1. xshell
    2. xftp
    
七 git客户端(windows)
    0. git windows环境 https://git-scm.com/
    1. sourcetree https://www.sourcetreeapp.com/
    2. tortoisegit https://tortoisegit.org/download/

八 代理相关
    yum 使用代理 /etc/yum.conf
    proxy=http://ip:port/
    wget 使用代理
    export http_proxy=http://ip:port
    
九 mount 命令
    mount -t cifs -o username=root,password= //10.15.100.151/centos /root/centos
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


