# H5新API



## 第一章:cookie



 Cookie，有时也用其复数形式 Cookies，指某些网站为了辨别用户身份、进行 session 跟踪而储存在用户本地终端上的数据（通常经过加密）。

 Cookie 是在 HTTP 协议下，服务器或脚本可以维护客户工作站上信息的一种方式。Cookie 是由 Web 服务器保存在用户浏览器（客户端）上的小文本文件，它可以包含有关用户的信息。无论何时用户链接到服务器，Web 站点都可以访问 Cookie 信息。

 cookie是浏览器提供的一种机制，它将document 对象的cookie属性提供给JavaScript。可以由JavaScript对其进行控制，而并不是JavaScript本身的性质。cookie是存于用户硬盘的一个文件，这个文件通常对应于一个域名，当浏览器再次访问这个域名时，便使这个cookie可用。因此，cookie可以跨越一个域名下的多个网页，但不能跨越多个域名使用。 而且不同的浏览器之间cookie不能共享。

**==cookie的本质就是用键值对存储在用户本地的一些数据，这些数据不同的网站，不同的浏览器是不能共享的==**



**用处:**

保存用户登录状态

跟踪用户行为

定制页面

创建购物车



**缺陷:**	

1. cookie可能被禁用。当用户非常注重个人隐私保护时，他很可能禁用浏览器的cookie功能；
2. cookie是与浏览器相关的。这意味着即使访问的是同一个页面，不同浏览器之间所保存的cookie也是不能互相访问的；
3. cookie可能被删除。因为每个cookie都是硬盘上的一个文件，因此很有可能被用户删除；
4. cookie安全性不够高。所有的cookie都是以纯文本的形式记录于文件中，因此如果要保存用户名密码等信息时，最好事先经过加密处理。





### 1.1创建查看cookie

cookie的运行环境必须在服务器的环境下

直接在<script></script>标签中写上:

```
<script>
    document.cookie = "user=wangxiansheng"
</script>
```

要保证在服务器环境下

此时打开页面,点击地址栏左侧的感叹号:

查看Cookie:在你的localhost里查看Cookie文件夹,找到user

可以看到里面有 名字, 内容, 域, 路径, 创建,过期时间等等.



2.也可以直接弹出cookie查看

```javascript
document.cookie = "user=wangxiansheng"
alert(document.cookie)
```

### 1.2 设置cookie的过期时间



当我们查看Cookie的时候,可以看到它默认的过期时间是:回话窗口关闭后

那么怎样来修改它的过期时间呢

可以直接在设置cookie的时候,加上expirse来进行设置

那么一般我们都会封装一个函数来进行设置

例1:

```javascript
<script>	
	function setCookie(name, value, day) {
        //expires:过期时间, 接受一个日期对象
        var d  = new Date()
        d.setTime(d.getTime() + day * 24 * 60 * 60 * 1000)
        var expires = d.toUTCString()
        //一个条目包含保存的键值对和过期时间
        document.cookie = name + '=' + value + "; expires=" + expires
    }
    setCookie(user,'wangxiansheng',2)
    setCookie(user,'li',2)
    console.log(document.cookie)
</script>    
```

```
=>	user=wangxiansheng; li; _ga=GA1.1.576406365.1501552757
```

此时查看cookie的过期时间为2天后

### 1.3 分隔cookie的内容

在上面的例1中

可以看到在控制台中打印出来的cookie是一串字符串

我们可以设定一个函数用来分隔这串字符串从而得到我们想要的数据

```
function getCookie(name){
        var cookie = document.cookie
        var arr = cookie.split(';')

        for(var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=')
            if(arr2[0] === name) {
                return arr2[1]
            }
        }
    }
```



### 1.4 删除cookie



```
function removeCookie(name) {
  setCookie(name, '.', -1)
}
```



可以将上面的三个方法都封装到一个js文件中,这样这个js文件就提供了三种方法,分别用于获取cookie,设置cookie,删除cookie.要用的时候只要引用这个js文件就行了.

```javascript
cookie.js文件:

function setCookie(name, value, day) {
    //expires:过期时间, 接受一个日期对象
    var d  = new Date()
    d.setTime(d.getTime() + day * 24 * 60 * 60 * 1000)
    var expires = d.toUTCString()
    //一个条目包含保存的键值对和过期时间
    document.cookie = name + '=' + value + "; expires=" + expires
}
function getCookie(name){
    var cookie = document.cookie
    var arr = cookie.split(';')

    for(var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=')
        if(arr2[0] === name) {
            return arr2[1]
        }
    }
    return false
}
function removeCookie(name) {
    setCookie(name, '.', -1)
}
```

