## webpack



### 第一章 webpack简介

**什么是webpack**	

WebPack可以看做是**模块打包机**：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。



**WebPack和Grunt以及Gulp相比有什么特性**	

其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack在很多场景下可以替代Gulp/Grunt类的工具。

Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，工具之后可以自动替你完成这些任务。

Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。

如果实在要把二者进行比较，Webpack的处理速度更快更直接，能打包更多不同类型的文件。



### 第二章 使用webpack



#### 2.1 安装

```
//全局安装
npm install -g webpack
//安装到你的项目目录
npm install --save-dev webpack
```



#### 2.2 开始前的准备

第一步，生成package.json

可以创建一个新的文件夹，如为myWebpack

cd进入myWebpack文件夹下，使用

```
npm init
```

使用此指令之后，终端会问你一系列诸如项目名称，项目描述，作者等信息，不过不用担心，如果你不准备在npm中发布你的模块，这些问题的答案都不重要，回车默认即可。

在文件夹下就自动创建了这个package.json文件。

第二步，安装webpack

继续使用指令

```
npm i --save-dev webpack
```

使用指令之后，可以看到项目目录下多出了依赖包node_modules，同时package.json下的依赖信息也会出现webapck

第三步，创建项目的内容

回到之前的myWebpack文件夹，并在里面创建两个文件夹,app文件夹和public文件夹，app文件夹用来存放原始数据和我们将写的JavaScript模块，public文件夹用来存放之后供浏览器读取的文件（包括使用webpack打包生成的js文件以及一个`index.html`文件）。接下来我们再创建三个文件:

- `index.html` --放在public文件夹中;
- `Greeter.js`-- 放在app文件夹中;
- `main.js`-- 放在app文件夹中;

index.html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Webpack Sample Project</title>
  </head>
  <body>
    <div id='root'>
    </div>
    <script src="bundle.js"></script>
  </body>
