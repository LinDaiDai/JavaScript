# vue基础



## 第一章: 安装vue

如果没有装cnpm可以使用`npm install cnpm -g`安装

 命令行工具(CLI)

```
1. 全局安装 vue-cli
$ npm install  vue-cli -g
2. 需要创建一个基于 webpack 模板的新项目
$ vue init webpack my-project	//1 vue指令, 2 初始化 3 webpack 4 项目名
3. 安装依赖，走你
$ cd my-project	//进入到当前目录下
$ npm install	//安装依赖
$ npm run dev	//运行项目
```



第一步:

​	npm install  vue-cli -g



![1](E:\vue\img\1.png)



第二步:

​	vue init webpack my-project

- `webpack`是vue-cli的webpack模板
- `my-project`是项目名称

![2](E:\vue\img\2.png)

可以看到文件夹中多了一个my-project文件夹

![3](E:\vue\img\3.png)







**目录文件介绍:**	

- `build`和`config`是webpack的配置文件

- node_modules中存放的是`npm install`安装的文件依赖代码库

- `src`文件是存放的是项目源码

- `static`存放的是第三方的静态资源，里面只有`.gitkeep`这个文件的意思是当这个目录为空也是可以提交git代码仓库里，如果没有这个文件git会忽略这个目录

- `.babelrc`这个文件是`babel`的一些配置,主要就是用于将es6的代码转成es5的,详细介绍：[babel](http://www.ruanyifeng.com/blog/2016/01/babel.html)

- `.editorconfig`是编辑器的一些配置

- `.gitignore`用于向git声明需要忽略提交的文件

- `.postcssrc.js`这个文件是postCSS的配置文件，postCSS是一款通过JS插件来转换CSS的工具，这些插件能帮你校验你的CSS代码、转换未来的CSS语法、支持变量和混写、以及内联图片等等，其中[自动前缀](https://github.com/postcss/autoprefixer)插件是PostCSS最受欢迎预处理器之一。默认就配置使用了`autoprefixer`也就是自动前缀的这个插件

- `index.html`就是入口的html文件，在编译打包过程中会将资源文件插入到这个html文件中

- ```
  package.json
  ```

  项目的配置文件，这个文件中是我们在初始化

  ```
  vue-clic
  ```

  的时候填入的信息：

  - 最重要的就是里面的`scripts`属性，表示的是我们可以执行的一些命令,比如`npm run dev`就是执行的`node build/dev-server.js`这个命令，然后`npm run build`就是执行的`node build/build.js`也就是打包的操作，我们也自己在`scripts`中去配置一些脚本
  - `dependencies`里面放的项目生产环境的一些依赖，然后在安装一些模块的时候可以通过`--save`保存到这个属性下，比如要使用`vue-router`就可以使用`npm install vue-router --save`
  - `devDependencies`里面放的编译过程中的一些依赖，在最后打包的时候不存在

- `README.md`就是项目的描述文件



第三步:

​	安装依赖

$ cd my-project		//跳到当前的项目文件夹(Shift + youj)
$ npm install			//安装依赖
$ npm run dev		//运行项目



## 第二章: vue的基本语法



### 2.1 引用vue

1.在页面中引入vue.js远程文件或者本地文件

```

<script src="https://unpkg.com/vue/dist/vue.js"></script>
```



2.本地引入vue.js

```
<script type="text/javascript" src="js/vue.js"></script>
```



### 2.2 数据绑定



> vue允许采用简洁的模板语法来声明式的将数据渲染进 DOM



**最简单的小例子**

例1:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test1</title>
    <script src="js/vue.min.js"></script>
</head>
<body>
<div id="app">
    {{message}}
</div>

<script>
    new Vue({
        el:"#app",
        data:{
            message:"First Vue"
        }
    })
</script>
</body>
</html>
```



new 一个vue对象的时候,你可以设置它的属性,其中最重要的包括三个,分别是data, methods, watch

data代表vue对象的数据,methods代表vue的方法,watch设置了对象监听的方法

vue对象里的设置通过**html指令**进行关联

重要的指令包括:

- v-text	渲染数据      (ng-bind)
- v-if        控制显示
- v-on          绑定事件
- v-for         循环渲染 等

```
new Vue({
  data:{
    a:1,
    b:[]
  }
  methods:{
    doSomething:function(){
      console.log('a')
    }
  }
  watch:{						
    'a':function(val, oldVal) {
      console.log(val, oldVal)
    }
  }
})
```


### 2.3 常用指令



#### 1. v-text

**预期**：`string`

更新元素的 `textContent`。如果要更新部分的 `textContent` ，需要使用 `{{ message}}` 插值。

**不能解析HTML标签**	

```
<div id="app" v-text="message"></div>
<--等价于-->
<div>{{message}}</div>

<script>
    new Vue({
        el:"#app",
        data:{
            message:"First Vue",
        },
    })
</script>  
=>	First Vue
```



#### 2. v-html

- **预期**：`string`

- **详细**：

  更新元素的 `innerHTML` 。**注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译**。如果试图使用 `v-html` 组合模板，可以重新考虑是否通过使用组件来替代。

  **就是能够解析HTML标签**	

```
<div id="app" v-html="html">

</div>

<script>
    new Vue({
        el:"#app",
        data:{
            message:"First Vue",
            html:'<span>我是span标签</span>'
        },
    })
</script>    
=>	我是span标签    
```





#### 3. 条件渲染



##### 1. v-if

> 在上面的例子中,我们是利用`v-show='isShow'`来实现元素隐藏显示

> 在 Vue.js ,我们使用 `v-if` 指令实现同样的功能

1.直接使用v-if

```
<body>
<div  id="app">
    <div  v-if="ok">yes</div>
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            ok:true
        },
    })