## 第二章: 登录小案例

实现效果:

表单中提供一个输入框用于输入用户名,一个密码框用于输入密码

俩个单选框,用于用户是否要保存用户名或者密码,要是勾选上了,当点击登录时,浏览器会记住用户名或密码,这样无论怎样刷新页面,输入框中的用户名或者密码还是存在在那里.

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>用户登录</title>
</head>
<body>
<form id="form1" action="#" method="get">
用户名:<input type="text" id="user"><br>
密码:<input type="password" id="pass"><br>
是否记住用户名:<input type="checkbox" id="saveUser"><br>
是否保存密码:<input type="checkbox" id="savePass"><br>
<input type="submit" value="登录" id="sub">
</form>
<script type="text/javascript" src="cookie.js"></script>	//调用上面已经写好的cookie.js
<script>
    let user = document.querySelector('#user')
    let pass = document.querySelector('#pass')
    let saveUser = document.querySelector('#saveUser')
    let savePass = document.querySelector('#savePass')
    let form1 = document.querySelector('#form1')
    
    //获取用户名和密码,判断用户是不是选择存储了用户名和密码
    if(getCookie('user')) {
        user.value = getCookie('user')
        saveUser.checked = true
    }
    if(getCookie('pass')) {
        pass.value = getCookie('pass')
        savePass.checked = true
    }
    //表单提交时,判断用户是不是勾选了俩个单选框(也就是判断用户是否要存储用户名或者密码)
    form1.onsubmit=function () {
        console.log(saveUser.checked);
        if(saveUser.checked) {
            //保存用户名
            setCookie('user', user.value, 30)
        } else {
            //删除
            if (getCookie('user')) {
                removeCookie('user')
            }
        }
        if(savePass.checked) {
            //保存密码
            setCookie('pass', pass.value, 30)
        } else {
            if (getCookie('pass')) {
                removeCookie('pass')
            }
        }

    }
</script>
</body>
</html>
```





## 第三章:HTML5本地存储



###3.1HTML5本地存储的优点

1. 解决了4k的大小问题
2. 解决了请求头常带存储信息的问题
3. 解决了关系型存储的问题
4. 跨浏览器



`Web Storage` 包含如下两种机制：

- `sessionStorage` 为每一个给定的源（`given origin`）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。
- `localStorage` 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。



### 3.2 localStorage



window下的一个属性

通过`window.localStorage`	来调用

**提供的属性和方法:**	

**storage**代表着`localStorage`或`sessionStorage`,方法和属性都通用

**属性:**

`storage.length`

 返回一个整数，表示存储在`storage`对象中的数据项的数量

```
console.log(window.localStorage.length);
```



**方法:**

**1.存储**

`storage.setItem(keyName, keyValue)`

 接受一个键名和值作为参数，将会把键名添加到存储中，如果键名已存在，则更新其对应的值。

```
window.localStorage.setItem('user','wangpeilin')
```

此时查看:

![1](E:\HTML5新API\img\1.png)



**2.利用key查看存储的键名**	

`storage.key(index)`

 返回存储对象第 `index` 个数据项的键名。`index` 从 `0`开始

```
console.log(window.localStorage.key(0));
=>user
```



**3.获取存储的值**

`storage.getItem(keyName)`

 接受一个键名（`key name`）作为参数，并返回对应键名的值（`key's value`）。

```
console.log(window.localStorage.getItem('user'));
=>wangpeilin
```

**若没有,返回null**	



**4.移除存储**	

`storage.removeItem(keyName)`

 接受一个键名作为参数，会把该键名和对应的键值从存储中移除。(删除键值对)

```javascript
	window.localStorage.removeItem('user')
    console.log(window.localStorage.getItem('user'));
    =>null
```



**5.清除存储**

`storage.clear()`

 清空存储对象里所有的键值

```
window.localStorage.clear('user')
```



### 3.3 sessionStorage



使用方式和loaclStorage相同



## 第四章: 更改背景色小案例



利用本地存储localStoragez来存储用户选择的背景颜色已经图片的src,就算用户属性页面,背景色及图片src也不会发生改变

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test1</title>
    <style>
        body{
            background-color: #CCCCCC;
        }
    </style>
</head>
<body>
<div id="bg_color">
    <p>选择背景色</p>
    <input type="color" value="#ff0000" id="color">
    <span></span>
</div>
<div id="image">
    <p>选择图片</p>
    <select>
        <option value="img/img1.jpg" selected>瀑布</option>
        <option value="img/img2.jpg">海龟</option>
        <option value="img/img3.jpg">背景图</option>
    </select>
    <br>
    <img src="img/img1.jpg" alt="">
