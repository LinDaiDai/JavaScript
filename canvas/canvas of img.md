# canvas of img



## 第一章: 图形的组合方式



### 1.1 设置组合方式



通过`globalCompositeOperation`这个属性,我们可以来更改俩个图形重叠时的样式

如是想让新图覆盖原始图,还是只保留重叠部分等等.



语法:`ctx.globalCompositeOperation = source-in`

先来看看几个属性值:

| source-in        | 只保留当前图重叠的部分      |
| ---------------- | ---------------- |
| source-out       | 绘制不重叠部分          |
| destination-over | 原图覆盖新图           |
| destination-in   | 绘制原图和新图重叠部分      |
| destination-out  | 绘制原图和新图不重叠部分     |
| destination-atop | 绘制原图和新图重叠部分以及新图  |
| lighter          | 绘制新图和原图,重叠部分加色处理 |
| copy             | 绘制新图,覆盖原图        |



例1:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
        #canvas1{
            border:1px solid red;
        }
    </style>
</head>
<body>
<canvas id="canvas1" width="500" height="500"></canvas>
</body>
<script type="text/javascript">
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();

    ctx.globalCompositeOperation = "source-out";

    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(250,150, 100, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();

</script>
</html>
```



### 1.2 几种组合方式案例



1.source-in

```javascript
ctx.globalCompositeOperation = "source-in";
```











## 第二章: 图片的处理



**注:以下对图片的处理都得在服务器的环境下才能运行**



### 2.1 像素处理



我们使用`getImageData()`能够获取指定区域的像素值`ImageData`	

- ImageData这个对象中有3个属性:width,height和data
- width和height表示访问像素区域大小
- data是一个包含访问区域所有像素信息的CanvasPixeArray
- CanvasPixeArray是一个一维数组
- 每一个像素用4个整数(r,g,b,a)值表示,范围0~255



像素的基本操作方法:



第一种:

> 获取像素,(x,y)像素区域原点坐标(width,height)像素区域的宽度和高度

`let imageData = ctx.getImageData(x,y,width,height)`



第二种:

  插入像素

`putImageData(image, x, y)`



例1:

获取50*50大小的像素区域:

```
<script>
    let canvas = document.querySelector("#myCanvas")
    let ctx = canvas.getContext("2d")

    let imgObj = new Image()
    imgObj.src = 'img/green.jpg'
    imgObj.onload = function () {
        ctx.drawImage(this, 0, 0)
        //获取像素点
        let imageData = ctx.getImageData(0,0,50,50)
        //然后将获取到的区域的图片插入到画布(300,100)的位置
        ctx.putImageData(imageData,300,100)
    }
</script>
```

这里获取到的imageDate对象:

`ImageData {data: Uint8ClampedArray(10000), width: 50, height: 50}`	

可以看到其中有三个属性:width,height和data

其中data是一个一维数组,里面存储的是所有像素信息的CanvasPixeArray

由于我们获取的是50*50这个范围的像素,所以在这个范围内一共有`50 * 50 = 2500`个像素点,其中,一个像素点由四个值组成,分别对应的是颜色的r, b, g, a 四项,即一个像素点的信息应该就是由4个值组成的,所以data一共有`2500 * 4 = 10000`项.

理解为data数组,每4个值代表的就是一个像素点.

比如,data数组的`data[0], data[1], data[2], data[3]`表示的就是第一个像素点



### 2.2 灰色处理





我们将上面的例1稍微改进一下:

获取到每一个像素点,并将像素点中的的`r,g,b`三项取平均数然后重新赋值回去.

```javascript
var imgObj = new Image();
imgObj.src = "img/green.jpg";
imgObj.onload = function (){

  ctx.drawImage(this, 0,0);

  //获取像素
  var imageData = ctx.getImageData(0,0,50,50);
  
  var pixels = imageData.data;

  //遍历像素点
  for (var i=0; i<pixels.length; i+=4){

    var r = pixels[i];
    var g = pixels[i+1];
    var b = pixels[i+2];

    //获取灰色(也就是获取三个值的平均数)
    var gray = parseInt((r+g+b)/3);
	//将r,g,b三个值都赋为统一的值
    pixels[i] = gray;
    pixels[i+1] = gray;
    pixels[i+2] = gray;
  }
	
  ctx.putImageData(imageData, 300,100);
}
```





### 2.3 反色处理



```javascript
var imgObj = new Image();
imgObj.src = "img/green.jpg";
imgObj.onload = function (){

  ctx.drawImage(this, 0,0);

  //获取像素
  var imageData = ctx.getImageData(0,0,50,50);
  
  var pixels = imageData.data;

  //遍历像素点
  for (var i=0; i<pixels.length; i+=4){

    pixels[i] = 255-pixels[i];
    pixels[i+1] = 255-pixels[i+1];
    pixels[i+2] = 255-pixels[i+2];
  }
	
  ctx.putImageData(imageData, 300,100);
}
```



## 第三章: requestAnimationFrame-帧动画





我们利用普通的定时器来实现动画的写法为:

```javascript
var x = 0;

function animate(){
  //清除画布内容
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  x += 2;
  ctx.fillStyle = "red";
  ctx.fillRect(x, 0, 50, 50);
  if (x > 200){
    return;
  }
  setTimeout(animate,30);
}
animate();
```



使用`requestAnimationFrame`实现动画

```
var x = 0;

function animate(){
  //清除画布内容
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  x += 2;
  ctx.fillStyle = "red";
  ctx.fillRect(x, 0, 50, 50);
  if (x > 200){
    return;
  }
  requestAnimationFrame(animate);			//唯一不同
}
animate();
```



可以看到俩段代码的区别,仅仅是一个用的是`setTimout`,一个是`requestAnimationFrame`	

`setTimout`表示的是: 每隔30毫秒,执行一次`animate()`函数.

而`requestAnimationFrame`	在一秒中执行多少次是由它的应用场景决定的,一般都能达到58~60次.也就是1000/60(相当于定时器16毫秒执行一次)

那么这里得到的1000/60就是一帧.不同的场景帧数可能会不一样.

下面的小例子用来获取`requestAnimationFrame`动画函数在一秒内执行的次数

例1:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
        #myCanvas{
            border: 1px solid red;
        }
    </style>
</head>
<body>
<canvas id="myCanvas" width="500" height="500"></canvas>
</body>
<script type="text/javascript">
    var canvas = document.querySelector("#myCanvas")
    var ctx = canvas.getContext("2d")

    var x = 0
    var speedX = 2
    // 帧数
    var frame = 0

    var oldDate = new Date()

    function move () {
        frame++
        var newDate = new Date()
        //每隔30帧打印一次当前的次数
        if (frame % 30 === 0) {
            console.log(parseInt(1000 / (newDate.getTime() - oldDate.getTime())))
        }
        // 帧动画
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        x += speedX
        ctx.fillRect(x, 0, 40, 40)
        if (x > 460) {
            speedX *= -1
        } else if (x < 0) {
            speedX *= -1
        }

        oldDate = newDate

        if (frame > 10000) {
            frame = 0
        }
        requestAnimationFrame(move)
    }
    move()
</script>
</html>
```





## 第四章:视频的处理



### 4.1 插入视频



在页面中,插入一段视频,只需要使用`<video src="video1.mp4"></video>`标签

而在canvas中我们只需要将视频当图片一样插入,在利用canvas中的动画让它达到播放的效果.



例1:

```
<body>
<div class="out">
    <video id="video1" src="img/xiaoyin.mp4" style="width:300px;" autoplay></video>
    <canvas id="myCanvas" width="1000" height="300"></canvas>
</div>

<script>
    let canvas = document.querySelector("#myCanvas")
    let ctx = canvas.getContext("2d")
    let imgObj = document.querySelector('#video1')

    function play(){
        ctx.drawImage(imgObj, 0, 0,canvas.width,canvas.height)
        window.requestAnimationFrame(play);
    }
    play()
</script>
</body>
```



此时页面中出现的应该是俩个俩个视频,并且用canvas绘制出来的视频并不会卡顿,效果和直接用`video`的一样,要是你想只显示canvas的视频的话,可以将`video1`给`display:none`掉.



### 4.2 灰色视频



在例1的基础上加以改进,

```
<body>
<div class="out">
    <video id="video1" src="img/xiaoyin.mp4" style="width:300px;" autoplay></video>
    <canvas id="myCanvas" width="1000" height="300"></canvas>
</div>

<script>
    let canvas = document.querySelector("#myCanvas")
    let ctx = canvas.getContext("2d")
    let imgObj = document.querySelector('#video1')

    function play(){
        ctx.drawImage(imgObj, 0, 0,canvas.width,canvas.height)

        var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
        // console.log(imageData);
        var pixels = imageData.data;

        //遍历像素点
        for (var i=0; i<pixels.length; i+=4){

            var r = pixels[i];
            var g = pixels[i+1];
            var b = pixels[i+2];

            //获取灰色
            var gray = parseInt((r+g+b)/3);

            pixels[i] = gray;
            pixels[i+1] = gray;
            pixels[i+2] = gray;
        }

        ctx.putImageData(imageData, 0,0);

        window.requestAnimationFrame(play);
    }
    play()
</script>
</body>
```