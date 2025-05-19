---
title: graphite install on centos
tags:
  - graphite
  - 监控
toc: true
abbrlink: 23559
date: 2017-03-29 10:04:21
---

# graphite 安装
## 环境
* centos6.5 64
* python: 2.7
公司机器: 172.16.60.139

## 参考
客户端: [graphitesend](https://github.com/daniellawrence/graphitesend)

中文文档: 
[https://segmentfault.com/search?q=Graphite+%E7%B3%BB%E5%88%97+%235](https://segmentfault.com/search?q=Graphite+%E7%B3%BB%E5%88%97+%235)
[https://lanjingling.github.io/2016/04/04/graphite-1/](https://lanjingling.github.io/2016/04/04/graphite-1/)
官网文档: [graphite](http://graphite.readthedocs.io/en/latest/)

## 安装python2.7

~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo "配置yum源"
cd /etc/yum.repos.d/
rm -rf *
wget http://172.16.60.100/vastio6.repo
wget http://172.16.60.100/CentOS6-Base-163.repo

echo "清空yum缓存"
yum clean all

echo "安装编译环境"
mkdir /root/software
cd /root/software
rm -rf *
yum -y install libgfortran
yum -y install gcc-gfortran
yum -y install gcc gcc-c++
yum -y install readline-devel
yum -y install libXt-devel
yum -y install openssl openssl-devel pcre pcre-devel

#centos6.5 openssl 有bug 升级
wget http://172.16.60.100/ambari/openssl-1.0.1e-48.el6_8.4.x86_64.rpm
wget http://172.16.60.100/ambari/openssl-devel-1.0.1e-48.el6_8.4.x86_64.rpm
yum install openssl* -y

echo "安装oracle client"
wget http://172.16.60.100/software_new/pps/oracle-instantclient11.2-basic-11.2.0.3.0-1.x86_64.rpm
wget http://172.16.60.100/software_new/oracle-instantclient11.2-devel-11.2.0.3.0-1.x86_64.rpm
wget http://172.16.60.100/software_new/oracle-instantclient11.2-sqlplus-11.2.0.3.0-1.x86_64.rpm

yum -y install oracle-instantclient11.2-*

echo "编译安装 python2.7"
wget http://172.16.60.100/tools/python/Python-2.7.13.tgz

tar -vxf Python-2.7.13.tgz
cd Python-2.7.13
./configure --prefix=/usr/local/python27 --with-ssl --with-ssl-lib
make && make install

echo "安装 pip工具"
wget http://172.16.60.100/pypi/pip-9.0.1.tar.gz
tar -vxf pip-9.0.1.tar.gz
cd pip-9.0.1

/usr/local/python27/bin/python2.7 setup.py install

mkdir -p ~/.pip
echo "pip 源"
echo "http://pypi.douban.com/simple/  豆瓣
http://pypi.hustunique.com/simple/  华中理工大学
http://pypi.sdutlinux.org/simple/  山东理工大学
http://pypi.mirrors.ustc.edu.cn/simple/  中国科学技术大学
http://mirrors.aliyun.com/pypi/simple/ 阿里云
pip3 install -i http://172.16.60.100/pypi/simple/ --trusted-host=172.16.60.100 cx_Oracle
pip3 install -i http://pypi.douban.com/simple/ --trusted-host=pypi.douban.com xml
编辑linux ~/.pip/pip.conf
window ~/.pip/pip.ini
"
echo "[global]
timeout = 60
#index-url = http://172.16.60.100/pypi/simple/
index-url = http://mirrors.aliyun.com/pypi/simple/
#trusted-host = 172.16.60.100
trusted-host = mirrors.aliyun.com" > ~/.pip/pip.conf

echo "安装python 常用包"
/usr/local/python27/bin/pip2.7 install CherryPy
/usr/local/python27/bin/pip2.7 install Mako
/usr/local/python27/bin/pip2.7 install MarkupSafe
/usr/local/python27/bin/pip2.7 install PyMySQL
/usr/local/python27/bin/pip2.7 install PyYAML
/usr/local/python27/bin/pip2.7 install Routes
/usr/local/python27/bin/pip2.7 install SOAPpy
/usr/local/python27/bin/pip2.7 install SQLAlchemy
/usr/local/python27/bin/pip2.7 install beautifulsoup4
/usr/local/python27/bin/pip2.7 install cx_Oracle
/usr/local/python27/bin/pip2.7 install defusedxml
/usr/local/python27/bin/pip2.7 install elasticsearch
/usr/local/python27/bin/pip2.7 install get
/usr/local/python27/bin/pip2.7 install graphite
/usr/local/python27/bin/pip2.7 install jieba
/usr/local/python27/bin/pip2.7 install lxml
/usr/local/python27/bin/pip2.7 install pygrametl
/usr/local/python27/bin/pip2.7 install pyhs2
/usr/local/python27/bin/pip2.7 install pyodbc
/usr/local/python27/bin/pip2.7 install pyodbc
/usr/local/python27/bin/pip2.7 install repoze.lru
/usr/local/python27/bin/pip2.7 install requests
/usr/local/python27/bin/pip2.7 install rinse
/usr/local/python27/bin/pip2.7 install router
/usr/local/python27/bin/pip2.7 install rpy2
/usr/local/python27/bin/pip2.7 install sasl
/usr/local/python27/bin/pip2.7 install setuptools
/usr/local/python27/bin/pip2.7 install six
/usr/local/python27/bin/pip2.7 install structlog
/usr/local/python27/bin/pip2.7 install thrift
/usr/local/python27/bin/pip2.7 install thrift
/usr/local/python27/bin/pip2.7 install tzlocal
/usr/local/python27/bin/pip2.7 install urllib3
/usr/local/python27/bin/pip2.7 install uwsgi
/usr/local/python27/bin/pip2.7 install wstools
/usr/local/python27/bin/pip2.7 install xmltodict
/usr/local/python27/bin/pip2.7 install backports_abc
/usr/local/python27/bin/pip2.7 install certifi
/usr/local/python27/bin/pip2.7 install docutils
/usr/local/python27/bin/pip2.7 install lockfile
/usr/local/python27/bin/pip2.7 install luigi
/usr/local/python27/bin/pip2.7 install pbr
/usr/local/python27/bin/pip2.7 install singledispatch
/usr/local/python27/bin/pip2.7 install tornado
/usr/local/python27/bin/pip2.7 install graphitesend
/usr/local/python27/bin/pip2.7 install python-dateutil
/usr/local/python27/bin/pip2.7 install simplejson
/usr/local/python27/bin/pip2.7 install argparse
/usr/local/python27/bin/pip2.7 install cx_Freeze
~~~~~~~~~~~~~~~~~~~~~~~~~~~

### 配置环境变量
`vim /etc/profile`
~~~~~~~~~~~~~~~~~~~~~~~~~~~
#PYTHON27 环境变量
export PYTHON_HOME=/usr/local/python27
export PATH=PYTHON_HOME/bin:PATH

#oralce client 环境变量
export ORACLE_SID=orcl
export ORACLE_HOME=/usr/lib/oracle/11.2/client64
export TNS_ADMIN=/usr/lib/oracle/11.2/client64
export NLS_LANG=AMERICAN_AMERICA.AL32UTF8
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/usr/lib:/usr/local/lib
export PATH=$PATH:$ORACLE_HOME/bin:$ORACLE_HOME/lib
~~~~~~~~~~~~~~~~~~~~~~~~~~~
`source /etc/profile`

`/usr/local/python27/bin/pip2.7 install cx_Oracle`

## 安装graphite
~~~~~~~~~~~~~~~~~~~~~~~~~~~
cd ~
wget http://172.16.60.100/software_new/graphite_git.tar
tar -vxf graphite_git.tar
cd graphite_git
~~~~~~~~~~~~~~~~~~~~~~~~~~~
安装graphite组件, 按顺序安装
ceres
whisper
carbon
graphite-web

### 批量下载依赖的方法
cabot 依赖也是同理
无法连接互联网需要手动下载依赖,每个组件都有依赖requirements.txt
市局的组件依赖可以使用该办法解决
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
mkdir require_lib
cat carbon/requirements.txt > require_lib/requirements.txt
cat ceres/test_requirements.txt >> require_lib/requirements.txt
cat whisper/requirements.txt >> require_lib/requirements.txt
cat graphite-web/requirements.txt >> require_lib/requirements.txt
cd require_lib
pip2.7 download -r requirements.txt
~~~~~~~~~~~~~~~~~~~~~~~~~~~~


## 配置graphite
graphite 安装目录 /opt/graphite
graphite 配置目录 /opt/graphite/conf

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
cd /opt/graphite/conf
cp aggregation-rules.conf.example aggregation-rules.conf
cp blacklist.conf.example blacklist.conf
cp carbon.amqp.conf.example carbon.amqp.conf
cp carbon.conf.example carbon.conf
cp dashboard.conf.example dashboard.conf
cp graphite.wsgi.example graphite.wsgi
cp graphTemplates.conf.example graphTemplates.conf
cp relay-rules.conf.example relay-rules.conf
cp rewrite-rules.conf.example rewrite-rules.conf
cp storage-aggregation.conf.example storage-aggregation.conf
cp storage-schemas.conf.example storage-schemas.conf
cp whitelist.conf.example whitelist.conf
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## storage-schemas.conf

retentions配置先使用whisper-create.py test.wsp 10s:7d 60s:180d 3600s:360d
测试否则可能不正确
whisper-info.py test.wsp文件
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
[vastio]
pattern = ^vastio\.
retentions = 10s:7d,60s:180d,3600s:360d
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## 启动
`vim /opt/graphite/webapp/graphite/settings.py`
主要修改
STATIC_ROOT = '/opt/graphite/webapp'
该目录下有graphite运行的依赖static 或content
STATIC_URL = '/static/'
TIME_ZONE='Asia/Shanghai' 时区

bash /opt/graphite/webapp/start.sh
django-admin.py 需要配置在环境变量中,python2 和python3 请注意不要冲突

`bash /opt/graphite/webapp/start.sh`
~~~~~~~~~~~~~~~~~~~~~~~~~
cd /opt/graphite/webapp
export PYTHONPATH=/opt/graphite/webapp/
nohup django-admin.py runserver --settings=graphite.settings 0.0.0.0:8001 > graphite.log &
~~~~~~~~~~~~~~~~~~~~~~~~~

## 结合nginx 做前置
[nginx 安装](/linux-install-nginx/)
~~~~~~~~~~~~~~~~~~~~~~~~~
server {
        listen       81;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            proxy_pass http://127.0.0.1:8001;
            proxy_redirect off;
            proxy_set_header HOST $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size 10m;
            client_body_buffer_size 128k;
            proxy_connect_timeout 90;
            proxy_send_timeout 90;
            proxy_read_timeout 90;
            proxy_buffer_size 4k;
            proxy_buffers 4 32k;
            proxy_busy_buffers_size 64k;
            proxy_temp_file_write_size 64k;

        }
        location /static {
            root /opt/graphite/webapp;
        }
     }
~~~~~~~~~~~~~~~~~~~~~~~~~

## 启动caborn
`cd /opt/graphite/bin`
`python2.7 carbon-cache.py start`

`vim /opt/graphite/bin/start.sh`
~~~~~~~~~~~~~~~~~~~~~
cd /opt/graphite/bin
/usr/local/python27/bin/python2.7 /opt/graphite/bin/carbon-cache.py start
~~~~~~~~~~~~~~~~~~~~~

## 开机启动
`vim /etc/rc.local`
~~~~~~~~~~~~~~~~~~~~~
#启动carbon
bash /opt/graphite/bin/start.sh
#启动graphite-web
bash /opt/graphite/webapp/start.sh
~~~~~~~~~~~~~~~~~~~~~