</div>
<script src="cookie.js"></script>
<script>
    let colorInput = document.querySelector('#color')
    let imgSelect = document.querySelector('#image select')
    let img =document.querySelector('#image img')
    let span = document.querySelector('#bg_color span')

    if(localStorage.getItem('color')) {		//若检测到本地存储中以及存储了color,则不需要再进行存储了,直接调用setStyle就OK
        setStyle()
    }
    if(localStorage.getItem('imgSrc')) {
        setStyle()
    }

    colorInput.onchange=storage;
    imgSelect.onchange=storage;
 
    //存储用户的选择
    function storage(){
        window.localStorage.setItem('color',colorInput.value)
        window.localStorage.setItem('imgSrc',imgSelect.value)
		//调用设置样式的函数
        setStyle()
    }
    function setStyle(){
        let backColor = localStorage.getItem('color')
        let imgSrc = localStorage.getItem('imgSrc')

        document.body.style.backgroundColor = backColor
        span.innerHTML = backColor
        img.src = imgSrc

        colorInput.value = backColor
        imgSelect.value = imgSrc
    }
</script>
</body>
</html>
```

效果图:

![2](E:\HTML5新API\img\2.png)



## 第五章: 地理位置API



`HTML5Geolocation API` 用于获得用户的地理位置。

鉴于该特性可能侵犯用户的隐私，除非用户同意，否则用户位置信息是不可用的。

> 浏览器支持：

InternetExplorer 9、Firefox、Chrome、Safari以及 Opera支持地理定位。

注释：对于拥有 GPS的设备，比如 iPhone，地理定位更加精确。



### 5.1 获取Geolocation对象



`navigator` 只读属性返回一个 `Geolocation` 对象，通过这个对象可以访问到设备的位置信息。这允许网站或应用根据用户的位置提供个性化结果。

```
console.log(navigator.geolocation)
```

![3](E:\HTML5新API\img\3.png)

**可以看到Geolocation对象提供了三种方法**	



#### 1. getCurrentPosition

`navigator.geolocation.getCurrentPosition(success, error, options)`

这个方法用于获取当前设备的地理位置。

3个参数：

*success*

成功得到位置信息时的回调函数，使用`Position`对象作为唯一的参数。

*error* 可选

获取位置信息失败时的回调函数，使用 `PositionError`对象作为唯一的参数，这是一个可选项。

*options* 可选

一个可选的`PositionOptions` 对象。

```
<body>
<button>获取地理位置信息</button>
<div>
    <p>你的地理位置信息是：</p>
    <p></p>
</div>
<script>
document.querySelector("button").onclick = function (){
      //location有两个属性：coords 封装了位置信息  timestamp  时间戳
    navigator.geolocation.getCurrentPosition(function (location){
        var longitude = location.coords.longitude;  //经度
        var latitude = location.coords.latitude; // 纬度
        var altitude = location.coords.altitude; // 海拔. 如果不提供则返回null
        var accuracy = location.coords.accuracy; // 精度
        var speed = location.coords.speed; // 运动速度 如果不提供则返回null
        document.querySelector("div p:nth-child(2)").innerHTML =
            `经度：${longitude}<br>
             维度：${latitude}<br>
             海拔：${altitude}米<br>
             精度：${accuracy}米<br>
             运动速度：${speed}m/s<br>
            `;
    }, function (postionError){
        var errorMsg;
        switch (postionError.code){
            case 1 :
                errorMsg = "地理位置信息的获取失败，因为该页面没有获取地理位置信息的权限。"
                break
            case 2 :
                errorMsg = "地理位置获取失败，因为至少有一个内部位置源返回一个内部错误。"
                break
            case 3 :
                errorMsg = "地理位置获取失败，因为至少有一个内部位置源返回一个内部错误。"
                break
        }
        document.querySelector("div p:nth-child(2)").innerHTML = errorMsg;
    },{
        enableHighAccuracy : true,
        timeout : 3000,
        maximumAge : 10000
    });
};
</script>
</body>
```



#### 2. watchPosition

用于注册监听器，在设备的地理位置发生改变的时候自动被调用。也可以选择特定的错误处理函数。

参数和方法1是一样的。

返回值是监听器的 `id`



#### 3. clearWatch 

`navigator.geolocation.clearWatch(id);`

取消由 `watchPosition()注册的位置监听器。`



## 第六章: File Api



 在HTML5之前的，从网页上传文件一次只能上传一个文件，而且也无法对要上传的文件做更深一步的操作。

 HTML5提供了一个系列关于文件操在的API，通过使用这些API，对于从Web页面访问本地文件系统的相关处理将会变的非常简单。



 `<input>`的type属性为 file 的时候，那么它就可以访问本地文件系统了。

在HTML5之前，一次只能选择一个文件。HTML5中，给`<input>`添加属性 multiple 则可以一次选择多个文件。

**注意：multiple或multiple='multiple' 两种写法都可以。**

```
<form action="#" enctype="multipart/form-data">
    <input type="file" multiple>