</script>
</body>
```



2.也可以用 `v-else` 添加一个 “else” 块:

```
<div  id="app">
    <div  v-if="ok">yes</div>
    <div  v-else>no</div>
</div>
```

**注:`v-else` 元素必须紧跟在 `v-if` 或者 `v-else-if` 元素的后面——否则它将不会被识别**



3.在`<template></template>`中配合`v-if`	条件渲染一整组

```html
<div  id="app">
    <template v-if="ok">		//显示
        <h1 v-else>Title</h1>	//隐藏
        <p v-else>Paragraph 1</p>	//隐藏
        <p>Paragraph 2</p>			//显示
    </template>
</div>

<script>
    new Vue({
        el:"#app",
        data:{
            ok:true
        },
    })
</script>
=>	页面只显示
		Paragraph
```



4.配合`v-else-if`使用

充当"if"的一个"else-if块"

可以链式的多次使用



##### 2. v-show

> 根据表达式之真假值，切换元素的 `display` CSS 属性。
>
> 当条件变化时该指令触发过渡效果。

> **当和 `v-if` 一起使用时，`v-show` 的优先级比 `v-if` 更高。**

```
<body>
<div id="app" v-text="message" v-show="isShow"></div>

<script>
    new Vue({
        el:"#app",
        data:{
            message:"First Vue",
            isShow:false
        },
    })
</script>
</body>

=>改变isShow的值控制div的隐藏
```



#### 4. v-for

**预期**：`Array | Object | number | string`

用法和`ng-repeat`一样	

> 遍历数组:

```
<body>
<div  id="app">
    <ul>
        <li v-for="(item, index) in arr">{{item.name}}</li>
    </ul>
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            arr:[
                {name:'买牙膏', down:false},
                {name:'打台球', down:false},
                {name:'听歌',  down:false},
                {name:'游戏',  down:false}
            ]
        },
    })
</script>
</body>
```



> 遍历对象

```html
<div  id="app">
    <ul>
        <li v-for="(val, key) in obj">{{key}}:{{val}}:{{index}}</li>
    </ul>
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            obj: {name:'王先生', age:21, sex:'男'},
        },
    })
</script>
=>
	name:'王先生' :0
	age:21 :1
	sex:'男' :2
```



> 遍历数字

```html
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```

结果:

```html
1 2 3 4 5 6 7 8 9 10
```



> v-for 和 v-if

当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。当你想为仅有的*一些*项渲染节点时，这种优先级的机制会十分有用，如下：

```
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

上面的代码只传递了未 complete 的 todos。