</html>
```

index.html中引入的bundle.js即为我们等会打包之后的js文件

Greeter.js

```
module.exports = function () {
    var greet = document.createElement('div');
    greet.textContent = "This is my first webpack";
    return greet;
};
```

main.js

```
const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter());
```

此时项目文件的结构为

![项目文件结构](D:\wenjian\javascript\JavaScript\webpackImg\webpack1.png)



#### 2.3 第一次打包

完成上面的步骤之后，就可以尝试第一次打包了

1.若是你的webpack不是全局安装的，则需要到指定的目录进行打包

在终端输入

```
# webpack非全局安装的情况
node_modules/.bin/webpack app/main.js public/bundle.js
```



2.也可以通过配置文件来使用webpack

配置文件其实是一个简单的js模块，可以把所有有关的打包信息放在里面

在当前根目录下创建一个js文件，文件名为webpack.config.js

```
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
```

**注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。**

有了这个配置之后，再打包文件，只需在终端里运行`webpack(非全局安装需使用node_modules/.bin/webpack)`命令就可以了，这条命令会自动引用`webpack.config.js`文件中的配置选项。

在终端输入

```
webpack
```

结果为

![打包命令](D:\wenjian\javascript\JavaScript\webpackImg\webpack2.png)



可以看出`webpack`同时编译了`main.js` 和`Greeter,js`,现在打开`index.html`,可以看到如下结果

![webpack3](D:\wenjian\javascript\JavaScript\webpackImg\webpack3.png)

完成了以上步骤，已经成功完成了第一次webpack打包



#### 2.4 更快捷的打包方式

我们知道package.json就是配置整个项目信息的js文件，对`npm`进行配置后可以在命令行中使用简单的`npm start`命令来替代上面略微繁琐的命令。在`package.json`中对`scripts`对象进行相关设置即可，设置方法如下。

```
{
  "name": "mywebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack" // 修改的是这里，JSON文件不支持注释，引用时请清除
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.6.0",
    "webpack-cli": "^2.0.15"
  }
}
```

现在只需要使用`npm start`就可以打包文件了

```
npm start
```

此时也可以打包成功。



### 第三章 webpack的强大功能

#### 3.1 生成Source Maps(调试)

开发离不开调试，不过有时候通过打包后的文件，不容易找到出错的地方，对应你的代码位置，而source maps就是帮助我们解决这个问题的。

在`webpack`的配置文件中配置`source maps`，需要配置`devtool`，它有以下四种不同的配置选项，各具优缺点，描述如下：

| devtool选项                      | 配置结果                                     |
| ------------------------------ | ---------------------------------------- |
| `source-map`                   | 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的`source map`，但是它会减慢打包速度； |
| `cheap-module-source-map`      | 在一个单独的文件中生成一个不带列映射的`map`，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便； |
| `eval-source-map`              | 使用`eval`打包源文件模块，在同一个文件中生成干净的完整的`source map`。这个选项可以在不影响构建速度的前提下生成完整的`sourcemap`，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项； |
| `cheap-module-eval-source-map` | 这是在打包文件时最快的生成`source map`的方法，生成的`Source Map` 会和打包后的`JavaScript`文件同行显示，没有列映射，和`eval-source-map`选项具有相似 |



正如上表所述，选项由上到下打包速度越来越快，不过同时也具有越来越多的负面作用，较快的打包速度的后果就是对打包后的文件的的执行有一定影响。

对小到中型的项目中，`eval-source-map`是一个很好的选项，再次强调你只应该开发阶段使用它，我们继续对上文新建的`webpack.config.js`，进行如下配置:

```
module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  }
}
```

> `cheap-module-eval-source-map`方法构建速度更快，但是不利于调试，推荐在大型项目考虑时间成本时使用。



#### 3.2 构建本地服务器

> webpack-dev-server

在上面的步骤中，我们在打包完成之后，都是通过打开本地的index.html这个文件来访问项目的，但是能不能构建一个本地服务器，类似于nodejs一样，可以访问localhost:8080或者其它端口号呢？

同时可以让浏览器监听你的代码的修改，并自动刷新显示修改后的结果。

其实`Webpack`提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，可以实现你想要的这些功能，不过它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖

```
npm i --save-dev webpack-dev-server
```

devserver是webpack.config.js中的一个配置项，具体的配置项在[devserver](https://link.jianshu.com/?t=https://webpack.js.org/configuration/dev-server/)

这里列举了几项常用的配置项

| devserver的配置选项     | 功能描述                                     |
| ------------------ | ---------------------------------------- |
| contentBase        | 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录） |
| port               | 设置默认监听端口，如果省略，默认为”8080“                  |
| inline             | 设置为`true`，当源文件改变时会自动刷新页面                 |
| historyApiFallback | 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为`true`，所有的跳转将指向index.html |

把这些命令加到webpack的配置文件中，现在的配置文件`webpack.config.js`如下所示

```
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 8080  
    }
}
```

然后在package.json中的scripts对象中配置指令

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open"
  },
```

在终端中输入`npm run server`即可在本地的`8080`端口查看结果



#### 3.3 Loaders简介

loaders是webpack提供的另一强大功能。通过使用不同的`loader`，`webpack`有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。

Loaders需要单独安装并且需要在`webpack.config.js`中的`modules`关键字下进行配置，Loaders的配置包括以下几方面：

`test`：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）

`loader`：loader的名称（必须）

`include/exclude`:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；

`query`：为loaders提供额外的设置选项（可选）



在配置Loaders之前，我们将Greeter.js中的文本内容放在一个单独的json中，然后进行引用

在app下创建config.json

```
{
    "greetText": "This is my first webpack111"
}
```

修改Greeter.js

```
var config = require('./config.json');
module.exports = () => {
    var greet = document.createElement('div');
    greet.textContent = config.greetText;
    return greet;
};
```

> **注** 由于`webpack3.*/webpack2.*`已经内置可处理JSON文件，这里我们无需再添加`webpack1.*`需要的`json-loader`。在看如何具体使用loader之前我们先看看Babel是什么？







#### 3.4 Babel

Babel其实是一个编译JavaScript的平台，它可以编译代码帮你达到以下目的：

- 让你能使用最新的JavaScript代码（ES6，ES7...），而不用管新标准是否被当前使用的浏览器完全支持；
- 让你能使用基于JavaScript进行了拓展的语言，比如React的JSX；

Babel其实是几个模块化的包，其核心功能位于称为`babel-core`的npm包中，webpack可以把其不同的包整合在一起使用，对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析Es6的`babel-env-preset`包和解析JSX的`babel-preset-react`包）。



