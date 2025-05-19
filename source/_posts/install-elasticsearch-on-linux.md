---
title: install elasticsearch on linux
tags:
  - elasticsearch
  - linux
toc: true
abbrlink: 28061
date: 2017-04-18 09:57:00
---


# Linux安装elasticsearch

[配置参考](http://172.16.60.100/tools/elasticsearch/Elasticsearch%E3%80%81Kibana%20%E4%BD%BF%E7%94%A8%E8%80%85%E8%AA%8D%E8%AD%89%E8%A8%AD%E5%AE%9A.html)
下载[http://172.16.60.100/tools/elasticsearch/](http://172.16.60.100/tools/elasticsearch/ )

### 配置好JAVA_HOME
需要jkd1.7以上版本, 配置好JAVA_HOME

## ES 5.3
### yum安装rpm包
yum install elasticsearch-5.3.0.rpm
yum install kibana-5.3.0-x86_64.rpm



### 配置文件
#/etc/elasticsearch/elasticsearch.yml

network.host: 127.0.0.1
http.port: 9200
同样的将Kibana 也设为localhost only

#/etc/kibana/kibana.yml

server.port: 5601
server.host: "127.0.0.1"
设定完成后记得重开Kibana 和Elasticsearch 才会生效哦，可以检查一下是否在外网真的无法连线。

### 管理服务
service elasticsearch start|stop|restart
service kibana start|stop|restart

### 开机启动
chkconfig elasticsearch on
chkconfig kibana on

### bin文件安装


### ES 1.4.5
使用bin文件安装

### nginx配置
nginx配置[http://localhost:4000/linux-install-nginx/#nginx-basic-认证文件生成](http://localhost:4000/linux-install-nginx/#nginx-basic-认证文件生成 )


### test

dfhdfi 

