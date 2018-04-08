# Angularjs

### 什么是angular

AngularJS 是一个为动态WEB应用设计的结构框架，提供给大家一种新的开发应用方式，这种方式可以让你扩展HTML的语法，以弥补在构建动态WEB应用时静态文本的不足，从而在web应用程序中使用HTML声明动态内容。

### 为什么要用它

​	•	前后端分离，后端只要提供数据接口，路由，模板渲染等都在前端完成

​	•	html和js分离,展示逻辑分离

​	•	减少JS代码,减少DOM元素查找，事件绑定等代码

​	•	适合API开发



## 第一章: 使用Angularjs



### 1.1 引用Angularjs



> 跟使用jquery类似，只需要使用一个script标签引入它就可以了

```html
<script type="text/javascript" src="js/angular.min.js"></script>
```



简单的小例:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src="angular.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body ng-app="">
		<div>{{3+2}}</div>
		<div>
			{{3+2}}
		</div>
	</body>
</html>
```

ng-app指令来标明一个AngularJS应用程序，同时通过AngularJS完成自动初始化应用和标记应用根作用域，同时载入和指令内容相关的模块，并通过拥有ng-app指令的标签为根节点开始编译其中的DOM。



### 1.2 数据绑定



在AngularJS中，只需要使用ng-model指令就可以把应用程序数据绑定到HTML元素，实现model和view的双向绑定。

如下示例，使用ng-model指令对数据进行绑定。

效果:在input文本框中输入任何文本,div中都会相应显示对应的文本

```html
<body ng-app="">
  <input type="text" ng-model="name" />
  <div>
    {{name}}
  </div>
</body>
```

ng-model把相关处理事件绑定到指定标签上，这样我们就可以不用在手工处理相关事件(比如change等)的条件下完成对数据的展现需求。



ng-model原理

​	1.	angular加载完成之后会启动，首先找 ng-app指令

​	2.	找到后认为ng-app里面的所有的内容都归angular来管

​	3.	找子层标签里所有的指令，然后就可以找到ng-model

​	4.	找到后会生成数据模型，然后挂在根作用域上面。

​	5.	然后下面所有的标签都可以读取ng-model的值。



### 1.3 表达式



从上面的例1中我们可以理解为,将input的一个变量name(input的value值)赋值给div的innerHTML并显示出来

这个变量name是没有初始值的,要靠用户输入,所以在这里也可以手动给它赋值一个初始值

案例1: 变量

```html
<body ng-app="" ng-init="num1 = 1; num2 = 2">
	<input type="text" ng-model="num1">
	<input type="text" ng-model="num2">
    <div>{{num1 + num2}}</div>
</body>  
//div中显示3,改变input内的值div的显示也会相应改变
```

> ng-init指令初始化应用程序数据，也就是为AngularJS应用程序定义初始值



案例2:数组

```html
<body ng-app="" ng-init="arr=['1','2','3']">
    <div>{{arr[0]}}</div>
</body>
//div中显示 1
```



案例3: 对象

```html
<body ng-app="" ng-init="obj={name:'wang',age:'21'}">
    <div>{{obj.name}}</div>
</body>
//div中显示 wang
```



案例4:数据绑定配合`ng-class:`

```html
<script type="text/javascript" src="js/angular.min.js"></script>
    <style>
        .ac1{
            color:red;
        }
        .ac2{
            color:blue;
        }
        .ac3{
            color:green;
        }
    </style>
</head>
<body ng-app="" ng-init="isAc=3">		//定义变量isAc=3
  
  1.	<input type="text" ng-model="isAc">	//文本框中能够改变变量isAc
  
  2.	<input type="radio" ng-model="isAc" value="1">	//单选框能改变变量isAc
    	<input type="radio" ng-model="isAc" value="2">
    	<input type="radio" ng-model="isAc" value="3">
  
  3.	<select ng-model="isAc">						//选项卡能改变变量isAc
        	<option value="1">红色</option>
        	<option value="2">蓝色</option>
        	<option value="3">绿色</option>
    	</select>
  
    <div ng-class="{1:'ac1', 2:'ac2', 3:'ac3'} [isAc]">我是div的内容</div>	//将div的class绑定到这个变量上,找到变量所对应
</body>
```



### 1.4 常用指令



#### 1. ng-bind

> 指令ng-bind和AngularJS表达式{{}}有异曲同工之妙，但不同之处就在于ng-bind是在angular解析渲染完毕后才将数据显示出来的。
>
> 如下使用ng-bind指令绑定把应用程序数据。
>
> 例1:

```
<body ng-app="" ng-init="arr=[3,5,9]">
    <!--{{arr[0]}}-->	
    <span ng-bind="arr[0]"></span>