可以进行一次性的安装：

```
// npm一次性安装多个依赖模块，模块之间用空格隔开
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react
```



接下来需要在webpack.config.js中配置Babel的方法

```
module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
```



**完成以上步骤之后，你的程序已经可以使用最新的JS语法和JSX语法了**



例如此处，以ES6和JSX为例

首先安装React和React-DOM

```
npm install --save react react-dom
```



在使用ES6和React的语法重新编写Greeter.js

```
import React, {Component} from 'react'
import config from './config.json';

class Greeter extends Component{
  render() {
    return (
      <div>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter
```

修改`main.js`如下，使用ES6的模块定义和渲染Greeter模块

```
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

render(<Greeter />, document.getElementById('root'));
```

重新使用`npm run server`打包，打开localhost:8080可以看到和前面一样的效果

这就说明react和es6被正常打包了。

#### 3.5 .babelrc文件

在上面的例子中，我们是将babel的配置项直接写在了webpack.config.js中进行配置的，在实际使用中，开发者喜欢将babel的配置选项放在一个单独的文件`.babelrc`中进行配置。

因此现在我们就提取出相关部分，分两个配置文件进行配置（webpack会自动调用`.babelrc`里的babel配置选项），如下：

webpack.config.js

```
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 8080  
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            }
        ]
    }
}
```

`.babelrc`文件

```
{
    "presets": [
        "env", "react"
    ]
}
```



#### 3.6 CSS

可以看到，上面介绍的Babel实际上的作用是使得开发者能够使用最新的JS写法和基于JS的拓展语言

经常说，webpack的优点就是，一切皆模块

把所有的文件都当作模块来处理，

那么webpack中是通过什么来处理css和fonts以及各种图片的呢。

webpack提供两个工具处理样式表，`css-loader` 和 `style-loader`

二者处理的任务不同：

`css-loader`使你能够使用类似`@import` 和 `url(...)`的方法实现 `require()`的功能,

`style-loader`将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中



安装css-loader和style-loader

使用指令

```
npm i --save-dev style-loader css-loader
```



我们在使用Balel时是要在webapck.config.js中进行配置的，而css也是

```
module.exports = {

   ...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    }
};
```



接下来，在app下创建一个main.css

```
html {
  box-sizing: border-box;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

h1, h2, h3, h4, h5, h6, p, ul {
  margin: 0;
  padding: 0;
}
div{
  color: red;
}
```



此处，我就将main.css导入main.js

```
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

import './main.css';//使用require导入css文件

render(<Greeter />, document.getElementById('root'));
```



再次使用指令`npm run server`打开页面，可以看到字体颜色为红色



> 通常情况下，css会和js打包到同一个文件中，并不会打包为一个单独的css文件，不过通过合适的配置webpack也可以把css打包为单独的文件的。



> 上面的代码说明webpack是怎么把css当做模块看待的，咱们继续看一个更加真实的css模块实践。



#### 3.7 CSS module

模块化使得前端的开发更加简洁明了，被称为CSS module的技术意在把JS的模块化思想带入css中。

Webpack对CSS模块化提供了非常好的支持，只需要在CSS loader中进行简单配置即可，

然后就可以直接把CSS的类名传递到组件的代码中，这样做有效避免了全局污染。具体的代码如下

```
module.exports = {

    ...

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }
                ]
            }
        ]
    }
};
```

我们在app文件夹下创建一个`Greeter.css`文件来进行一下测试

```
.green{
    color: green;
}
```

修改Greeter.js

```
import React, {Component} from 'react'
import config from './config.json';

import style from './Greeter.css';

class Greeter extends Component{
  render() {
    return (
      <div className={style.green}>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter
```

重新启动`npm run server`可以看到页面中的字变成了绿色



#### 3.8 css预处理器

`Sass` 和 `Less` 之类的预处理器是对原生CSS的拓展

CSS预处理器可以这些特殊类型的语句转化为浏览器可识别的CSS语句

几种常用的css预处理器

```
Less Loader
Sass Loader
Stylus Loader
```

