# Angularjs of Service






## 第二章:定时器服务



### 2.1 $timeout

用法和$scope一样..

```javascript
let app = angular.module('MyApp',[])
    app.controller('MyCtrl', function ($scope,$timeout) {
  		$scope.value = "Hello"
        $timeout(function () {		//与普通定时器的不同是,$timeout能改变$scope里的变量的值
          alert('a')
          $scope.value = "Bad"
          console.log($scope.value);
        },2000)
})    
=>延迟两秒弹出'a'  $scope.value的值也发生改变    
```



### 2.2 $interval

每隔一定时间执行



## 第三章: $http服务



> 发起网络请求，获取数据

**注:使用简单的get请求,webStrom自带的服务器就可以实现,但是post请求要用服务器**

使用方式:

```
$http.get('/someUrl').success(successCallback).error(successCallback);
$http.post('/someUrl', data).success(successCallback).error(successCallback);
```

### 1.get请求:

```javascript
<body ng-app="MyApp" ng-controller="MyCtrl">
<script>
    let app = angular.module('MyApp',[])
    app.controller('MyCtrl', function ($scope,$http) {
        $scope.value = "Hello"
        $http.get('demo.text').success(function (data) {
                $scope.value = data
                console.log($scope.value);
            }).error(function (err) {
            console.log('请求失败');
        })
    })
</script>
</body>
```



### 2.post请求:





### 3.jsonp:



```javascript
let app = angular.module('MyApp',[])
    app.controller('MyCtrl', function ($scope,$http) {	
      		/*
			https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=html
			*/
$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=html&cb=JSON_CALLBACK').success(function (data) {
            console.log(data);
        })
})
```



`$scope.$watch("监听的属性"，回调函数):监听属性的变化`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="js/angular.min.js"></script>
</head>
<body ng-app="MyApp" ng-controller="MyCtrl">
<input type="text" ng-model="key">
<ul>
    <li ng-repeat="item in arr">
        {{item}}
    </li>
</ul>
</body>
<script>
    var app = angular.module('MyApp', [])
    app.controller('MyCtrl', function ($scope, $http) {

        $scope.key = ''
        $scope.arr = []
        // https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=mu&cb=jQuery1102029039086535097947_1506583107764

        // 监听key的变化
        $scope.$watch('key', function (newModel) {		//监听key的变化,一旦它改变,就会调用它的回调函数,回调函数的返回值就是key
            $http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+ newModel +'&cb=JSON_CALLBACK')
                .success(function (data) {
                    $scope.arr = data.s
                })
        })
    })
</script>
</html>
```



## 第四章:$filter



> 用于对数据的筛选

用法和其他服务一样

例1:

对数组`friends`进行按年龄从大到小排序

```
<body ng-app="Myapp" ng-controller="MyCtrl">
<ul>
    <li ng-repeat="item in friends2">
        {{item}}
    </li>
</ul>
</body>
<script>
    let app = angular.module('Myapp',[])
    app.controller('MyCtrl', function ($scope,$filter) {
        $scope.friends = [
            {name:'John', phone:'555-1212', age:21},
            {name:'Mary', phone:'555-9876', age:19},
            {name:'Mike', phone:'555-4321', age:10},
            {name:'Adam', phone:'555-5678', age:35},
            {name:'Julie', phone:'555-8765', age:29}];

        $scope.friends2 = $filter('orderBy')($scope.friends,'age',false)
    })
</script>
```



例2:

转换大写

```javascript
<body ng-app="Myapp" ng-controller="MyCtrl">

<h3>{{ originalText }}</h3>
<h3>{{ filteredText }}</h3>

</body>
<script>
    let app = angular.module('Myapp',[])
    app.controller('MyCtrl', function ($scope,$filter) {
        $scope.originalText = 'hello';
        $scope.filteredText = $filter('uppercase')($scope.originalText);
    })
</script>

=>	hello

	HELLO
```





## 第五章: $location



对路径以及url的一些操作



```
<body ng-app="Myapp" ng-controller="MyCtrl">

</body>
<script>
    let app = angular.module('Myapp',[])
    app.controller('MyCtrl', function ($scope,$location) {
        console.log($location.absUrl());			
        console.log($location.url());
        console.log($location.protocol());
        console.log($location.host());
        console.log($location.port());
    })
