---
title: cherrypy

categories: Programming
tags:
  - python
  - cherrypy
abbrlink: 34480
date: 2016-07-28 16:30:03
---

```python
# -*- coding：utf-8 -*-
# json数据编辑功能
import cherrypy
import json
import sys
import os
import urllib.request
import time
import re
import codecs
import json
sys.path.append("../")

from mako.template import Template
from mako.lookup import TemplateLookup
from cherrypy.lib import auth_basic

output_dir = "work_path"
lookup = TemplateLookup(directories=['static'], input_encoding='utf-8')
USERS = {'vastio':'vastio'}

#===============================================================================
# save_json : 保存
#===============================================================================
def save_json(data, file_name):
    if data:
        output_file = codecs.open("%s/%s" % (output_dir, file_name), "w", "utf8")
        text = json.dumps(data, indent=1, sort_keys=True, ensure_ascii=False)
        output_file.write(text)
        output_file.close()
    
#===============================================================================
# get_json : 读取
#===============================================================================
def get_json(file_name):
    input_file = codecs.open("%s/%s" % (output_dir, file_name), "r", "utf8")
    text = input_file.read()
    data = json.loads(text)
    input_file.close()
    return data

#===========================================================================
# get_crontab
#===========================================================================
def get_crontab():
    crontab = get_json("crontab.json")
    return crontab

#===============================================================================
# save_crontab
#===============================================================================
def save_crontab(crontab):
    save_json(crontab, "crontab.json")

#===============================================================================
# error_page_404 : 404 error
#===============================================================================
def error_page_404(status, message, traceback, version):
    return "404 Error!"
    
#===============================================================================
# error_page_401 : 401 error
#===============================================================================
def error_page_401(status, message, traceback, version):
    return "login error 401 Error!"

#===============================================================================
# validate_password : basic 认证
#===============================================================================
def validate_password(realm, username, password):
    return True
    if username in USERS and USERS[username] == password:
        return True 
    return False
    
cherrypy.config.update({'server.socket_port':8080, "server.socket_host": "0.0.0.0", "engine.autoreload_on": True})
cherrypy.config.update({'error_page.404': error_page_404})
cherrypy.config.update({'error_page.401': error_page_401})

#===============================================================================
# OverviewController
#===============================================================================
class OverviewController():
    #===========================================================================
    # get_zrqk : 昨日情况
    #===========================================================================
    def get_zrqk(self):
        key_list = ["110呼入","有效报警","CK","移车警情","直处","下发","违法犯罪","交通","求助","举报","纠纷"]
        old_data = get_json("zrqk.json")
        value_list = []
        for key in key_list:
            if key in old_data:
                value_list.append(old_data[key])
            else:
                value_list.append(0)
        return key_list, value_list
    
    #===========================================================================
    # get_zrqk : 盘查入所拘留
    #===========================================================================
    def get_pc_rs_jl(self):
        key_list = ["今日盘查","今日入所","今日拘留","今日取保","今日逮捕"]
        old_data = get_json("pc_rs_jl.json")
        value_list = []
        for key in key_list:
            if key in old_data:
                value_list.append(old_data[key])
            else:
                value_list.append(0)
        return key_list, value_list
    
    #===========================================================================
    # get_jq_category : 警情分类
    #===========================================================================
    def get_jq_category(self):
        key_list = ["交通类警情","处警量","接警量","求助类警情","违法犯罪警情"]
        old_data = get_json("jq_category.json")
        zr_value_list = []
        tq_value_list = []
        for key in key_list:
            if key in old_data["同期"]:
                tq_value_list.append(old_data["同期"][key])
            else:
                tq_value_list.append(0)
            
            if key in old_data["昨日"]:
                zr_value_list.append(old_data["昨日"][key])
            else:
                zr_value_list.append(0)
        return key_list, zr_value_list, tq_value_list
    
    #===========================================================================
    # get_crontab
    #===========================================================================
    def get_crontab(self):
        try:
            crontab = get_crontab()
        except:
            crontab = {}
        crontab_list = ["zrqk_crontab", "jq_category_crontab", "pc_rs_jl_crontab"]
        result = []
        for key in crontab_list:
            if key not in crontab:
                result.append(False)
            else:
                result.append(crontab[key])
        return result
    
    #===========================================================================
    # save_crontab
    #===========================================================================
    def save_crontab(self, key, value):
        crontab = get_crontab()
        if value in [True, "1", "true", "True", "TRUE", "yes", "YES", "Yes", 1]:
            tmp_value = True
        else:
            tmp_value = False
        
        crontab[key] = tmp_value
        save_crontab(crontab)
        
    #===========================================================================
    # index
    #===========================================================================
    @cherrypy.expose
    def index(self):
        zrqk_key_list, zrqk_value_list = self.get_zrqk()
        pc_rs_jl_key_list, pc_rs_jl_value_list = self.get_pc_rs_jl()
        jq_category_key_list, zr_value_list, tq_value_list = self.get_jq_category()
        tmpl = lookup.get_template("index_table.html")
        zrqk_crontab, jq_category_crontab, pc_rs_jl_crontab = self.get_crontab()
        print (zrqk_crontab, jq_category_crontab, pc_rs_jl_crontab)
        return tmpl.render(TATLE_TEMPLATE_TEXT="吴江大屏", zrqk_key_list=zrqk_key_list, zrqk_value_list=zrqk_value_list,
                           pc_rs_jl_key_list=pc_rs_jl_key_list, pc_rs_jl_value_list=pc_rs_jl_value_list,
                           jq_category_key_list=jq_category_key_list, zr_value_list=zr_value_list, tq_value_list=tq_value_list,
                           zrqk_crontab=zrqk_crontab, jq_category_crontab=jq_category_crontab, pc_rs_jl_crontab=pc_rs_jl_crontab)

    #===========================================================================
    # poi 取得
    #===========================================================================
    @cherrypy.expose
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def update(self, name = None, **kwargs):
        result = {}
        if name == "zrqk":
            self.save_crontab("zrqk_crontab", kwargs["crontab"])
            del kwargs["crontab"]
            
            save_json(kwargs, "zrqk.json")
            result['data'] = kwargs
            result['status'] = "success"
            result['code'] = 200
            
        elif name == "pc_rs_jl":
            self.save_crontab("pc_rs_jl_crontab", kwargs["crontab"])
            del kwargs["crontab"]

            save_json(kwargs, "pc_rs_jl.json")
            result['data'] = kwargs
            result['status'] = "success"
            result['code'] = 200
        elif name == "jq_category":
            self.save_crontab("jq_category_crontab", kwargs["crontab"])
            del kwargs["crontab"]
            
            tmp_value = {}
            for tmp_key in kwargs:
                key_one, key_two = tmp_key.split("_")
                if key_one not in tmp_value:
                    tmp_value[key_one] = {}
                tmp_value[key_one][key_two] = kwargs[tmp_key]
            save_json(tmp_value, "jq_category.json")
            result['data'] = tmp_value
            result['status'] = "success"
            result['code'] = 200
        else:
            pass
        return result
        
    
overview = OverviewController()

parent_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = parent_dir.replace("\\", "/")
static_dir = "%s/%s" % (parent_dir, 'static/')
print (parent_dir, static_dir)
conf = {
        
        'crime': {'request.dispatch': cherrypy.dispatch.RoutesDispatcher(),
                  
            },
        '/': {
                'tools.auth_basic.on': True,
                'tools.auth_basic.realm': 'wu jiang',
                'tools.auth_basic.checkpassword': validate_password
            },
        '/static': {
        'tools.staticdir.on': True,
        'tools.staticdir.root': parent_dir,
        'tools.staticdir.dir': 'static',
        'tools.staticdir.index': 'index.html'
    }
}

if __name__=='__main__':
    cherrypy.quickstart(overview, '/', config=conf)

```


{% asset_img QQ图片20160808104037.png image1 %}

{% asset_img QQ图片20160808104054.png image2 %}

{% asset_img QQ图片20160808104058.png image3 %}