而如果你的目的是有条件地跳过循环的执行，那么可以将 `v-if` 置于外层元素 (或 [`)上。如：

```
<ul v-if="todos.length">	//只有当数组todos的长度大于0时才会执行循环
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
```



> 组件中的v-for

在组件中使用v-for,任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。为了把迭代数据传递到组件里，我们要用 `props` ：

```html
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```

不自动将 `item` 注入到组件里的原因是，这会使得组件与 `v-for` 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。

具体看**第三章组件中的`Prop`.**



#### 5. v-on

- **缩写**：`@`
- **预期**：`Function | Inline Statement | Object`
- **参数**：`event`



**语法:**

> 1.方法处理器		`v-on:event="functionName"`

例1:

```html
<div  id="app">
    <button v-on:click="doThis">点击</button>
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            obj: {name:'王先生', age:21, sex:'男'},
        },
        methods:{
            doThis() {
                alert('点击了我')
            }
        }
    })
</script>
```



> 2.对象语法    `v-on="{ event1: functionName1, event2:functionName2 }"`	

例1也可以这样写:

```html
<button v-on="{click: doThis}">点击</button>
```



3.缩写语法	`@event ="functionName"`		

```html
<button @click="doThis">点击</button>
```



**修饰符**

> vue中对事件也有一些修饰符,这些修饰符能帮我们省去很多事

- `.stop` - 调用 `event.stopPropagation()`。
- `.prevent` - 调用 `event.preventDefault()`。
- `.capture` - 添加事件侦听器时使用 capture 模式。
- `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
- `.native` - 监听组件根元素的原生事件。
- `.once` - 只触发一次回调。
- `.left` - (2.2.0) 只当点击鼠标左键时触发。
- `.right` - (2.2.0) 只当点击鼠标右键时触发。
- `.middle` - (2.2.0) 只当点击鼠标中键时触发。
- `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器

用法:

如:

```html
<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>
<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>
<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>
<!--  串联修饰符 -->
<button @click.stop.prevent="doThis"></button>
<!-- 键修饰符，键别名 -->
<input @keyup.enter="onEnter">
<!-- 键修饰符，键代码 -->
<input @keyup.13="onEnter">
<!-- 点击回调只会触发一次 -->
<button v-on:click.once="doThis"></button>
```



#### 6. v-bind

- **缩写**：`:`
- **预期**：`any (with argument) | Object (without argument)`
- **参数**：`数组(attr) Or 组件(Prop) 都是可选的(optional)`
- **修饰符**：
  - `.prop` - 被用于绑定 DOM 属性 (property).
  - `.camel`将 kebab-case 特性名转换为 camelCase. (从 2.1.0 开始支持)
  - `.sync` 语法糖，会扩展成一个更新父组件绑定值的 `v-on` 侦听器。
- **用法**

动态地绑定一个或多个特性，或一个组件 prop 到表达式。

##### 1.绑定属性

例1:

```html
<body>
<div  id="app">
    <img v-bind:src="imgSrc" alt="">
    <--   也可以简写为   -->
    <img :src="imgSrc" alt="">
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            imgSrc:'img/img1.jpg'
        },
    })
</script>
</body>
```



##### 2.绑定class

> v-bind:class=""
>
> :class=""
>
> 参数可以是一个判断语句,也可以直接传变量

用法和`ng-class`一样

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test1</title>
    <script src="js/vue.min.js"></script>
    <style>
        #app{
            width: 500px;
            height: 500px;
            background: red;
        }
        #app div{
            width: 200px;
            height: 200px;
        }
        .isRed{
            background: red;
        }
        .isBlue{
            background: blue;
        }
    </style>
</head>
<body>
<div  id="app">
   <div :class="{true: 'isRed', false: 'isBlue'}[isClass]"></div>
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            isClass: false
        },
    })
</script>
</body>
</html>
```



##### 3. 绑定style

> v-bind:style
>
> :style

```
<div :style="{background: 'blue', fontSize: 14 + 'px' }"></div>
<div :style="styleObject"></div>

styleObject:[{background: 'blue'},{fontSize: 14 + 'px'}],
styleObject:{background: 'blue', fontSize: 14 + 'px'}
```

ps:当 `v-bind:style` 使用需要特定前缀的 CSS 属性时，如 `transform` ，Vue.js 会自动侦测并添加相应的前缀.



若要改变背景图片

```
<div :style="styleObject"></div>

styleObject: {backgroundImage:'url('+require('./images/img1.png')+')'}
```





##### 4. 案例tab切换

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="js/vue.js"></script>
    <style type="text/css">
    #app button.active{
        background-color: yellow;
    }
    #app div{
        width: 200px;
        height: 200px;
        background-color: #ccc;
        display: none;
    }
    #app div.active{
        display: block;
    }
    </style>
