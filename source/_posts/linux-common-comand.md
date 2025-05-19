---
title: linux-common-comand

categories: Programming
tags:
  - linux常用命令
toc: true
abbrlink: 13782
date: 2017-04-11 10:00:57
---

# linux 一些命令工具

## nginx basic 认证文件生成
```
yum install httpd-tools
htpasswd -c 生成的认证文件名 用户名
```

## 字符串搜索
```
grep -Ril '搜索内容' ./ 
./搜索当前目录
```
