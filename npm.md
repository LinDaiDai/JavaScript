## npm



### 第一章 登录npm

```
npm adduser //创建用户
or
npm login //登录用户
```

可以使用

```
npm whoami
```

检测用户是否登录



### 第二章 发布模块

#### 1.首先安装npm publish

```
npm i -g publish
```



#### 2.创建自己的npm模块

创建空文件夹 `fm_lindaidai_first`

并且在命令行输入

```
npm init
一路回车
```

此时会出现`package.json`

```
{
  "name": "fm_lindaidai_first",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "lindaidai",
  "license": "ISC"
}

```

在package.json同级目录下编写`date.js`

```
date.js

(function(global) {
	'use strict';

    var datachange = (function() {
        return function(date) {
            var date = date || new Date;
            if (!date instanceof Date) {
                data = new Date(date);
            }

            if (isNaN(data)) {
                throw TypeError('Invalid date');
            }
            let enDate = date.getFullYear() + "." + (date.getMonth()+1) + "." + date.getDate();
            return enDate;
        }
    })();

    if (typeof define === 'function' && define.amd) {
        define(function () {
          return datechange;
        });
      } else if (typeof exports === 'object') {
        module.exports = datechange;
      } else {
        global.datechange = datechange;
      }

})(this);
```

**上面的date.js是添加简单的日期转换格式插件**

由于命名的是date.js，因此记得将package.json中的“main”修改为date.js

否则别人使用的时候就会报错



#### 3.在npm上发布自己的模块

**注**

> 1.确保自己是登录了的
>
> 2.确保自己npm的邮箱被激活了
>
> 3.命名不能太简单,最后要有自己的标志,太简单可能是别人已经用过的名字你就不能发布成功,也不要有数字
>
> 4.如果是要再次推送同一个项目记得修改版本号。

在`fm_lindaidai_first`的命令行中输入指令

```
npm publish
```

成功之后会提示

```
+ fm_lindaidai_first@1.0.0
```



#### 4.使用自己的模块

可以直接在项目中使用

```
npm i --save-dev fm_lindaidai_first
```

接下来可以安装自己的模块

接下来可以在项目中使用

```
var datechange = require('fm_lindaidai_first');
var now = new Date();
var timeStamp = datechange(now);
```



### 第三章 创建vue组件并发布

