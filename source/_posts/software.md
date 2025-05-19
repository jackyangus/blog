---
title: software
tags:
  - 软件
abbrlink: 7119
date: 2017-02-13 10:58:55
---

# 1. 准备
	1. windows推荐装win10 64位 VOL专业版/企业版 系统下载http://msdn.itellyou.cn/
ed2k://|file|cn_windows_10_multiple_editions_version_1607_updated_jul_2016_x64_dvd_9056935.iso|4347183104|35EA5DB0F3BB714F5CE0740FB89D82D1|/
	2. windows上开发环境推荐使用32位, x86为32位
	3. linux系统使用64位,x64为64位

# 2. 工具
	1. xshell ssh工具

		1. 官网 https://www.netsarang.com/products/xsh_overview.html

	2. xftp ftp工具

		1. 官网 https://www.netsarang.com/products/xfp_overview.html

	3. sshfs 把linux机器映射为网络硬盘,方便在windows上操作

		1. 使用文档 http://igikorn.com/sshfs-windows-8/

	4. navicate 数据库工具

		1. 官网 https://www.navicat.com/
		2. 文档 https://www.navicat.com.cn/manual/pdf_manual/cn/navicat/win_manual/navicat_cs.pdf
		3. 快捷键

			1. Ctrl + q 打开查询窗口
			2. Ctrl + r 执行sql
			3. F5刷新

		4. 其他

			1. 表名的修改没用确认按钮,取消ESC
			2. 有些物视是看不到的,当时可以通过sql查询出数据
			3. 写sql时默认是查询用户下的表,其他模式要带所在的模式

	5. sublime 文本编辑器

		1. 官网 https://www.sublimetext.com/
		2. 文档 http://lucida.me/blog/sublime-text-complete-guide/

	6. RegexBuddy 正则表达式

		1. 官网 https://www.regexbuddy.com/
		2. 文档 http://www.cnblogs.com/Zjmainstay/p/regex-tool-regexbuddy.html

	7. window系统知识

		1. 命令行 cmd/powershell

			1. 查看本机网卡的配置 ipconfig
			2. 清空域名缓存 ipconfig /flushdns
			3. win10 redstore 更新可以在cmd中使用linux命令, 必须为win10专业版和企业版

				1. wget
				2. curl

			4. bat 命令行下可运行的文件,编写bat文件要注意

				1. bat文件换行必须使用\r\n,也叫CR+LF
				2. 必须要进入然工作目录,cmd 默认是C盘,如要进入d:\nginx 要进行两步

					1. cd d:\nginx
					2. d:

			5. 其他 cmd命令行输出的编码是gbk编码,所以utf8编码的中文内容会乱码

		2. 注册表 regedit
		3. 服务 services.msc

			1. windows禁用自动更新

		4. 计划任务

			1. 开机自动启动nginx

		5. 防火墙

			1. 端口 HTTP 80，FTP 20/21，Telnet 23，SMTP 25，DNS 53

	8. linux系统知识, 防火墙,网络

		1. 网络

			1. 域名 www.vastio.com  二级域名.一级域名.顶级域名
			2. 域名服务器 8.8.8.8/114.114.114/路由器ip
			3. ip

				1. 公网地址
				2. 私网地址

			4. 子网掩码
				1. 255.255.0.0

			5. 路由

				1. 路由表

		2. 防火墙

			1. 进/出
			2. 转发

	9. 代码风格

		1. 谷歌代码规范 http://zh-google-styleguide.readthedocs.io/en/latest/contents/
		2. 文件编码 utf8
		3. 换行使用Unix风格\n也就是LF

	10. markdown

		1. markdown风格 https://docs.gitlab.com/ee/user/markdown.html

	11. Git 版本管理

		1. 官网 https://git-scm.com/
		2. 文档 https://git-scm.com/book/zh/v2
		3. pull 和fetch的区别 : https://www.oschina.net/translate/git-fetch-and-merge

	12. TortoiseGit/SourceTree Git gui工具

		1. 官网 https://tortoisegit.org/
		2. 文档 http://www.cnblogs.com/qiantuwuliang/archive/2010/12/29/1920723.html
		3. TortoiseGit 解决冲突 http://blog.csdn.net/jerome_s/article/details/44992745
		4. SourceTree mac推荐使用,需要注册账号

	13. winmerge 文件/文件夹比较

		1. 官网 http://winmerge.org/?lang=en
		2. 合并后会生成备份文件,在Options->backup files 取消Append .bak -extension

	14. docker+Kitematic  本机开发环境配置(需要路由器翻墙,公司wifi V-Guest),公安网环境下目前还无法使用

		1. docker

			1. 官网 https://www.docker.com/
			2. docker 优势介绍 http://dockone.io/article/389
			3. 文档 https://github.com/yeasy/docker_practice

		2. kitematic 提供图像界面管理docker

			1. 官网 https://kitematic.com/
			2. 使用需要创建账号 https://hub.docker.com/

	15. 其他重型IDE

		1. eclipse

			1. pydev 开发
			2. startexplorer http://basti1302.github.io/startexplorer/ 在eclipse中快速打开文件夹和cmd
			3. eclipse theme http://www.eclipsecolorthemes.org eclipse主题插件

		2. jetbrains https://www.jetbrains.com
			1. PyCharm python 开发
			2. WebStorm web开发
			3. PhpStorm php web开发

		3. aptana http://www.aptana.com/
			1. python web 开发

		4. atom https://atom.io/
		5. visual studio

	16. 文档管理

		1. Evernot
		2. 有道云笔记

	17. chrome 插件

		1. 插件离线下载 http://chrome-extension-downloader.com/
		2. 插件离线安装 http://www.cnplugins.com/zhuanti/how-to-make-crx-install.html
		3. sense ElasticSearch快速调试 https://chrome.google.com/webstore/detail/sense-beta/lhjgkmllcaadmopgmanpapmpjgmfcfig?utm_source=chrome-app-launcher-info-dialog
		4. JSONView  友好查看json数据 https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?utm_source=chrome-app-launcher-info-dialog
		5. 谷歌翻译 划词翻译 https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb?utm_source=chrome-app-launcher-info-dialog
		6. ColorZilla ccs调试,颜色选择 https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?utm_source=chrome-app-launcher-info-dialog
		7. Axure 扩展 https://chrome.google.com/webstore/detail/axure-rp-extension-for-ch/dogkpdfcklifaemcdfbildhcofnopogp?utm_source=chrome-app-launcher-info-dialog
		8. Advanced REST client  api请求调试 https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo?utm_source=chrome-app-launcher-info-dialog
		9. ad block 屏蔽广告 https://chrome.google.com/webstore/detail/gighmmpiobklfepjocnamgkkbiglidom?utm_source=chrome-app-launcher-info-dialog
		10. 印象笔记插件 https://chrome.google.com/webstore/detail/pioclpoplcdbaefihamjohnefbikjilc?utm_source=chrome-app-launcher-info-dialog