</form>
```

 用户选择的每一个文件都是一个File对象，而如果选择了多个File，则FileList表示这些多个File对象的列表集合。



### 6.1 File对象的属性



File对象是用户上传上来的文件

File主要提供了4个属性(包括从Blob中的继承的)

1. `file.lastModified`：表示的文件的最后修改时间。以毫秒为单位。
2. `file.name`：获取的是文件的文件名。由于安全考虑，这个地方的文件名不包含路径。
3. `file.size`：获取到文件大小。以字节为单位。
4. `file.type`: 获取文件的 `mime` 类型



### 6.2 FileLis列表集合

FileList是多个File的列表集合.

可以通过 `input.files`来得到`FileList`

如:

```javascript
<input id="file1" type="file">

<script>
	//获取fileList上传的文件列表
	let file1 = document.querSelector('#file1')
	let files = file1.files
	
```



**属性:**

`list.length`:文件的数量

```javascript
		//获取fileList上传的文件列表
		let file1 = document.querSelector('#file1')
        let files = file1.files
        console.log(files.length);
```



**方法:**



1.`list.item(index)`:

> 获取 `file`.注意:`index`从0开始计算.

遍历fileList列表:

```javascript
		//获取fileList上传的文件列表
		let file1 = document.querSelector('#file1')
        let files = file1.files
        for(let i = 0; i < files.lenght; i++) {
          let file = files.item(i)		//每一个用户选择的文件对象
          console.log(file)
        }
        =>
File {name: "text1.txt", lastModified: 1506412495353, lastModifiedDate: Tue Sep 26 2017 15:54:55 GMT+0800 (中国标准时间), webkitRelativePath: "", size: 9, …}
File {name: "text2.txt", lastModified: 1506412725170, lastModifiedDate: Tue Sep 26 2017 15:58:45 GMT+0800 (中国标准时间), webkitRelativePath: "", size: 11, …}
```



### 6.3 Blob对象



> 表示二进制原始文件。前面见到的File对象也继承了Blob对象。

注意包括两个属性：size和type。

`size`：表示Blob对象的字节长度。 File文件的size就是继承这里的size

`type`：表示Blob的MIME类型。如果未知则返回一个长度为 0 的字符串。FIle对象也继承了这个属性

```javascript
for(var i = 0; i < files.length; i++){ //files.length:返回类别中File对象的数量
       var file = files.item(i);
       var msg = `第${i + 1}个文件的MIME类型：${file.type}<br>`;
       content.innerHTML += msg
}
```



### 6.4 FileReader对象



 `FileReader`对象允许`Web` 应用程序以==异步的方式读取文件的内容==，使用`File`对象或`Blob`对象指定要读取的文件.

```
let reader = new FileReader()
```

 

`FileReader`对象主要包括3个属性和5个方法、6个事件.



#### 1. 3个属性

> 1.FileReader.error: 读取文件的时候发生的错误信息



> 2.FileReader.readyState:0-2数字,表示`FileReader`的状态

|   状态    |  数字  |   状态信息   |
| :-----: | :--: | :------: |
|  EMPTY  |  0   | 还没有加载到数据 |
| LOADING |  1   |  正在加载数据  |
|  DONE   |  2   |  数据加载完成  |



> 3.FileReader.result:读取到的内容
>
> `FileReader.result`:这个是最重要的属性。读取到的内容都存储在了这个属性中。只能在`readyState DONE`之后才能读取这个属性值。读取到的数据类型取决于用什么的方法去读取的文件。



#### 2.  5个方法

1. `FileReader.abort()`：终止读取文件的操作。这个方法一点结束，则readyState就成为了DONE
2. `FileReader.readAsArrayBuffer()`：开始读取文件的内容，一旦完成，则把文件的数据存储在`ArrayBuffer`中。当然`ArrayBuffer`自然也会存储在`FileReader`的`result`属性中
3. ~~FileReader.readAsBinaryString()：以二进制的形式读取文件的内容。**这个方法是非标准方法，不要使用。**~~
4. `FileReader.readAsDataURL()`：将文件读取为`DateUrl`
5. `FileReader.readAsText()`：将文件的内容读取文本。读取纯文本内容的时候使用.



#### 3. 6个事件

1.`FileReader.onloadstart`：**数据开始读取时触发。**

2.`FileReader.onprogress`：**数据读取过程中触发。**

3.`FileReader.onloadend`：**数据读取完成后触发。不管数据读取成功还是失败都会触发。**

4.`FileReader.onload`：**数据读取成功后触发。**

5.`FileReader.onabort`：**数据读取被中断时触发。**

6.`FileReader.onerror`：**数据读取发生错误时触发。**





#### 4. FileReader案例

实现功能:

打开页面,有一个选择文件的标签让用户选择要上传的文件,

若是上传的文件是文本文件,则显示在p标签中,(可以上传多个文本)

若是上传的文件是图片,则会显示在img标签中.



```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>file</title>
</head>
<body>
<form action="#" enctype="multipart/form-data">
    <input type="file"  id="file1" multiple>