不过其实也存在一个CSS的处理平台`-PostCSS`，它可以帮助你的CSS实现更多的功能，在其[官方文档](https://link.jianshu.com/?t=https://github.com/postcss/postcss)可了解更多相关知识。

**autoprefixer可以为css代码自动添加适应不同浏览器的CSS前缀。**

案例

首先安装`postcss-loader` 和 `autoprefixer`（自动添加前缀的插件）

```
npm install --save-dev postcss-loader autoprefixer
```

接下来，在webpack配置文件中添加`postcss-loader`，在根目录新建`postcss.config.js`,并添加如下代码之后，重新使用`npm run server`打包时，你写的css会自动根据Can i use里的数据添加不同前缀了。

webpack.config.js

```
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    }
}
```

postcss.config.js

```
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```



以上谈论的Babel和处理CSS的PostCSS的基本用法，它们其实是俩个单独的平台，但是配合webpack就可以发挥很好的作用。



#### 3.9 插件(Plugins)

插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。

它和Loaders是俩样不同的东西

Loaders是在打包构建过程中用来处理源文件的(sass,less,JSX)，一次处理一个文件

插件是在整个构建过程中起作用，并不直接操作单个文件。



**使用插件**

1.要使用某个插件的时候npm安装它

2.在webpack配置plugins关键字部分添加该插件的一个实例



##### 1. BannerPlugin

案例，在本项目中添加一个给打包后代码添加版权说明的插件

记得在webpack.config.js中引入webpack

```
const webpack = require('webpack');
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 8080
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('王先生版权所有')
    ],
}
```

打包之后的bundle.js中就会出现这条注释

![webpack4](D:\wenjian\javascript\JavaScript\webpackImg\webpack4.png)



下面为几款常用的插件



##### 2. HtmlWebpackPlugin

这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新的index.html。

使用之后，你不需要自己手动创建index.html，它会自动生成一个build文件夹

安装

```
npm install --save-dev html-webpack-plugin
```



在webpack.config.js中引入

```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 8080
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('王先生版权所有'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        })

    ],
}
```

此时可以删除public文件夹

将webpack.config.js中的output的配置项改为build文件夹

再次执行`npm start`你会发现，build文件夹下面生成了`bundle.js`和`index.html`。

![webpack5](D:\wenjian\javascript\JavaScript\webpackImg\webpack5.png)





##### 3. Hot Module Replacement

HMR也是webpack中很有用的一个插件，它允许你在修改组件代码后，自动刷新实时预览修改后的效果。

使用:

在webpack中实现HMR也很简单，只需要做两项配置

1. 在webpack配置文件中添加HMR插件；
2. 在Webpack Dev Server中添加“hot”参数；



不过配置完这些后，JS模块其实还是不能自动热加载的，

还需要在你的JS模块中执行一个Webpack提供的API才能实现热加载，

虽然这个API不难使用，但是如果是React模块，使用我们已经熟悉的Babel可以更方便的实现功能热加载。

​	整理下我们的思路，具体实现方法如下

- `Babel`和`webpack`是独立的工具
- 二者可以一起工作
- 二者都可以通过插件拓展功能
- HMR是一个webpack插件，它让你能浏览器中实时观察模块修改后的效果，但是如果你想让它工作，需要对模块进行额外的配额；
- Babel有一个叫做`react-transform-hrm`的插件，可以在不对React模块进行额外的配置的前提下让HMR正常工作；

在webpack.config.js中配置

```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 8080,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('王先生版权所有'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin() //热加载插件
    ],
}
```

同时在安装react-transform-hm

```
npm install --save-dev babel-plugin-react-transform react-transform-hmr
```

配置Babel

```
// .babelrc
{
  "presets": ["react", "env"],
  "env": {
    "development": {
    "plugins": [["react-transform", {
       "transforms": [{
         "transform": "react-transform-hmr",
         
         "imports": ["react"],
         
         "locals": ["module"]
       }]
     }]]
    }
  }
}
```

现在当你使用React时，可以热加载模块了,每次保存就能在浏览器上看到更新内容。



#### 总结

```
1.只有各个文件夹,没有webpack.config.js配置项
$ node_modules/.bin/webpack app/main.js public/bundle.js
需要指定路径，指定打包的入口文件,和打包后存放的路径

----->

2.配置了webpack.config.js文件
entry
output
指定了路径,打包后的存放路径
$ node_modules/.bin/webpack

------>

3.配置引导任务执行，在package.json中的scripts项配置
 "scripts": {
    "start": "webpack"
  }
$ npm start

------->

4.配置devtool,在webpack打包时生成source maps方便调试
在webpack.config.js中配置devtool
devtool: 'eval-source-map'

------->

5.构建本地服务器,浏览器可以监听代码的修改,安装devserver
   	1. $ npm i --save-dev webpack-dev-server
	2. 配置webpack.config.js
		devserver: {
          contentBase: "./public",// 本地服务器所加载的页面所在的目录
          historyApiFallback: true,// 不刷新
          inline: true //实时刷新 
		}
	3. 在package.json中配置指令
	"scripts": {
      "server": "webpack-dev-server --open"
	}
终端使用指令
$ npm run server 
就会自动打包然后自动打开浏览器localhos:8080

------->

6.安装配置Babel,可以使用ES6和JSX语法
  	1. $ npm i --save-dev babel-core babel-loader babel-preset-env babel-preset-react
	2. 配置webpack.config.js
		module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
此时可以使用ES6和JSX语法

------->

7. 单独配置.babelrc,将babel的配置选项单独剥离出来
	1. 去除webpack.config.js中的options选项
	2.创建.babelrc文件,并写入
		{
  			"presets": ["react", "env"]
		}

------>

8. 将css和fonts及图片也当成模块处理
	1. 安装style-loader和css-loader
		$ npm i --save-dev style-loader css-loader
	2. webpack.config.js中配置module下的rules
		{
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }
 此时可以使用import "./main.css" require导入css文件
 
 ------->
 
9. 使用CSS module可以将CSS文件也模块化,所有的类名动画名默认都只作用于当前模块
	在webpack.config.js中配置module下的rules下的css-loader
	{
      loader: "css-loader",
      options: {
        modules: true, // 指定启用css modules
        localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
      }
	}
此时可以使用import styleName from './Greeter.css' 导入css文件
通过 styleName.green 来设置类名

------->

10. 使用postcss-loader 和 autoprefixer 自动添加适应不同浏览器的CSS前缀
	1. $ npm i --save-dev postcss-loader autoprefixer
	2. webpack.config.js 添加loader
	{
		loader: "postcss-loader"
	}
	3. 创建postcss.config.js
		module.exports = {
          plugins: [
            require('autoprefixer')
          ]
		}
打包之后，css会自动添加适应不同浏览器的css前缀

------>

11. 添加版权声明插件
	在webpack.config.js中引入webpack
		cont webpack = require('webpack');
		module.exports = {
          ...
          plugins: [
            new webpack.BannerPlugin('王先生版权所有')
          ]
		}
此时,	通过这个插件,打包后的js文件中有版权说明

------>

12. HtmlWebpackPlugin,使用此插件,依据一个简单的index.html模板,生成一个自动你引用你打包后的JS文件的新的	 index.html
	1. $ npm i --save-dev html-webpack-plugin
	2.编写一个index.html模板
	2.webpack.config.js中配置
		const HtmlWebpackPlugin = require('html-webpack-plugin');
		module.exports = {
		  output: {
            path: __dirname + "/build",
            filename: "bundle.js"
		  }
          ...
          plugins: [
            ...
            new HtmlWebpackPlugin({
              template: __dirname + "app/index.tmpl.html"
            })
          ]
		}
使用这个插件之后,可以不用自己手动创建public文件夹,打包完毕之后自动生成build文件里面为打包后的内容
```





### 第四章 webpack优化问题

#### 4.1 产品阶级

目前为止，我们已经使用webpack构建了一个完整的开发环境。但是在产品阶段，可能还需要对打包的文件进行额外的处理，比如说优化，压缩，缓存以及分离CSS和JS。

对于复杂的项目来说，需要复杂的配置，这时候分解配置文件为多个小的文件可以使得事情井井有条，以上面的例子来说，我们创建一个`webpack.production.config.js`的文件，在里面加上基本的配置,它和原始的webpack.config.js很像，如下

```
// webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'null', //注意修改了这里，这能大大压缩我们的打包代码
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }, {
                    loader: "postcss-loader"
                }],
            })
        }]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin() //热加载插件
    ],
};
```

```
//package.json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open",
    "build": "NODE_ENV=production webpack --config ./webpack.production.config.js --progress"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
...
  },
  "dependencies": {
    "react": "^15.6.1",
    "react-dom": "^15.6.1"
  }
}
```

> **注意:**如果是window电脑，`build`需要配置为`"build": "set NODE_ENV=production && webpack --config ./webpack.production.config.js --progress"`

若还是安装报错，可以安装across-env:

```
npm install cross-env --save-dev
```







#### 4.2 插件优化

webpack提供了一些在发布阶段非常有用的优化插件，它们大多来自于webpack社区，可以通过npm安装，通过以下插件可以完成产品发布阶段所需的功能

- `OccurenceOrderPlugin` :为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
- `UglifyJsPlugin`：压缩JS代码；
- `ExtractTextPlugin`：分离CSS和JS文件

我们继续用例子来看看如何添加它们，OccurenceOrder 和 UglifyJS plugins 都是内置插件，你需要做的只是安装其它非内置插件

```
npm install --save-dev extract-text-webpack-plugin
```

在配置文件的plugins后引用它们

```
// webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'none',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css")
    ],
};

```

此时执行`npm run build`可以看见代码是被压缩后的

**本项目中无效**







#### 4.3 缓存

缓存无处不在，使用缓存的最好方法是保证你的文件名和文件内容是匹配的（内容改变，名称相应改变）

webpack可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前

```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
..
    output: {
        path: __dirname + "/build",
        filename: "bundle-[hash].js"
    },
   ...
};
```



#### 4.4 去除build中的残余文件

添加了`hash`之后，会导致改变文件内容后重新打包时，文件名不同而内容越来越多，因此这里介绍另外一个很好用的插件`clean-webpack-plugin`。

**安装**：

```
npm install clean-webpack-plugin --save-dev
```

**使用**：

引入`clean-webpack-plugin`插件后在配置文件的`plugins`中做相应配置即可：

```
const CleanWebpackPlugin = require("clean-webpack-plugin");
  plugins: [
    ...// 这里是之前配置的其它各种插件
    new CleanWebpackPlugin('build/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
  })
  ]
```





### 总结

接着第三章的总结

进行优化问题

```
1.通过添加hash值使每次打包之后的bunld.js文件名都不同
    output: {
        path: __dirname + "/build",
        filename: "bundle-[hash].js"
    },

------->

2.去除build中的残余文件
	1. $ npm install clean-webpack-plugin --save-dev
	2. const CleanWebpackPlugin = require("clean-webpack-plugin");
        plugins: [
          ...// 这里是之前配置的其它各种插件
          new CleanWebpackPlugin('build/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
          })
        ]
```



最终的代码

##### webpack.production.config.js

```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle-[hash].js"
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 8080,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('王先生版权所有'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        // new webpack.optimize.OccurrenceOrderPlugin(),//为组件分配ID
        // new webpack.optimize.UglifyJsPlugin(),//压缩JS代码
        // new ExtractTextPlugin("styles.css"),//分离CSS和JS文件
        new CleanWebpackPlugin('build/*.*', {//去除build文件中的残余文件
            root: __dirname,
            verbose: true,
            dry: false
        })
    ],
}
```

##### package.json

```
{
  "name": "mywebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open",
    "build": "set NODE_ENV=production && webpack --progress --colors --config webpack.production.config.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer": "^8.3.0",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.4",
    "babel-plugin-react-transform": "^3.0.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "clean-webpack-plugin": "^0.1.19",
    "cross-env": "^5.1.4",
    "css-loader": "^0.28.11",
    "extract-text-webpack-plugin": "^3.0.2",
    "html-webpack-plugin": "^3.2.0",
    "postcss-loader": "^2.1.4",
    "react-transform-hmr": "^1.0.4",
    "style-loader": "^0.21.0",
    "webpack": "^4.6.0",
    "webpack-cli": "^2.0.15",
    "webpack-dev-server": "^3.1.3"
  },
  "dependencies": {
    "react": "^16.3.2",
    "react-dom": "^16.3.2"
  }
}

```

##### .babelrc

```
{
  "presets": ["react", "env"],
  "env": {
    "development": {
    "plugins": [["react-transform", {
       "transforms": [{
         "transform": "react-transform-hmr",
         
         "imports": ["react"],
         
         "locals": ["module"]
       }]
     }]]
    }
  }
}
```

##### .postcss.config.js

```
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```