</body>
```

注:使用花括号语法时，因为浏览器需要首先加载页面，渲染它，然后AngularJS才能把它解析成你期望看到的内容，所以对于首个页面中的数据绑定操作，建议采用ng-bind，以避免其未被渲染的模板被用户看到。

**ng-bind是在Angular加载完之后才会执行,所以效果会更好一些**



#### 2. ng-click



AngularJS也有自己的HTML事件指令,比如说通过ng-click定义一个AngularJS单击事件。

对按钮、链接等，我们都可以用ng-click指令属性来实现绑定，如下例2:

```
	<style>	
		div{
            	width: 100px;
            	height: 100px;
            	background: red;
        	}
        .show{
            	display: block;
        	}
        .hide{
            	display: none;
        	}
    </style>
</head>
<body ng-app="" ng-init="isClick=true">			//定义变量isClick来确定div所加的class
    <button ng-click="isClick=!isClick">点击</button>		//点击按钮改变isClick的值
    <div ng-class="{true: 'show', false: 'hide'}[isClick]"></div>	//确定div的class
</body>
```



#### 3. ng-show

在上面的例题中,我们用的是一个变量来改变div的class从而控制div的显示隐藏

Angular中也提供了一直指令`ng-show`来专门控制元素的显示隐藏

看下面的例子,和例2的效果相同

例3:

```html
<body ng-app="" ng-init="isClick=true">
    <button ng-click="isClick=!isClick">点击</button>
    <div ng-show="isClick"></div>
</body>
```



#### 4. ng-mouseover、ng-mouseout



ng-mouseover 和 ng-mouseout 都和ng-click差不多

鼠标移入和鼠标移出事件

例4:

鼠标移入不同的li中,对应的li背景颜色变红

点击li上的按钮,对应li内的字就会显示

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>mouseover</title>
    <script src="js/angular.min.js"></script>
</head>
<style>
    *{
        padding: 0;
        margin: 0;
        list-style: none;
    }
    ul{
        width: 500px;
        margin: 20px auto;
    }
    li{
        width: 100%;
        height: 100px;
        background: yellow;
    }
    .activeLi{
        background: red;
    }
    span{
        display: none;
    }
    .activeSpan{
        display: block;
    }
</style>
<body ng-app="MouseApp" ng-controller="MouseCtrl">
    <ul>
        <li ng-repeat="(index, item) in arr" ng-mouseover="mouseOver(index)"  ng-class="{true:'activeLi', false:''}[switchIndex===index]">
            <button ng-click="click(index)">{{item.btn}}</button>
            <span ng-class="{true: 'activeSpan', false:''}[switchIndex1===index]">{{item.content}}</span>
        </li>
    </ul>
<script>
    let mouseApp = angular.module('MouseApp',[])
    mouseApp.controller('MouseCtrl', function ($scope) {
        $scope.arr = [
            {btn:'按钮1', content: '苹果', isShow:true},
            {btn:'按钮2', content: '玻璃', isShow:false},
            {btn:'按钮3', content: '母鸡', isShow:false}
        ]
        $scope.switchIndex = 0
        $scope.mouseOver=function (index) {
            $scope.switchIndex = index

        }
        $scope.switchIndex1 = 0
        $scope.click=function (index) {
            $scope.switchIndex1 = index
        }
    })
</script>
</body>
</html>
```

效果展示:

![img1](E:\Angualrjs\img\img1.png)





#### 5. ng-repeat



ng-repeat指令，遍历一个数据集合中的每个数据元素，并且加载HTML模版把数据渲染出来，当我们要向HTML容器节点中添加更多类似DOM元素的时候，使用ng-repeat是再好不过了。

**1. 遍历数组**

ng-repeat指令对于集合中(数组中)的每一项都会渲染一次HTML元素。

```html
<body ng-app="" ng-init="arr=[3,4,5,6]">
    <ul>
        <li ng-repeat="item in arr"><em>{{item}}</em></li>		//item代表的就是数组arr中的每一项
    </ul>
</body>
//页面显示的是一列3,4,5,6
```

也可以获取到数组中的下标

```html
<body ng-app="" ng-init="arr=[3,4,5,6]">
    <ul>
        <li ng-repeat="(index, item) in arr"><em>下标{{index}}对应的值是:{{item}}</em></li>
    </ul>
</body>
//页面显示的是:
	下标0对应的值是:3
	下标1对应的值是:4
	下标2对应的值是:5
	下标3对应的值是:6
```

**注:Angular中数组不允许重复,要是数组内有重复的元素,会报错.所以加上一句:**

```html
<li ng-repeat="item in arr track by $index">{{item}}</li>
```

 