</head>
<body>
    <div id="app">
        <button v-for="(item,index) in tabs" :class="{active:activeIndex==index}" @click="changeIndex(index)">

        </button>
        <div v-for="(item,index) in tabs" :class="{active:activeIndex==index}">

        </div>
    </div>
</body>
<script type="text/javascript">

    // 父组件
    var vm = new Vue({
        el:"#app",
        data:{
            tabs: [
                {btn:"按钮1", content: "买菜", id:1},
                {btn:"按钮2", content: "学习ng",id:2},
                {btn:"按钮3", content: "打游戏",id:3}
            ],
            activeIndex: 0
        },
        methods: {
            changeIndex:function (index){
                this.activeIndex = index
            }
        }
    })
</script>
</html>
```



##### 5. 案例留言板

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="js/vue.min.js"></script>
    <style type="text/css">
    *{
        list-style: none
    }
    #app button.active{
        background-color: yellow;
    }
    #app div{
        width: 200px;
        height: 200px;
        background-color: #ccc;
        display: none;
    }
    #app div.active{
        display: block;
    }
    </style>
</head>
<body>
    <div id="app">
        姓名： <input type="text" v-model="name"><br>
        内容： <textarea v-model="content"></textarea><br>
        <button @click="add()">提交</button><br>
        <h1>显示留言</h1>
        <ul>
            <li v-for="(item,index) in arr">
                <span>{{item.name}}</span>
                <p>{{item.content}}<a href="###" @click="del(index)">删除</a></p>
            </li>
        </ul>
    </div>
</body>
<script type="text/javascript">

    // 父组件
    var vm = new Vue({
        el:"#app",
        data:{
            name:'',
            content:'',
            arr: []
        },
        methods: {
            add() {
                let msg = {
                    name: this.name,
                    content: this.content
                }
                this.arr.push(msg)
                this.name = ''
                this.content = ''
            },
            del(index) {
                this.arr.splice(index, 1)
            }
        },
    })
</script>
</html>
```



#### 7. v-model

> 你可以用 `v-model` 指令在表单控件元素上创建双向数据绑定。类似于`ng-model`
>
> 随表单控件类型不同而不同

**使用对象:**	

- `<input>`

- `<select>`

- `<textarea>`

- components

  ​

  **修饰符:**	


