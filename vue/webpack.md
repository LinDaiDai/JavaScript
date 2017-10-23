# webpack

## 1. 安装webpack

全局安装webpack

```
$ npm install webpack -g
```



在E:\每日笔记\vue\新建文件夹	创建一个文件夹webpack1



## 2. 配置webpack

文件夹webpack1创建 **webpack.config.js** 它的作用和gulpfile.js一样就是一个配置项，设置 webpack 任务功能。



- entry 入口文件 让webpack用哪个文件作为项目的入口
- output 出口 让webpack把处理完成的文件放在哪里
- module 模块 要用什么不同的模块来处理各种类型的文件
- plugins 是插件项
- resolve 用来设置路径指向
- watch 用监听文件有改动后执行打包

**1.webpack.config.js文件**

```
module.exports = {
    entry:'./module/main.js',		//指定入口文件为main.js
    output:{
        filename:"./js/bundle.js"	//指定处理完成的文件放在js文件夹下的bundle.js(无需我们手动创建)
    }
}
```

**2.main.js文件**

```javascript
var obj = require("./show");
obj.show.show1(1,2);
```

**3.show.js文件**

```
exports.show = {
    show1 (a,b) {
      console.log(a+b)
      return a+b
    }
  }
```



**4.webpack命令**

```
//在webpack1文件夹目录下输入一下指令来打包
$ webpack
```



完成之后,可以看到webpack1文件夹下多了一js文件夹,其中有一个`bundle.js`文件



## 3. 创建主页面并应用bundle.js

在webpack1下创建index.html并引用bundle.js



```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
</body>
<script src="js/bundle.js"></script>
</html>
```



打开页面,打开控制台,可以看到输出`3`.



## 4. 配置多个入口文件



上面的例子中,我们使用的只有一个`main.js`文件入口

如何配置多个入口文件?

需要引入CommonsChunkPlugin,这个属于webpack内置的一个插件，需要在当前目录安装webpack(使用指令npm install webpack)

作用是：用于提取多个入口文件的公共脚本部分



> 1.在E:\每日笔记\vue\新建文件夹	创建一个文件夹webpack2

> 2.在webpack2中创建webpack.config.js

```javascript
//用于提取多个入口文件的公共脚本部分
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var webpack = require('webpack');

module.exports = {
  entry: {
    bundle1:"./module/page01",
		bundle2:"./module/page02"
  },
  output: {
    /* 
      [name]->entry的键名
    */
    filename: './js/[name].js'
  },
  /* 
    plugins接收的是一个数组
  */
  plugins: [
    // 不需要加.js，会自动添加.js后缀
    new CommonsChunkPlugin('./common')
  ]
}
```



> 3.在webpack2创建一个module文件夹,文件夹中:

​	1.page01.js

```javascript
var show = require('./show')
alert(show.sum(3, 8))
```

​	2.page02.js

```javascript
var show = require('./show')
alert(show.sum(5, 9))
```

​	3.show.js

```javascript

exports.sum = function (a, b) {
  console.log(a + b)
  return a + b
}
```

> 4.安装webpack
>
> 执行指令:
>
> ```javascript
> $npm install webpack
> ```
>
> 文件夹下出现node_modules文件夹,里面存放的就是一些依赖
>
> 
>
> 5.执行指令:

```javascript
$ npm init		回车,回车,回车....
```

文件夹下出现package.json文件

可以看到里面是一些配置信息

```json
{
  "name": "webpack2",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```



> 5.执行指令:

```javascript
$ webpack
```

webpack2目录下出现一个js文件夹.文件夹中有:

```javascript
bundle.js	bundle.js	common.js
```

说明打包成功

5.在webpack2目录下创建`page01.html`和`page02.html`文件

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
</body>
<script src="js/common.js"></script>
<script src="js/bundle1.js"></script>
</html>
```

`page02.html`文件

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>page02</title>
</head>
<body>
  
</body>
<script src="js/common.js"></script>
<script src="js/bundle2.js"></script>
</html>
```

分别打开page01和page02

可以看到弹出不同的数字11 和14



## 5. 安装es6转es5模块

**1.安装es6转es5模块**

```
$ npm install babel-core babel-loader babel-preset-es2015
```





**2.配置设置webpack.config.js**			

```javascript
module.exports = {
    ...
    module: {            
        loaders:[                
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader' 
            },
        ]
    }
}
```

**3.配置设置`.babelrc`文件**

需要注意，在es6转es5的时候在`webpack.config.js`同级目录也要添加`.babelrc`文件，并写入：

```javascript
{
  "presets": [
    "es2015"
  ]
}
```



## 6. less

**1.打包样式和转换less或sass**

```
//安装出来css模块
$ npm install style-loader css-loader 
//安装转less模块
$ npm install less-loader less
//安装转sass模块
$ npm install sass-loader node-sass
```

如果你只想使用less,可以连写

```
npm i webpack style-loader css-loader less-loader less
```



**2.编写less和sass文件**

less

```
@color:#666;
body{
    background:@color/2;
}
```

sass

```
$color: red;
body{
    background:$color;
}
```



**3.配置设置webpack.config.js**

```javascript
module.exports = {
    entry:'./module/main.js',
    output:{
        filename:"./js/bundle.js"
    },
    module: {
        // webpack使用loader的方式来处理各种各样的资源，比如说样式文件，我们需要两种loader，css-loader 和 style－loader，css-loader会遍历css文件
        loaders:[       
            {
                test: /\.(css|less)$/, 
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    resolve: {
         //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.css',".less"],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            style : '../css/style.less',//后续直接 require('style') 即可
        }
    },
    watch:true//监听文件一旦改变重新打包
}
```



**4.在main.js引用**

```
require('../styles/style1.css');
require('../styles/style2.less')
```



案例:

1.创建文件夹webpack4,并使用:

```
npm i webpack style-loader css-loader less-loader less
```

出现node_modules



2.

```
$npm install webpack
```

出现package-lock.json



3.

```
$npm init	回车回车....
```

出现package.json



4.

创建webpack.config.js并配置

```javascript
module.exports = {
    entry:'./module/main.js',
    output:{
        filename:"./js/bundle.js"
    },
    module: {
        // webpack使用loader的方式来处理各种各样的资源，比如说样式文件，我们需要两种loader，css-loader 和 style－loader，css-loader会遍历css文件
        loaders:[       
            {
                test: /\.(css|less)$/, 
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    resolve: {
         //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.css',".less"],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            style : '../css/style.less',//后续直接 require('style') 即可
        }
    },
    watch:true//监听文件一旦改变重新打包
}
```



5.创建文件夹module里面有一个`main.js`文件	

```
require('../styles/style1.css');
require('../styles/style2.less')
```



6.创建index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  我是Body
</body>
<script src="js/bundle.js"></script>
</html>
```



7.创建styles文件夹里面有一个`style1.css`文件和一个`style2.less`文件

```
body{
    background: red
}
```

```
@color: gray;

body{
    color:@color;
}
```



现在打开index.html页面

可以看到body变红,字体变灰

**如果在组件中,直接使用less的话,要在style中加上`lang="less"`**

```
<style lang="less"></style
```

