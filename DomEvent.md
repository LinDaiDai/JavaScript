[TOC]

## DomEvent

### 第一章:了解事件

#### 1.1 事件简述

​		 JavaScript和HTML之间的交互是通过事件实现的，事件就是文档或浏览器窗口中发生的一些特点的交互瞬间，可以使用侦听器或处理程序来预订事件，以便事件发生时执行相应的代码.

```
事件，就是用户或者是浏览器执行的某种动作。

 比如：click、load等都是事件的名字。
```

​	**事件三要素:**

​		1. 事件源

​		2.事件对象

​		3.事件处理程序(监听器)

#### 1.2 事件流

​	 事件流描述的是从页面中接收事件的顺序。

 	有两种事件流：冒泡流和捕获流	(还有一个DOM事件流 )

```javascript
	#1. 冒泡流	
例1:
<div class="aaron2">
    <p>鼠标离开此区域触发mouseleave事件</p>
</div>

如果在p元素与div元素都绑定mouseover事件，鼠标在离开p元素，但是没有离开div元素的时候，触发的结果:
	p元素响应事件
	div元素响应事件
	
#这里的问题是div为什么会被触发？ 原因就是事件冒泡的问题，p元素触发了mouseover，他会一直往上找父元素上的mouseover事件，如果父元素有mouseover事件就会被触发	
mouseenter事件只会在绑定它的元素上被调用，而不会在后代节点上被触发(不冒泡)
```

​		微软认为:

​			事件的传播是从内向外传播的			

	##### 	2. 捕获流

​		网景公司认为:

​			事件的传播是外到内传播的

	##### 	3.DOM事件流

​		 “DOM2级事件”规定的事件流包括三个阶段：**事件捕获阶段、处于目标阶段 和 事件冒泡阶段。**

​		**注意：IE9、Opera、Firefox、Chrome 和 Safari 都支持 DOM 事件流；IE8 及更早版本不支持 DOM 事件流**

​			目前所有的浏览器默认都是在冒泡阶段触发，当然我们也可以更改触发阶段.

### 第二章: 事件处理程序

​	 事件处理程序，就是响应事件的函数。事件处理程序的名字是以“on”开头的。 

​	 例如：事件click --->事件处理程序 onclick		

​		     事件mouseover --->事件处理程序 onmouseover

​		**注:事件处理程序全是小写字母**

	#### 2.1 HTML事件处理程序

  **即直接将事件处理程序写在HTML标签中**	

​	缺点:内容与行为没有分离,对代码的维护和修改产生不好的影响;	

> ​		**处理方式1:**	

​			如: 给button添加一个点击事件

```
<button onclick = "alert('hellow')">点击我</button>
```

​			**注:若只是要给标签添加一些如alert( ) 的简单的时间,则可以此方式 **

> ​		**处理方式2:**	

​			在JS中,将事件封装在一个函数中 并在事件处理程序中调用这个函数	

```
<!--注意：在onclick的属性中调用方法的时候，一定要添加( ),表示调用方法-->
<button onclick="showMsg();">点我可以给整个世界问好</button>
    <script type="text/javascript">
        function showMsg () {
            alert("hello world");
        }
    </script>
</body
```

#### 2.2 DOM0级别事件处理程序

​	此事件处理程序能事件将 JS 代码与 HTML 代码层次分离

​	也称: 	**脚本模型**

​	 所谓的DOM0级事件处理程序就是将一个**函数赋值给事件处理程序**。

​	这时事件处理程序可以看成是元素对象的方法，事件处理程序就是在元素的作用域中运行。(**this就指代这个元素对象**)	

> ​		**处理方式一:**

​			匿名函数写法:

```
<body>
    <button id="btn">点我可以给整个世界问好</button>
    <script type="text/javascript">
        // 匿名函数的写法
        document.getElementById("btn").onclick = function () {
            alert("世界你好");
        }
    </script>
</body>
```

> ​		**处理方式二:**

​			通过给事件处理程序赋值一个方法名(函数名):

```
<body>
    <button id="btn">点我可以给整个世界问好</button>
    <script type="text/javascript">
        //通过方法名赋值.  注意此处不能添加括号：因为方法的调用是在将来点击的时候，而不是现在
        document.getElementById("btn").onclick = showMsg;		//此时传的是函数名,所以不用( );
        function showMsg () {
            alert("世界你再好");
        }
    </script>
</body>
```

​	

#### 2.3 删除事件的处理程序

​	若想结束一个事件,让它不在执行, 则可删除此事件,给事件处理程序赋值为null;

​	如:取消button 的点击事件

```
<body>
    <button id="btn" onclick="alert('你好世界')">点我可以给整个世界问好</button>
    <script type="text/javascript">
        document.getElementById("btn").onclick = null;
    </script>
</body>
```

​	

### 第三章: 事件类型

​			常见的事件类型:



![](http://o7cqr8cfk.bkt.clouddn.com/16-11-8/31269653.jpg)

#### 3.1 UI事件

	##### 1. onload事件和onready事件

​	load	会在页面或者图片加载完之后再加载,

​	ready   表示文档结构已经加载完成（不包含图片等非文字媒体文件）；

​	如给一下javaScript代码用函数封装并赋值给window.onload , 则代码会在页面全部加载完之后再执行;	

```
<head>
	<title>onload事件</title>
	<script>
		window.onload=function(){
          	//js 代码
		}
	</script>
</head>    
```

​	**注:按HTML的加载顺序,从上至下加载,若没有onload事件,则js中的代码会比body中的代码先执行,并不是我们想要的**

​		**所以此时可以用onload事件让它最后执行,以免发生意想不到的后果**



	##### 2. onunload事件



- onunload事件在用户退出页面时发生，当页面完全卸载后在window上面触发，或当框架集卸载后在框架集上触发。
- 只要用户从一个页面切换到另一个页面就会触发该事件
- 仅IE支持。所以实际较少使用。

```
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript">
        window.onunload = function () {    //像这种事件注册性质的代码一般写在head中比较好。
            alert("你要抛弃我了么？");
        }
    </script> 
</head >    
<body>
    <a href="http://www.baidu.com">百度一下吧</a>
</body>
```

##### 3. onresize事件



> ​	 当浏览器窗口被调整到一个新的高度或宽度时，就会触发 resize 事件。
>
> ​	这个事件在 window （窗 口）上面触发。所以也可以在body元素中使用 onresize 属性来指定事件处理程序
>
> ​	只能针对window 和 body 元素   普通标签无效

​	如:一改变窗口的大小,触发alert( ) 事件

```
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript">
            window.onresize = function () {
               alert("窗口发生了变化")
           }
    </script>
</head>
```

##### 4.onscroll事件

> ​	 onscroll事件，当滚动条滚动式触发。事件在window上面或任意元素上面都可以触发。(和onresize事件不同)
>
> ​	由于滚动过程中，会重复多次调用，所以，处理逻辑和代码不能过于复杂，否则会影响用户滚动效果。

​	如:一滚动window 则触发alert( ) 事件

```
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript">
            window.onscroll = function () {
               alert("窗口被滚动了")
           }
    </script>
</head>
```

​	拓展:

> 获取body滚动的距离

```
document.body.scrollTop: 只支持chorme		
```

```
document.documentElement.scrollTop: ie和火狐支持
```

```
var scrollTop = document.body.scrollTop || document.documentElement.scrollTop; 兼容写法
```

> 获取其他元素的滚动距离,可直接用其scrollTop属性来获取

```
如获取 textarea 滚动的距离:   
	var text = document.querySelector('textarea');
	text.onscroll=move;
            function move(){
            alert(text.scrollTop);		//直接使用scrollTop来获取
        }
```



#### 3.2 焦点事件

> ​	 焦点事件会在页面元素获得或失去焦点时触发。
>
> ​	利用这些事件并与 document.hasFocus() 方法及 document.activeElement 属性配合，
>
> ​	可以知晓用户在页面上的行踪。
>
> ​	主要有4常用焦点事件。

##### 1.onfocus事件

​	

> 当元素获得焦点时触发。这个事件可以发生在任何的元素上。而且这个事件 不会冒泡( **也就是不会再往上层传递** )

​	和onclick 事件比较, onfocus 并不会冒泡,而onclick会冒泡

```
<body>
    <div>
        <input type="text" name="user">
    </div>
    <p>上面的文本框获得焦点后会我会变成红色</p>
    <script type="text/javascript">
        var p1 = document.getElementsByTagName("p")[0];
        var textInput = document.getElementsByTagName("input")[0];
        textInput.onfocus = function () {
            p1.style.color = "red";
        }
        var div1 = document.getElementsByTagName("div")[0];
          //当div中input获取焦点后，并会冒泡到上层div，所以这个函数不会执行。
        div1.onfocus = function () {
            div1.style.backgroundColor = "#000";
        }
    </script>
</body>
```

​	

##### 5. onblur事件

> 当元素失去焦点是触发。和onfucs对应。这个事件也不冒泡



##### 6. onfocusin 和 onfocusout 

> onfocusin是onfoucs的冒泡版本，onfocusout是onblur的冒泡版本。



#### 3.3 鼠标事件

> ​	常见的鼠标事件	
>
> ​	以下均冒泡

​		onclick  

​		ondblclick

​		onmousedown

​		onmouseup

​		onmouseover 

​		onmouseout

​		onmousemove

> ​	onmouseover 和 onmouseout的不冒泡版:	

- onmouseenter：这个事件不冒泡。效果同onmouseover
- onmouseleave ：这个事件不冒泡，效果同onmouseout





#### 3.4键盘事件

	##### 1.keydown

> ​	keydown：当用户按下键盘上的==任意键时触发==，
>
> ​	而且如果按住不放的话，会重复触发此事件。(**keydown监听到的字符不区分大小写**)



##### 2.keypress

> keypress：当用户按下键盘上的==字符键时==触发，
>
> 而且如果按住不放的话，会重复触发此事件。(**keypress监听到的字符区分大小写**)



##### 3.keyup

> keyup：当用户==释放键盘上的键==时触发。



##### 4.获取按下的具体值

> 在键盘上每个键都有一个keyCode,可以通过如下方法获取每个键对应的keyCode     

```
  div1.onkeypress = function(e) {        
  		alert(e.keyCode);    
    }	
```

>  判断是否按下alt键、shift键、ctrl键
>
>  ```
>  div1.onkeydown = function (e) {
>             if(e.altKey){
>                 alert("alt");
>             }else if(e.shiftKey){
>                 alert("shift");
>             }else if(e.ctrlKey){
>                 alert("ctrl")
>             }
>  ```

> 判断是否同时按下alt键、shift键

```
 div1.onkeydown= function(e){
            if(e.altKey&& e.ctrlKey)
                {alert("alt和ctrl同时按下");
               }
        }
```
#### 表单事件

	##### 1.submit

​	表单的提交事件