**2. 遍历对象**



```
<body ng-app="" ng-init="message=[{'user':'wang', 'age':21, 'sex': '男'},{'user':'zhang', 'age':21, 'sex': '男'}]">
    <ul>
        <li ng-repeat="item in message track by $index">
            <span>姓名:{{item.user}}</span>
            <span>年龄:{{item.age}}</span>
            <span>性别:{{item.sex}}</span>
        </li>
    </ul>
</body>
```



#### 6. 在js文件中初始化-scope



AngularJS控制器控制AngularJS应用程序的数据，是常规的JavaScript对象。

ng-controller指令就是用来定义应用程序控制器的，并且同时创建了一个新的作用域关联到相应的DOM元素上。

所谓作用域就是一个指向应用模型的对象，它是表达式的执行环境，作用域有层次结构，这个层次和相应的DOM几乎是一样的，作用域能监控表达式和传递事件并且可以从父作用域继承属性。

每一个AngularJS应用都有一个绝对的根作用域。但也可能有多个子作用域。 一个应用可以有多个作用域，因为有一些指令会生成新的子作用域，当新作用域被创建的时候，他们会被当成子作用域添加到父作用域下，这使得作用域会变成一个和相应DOM结构一个的树状结构。

$scope就是把一个DOM元素连结到控制器上的对象，它提供一个绑定到DOM元素(以及其子元素)上的执行上下文。它也是一个JavaScript对象，指向应用程序作用域内的所有HTML元素和执行上下文。

拥有了$scope，我们就可以操作作用域内任何我们想要获取的对象数据。



#### 7.留言板案例



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>留言板</title>
    <script src="js/angular.min.js"></script>
    <style>
        *{
            list-style: none;
        }
    </style>
</head>
<body ng-app="MyApp" ng-controller="MyCtrl">
    姓名:<input id="txt" type="text" ng-model="name">
    内容:<textarea ng-model="content"></textarea>
    <button ng-click="add()">提交留言</button>
    <h2>显示留言</h2>
    <ul>
        <li ng-repeat="(index, item) in arr">
            <p>{{item.name}}</p>
            <span>{{item.content}}</span>
            <a href="javascript:;" ng-click="remove(index)">删除</a>
        </li>
    </ul>
</body>
<script>
    let app = angular.module('MyApp',[])
    app.controller('MyCtrl',function ($scope) {

        //存放所有的留言
        $scope.arr = []

        //初始化name 和 content
        $scope.name = ''
        $scope.content = ''

        //添加留言
        $scope.add=function () {
            if($scope.name === '' || $scope.content === '') {
                alert('姓名和内容都不能为空');
                return
            }

            //创建留言对象
            let obj = {
                name: $scope.name,
                content:$scope.content
            }
            //将留言对象添加到arr中
            $scope.arr.push(obj)

            //情况文本框内的内容
            $scope.name=''
            $scope.content = ''
        }

        //删除选项
        $scope.remove = function (index) {
            $scope.arr.splice(index,1)
        }

    })
</script>
</html>
```



## 第二章: 过滤器

过滤器可以使用一个管道字符（|）添加到表达式和指令中。

AngularJS 过滤器可用于转换数据



### 2.1 内置过滤器



#### 1. 货币currency

格式化数字为货币格式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>currency</title>
    <script src="js/angular.min.js"></script>
</head>
<body ng-app="Myapp" ng-controller="MyCtrl">
<input ng-model="num1">
<input ng-model="num2"><br>
<!--currency:"￥" 中文-->
<div>{{sum() | currency}}</div>
</body>

<script>
    let mouseApp = angular.module('Myapp',[])
    mouseApp.controller('MyCtrl', function ($scope) {
        $scope.num1 = 1
        $scope.num2 = 2

        $scope.sum = function () {
            return $scope.num1 + $scope.num2
        }
    })
</script>
</html>
=>
￥3
```



#### 2. 大小写转换

将文本内容转换大小写

```html
<div>
  <!--{{'HelloWorld' | lowercase}}-->
  {{'HelloWorld' | uppercase}}
</div>
```



#### 3. 筛选filter



例1:

在文本框中输入文本内容,下面的ul只显示有文本框内容的li

```html
<body ng-app="Myapp" ng-controller="MyCtrl">
搜索:<input ng-model="name">
<ul>
    <li ng-repeat="item in arr | filter:name">
        {{item}}
    </li>
</ul>
</body>
<script>
    let mouseApp = angular.module('Myapp',[])
    mouseApp.controller('MyCtrl', function ($scope) {
        $scope.arr=['wang','wangpei','zhang','angli']
    })
</script>
//如:	输入 wang , 只显示 wang, wangpei	
```



例2:

在例1的基础上,改变一下.

筛选出`friends`中`age`大于20的人

```html
<body ng-app="Myapp" ng-controller="MyCtrl">


<ul>
    <li ng-repeat="item in friends | filter : ageBig ">
        {{item}}
    </li>
</ul>

</body>
<script>
    let app = angular.module('Myapp',[])
    app.controller('MyCtrl', function ($scope) {
        $scope.friends = [
          	{name:'John', phone:'555-1212', age:21},
            {name:'Mary', phone:'555-9876', age:19},
            {name:'Mike', phone:'555-4321', age:10},
            {name:'Adam', phone:'555-5678', age:35},
            {name:'Julie', phone:'555-8765', age:29}];
        $scope.order="phone";
        $scope.ageBig = function (item) {		//直接定义方法
            return item.age > 20
        }
    })
</script>
=>
{"name":"John","phone":"555-1212","age":21}
{"name":"Adam","phone":"555-5678","age":35}
{"name":"Julie","phone":"555-8765","age":29}
```



例3:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src="angular.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body ng-app="myApp">
		<div ng-controller="myCtrl">
			<ul>
				<li ng-repeat="x in notes | filter:favoriteList">{{x.text}}</li>
			</ul>
		</div>
	</body>	
	<script type="text/javascript">
		var app = angular.module("myApp",[]);
		app.controller("myCtrl",function ($scope){
			
			$scope.notes = [{
				text:"文章1",
				favorite:false
			},{
				text:"文章2",
				favorite:true
			},{
				text:"文章3",
				favorite:true
			}
			];
			$scope.favoriteList = function (item){
				return item.favorite;
			}
		});
		/*app.filter('favoriteList',function (){
			return function (arr){
				return arr.filter(function (obj){
					return obj.favorite
				})
			}
		})*/
	</script>	
</html>
```



#### 4. 筛选加排序

`orderBy: 参照排序的元素 : 排序方式`	

排序方式: `true: 从大到小, false: 从小到大`	

如按商品价格从大到小排序:

```
orderBy: 'price' : orderBol : true
```

例3:

在例2的基础上,改变一下

name中有a的,并且按照phone的号码顺序来排序)(数值从小到大)

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src="angular.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body ng-app="myApp">
		<div ng-controller="myCtrl">
			<ul>
				<li ng-repeat="x in friends |filter:'a' | orderBy:order:false">{{x}}</li>	//筛选出名字内有a的
			</ul>																			//并且按年龄从小到大来排序
		</div>
	</body>	
	<script type="text/javascript">
		var app = angular.module("myApp",[]);
		app.controller("myCtrl",function ($scope){
			
			$scope.friends = [{name:'John', phone:'555-1212', age:21},
           {name:'Mary', phone:'555-9876', age:19},
           {name:'Mike', phone:'555-4321', age:10},
           {name:'Adam', phone:'555-5678', age:35},
           {name:'Julie', phone:'555-8765', age:29}];
           $scope.order="age";
		});
	</script>	
</html>
=>
name中有a的,并且按照age的号码顺序来排序)(数值从小到大)
{"name":"Mary","phone":"555-9876","age":19}
{"name":"Adam","phone":"555-5678","age":35}
```



### 2.2. 自定义过滤器



可以看到上面的例2,我们利用的是`filter:ageBig`	定义了一个`ageBig` 方法来判断`filter`



我们也可以自定义过滤器来判断`age`

例4:

```html
<body ng-app="Myapp" ng-controller="MyCtrl">
<ul>
    <li ng-repeat="item in friends | ageBig ">
        {{item}}
    </li>
</ul>
</body>
<script>
    let app = angular.module('Myapp',[])
    app.controller('MyCtrl', function ($scope) {
        $scope.friends = [
            {name:'John', phone:'555-1212', age:21},
            {name:'Mary', phone:'555-9876', age:19},
            {name:'Mike', phone:'555-4321', age:10},
            {name:'Adam', phone:'555-5678', age:35},
            {name:'Julie', phone:'555-8765', age:29}];
        $scope.order="phone";

    })
    app.filter( 'ageBig',function () {			//直接利用app中的filter(类型为function)添加一个ageBig方法
        return function (arr) {					//返回一个函数
            return arr.filter(function (obj) {	//函数的返回值是利用数组中的filter方法对数组进行筛选,返回要的内容
                return obj.age > 20				//例2的条件
            })
        }
    })
</script>
```



**小结:**

可以看到`filter`和自定义过滤器的不同,实际上`$filter`也是一种服务,和`$scope`一样

1. `filter`是在`app.controller`内添加方法`$scope.ageBig`,而自定义的是利用`app.filter('ageBig',function(){})`

   ​