- [`.lazy`](https://cn.vuejs.org/v2/guide/forms.html#lazy) - 取代 `input` 监听 `change` 事件
- [`.number`](https://cn.vuejs.org/v2/guide/forms.html#number) - 输入字符串转为数字
- [`.trim`](https://cn.vuejs.org/v2/guide/forms.html#trim) - 输入首尾空格过滤



#####1.文本或多行文本

```html
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>

<textarea v-model="message" placeholder="add multiple lines"></textarea>
<p>Message is: {{ message }}</p>
```

**注:在文本区域插值 (`<textarea></textarea>`) 并不会生效，应用 `v-model` 来代替**



##### 2.复选框checkox

> for绑定的是input中的id值

```html
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```



> 多个复选框绑定到同一个数组,	
>
> 复选框内允许选择多项,所以被勾选中的复选框的value都会被传入数组中,并显示出来

```html
<div  id="app">
    <input type="checkbox" id="Jack" value="Jack" v-model="checkedNames">
    <label for="Jack">Jack</label>
    <input type="checkbox" id="John" value="John" v-model="checkedNames">
    <label for="John">John</label>
    <input type="checkbox" id="Eile" value="Eile" v-model="checkedNames">
    <label for="Eile">Eile</label>
    <br>
    <span>checkedNames:{{checkedNames}}</span>
</div>
```

```javascript
new Vue({
  el: '#app',
  data: {
    checkedNames: []
  }
})
```


##### 3. 单选框radio

> 同一块的单选框只允许有一个值
>
> 在span标签中只能显示一个value值,一个单选框被勾中后,另一个就会被取消

```html
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>
```

```html
new Vue({
  el: '#example-4',
  data: {
    picked: ''		//就算picked是一个数组,也只能显示一个
  }
})
```



##### 4.选择列表select

**注:**

```html
若<option></option>中有value,则selected的值就是value,若没有value值,则是标签里的值
但记住value要用v-bind:value=""
```

**1.单选列表**

> 单选列表中选择哪一项,span中就显示哪一项的内容,不需要value值

```html
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>		//第一个选项为不能选取,为防止IOS引发change事件
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```

```javascript
new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```



**2.多选列表**

> 在`select`中加入`multiple`属性就可以使`select`变为多选
>
> 多选列表,按住Ctrl键点击选项,可以选择多项

```html
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
```

```
new Vue({
  el: '#example-6',
  data: {
    selected: []		//数组
  }
})
```



**3.动态选项**

用 `v-for` 渲染:

```html
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">	
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
```

```javascript
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```

效果图:

![4](E:\vue\img\4.png)



#### 8. v-pre

- **不需要表达式**

- **用法**：

  跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

- **示例**：

  ```
  <span v-pre>{{ this will not be compiled }}</span>
  ```



#### 9. v-cloak

- **不需要表达式**

- **用法**：

  这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 `[v-cloak] { display: none }` 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

```css
[v-cloak] {
  display: none;
}
```

```html
<div v-cloak>
  {{ message }}
</div>
```

不会显示，直到编译结束。



#### 10. v-once

- **不需要表达式**

- **详细**：

  只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

例1:

`p标签内的内容为'我是第一次的数据',虽然input绑定了'msg'数据,但只要添加了v-once无论'msg'数据怎样改变,p标签内的内容都不变`	

```html
<div id="app">
    <input type="text" v-model="msg">
    <p v-once>{{msg}}</p>
</div>
<script>
    new Vue(
        {
            el: '#app',
            data: {
                msg: '我是第一次的数据'
            },
        }
    )
</script>
```



```html
<!-- 单个元素 -->
<span v-once>This will never change: {{msg}}</span>
<!-- 有子元素 -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- 组件 -->
<my-component v-once :comment="msg"></my-component>
<!-- `v-for` 指令-->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```

用于:

> - [数据绑定语法- 插值](https://cn.vuejs.org/v2/guide/syntax.html#插值)
> - [组件 - 对低开销的静态组件使用 `v-once`](https://cn.vuejs.org/v2/guide/components.html#对低开销的静态组件使用-v-once)



#### 11. refs

一般来讲，获取DOM元素，需document.querySelector（".input1"）获取这个dom节点，然后在获取input1的值。

但是用ref绑定之后，我们就不需要在获取dom节点了，直接在上面的input上绑定input1，然后$refs里面调用就行。

然后在javascript里面这样调用：this.$refs.input1  这样就可以减少获取dom节点的消耗了

案例:

```javascript
<div id="app">
    <input type="text" ref="input1"/>
    <button @click="add">添加</button>
</div>

<script>
new Vue({
    el: "#app",
    methods:{
    add:function(){
        this.$refs.input1.value ="22"; //this.$refs.input1  减少获取dom节点的消耗
        }
    }
})
</script>
```





## 第三章: 组件



> 什么是组件？

组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以表现为用 `is` 特性进行了扩展的原生 HTML 元素。



### 3.1 使用组件



#### 1. 全局注册

我们已经知道，可以通过以下方式创建一个 Vue 实例：

```javascript
new Vue({
  el: '#some-element',
  // 选项
})
```

要注册一个全局组件，可以使用 `Vue.component(tagName, options)`。例如：

`tagName: 组件名称, options: 选项`

```javascript
Vue.component('my-component', {
  // 选项
})
```



例1

> 组件在注册之后，便可以作为自定义元素 `<my-component></my-component>` 在一个实例的模板中使用。注意确保在初始化根实例**之前**注册组件：

```html
<div id="example">
  <my-component></my-component>
</div>
```

```javascript
// 注册
Vue.component('my-component', {
  template: '<div>my first component</div>'
})
// 创建根实例
new Vue({
  el: '#example'
})
```

> 渲染为:

```html
<div id="example">
  <div>A custom component!</div>
</div>
```

> 上面的组件标签在`ul,ol,taber`等特殊标签中最好使用`is=""`来写,可以避开一些潜在的浏览器解析错误

```html
<ul id="example">
  <li is="my-component"></li>
</ul>
```



#### 2. 局部注册

> 不必把每个组件都注册到全局。你可以通过某个 Vue 实例/组件的实例选项 `components`注册仅在其作用域中可用的组件：

```javascript
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 将只在父组件模板中可用
    'my-component': Child
  }
})
```



### 3.2 组件data



##### 1. data注意事件

**注: 组件的data必须是一个函数**

> 构造 Vue 实例时传入的各种选项大多数都可以在组件里使用。只有一个例外：`data` 必须是函数。

若如下写:

```javascript
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: {
    message: 'hello'
  }
})

new Vue({
  el: '#app'
})
```

控制台会报错,提示你`data`不是一个函数	

所以我们可以将`data`写成一个函数,并返回你想要的数据

```javascript
var message = 'hello'
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: function() {	//data() {}
    return message
  }
})
new Vue({
  el: '#app'
})
```



##### 2. data案例

例1:

点击这个3个按钮,不管点击哪个按钮,3个按钮上的`counter`都会加加

```html
<body>
    <div id="app">
        <my-btn></my-btn>
        <my-btn></my-btn>
        <my-btn></my-btn>
    </div>
</body>
<script type="text/javascript">
    var data = {counter:0}		//用的是全局的对象data
    Vue.component('my-btn', {
        template: '<button @click="counterUp">{{counter}}</button>',
        data() {
           return data
        },
        methods: {
            counterUp() {
                this.counter++
            }
        }
    })
    var app = new Vue({
        el:"#app", 
    });
</script>
```

点击任意一个另外一个组件中的值也发生了改变，因为引用了同一个对象，正确做法：

例2:

点击不同的按钮,只有点击的那个按钮上的`counter`会加加

```html
<body>
    <div id="app">
        <my-btn></my-btn>
        <my-btn></my-btn>
        <my-btn></my-btn>
    </div>
</body>
<script type="text/javascript">
    Vue.component('my-btn', {
        template: '<button @click="counterUp">{{counter}}</button>',
        data() {
            return {
                counter: 0
            }
        },
        methods: {
            counterUp() {
                this.counter++
            }
        }
    })
    var app = new Vue({
        el:"#app", 
    });
</script>
```

这样写的一个意思就是每次都返回一个新的对象。



### 3.3 Prop

#### 1. 使用Prop传递数据

用法:

在组件中申明`props`, 申明了的每一个`prop`就相当于是组件(也就是组件标签)的一个属性,我们可以给整个属性赋值(,可以是字符串也可以是变量)

```html
<child message="hello!"></child>
```

```javascript
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 也可以在模板中使用
  // 同样也可以在 vm 实例中通过 this.message 来使用
  template: '<span>{{ message }}</span>'
})
```

得到的结果是:

```
<span>hello!</span>
```



**注:prop的命名尽量不要用驼峰命名或者短横线分隔**	



#### 2. 动态Prop

> **上面的例1中,我们向`prop`中传递的是一个字符串,也可以是一个变量**	
>
> 与绑定到任何普通的 HTML 特性相类似，我们可以用 `v-bind` 来动态地将 prop 绑定到父组件的数据。每当父组件的数据变化时，该变化也会传导给子组件：

将例1改一改:

```html
<input v-model="parentMsg">
  <br>
<child v-bind:message="parentMsg"></child>	//或者缩写: <child :my-message="parentMsg"></child>
```

组件标签中的数据会随着input的内容改变而改变.



#### 3. 自定义事件

我们知道，父组件是使用 props 传递数据给子组件，但如果子组件要把数据传递回去，应该怎样做？那就是自定义事件！

每个 Vue 实例都实现了[事件接口(Events interface)](https://cn.vuejs.org/v2/api/#Instance-Methods-Events)，即：

- 使用 `$on(eventName)` 监听事件

- 使用 `$emit(eventName)` 触发事件

  ​

#### 4. 案例计数(自定义事件)



> 点击俩个组件按钮,组件按钮上的数值分别++,切父组件(也就是Vue组件)的变量`total`也会随之改变

```html
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>	<--自定义事件名:increment,且赋值上vue父组件中的方法-->
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
<script>
Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',	//绑定此组件自己的方法increment
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {	
      this.counter += 1					//单个组件的counter++
      this.$emit('increment')			//使用$emit()来盛放自定义事件
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
</script>
```



#### 5.案例留言板(自定义事件)



> 在文本框中输入内容`content`并按回车
>
> 在html标签中通过`v-bind`和`v-on`获取父组件的数据和事件
>
> 然后在编写组件时,通过`props:[]`和`$emit()`来传递数据和事件
>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="js/vue.min.js"></script>
</head>
<body>
    <div id="app">
        <input type="text" v-model="name" placeholder="请输入姓名">
        <input type="text" v-model="content" placeholder="请输入留言内容"  v-on:keyup.enter="addNewTodo()">
        <ul>    <--自定义对象用v-bind:绑定,自定义事件用v-on绑定-->
            <todo-item v-for="(todo, index) in todos" v-bind:newtodo="todo" v-on:del="delFn(index)"></todo-item>
        </ul>    
    </div>
</body>
<script type="text/javascript">
    Vue.component('todo-item',{
        template:`
            <li>
                <span>{{newtodo.name}}</span>
                <p>{{newtodo.content}}
                    <a href="###" @click="$emit('del')">删除</a>	//获取自定义的事件要用$emit()来盛放
                </p>
            </li>    
        `,        
        props: ['newtodo']		//获取的自定义对象用props盛放
    });    
    var app = new Vue({
        el:"#app",
        data:{
            name:'',
            content: '',
            todos: []
        },
        methods:{
           addNewTodo() {
                var msg = {
                    name: this.name,
                    content: this.content
                }
                this.todos.push(msg)
                this.name = ''
                this.content = ''
           },
           delFn(index) {
                this.todos.splice(index, 1)
           }
        }
    });
</script>
</html>
```





### 3.4 slot内容分发

> 我们知道,在组件中可以有子组件,那么当我们在设计一个很复杂的页面的时候,就可以通过切换子组件来达到一个页面跳转的效果

如:

例1:

在`page`组件中,有俩个子组件: `page-header`和`login-header`(未登入header和已登入header)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="js/vue.min.js"></script>
</head>
<body>
    <div id="app">
        <page>
            <no-login-page v-if="!login"></no-login-page>
            <login-page v-if="login"></login-page>
        </page>
        <button @click="enter()">点击登录</button>
    </div>
    
</body>
<script type="text/javascript">
// 未登录的header
Vue.component("no-login-page",{
    template:`
        <div>
            <header>我是未登录header</header>
            <p>我是未登录主体内容</p>
        </div>
    `
})
// 已登录的header
Vue.component("login-page",{
    template:`
        <div>
            <header>我是已登录header</header>
            <p>我是已登录主体内容</p>
        </div>
    `   ,
})
Vue.component("page",{
  template:`
        <div>
            <slot>
                我是slot默认内容,当page组件没有嵌套内容的时候我就会显示
            </slot>
            <main>我是共同主体内容</main>
        </div>
    `
})
var vm = new Vue({
    el: "#app",
    data: {
        login: false
    },
    methods: {
        enter() {
            this.login = true
        }
    }
})
</script>
</html>
```



在上面的例1中,我们可以看到,使用`<slot>`可以向我们的组件中添加组件,那么如果我们在一个组件中要添加多个组件,就可以用到`slot`的`name`属性,用来指定要添加的多个子组件在父组件中的位置:

例2:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>模拟用户登录</title>
    <script type="text/javascript" src="js/vue.min.js"></script>
</head>
<body>
    <div id="app">
        <page>
            <no-login-page v-if="!login" slot="header"></no-login-page>
            <login-page v-if="login" slot="header"></login-page>
            <page-footer slot="footer"></footer>
        </page>
        <button @click="enter()">点击登录</button>
    </div>
    
</body>
<script type="text/javascript">
var vm = new Vue({
    el: "#app",
    data: {
        login: false
    },
    methods: {
        enter() {
            this.login = true
        }
    },
    components: {

        "page": {
            template:`
            <div>
                <slot name="header">我是header默认内容,当page组件没有嵌套内容的时候我就会显示</slot>
                <main>我是共同主体内容</main>
                <slot name="footer">我是footer默认内容,当page组件没有嵌套内容的时候我就会显示</slot>
            </div>
            `,
        },
        // 未登录的header
        "no-login-page": {
                    template:`
                        <div>
                            <header>我是未登录header</header>
                            <p>我是未登录主体内容</p>
                        </div>
                    `,
                },
        // 已登录的header
        "login-page": {
            template:`
                    <div>
                        <header>我是已登录header</header>
                        <p>我是已登录主体内容</p>
                    </div>
                `,
        },
        //底部footer
        "page-footer": {
            template:`
                    <footer>    
                        <strong>我是底部内容</strong>
                    </footer>    
                `,        
        }
    }
})
</script>
</html>
```





### 3.5 自定义组件

在vue项目中，可以自定义组件像vue-resource一样使用Vue.use（）方法来使用，具体实现方法

1、首先建一个自定义组件的文件夹，比如叫loading，里面有一个index.js，还有一个自定义组件loading.vue,在这个loading.vue里面就是这个组件的具体的内容，比如：

```
<template>
    <div>
        loading..............
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    div{
        font-size:40px;
        color:#f60;
        text-align:center;
    }
</style>
```

在index.js中，规定了使用这个组件的名字，以及使用方法，如：

```
import loadingComponent from './loading.vue'

const loading={
    install:function(Vue){
        Vue.component('Loading',loadingComponent)
    }  //'Loading'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default loading;12345678910
```

只要在index.js中规定了install方法，就可以像一些公共的插件一样使用Vue.use()来使用，如：

```
import loading from './loading'

Vue.use(loading)123
```

这是在入口文件中引入的方法，可以看到就像vue-resource一样，可以在项目中的任何地方使用自定义的组件了，比如在home.vue中使用

```
<template>
    <div>
        <Loading></Loading>
    </div>
</template>12345
```

这样就可以使用成功



## 第四章: 计算属性和数据监听



### 4.1 计算属性

> 模板内的表达式是非常便利的，但是它们实际上只用于简单的运算。在模板中放入太多的逻辑会让模板过重且难以维护.
>
> 类似于ng中的过滤器

```html
computed: {}	
和method: {} 类似,然而，不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。
```

这就意味着只要 `message` 还没有发生改变，多次访问 `now2` 计算属性会立即返回之前的计算结果，而不必再次执行函数。而method 调用**总会**执行该函数.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="js/vue.js"></script>
</head>
<body>
    <div id="app">
        <p>原始的message:{{message}}</p>
        <p>翻转后的message:{{reversedMessage}}</p>
    </div>

</body>
<script type="text/javascript">

    var app = new Vue({
        el:"#app",
        data:{
            message:"Hello Vue"
        },
        computed:{
            reversedMessage:function (){
                /*
                    计算属性:reversedMessage是用作vm.reversedMessage的getter.
                    getter:用于获得属性值的方法
                */
                // 这个每次返回的都是同一个值，因为该函数中并没有依赖data中的任何内容
                // return Math.random();
                return this.message.split("").reverse().join("");
            }
        }
    });
</script>
</html>
```

### 4.2 数据监听

除了可以用计算属性去监听数据的变化以外，`vue`还提供了`watch`这个更加通用的选项

例1:

在输入框中改变`firstName`和`lastName`的值,`fullName`的值也会改变

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="js/vue.min.js"></script>
</head>
<body>
    <div id="app">
        <div>{{fullName}}</div>
        <input type="text" v-model='firstName'>
        <input type="text" v-model='lastName'>
    </div>    
</body>
<script type="text/javascript">

    var app = new Vue({
        el:"#app",
        data:{
            firstName:'唐',
            lastName:'菜也',
            fullName:'唐菜也'
        },
        watch:{
            //监听firstName的变化,都接受两个参数，第一个为新值，第二个为老值
            firstName:function (val){
                this.fullName = val+this.lastName;
            },
            lastName:function (val){
                this.fullName = this.firstName+val;
            }
        }
        /*
        *使用计算属性来实现
        computed: {
            fullName: function() {
                return this.firstName + this.lastName
            }
        }
        */
    });


</script>
</html>
```




## 第五章: 生命周期

每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 **生命周期钩子** ，这就给我们提供了执行自定义逻辑的机会，例如，`created` 这个钩子在实例被创建之后被调用



![lifecycle](E:\vue\img\lifecycle.png)

生命周期函数：

- beforeCreate 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
- created 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，`$el` 属性目前不可见
- beforeMount 在挂载开始之前被调用：相关的 `render` 函数首次被调用
- mounted `el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 `mounted` 被调用时 `vm.$el` 也在文档内(要进行DOM操作,一般使用mounted)
- beforeUpdate 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
- updated 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩。
- activated keep-alive 组件激活时调用
- deactivated keep-alive 组件停用时调用
- beforeDestroy 实例销毁之前调用。在这一步，实例仍然完全可用
- destroyed Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
