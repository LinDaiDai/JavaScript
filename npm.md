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

1.首先安装npm publish

```
npm i -g publish
```

2.创建自己的npm模块

创建空文件夹 `fm_lindaidai_first`

并在命令行输入

```
npm init
一路回车
```

此时出现`package.json`

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

在package.json同级目录下编写`data.js`

```
data.js

(function(global) {
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

**上面的data.js是添加简单的日期转换格式插件**



3.在npm上发布自己的模块

**注**

> 1.确保自己登录了
>
> 2.确保自己npm的邮箱被激活了
>
> 3.命名不能太简单,最后要有自己的标志,太简单可能是别人已经用过的名字你就不能发布成功,也不要有数字

在`fm_lindaidai_first`的命令行中输入指令

```
npm publish
```

成功之后会提示

```
+ fm_lindaidai_first@1.0.0
```



