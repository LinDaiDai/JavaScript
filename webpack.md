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

我们知道package.json是配置整个项目信息的js文件，对`npm`进行配置后可以在命令行中使用简单的`npm start`命令来替代上面略微繁琐的命令。在`package.json`中对`scripts`对象进行相关设置即可，设置方法如下。

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



正如上表所述，上述选项由上到下打包速度越来越快，不过同时也具有越来越多的负面作用，较快的打包速度的后果就是对打包后的文件的的执行有一定影响。

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

在上面的步骤中，我们在打包完成之后，都是通过打开本地的index.html这个文件来访问项目的，能不能构建一个本地服务器，类似于nodejs一样，可以访问localhost:8080或者其它端口号呢？

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



#### 3.3 使用Loaders

loaders是webpack提供的另一强大功能。通过使用不同的`loader`，`webpack`有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。

Loaders需要单独安装并且需要在`webpack.config.js`中的`modules`关键字下进行配置，Loaders的配置包括以下几方面：