</script>
=>
绝对路径:http://localhost:8080/%E6%AF%8F%E6%97%A5%E7%AC%94%E8%AE%B0/Angularjs/filter2.html?_ijt=7rmt1e1rpc4bt72r1h3r65kt07
完整的路径地址
协议:	http
host:	localhost
端口号:	8080
```




## 第六章: 路由器



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>route1</title>

    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
            box-sizing: border-box;
        }
        .container{
            position: absolute;
            left :0;
            top: 0;
            bottom: 0;
            right: 0;
            background: red;
        }
        header{
            position: fixed;
            left:0;
            top: 0;
            right: 0;
            height: 45px;
            color: white;
            background: #ccc;
            font-size: 16px;
            line-height: 45px;
            text-align: center;
        }
        .tabBar{
            position: fixed;
            left:0;
            bottom: 0;
            right: 0;
            font-size: 20px;
            height: 50px;
            line-height: 50px;
            background-color: #ccc;
        }
        .tabBar a{
            float: left;
            width: 33.333333%;
            line-height: 50px;
            text-decoration: none;
            color: black;
            text-align: center;
        }
    </style>

</head>
<body ng-app="myApp">


<div class="container">
    <!--<header>首页</header>-->
    <div class="tabBar">
        <a href="#/home" ng-controller="HomeCtrl" class="HomeCtrl">{{title}}</a>
        <a href="#/cart" ng-controller="CartCtrl" class="CartCtrl">{{title}}</a>
        <a href="#/mine" ng-controller="MineCtrl" class="MineCtrl">{{title}}</a>
    </div>
    <div>{{arr}}</div>
</div>

</body>
<script src="js/angular.min.js"></script>
<script type="text/javascript">
    let app = angular.module('myApp', []);
        app.controller('HomeCtrl', ['$scope','$rootScope',
            function ($scope,$rootScope) {
                $scope.title = '首页'
                $rootScope.arr = [1,2,3]
            }])
        app.controller('CartCtrl', ['$scope',
            function ($scope) {
                $scope.title = '购物车'
            }])
        app.controller('MineCtrl', ['$scope',
            function ($scope) {
                $scope.title = '我的'
            }])
</script>
</html>
```

上面的写法虽然也能实现点击不同的a标签,实现静态跳转页面的效果,但还是有很多不足,下面来看看路由器的写法

例1:

- 1、引入angluar-route.js文件

- ```
  <script src="js/angular.min.js"></script>
  <script src="js/angular-route.js"></script>
  ```


- 2、包含ngRoute模块作为主应用模块的依赖模块
- - `angular.module('MyApp', ['ngRoute'])`


- 3、使用ng-view指令
- - <div ng-view></div>
  - 4.配置$routeProvider, AngularJS`的$routeProvider服务用来提供路由规则

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>route2</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
            box-sizing: border-box;
        }
        .container{
            position: absolute;
            left :0;
            top: 0;
            bottom: 0;
            right: 0;
            background: red;
        }
        header{
            position: fixed;
            left:0;
            top: 0;
            right: 0;
            height: 45px;
            color: white;
            background: #ccc;
            font-size: 16px;
            line-height: 45px;
            text-align: center;
        }
        .tabBar{
            position: fixed;
            left:0;
            bottom: 0;
            right: 0;
            font-size: 20px;
            height: 50px;
            line-height: 50px;
            background-color: #ccc;
        }
        .tabBar a{
            float: left;
            width: 33.333333%;
            line-height: 50px;
            text-decoration: none;
            color: black;
            text-align: center;
        }
        .content{
            position: fixed;
            top: 40px;
            bottom: 50px;
            left: 0;
            right: 0;
        }
    </style>
</head>
<body ng-app="MyApp">
<div class="container">
    <header>首页</header>
    <div class="content">
        <!-- 指定路由内容的位置 -->	
        <div ng-view></div>				//第三步
    </div>
    <div class="tabBar">
        <a href="#/home">
            首页
        </a>
        <a href="#/cart">
            购物车
        </a>
        <a href="#/mine">
            我的
        </a>
    </div>

</div>
</body>
<script src="js/angular.min.js"></script>		//第一步
<script src="js/angular-route.js"></script>
<script type="text/javascript">

    var app = angular.module('MyApp', ['ngRoute'])		//第二步
     app.config(["$routeProvider",function ($routeProvider){	//第四步
         $routeProvider
             .when('/home',{
                 templateUrl : './views/home.html',	//home.html文件保存在views这个文件夹下,./是固定语句,../才是跳出当前目录
                 //给当前这个view配置一个控制器（自动就会管理，不需要在view上
                 //写ng-controller）
                 //如果想使用别名方式定义控制器，可以加入as 别名即可
                 controller: 'HomeCtrl'		
             })
             .when('/cart', {
                 templateUrl : './views/cart.html',
                 controller: 'CartCtrl'
             })
             .when('/mine', {
                 templateUrl : './views/mine.html',
                 controller: 'MineCtrl'
             })
             //其他
             .otherwise({
                 redirectTo : '/home'
             })
     }])

    app.controller('HomeCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.title = '我是首页啊，哈哈'
        $rootScope.list = [1,2,4]	//$rootScope表示在根上,每个不同的controller都能访问到
    }])
    app.controller('CartCtrl', ['$scope', function ($scope) {
        $scope.title = '我是购物车呀'
    }])
    app.controller('MineCtrl', ['$scope', function ($scope) {
        $scope.title = '我是我的页呀，嘎嘎'
    }])

</script>
</html>
```



在例1的基础上,添加功能

主首页上,有一串人物的姓名.

点击不同的姓名,显示此人的详细信息

文件:

1.js文件夹:

​	angular.js

​	angular-route.js

2.views文件夹:

​	home.html

​	cart.html

​	min.html

​	userDetail.html

3.index.html文件



```html
home.html
	<style>
  h1{
    color: blue;
  }
  li{
    font-size: 30px;
  }
  li:nth-child(2n){
    background-color: #ccc;
  }
  li:nth-child(2n-1){
    background-color: yellow;
  }
</style>
<h1>{{title}}</h1>
<ul>
  <li ng-repeat="item in userList">姓名：<a href="#/userDetail/{{item.userId}}">{{item.userName}}</a></li>
</ul>

cart.html 和 min.html:
	<h1>{{title}}</h1>
	
userDetail.html
	<h1>{{title}}</h1>
	<div>姓名:{{userInfo.userName}}</div>
	<div>年龄: {{userInfo.userAge}}</div>
	<div>id号: {{userInfo.userId}}</div>	
```

index.html:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>route2</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
            box-sizing: border-box;
        }
        .container{
            position: absolute;
            left :0;
            top: 0;
            bottom: 0;
            right: 0;
            background: red;
        }
        header{
            position: fixed;
            left:0;
            top: 0;
            right: 0;
            height: 45px;
            color: white;
            background: #ccc;
            font-size: 16px;
            line-height: 45px;
            text-align: center;
        }
        .tabBar{
            position: fixed;
            left:0;
            bottom: 0;
            right: 0;
            font-size: 20px;
            height: 50px;
            line-height: 50px;
            background-color: #ccc;
        }
        .tabBar a{
            float: left;
            width: 33.333333%;
            line-height: 50px;
            text-decoration: none;
            color: black;
            text-align: center;
        }
        .content{
            position: fixed;
            top: 40px;
            bottom: 50px;
            left: 0;
            right: 0;
        }
    </style>
</head>
<body ng-app="MyApp">
<div class="container">
    <header>首页</header>
    <div class="content">
        <!-- 指定路由内容的位置 -->
        <div ng-view></div>
    </div>
    <div class="tabBar" ng-show="tabBarBol">
        <a href="#/home">
            首页
        </a>
        <a href="#/cart">
            购物车
        </a>
        <a href="#/mine">
            我的
        </a>
    </div>

</div>
</body>
<script src="js/angular.min.js"></script>
<script src="js/angular-route.js"></script>
<script type="text/javascript">

    var app = angular.module('MyApp', ['ngRoute'])
    
    //ng程序初始化成功后就会运行的代码
    app.run(['$location', '$rootScope', function ($location, $rootScope) {
        //控制tabBar显示隐藏
        $rootScope.tabBarBol = true
        $rootScope.$on('$locationChangeSuccess', function () {
            if($location.path().indexOf('userDetail') != -1) {
                $rootScope.tabBarBol = false
            } else {
                $rootScope.tabBarBol = true
            }
        })
    }])
    app.config(["$routeProvider",function ($routeProvider){
        $routeProvider
            .when('/home',{
                templateUrl : './views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/cart', {
                templateUrl : './views/cart.html',
                controller: 'CartCtrl'
            })
            .when('/mine', {
                templateUrl : './views/mine.html',
                controller: 'MineCtrl'
            })
            .when('/userDetail/:userId', {
                templateUrl : './views/userDetail.html',
                controller: 'UserDetailCtrl'
            })
            //其他
            .otherwise({
                redirectTo : '/home'
            })
    }])

    app.controller('HomeCtrl', ['$scope', 'UserService', function ($scope, UserService) {
        $scope.title = '我是首页啊，哈哈'
        $scope.userList = UserService.getUserList
    }])
    app.controller('CartCtrl', ['$scope', function ($scope) {
        $scope.title = '我是购物车呀'
    }])
    app.controller('MineCtrl', ['$scope', function ($scope) {
        $scope.title = '我是我的页呀，嘎嘎'
    }])
    app.controller('UserDetailCtrl', ['$scope', '$routeParams', 'UserService',function ($scope, $routeParams,UserService) {
        $scope.title = '我是详情页'
        let userId = $routeParams.userId        //获得routeProvider里'/userDetail/:后面的参数
        $scope.userInfo = UserService.getUserInfDetail(userId)
      	//返回功能
        $scope.back = function () {
            $window.history.back()
        }
    }])
    app.factory("UserService",[function (){

        let userList = [
            { 'userId' : 1001, userName : '李达康', userAge : 18},
            { 'userId' : 1002, userName : '高玉良', userAge : 20},
            { 'userId' : 1003, userName : '祁同伟', userAge : 16},
            { 'userId' : 1004, userName : '侯亮平', userAge : 22},
            { 'userId' : 1005, userName : '白百何', userAge : 33}
        ];

        return {
            // 获取所有的用户数据
            getUserList: userList,
            // 根据id返回对应的数据
            getUserInfDetail:function (userId){
                // 1003
                for (let i=0; i<userList.length; i++){

                    if (userList[i].userId === Number(userId)){
                        return userList[i];
                    }
                }
                return null;
            }
        }
    }])
</script>
</html>
```
