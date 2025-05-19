---
title: private docker server
tags:
  - docker
  - registry
toc: true
abbrlink: 21654
date: 2017-03-27 15:40:09
---

# 搭建docker私有服务器
公司: you ip
系统: centos 7 1611版本
python: 系统自带2.7.5
docker-registry功能增强: [Harbor](http://1.chaoxu.sinaapp.com/archives/3969)

## 国内镜像使用
[http://www.cnblogs.com/anliven/p/6218741.html](http://www.cnblogs.com/anliven/p/6218741.html)
DaoCloud - Docker加速器
阿里云 - 开发者平台
微镜像 - 希云cSphere
镜像广场 - 时速云
灵雀云
网易蜂巢

## 环境要求
docker 需要linux 3.10的内核,centos7
centos6.5内核为2.6.32不再支持
docker客户端在centos6.5不支持
[docker 环境要求](https://docs.docker.com/engine/installation/linux/centos/#prerequisites "docker 环境要求")


## 准备
yum源
`yum install -y gcc python-devel python-pip openssl openssl-devel pcre pcre-devel lzma lzma-devel xz xz-devel swig`

## 下载
添加docker用户和目录为了安全起见，我们可以添加一个用户docker，使用这个非root用户来允许docker registry程序，同时指定好docker镜像的存储位置，本处指定为/home/docker_registry目录
~~~~~~~~~~~~~~~~~~~~~~~
useradd docker
mkdir -p /home/docker_registry
chown -R docker.docker /home/docker_registry/
~~~~~~~~~~~~~~~~~~~~~~~

从github克隆最新版本registry, 进入这个目录下的config子目录，从模板复制一个配置文件出来：
~~~~~~~~~~~~~~~~~~~~~~~
git clone https://github.com/docker/docker-registry.git
cd docker-registry/config
cp config_sample.yml config.yml
~~~~~~~~~~~~~~~~~~~~~~~
此时可以修改这个config.yml配置文件，需要注意修改以下的两个地方：
~~~~~~~~~~~~~~~~~~~~~~
#配置sqlite数据库位置
sqlalchemy_index_database: _env:SQLALCHEMY_INDEX_DATABASE:sqlite:////home/docker_registry/docker-registry.db
#配置本地存储位置
local: &local
    storage: local
    storage_path: _env:STORAGE_PATH:/home/docker_registry
~~~~~~~~~~~~~~~~~~~~~~
修改依赖文件
docker-registry/requirements/main.txt
M2Crypto==0.25.1


## 更新pip
~~~~~~~~~~~~~~~~~~~~~
echo "安装 pip工具"
wget pip-9.0.1.tar.gz
tar -vxf pip-9.0.1.tar.gz
cd pip-9.0.1

python3 setup.py install

mkdir -p ~/.pip
echo "pip 源"
echo "http://pypi.douban.com/simple/  豆瓣
http://pypi.hustunique.com/simple/  华中理工大学
http://pypi.sdutlinux.org/simple/  山东理工大学
http://pypi.mirrors.ustc.edu.cn/simple/  中国科学技术大学
http://mirrors.aliyun.com/pypi/simple/ 阿里云
pip3 install -i http://ip/pypi/simple/ --trusted-host=ip cx_Oracle
pip3 install -i http://pypi.douban.com/simple/ --trusted-host=pypi.douban.com xml
编辑linux ~/.pip/pip.conf
window ~/.pip/pip.ini
"
echo "[global]
timeout = 60
#index-url = http://ip/pypi/simple/
index-url = http://mirrors.aliyun.com/pypi/simple/
#trusted-host = ip
trusted-host = mirrors.aliyun.com" > ~/.pip/pip.conf
~~~~~~~~~~~~~~~~~~~~


## 安装
`cd docker-registry`
`pip install .`


## 启动

`mkdir /opt/docker`
`vim start.sh`
-b 0.0.0.0:5000 使用81端口
~~~~~~~~~~~~~~~~~~~
cd /opt/docker

nohup gunicorn --access-logfile - --error-logfile - -k gevent -b 0.0.0.0:5000 -w 8 --max-requests 100 docker_registry.wsgi:application > dock.log &
~~~~~~~~~~~~~~~~~~~


## 配置nginx
[nginx 安装](/linux-install-nginx/ "nginx 安装")

~~~~~~~~~~~~~~~~~~~
   server {
        listen       80;
        server_name  localhost;
        proxy_set_header Host       $http_host;   # required for docker client's sake
        proxy_set_header X-Real-IP  $remote_addr; # pass on real client's IP

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            proxy_pass http://127.0.0.1:5000;
            client_max_body_size    1000m; #nginx 文件上次大小限制
        }
    }
~~~~~~~~~~~~~~~~~~~

关闭防火墙
添加端口`vi /etc/sysconfig/iptables`
或
`systemctl stop firewalld.service`

## 启动
`service nginx restart`
`bash /opt/docker/start.sh`

## 开机启动
`vim /etc/rc.local`
~~~~~~~~~~~~~
systemctl stop firewalld.service
bash /opt/docker/start.sh
~~~~~~~~~~~~~


## 测试
web访问
[http://you ip](http://you ip)
docker-registry server



## 使用 
nginx 为例子 下载公有的nginx镜像上次本地仓库

### 下载

`docker pull hub.c.163.com/public/nginx:1.2.1`
`docker images`

~~~~~~~~~~~~~~~~~~~
[root@localhost docker-dev]# docker images
REPOSITORY                   TAG                 IMAGE ID            CREATED             SIZE
hub.c.163.com/public/nginx   1.2.1               2dc68ff797db        11 months ago       171.5 MB
localhost/nginx              latest              2dc68ff797db        11 months ago       171.5 MB
~~~~~~~~~~~~~~~~~~~

### 打上自己的tag

`docker tag 2dc6 you ip/nginx`
### 上传
`docker push you ip/nginx`

### 检查
[http://you ip/v1/search](http://you ip/v1/search)

### 其它机器上使用
docker pull you ip/nginx