---
title: pydev template
tags:
  - python
  - pydev
  - eclipse
abbrlink: 15591
date: 2017-03-10 09:22:05
---

# pydev 使用模板新建代码
## 新建模板
{% asset_img 1.png 1 %}
{% asset_img 2.png 2 %}
{% asset_img 3.png 3 %}

## 使用模板创建文件
{% asset_img 4.png 4 %}
{% asset_img 5.png 5 %}
{% asset_img 6.png 6 %}

## 例子:

### 接受命令行参数: my argparse
```python
# -*- coding: utf-8 -*-
'''
${module} -- ${shortdesc}

${module} -- ${description} 

@author:    user name
@copyright: .com All rights reserved.
@contact:   @email.com
@created:   ${date}
'''

import sys
import os
import re
import json
import argparse
import platform

#===============================================================================
# get_args : 获得命令行参数
#===============================================================================
def get_args():
    if len(sys.argv) == 1:
        print ("place use:\npython3 %s -h" % sys.argv[0])
        #sys.exit(0)
        
    parser = argparse.ArgumentParser(description=u'')
    parser.add_argument('--init', help=u"init default=False", default="False", choices=["True", "False"], required=True)
    args = parser.parse_args()
    args.init = True if args.init == "True" else False
    return args

if __name__ == "__main__":
    args = get_args()

```


### 类: Module: Class
```python
# -*- coding: utf-8 -*-
'''
${module} -- ${shortdesc}

${module} -- ${description} 

@author:    user name
@copyright: .com All rights reserved.
@contact:   @email.com
@created:   ${date}
'''

import sys
import os
import json

class ${MyClass}(${object}):
    '''
    ${classdocs}
    '''
    def __init__(self, ${params}):
        '''
        ${Constructor}
        '''
        ${cursor}
```