</form>
<button id="btn1">获取上传文件信息</button>
<p id="content"></p>
<img id="img1" src="">
<script>
    let file1 = document.querySelector('#file1')
    let btn1 = document.querySelector('#btn1')
    let content = document.querySelector('#content')
    let img1 = document.querySelector('#img1')
    btn1.onclick = function () {
        if(!FileReader) {		//判断当前的浏览器支不支持FileReader
            content.innerHTML = '你的文件不支持FileApi'
            return
        }
        //获取fileList上传的文件列表
        let files = file1.files
		//变量文件列表
        for(let i = 0; i < files.length; i++ ) {
            //获取用户选择的每一个文件
            let file = files.item(i)
         
            // 判断文件类型,如果以text开头,就是文本文件
            if(file.type.startsWith('text')) {
                // 文本文件
                let reader = new FileReader()

                //读取文本文件
                reader.readAsText(file, 'utf-8')
                reader.onload = function () {
                    //读取成功
                    content.innerHTML += this.result + '<hr>'
                }
            } else if (file.type.startsWith('image')) {	//判断文件类型,是image开头,就是图片
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = function () {
                    img1.src = this.result
                }
            }
        }
    }
</script>
</body>
</html>
```





#### 5.将元素拖拽在容器内

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>将元素拖拽添加到容器内</title>
    <style>
        *{
            list-style: none;
        }
        #div1{
            width: 200px;
            height: 200px;
            background-color: #ccc;
        }
    </style>
</head>
<body>
<ul>
    <li>志玲</li>
    <li>凤姐</li>
    <li>张三</li>
    <li>李四</li>
    <li>王五</li>
    <li>马六</li>
</ul>
<div id="div1"></div>
<script>
    var ul = document.querySelector('ul')
    var lis = document.querySelectorAll('li')
    var div1 = document.querySelector('#div1')
    
    for(var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('draggable','true')
    }
    
    var dragged;    //定义变量用以储存拖拽的对象
    document.addEventListener('dragstart',function (e) {
        dragged = e.target
    }, false)
    div1.addEventListener('dragover',function (e) {
        //为了让drop生效
        e.preventDefault()
    }, false)
    ul.addEventListener('dragover', function (e) {
        e.preventDefault()
    })
    div1.addEventListener('drop', function (e) {    //监听div1的落下事件
        div1.appendChild(dragged)
    }, false)
    ul.addEventListener('drop', function () {   //监听ul的落下事件
        ul.appendChild(dragged)
    }, false)

</script>
</body>
</html>
```



#### 6. 拖拽上传



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>拖拽上传</title>
    <style>
        #dropArea{
            width: 100%;
            height: 300px;
            background: #00ADFE;
            font-size: 50px;
            line-height: 300px;
            text-align: center;
        }
        #img1{
            width: 500px;
            height: 300px;
        }
    </style>
</head>
<body>
<div id="dropArea">请将文件拖拽至此区域</div>
<img id="img1" src="" alt="">

<script>
    let dropArea = document.querySelector('#dropArea')
    let img1 = document.querySelector('#img1')
    dropArea.addEventListener('dragover', function (e) {
        e.preventDefault()
    }, false)

    dropArea.addEventListener('dragenter', function (e) {
        this.style.backgroundColor = 'pink'
    })

    dropArea.addEventListener('drop', function (e) {
        //这里的e就是你从文件夹里拖拽过来的元素对象DragEvent
        console.log(e);
        //DragEvent对象内有拖动的这个文件的各种信息, 其中主要用到的是dataTransfer属性
        let file = e.dataTransfer.files[0]

        //创建fileReader对象
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            img1.src = this.result
        }
        this.style.backgroundColor = '#00ADFE'
        //阻止文件在新窗口打开
        e.preventDefault()
    })
</script>
</body>
</html>
```