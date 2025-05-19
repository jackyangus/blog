---
title: linux install nginx

categories: Programming
tags:
  - nginx
  - linux
toc: true
abbrlink: 65186
date: 2017-03-27 16:18:41
---


# linux 安装nginx

## 一键安装
```javascript
wget http://ip/tools/nginx/nginx-1.10.2.tar.gz
tar -vxf nginx-1.10.2.tar.gz 
cd nginx-1.10.2
./configure --prefix=/usr/local/nginx
yum -y install openssl openssl-devel pcre pcre-devel gcc dos2unix
make && make install
cd /etc/init.d/
curl http://ip/tools/nginx/nginx.auto.startup > nginx
dos2unix nginx
chmod -R 777 /etc/init.d/nginx 
chkconfig nginx on
service nginx start

```

## 配置文件
`/usr/local/nginx/conf/nginx.conf`

## 启动
`service nginx start`
`/usr/local/nginx/sbin/nginx`

## 关闭
`service nginx stop`
`/usr/local/nginx/sbin/nginx -s stop`

## 重启
`service nginx restart`
`/usr/local/nginx/sbin/nginx -s restart`


## nginx basic 认证文件生成
```
yum install httpd-tools
htpasswd -c 生成的认证文件名 用户名
```

## 自动启动脚本nginx.auto.startup
~~~~~~~~~~~~~~~~~~~~~~~~
#!/bin/sh
#
# nginx - this script starts and stops the nginx daemin
#
# chkconfig: - 85 15
# description: Nginx is an HTTP(S) server, HTTP(S) reverse \
# proxy and IMAP/POP3 proxy server
# processname: nginx
# config: /usr/local/nginx/conf/nginx.conf
# pidfile: /usr/local/nginx/logs/nginx.pid

# Source function library.
. /etc/rc.d/init.d/functions

# Source networking configuration.
. /etc/sysconfig/network

# Check that networking is up.
[ "$NETWORKING" = "no" ] && exit 0

nginx="/usr/local/nginx/sbin/nginx"
prog=$(basename $nginx)

NGINX_CONF_FILE="/usr/local/nginx/conf/nginx.conf"

lockfile=/var/lock/subsys/nginx

start() {
[ -x $nginx ] || exit 5
[ -f $NGINX_CONF_FILE ] || exit 6
echo -n $"Starting $prog: "
daemon $nginx -c $NGINX_CONF_FILE
retval=$?
echo
[ $retval -eq 0 ] && touch $lockfile
return $retval
}

stop() {
echo -n $"Stopping $prog: "
killproc $prog -QUIT
retval=$?
echo
[ $retval -eq 0 ] && rm -f $lockfile
return $retval
}

restart() {
configtest || return $?
stop
start
}

reload() {
configtest || return $?
echo -n $"Reloading $prog: "
killproc $nginx -HUP
RETVAL=$?
echo
}

force_reload() {
restart
}

configtest() {
$nginx -t -c $NGINX_CONF_FILE
}

rh_status() {
status $prog
}

rh_status_q() {
rh_status >/dev/null 2>&1
}

case "$1" in
start)
rh_status_q && exit 0
$1
;;
stop)
rh_status_q || exit 0
$1
;;
restart|configtest)
$1
;;
reload)
rh_status_q || exit 7
$1
;;
force-reload)
force_reload
;;
status)
rh_status
;;
condrestart|try-restart)
rh_status_q || exit 0
;;
*)
echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|configtest}"
exit 2
esac

~~~~~~~~~~~~~~~~~~~~~~~~
