---
title: luigi install

categories: Programming
tags:
  - luigi
  - 监控
toc: true
abbrlink: 60652
date: 2017-03-29 13:14:37
---

# luigi 安装

官方文档: [http://luigi.readthedocs.io/en/latest/](http://luigi.readthedocs.io/en/latest/)
中文: [https://github.com/17zuoye/luiti/blob/master/README.zh_CN.markdown](https://github.com/17zuoye/luiti/blob/master/README.zh_CN.markdown)
	  [http://blog.kissdata.com/2014/05/28/lugi.html#configuration](http://blog.kissdata.com/2014/05/28/lugi.html#configuration)

## 安装
系统: centos 6.5 64
python: 2.7
python2.7 安装参考[graphite-install-on-centos](/graphite-install-on-centos/)


#启动luigi服务端
默认端口: 8082
`/usr/local/python27/bin/luigid --background`

~~~~~~~~~~~~~~~~~~
[root@localhost luigi]# luigid -h
usage: luigid [-h] [--background] [--pidfile PIDFILE] [--logdir LOGDIR]
              [--state-path STATE_PATH] [--address ADDRESS]
              [--unix-socket UNIX_SOCKET] [--port PORT]

Central luigi server

optional arguments:
  -h, --help            show this help message and exit
  --background          Run in background mode
  --pidfile PIDFILE     Write pidfile
  --logdir LOGDIR       log directory
  --state-path STATE_PATH
                        Pickled state file
  --address ADDRESS     Listening interface
  --unix-socket UNIX_SOCKET
                        Unix socket path
  --port PORT           Listening port

~~~~~~~~~~~~~~~~~~





