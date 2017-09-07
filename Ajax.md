## bAjax

### 第一章:简介

### 1.1 什么是服务器

#### 什么是B/S和C/S

B/s :  browser / server

C/s:  client /server



#### 网页浏览过程分析

在浏览器中输入域名地址,如http://www.baidu.com	先连接上域名解析服务器

#### HTTP协议

​	俩部分:

​		1.请求协议

​			浏览器向服务器发送请求的时候

​		2.响应协议

​			服务器向浏览器响应的时候使用

#### 如何配置自己的服务器程序(AMP)

下载wamp

在wamp/www目录下创建test1.html

打开页面输入localhost/test1.html 	

字符集编码相同	缓存 阻止缓存'mas.txt?t='+new Date().getTime(),

### 1.2 什么是Ajax

在无刷新页面的情况下向服务器读取数据

应用:	用户登入,在线聊天室



### 第二章: Ajax原理

get方式:	放入url

用于获取数据

名字=值&名字=值

通过网址

容量小

安全性差

有缓存

post方式,网址上看不到,但f12能

用于上传数据

不通过网址

容量大(2个G)

安全性好一点

没有缓存



### 第三章:编写Ajax

1.创建一个Ajax对象

​	

2.连接到服务器

​	调用open方法

​	oAjax.open('GET', 'msg.txt', true)

​	参数1:

​		请求方法,一般是get或post

​	参数2:

​		请求是url

​	参数3:

​		是否为异步,默认true是异步,false是同步

3.告诉服务器要 哪个文件(发送请求)

​	oAjax.send( );

4.接收返回值

​	监听请求状态

​	ajax.readyState的值保存了ajax的状态,一共有五种状态,每个状态用1个整数表示.

- 0    未初始化。对象new出来了，但是还没有调用open方法
- 1    启动。 已经调用open，但是还没有调用send方法
- 2    发送。 已经send方法，但是还没有接收到相应
- 3    接收。 已经开始接收数据，但是还没有完全接收。
- **4    完成。 已经完全接收数据。**





```javascript
首先先创建一个ajax.js
/**
 * Created by Administrator on 2017/8/24.
 */
var myAjax = {
    /**
     * 负责get请求
     * @param url       url地址
     * @param onSuccess ajax请求成功时候的回调
     * @param onFail    ajax请求失败时候的回调
     */
    get:function (url,onSuccess,onFail) {
        //若传入的请求成功的回调不是一个函数,则返回;
        if(!(typeof onSuccess=="function")) return;
        //创建一个xhr对象
        var xhr = XMLHttpRequest ? new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
        //调用open方法,连接到服务器
        xhr.open('GET',url,false);
        //监听请求状态
        xhr.onreadystatechange=function(){
            // 如readyState的值为4，表示已经接收完数据，可以开始对数据处理。
            if(xhr.readyState==4){
            // xhr.status 保存了服务的响应码,200表示正常响应,304虽然也表示成功,但是有缓存
                if(xhr.status==200||xhr.status==304){
                    onSuccess(xhr.responseText);
                }else{
                    //若传入的请求失败的回调不是一个函数,则返回;
                    if(typeof onFail=="function"){
                        onFail(xhr.status);
                    }

                }
            }
        };
        //get请求,只需要传入null就可以了
        xhr.send(null);
    },
    /**
     * 负责post请求
     * @param url       url地址
     * @param data      接收的数据
     * @param onSuccess ajax请求成功时候的回调
     * @param onFail    ajax请求失败时候的回调
     */
    post:function (url,data,onSuccess,onFail) {
        if(!(typeof onSuccess=="function")) return;
        var xhr = XMLHttpRequest ? new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('POST',url);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status==200||xhr.status==304){
                    onSuccess(xhr.responseText);
                }else{
                    if(typeof onFail=="function"){
                        onFail(xhr.status);
                    }
                }
            }
        };
        if( typeof data =='string'){
            //在发送请求之前必须添加这个请求头,表示表单数据进行url编码
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        }
        xhr.send(data);
    }
};


HTML代码:
 <form action="data2.php" method="post" id="form1" enctype="application/x-www-form-urlencoded">
        <input type="text" name="name">
        <input type="text" name="age">
        <input type="submit" value="登录">
 </form>
<script type="text/javascript" src="myAjax.js"></script>
<script>
    var form1 = document.querySelector('#form1');
    form1.onsubmit=function (e) {
        e.preventDefault();//阻止事件默认行为
        var msg = "name=" + this.name.value+'&age="+this.age.value;
        myAjax.post('data2.php',msg,function (result) {
            console.log(result);
        })
    }
    </script>
```



### 第四章:同源	

#### 4.1什么是同源

**注:ajax访问网页的时候,ajax的地址,必须和当前页面同源,否则ajax就不能访问**	

​	**是浏览器的一个安全机制**

​	协议://域名:端口号/资源路径?查询参数

​	判断俩个url是否同源只看三个地方

​		1.协议

​		2.域名

​		3.端口号

​	只有这三个地方完全相同,才是同源

​	如:同源

​	http://www.baidu.com

​	http://www.baidu.com/abc/a.html

​	不同源:

​	http://www.baidu.com

​        https://www.baidu.com/abc/a.html



​	不受同源策略的影响:

​	1.img标签加载图片

​	2.script标签加载js文件

#### 4.2跨域

##### 1.jsonp:

​	json padding

原理:把json数据伪造为一个合理的js代码

```
<script>
function foo(obj){
  console.log(obj)
}
</script>
<script type= "text/script" src= "data.json"></script>


data.json:
foo({
  name:'王先生'
})
```



##### 2.服务器打破同源

就像前面说的,判断是否同源只要看协议域名端口号三个地方相同不相同,要是相同的话就是同源,我们的ajax就可以访问到.那么如果我们将服务器端口设置一下,也就是直接在我们的php文件中修改

```
在php文件的判断之前加上:
// *代表的就是所有域名都可以访问
header("Access-Control-Allow-Origin:*");
```



##### 3.encodeURIComponent编码

```
window提供的全局的方法,将中文转换为URI编码
一个中文由3个%号组成
```

```
例1:
如通过ajax来访问一个php的文件
	1.先引用ajax.js
	2.调用ajax.get()
	
data2.php

<?php
$name = $_GET["name"];
$age = $_GET["age"];
header('Content-type:text/html; charset="UTF-8"');
header("Access-Control-Allow-Origin:*");
if($name == "李四"){
    echo $name . "登入成功" . "您的年龄是" . $age;
}else{
    echo $name . "登入失败";
}
?>


<script type="text/javascript" src="myAjax.js"></script>
var name = encodeURIComponent('李四');
console.log(name);
=>%E6%9D%8E%E5%9B%9B
myAjax.get('http://127.0.0.1:8080/day08/data2.php?name='+name+'&age=22',function(result){
        console.log(result)
    })
=>李四登入成功您的年龄是22
```



### 第五章:Ajax数据

#### 4.1数据类型

​	什么叫数据类型--英语,中文

​	XML, Json

#### 4.2字符集

​	所有文件字符集相同