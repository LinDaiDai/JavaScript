# canvas基础



## 第一章: canvas简介



`<canvas>` 是 `HTML5` 新增的，一个可以使用脚本(通常为`JavaScript`)在其中绘制图像的 `HTML` 元素。它可以用来制作照片集或者制作简单(也不是那么简单)的动画，甚至可以进行实时视频处理和渲染。



**主要用途:**

•基础图形的绘制

•文字的绘制

•图形的变形和图片的合成

•图片和视频的处理

•动画的实现

•小游戏的制作



## 第二章: 基本使用



### 2.1 canvas标签



```html
<canvas id="canvas" width="300" height="300"></canvas>
```

canvas有俩个可选的属性:

​	1.宽度width:	默认为300px	;

​	2.高度height:		默认为150px;

也可以使用css来控制宽高:

**但是如宽高属性和初始比例不一致，他会出现扭曲。所以，建议永远不要使用`css`属性来设置`<canvas>`的宽高。**	



### 2.2 兼容性问题



> 由于某些较老的浏览器（尤其是IE9之前的IE浏览器）或者浏览器不支持HTML元素`<canvas>`，在这些浏览器上你应该总是能展示替代内容。
>
>  支持`<canvas>`的浏览器会只渲染`<canvas>`标签，而忽略其中的替代内容。不支持 `<canvas>` 的浏览器则 会直接渲染替代内容。



> 1.用文本替换:

```
<canvas>
	您的浏览器不支持canvas,建议您升级流浪器
</canvas>	
```

> 用 `<img>` 替换：

```
<canvas>
    <img src="./王先生.jpg" alt=""> 
</canvas>
```







### 3.3 基本图形设置



| beginPath() | 开始绘制                      |
| ----------- | ------------------------- |
| moveTo(x,y) | 设置绘制起点                    |
| lineTo(x,y) | 设置下一个点                    |
| closePath() | 结束绘制,会从当前点回到结束点,形成一个封闭的图形 |
| strokeStyle | 设置绘制的样式                   |
| stroke()    | 绘制点之间的路线                  |
| fillStyle   | 设置填充样式                    |
| fill()      | 填充当前绘图                    |
| lineWidth   | 线宽                        |





## 第二章: 基本图形绘制





### 2.1  绘制矩形



#### 1. 利用线条画矩形



```javascript
<body>
	<canvas id="canvas" style="border: 1px solid #000">您的浏览器不支持</canvas>
	<script>
      	//获取canvas
        let canvas = document.querySelector('#canvas')
		
		//设置画布的宽高
        canvas.width = 800
        canvas.height = 800
        
		//获得 2d 上下文对象
		let context = canvas.getContext('2d')
        context.lineWidth = 5     //指定一条直线的宽度
		
		//指定开始绘制
		context.beginPath()
		
		//状态设置
        context.moveTo(100,100)	//设置起点
        context.lineTo(500,100)	//设置下一个点
        context.lineTo(500,400)
        context.lineTo(100,400)
        context.lineTo(100,100)
        //闭合路径
        context.closePath()
        context.strokeStyle = "#058"   //指定一条直线的样式
        
        //绘制点之间的路线
        context.stroke()
        
        //填充
        context.fillStyle = "red"
        context.fill()
```



效果图:

![img1](E:\canvas\img\img1.png)



#### 2. 绘制多个矩形



```javascript
<script>

    window.onload = function () {

        //获取canvas
        let canvas = document.querySelector('#canvas')

        canvas.width = 800
        canvas.height = 800

        let context = canvas.getContext('2d')
        let arr = ['red', 'blue', 'green', 'yellow']
        context.lineWidth = 5     //指定一条直线的宽度

        for (let i = 0; i < arr.length; i++) {
            let num = i*50
            context.beginPath()
            //状态设置
            context.moveTo(100+num, 100+num)
            context.lineTo(500+num, 100+num)
            context.lineTo(500+num, 400+num)
            context.lineTo(100+num, 400+num)
            context.lineTo(100+num, 100+num)
            context.strokeStyle = "#058"   //指定一条直线的样式
            //绘制
            context.stroke()
            context.fillStyle = arr[i]
            context.fill()
        }
    }
</script>
```

效果图如下:

![img2](E:\canvas\img\img2.png)





#### 3. strockeRect和fillRect

可以直接使用`strockeRect`和`fillRect`来绘制矩形:

​	1.`strockeRect`绘制空心矩形:

```
strockeRect(x,y,w,h)

context.strokeRect(50,50,400,300)
```



​	2.`fillRect`绘制填充矩形:

```
fillRect(x,y,w,h)

context.fillRect(50,50,400,300)
```



例:绘制有边框的实心矩形

```javascript
<script>
    
        //获取canvas
        let canvas = document.querySelector('#canvas')

        canvas.width = 600
        canvas.height = 600

        let context = canvas.getContext('2d')
        context.lineWidth = 5     //指定一条直线的宽度
        
        //设置线段的样式
        context.strokeStyle = "#058"
		//设置填充的颜色
        context.fillStyle = 'red'
		
		//绘制空心矩形
        context.strokeRect(50,50,400,300)
        
        //绘制实心矩形
        context.fillRect(50,50,400,300)
    
</script>
```

效果图如下:

![img3](E:\canvas\img\img3.png)





### 2.2  绘制圆形



#### 1. arc( )

语法:

```javascript
context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
```

参数:

​	`(x,y)`圆心坐标;

​	`radius`圆形的半径;

​	`startAngle`开始的角度;

​	`endAngle`结束的角度;

​	`anticlockwise`绘制方向,顺时针还是逆时针,`true`表示逆时针，`false`表示顺时针.(默认是顺时针)



例1:

```
<script>

        //获取canvas
        let canvas = document.querySelector('#canvas')

        canvas.width = 600
        canvas.height = 600
        let context = canvas.getContext('2d')
        context.lineWidth = 5
        let deg = Math.PI / 180
        
        context.strokeStyle = "#058"
        context.arc(200,200,100,0,360*deg,true)
        context.stroke()		//绘制空心圆

        context.beginPath()
        context.fillStyle = 'red'
        context.arc(400,200,100,0,360*deg,true)
        context.fill()			//绘制填充圆
		
</script>
```

效果图:

![img4](E:\canvas\img\img4.png)





### 2.3. 绘制文字



俩种方式绘制文本:

​	空心文本	和 填充文本

##### 1. strokeText( )

`strokeText(text, x, y [, maxWidth])`

在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.



##### 2. fillText( )

`fillText(text, x, y [, maxWidth])`

在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.



例1:

```
<script>

        //获取canvas
        let canvas = document.querySelector('#canvas')

        canvas.width = 600
        canvas.height = 600

        let context = canvas.getContext('2d')
        context.lineWidth = 5     //指定一条直线的宽度

        context.strokeStyle = "#058"

        context.fillStyle = 'red'
        
        context.font = "50px 黑体"
        context.fillText('李先生',50,100)
        context.strokeText('王先生',50,150)	
      
</script>
```

效果图:

![img5](E:\canvas\img\img5.png)



### 2.4 阴影设置





| shadowColor   | 阴影颜色                      |
| ------------- | ------------------------- |
| shadowOffsetX | X方向偏移量                    |
| shadowOffsetY | Y方向偏移量                    |
| closePath()   | 结束绘制,会从当前点回到结束点,形成一个封闭的图形 |
| shadowBlur    | 设置阴影的模糊级别                 |



```javascript
		context.shadowOffsetX = 10;
		context.shadowOffsetY = 10;
		
		context.shadowColor = "red";
		context.shadowBlur = 40;
		
		context.fillRect(50,50,200,100);
```



### 2.5 图形变换

所有的变换都是针对整个画布的

#### 1. 平移

> translate(x,y)

```
		let context = canvas.getContext('2d')
        context.translate(50,50)		//整个画布向右向下平移了50px
        context.font = "50px 黑体"
        context.strokeText('王先生',50,150)
        context.fillText('李先生',50,100)
```

例1:

```
cxt.fillStyle = 'red'
cxt.translate(100,100)
cxt.fillRact(0, 0, 200, 200)

cxt.fillStyle = 'green'
cxt.translate(200,200)
cxt.fillRact(0, 0, 200, 200)

```

![img8](E:\canvas\img\img8.png)

当红色的方块平移了100x100之后,绘制绿色的方块的时候,也使用translate属性,此时是在100x100的基础上平移的200x200

也就是说绿色实际平移的是300x300







#### 2.旋转

> rotate(deg)

```javascript
<script>
        //获取canvas
        let canvas = document.querySelector('#canvas')

        canvas.width = 600
        canvas.height = 600

        let context = canvas.getContext('2d')
        let deg = Math.PI / 180
        context.rotate(45*deg)
        
        context.fillStyle = 'red'
        context.fillRect(150,0,100,100)
        
        context.fillStyle = 'blue'
        context.fillRect(250,0,100,100)
</script>
```



#### 3. 缩放

> scale(x, y)

 我们用它来增减图形在 `canvas` 中的像素数目，对形状，位图进行缩小或者放大。

 `scale`方法接受两个参数。`x,y`分别是横轴和纵轴的缩放因子，它们都必须是正值。值比 1.0 小表示缩 小，比 1.0 大则表示放大，值为 1.0 时什么效果都没有。



### 2.6 线条的属性



#### 1. lineCap

线条的开头和结尾的样式

butt	(default)	默认无变化

round	会突出一段圆头

square	会突出一段方头



#### 2. lineJoin

线条与线条相交时指定出来的形状

miter (default) 默认呈现尖角的形状

bevel	斜接的形式

round	圆角的形式

```javascript
	cxt.lineWidth = 10
    cxt.lineJoin = 'round'
```



#### 3. miterLimit

只有在`cxt.lineJoin = 'miter'`时才可以使用

指的是线条相交出内角和外角直接距离的最大值

当最大值超出了10px的时候,就会自动使用bevel,而不会有尖角的效果

所以当俩个线条都很粗时并且相交角度很小不能呈现尖角时,可以增大miterLimit的值

如: `cxt.miterLimit = 20`

默认值为 10 (也就是10px)

![img7](E:\canvas\img\img7.png)



#### 4. lineWidth

设置线条的宽度

`cxt.lineWidth = 10`



## 第三章: 状态的保存和读取



 `save` 和 `restore` 方法是用来保存和恢复 `canvas` 状态的，都没有参数。

 `Canvas` 的状态就是当前画面应用的所有样式和变形的一个快照。



```
<script>
        //获取canvas
        let canvas = document.querySelector('#canvas')

        canvas.width = 600
        canvas.height = 600
        let context = canvas.getContext('2d')
        context.lineWidth = 5
        let deg = Math.PI / 180
		//保存当前画布的状态
        context.save()		//save()以上的状态
        
        context.rotate(45*deg)
        context.fillStyle = 'red'
        context.fillRect(100,0,50,50)

        //恢复(回到)之前的状态
        context.restore()
        context.fillStyle = 'yellow'
        context.fillRect(100,0,50,50)
</script>
```

效果图如下:

![img6](E:\canvas\img\img6.png)



可以看到黄色的矩形并没有和红色一样被旋转45度,而是使用在`context.save()`之前的状态.



## 第四章: 贝塞尔曲线



### 4.1 二次贝塞尔曲线

`quadraticCurveTo(cp1x, cp1y, x, y):`

**说明：**

 参数1和2：控制点坐标

 参数3和4：结束点坐标

```javascript
	let canvas = document.querySelector('#canvas')
    let context = canvas.getContext('2d')
    context.lineWidth = 10

    context.beginPath()
    context.moveTo(0,400)
    //2次贝塞尔曲线
    context.quadraticCurveTo(300,300,400,0)
    
```



### 4.2 三次贝塞尔曲线

`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y):`

说明：

 参数1和2：控制点1的坐标

 参数3和4：控制点2的坐标

 参数5和6：结束点的坐标

```javascript
	let canvas = document.querySelector('#canvas')
    let context = canvas.getContext('2d')
    context.lineWidth = 10

    context.beginPath()
    context.moveTo(0,400)
    //3次贝塞尔曲线
    context.bezierCurveTo(300,-200,400,400,400,0)
    context.stroke()
```





## 第五章: 动画



### 5.1 清空canvas

> 再绘制每一帧动画之前，需要清空所有。清空所有最简单的做法就是`clearRect()`方法

```javascript
let canvas = document.querySelector('#canvas')
    let context = canvas.getContext('2d')

    context.fillRect(50,50,100,100)

    //清除画布
    context.clearRect(0,0,canvas.width,canvas.height)
    
```



### 5.2 控制动画

实际就是通过不停的情况画布,再绘制图形来达到动画的效果

一般用到下面三个方法：

1. `setInterval()`
2. `setTimeout()`
3. `requestAnimationFrame()`



例:制作一个向右下角来回运动的方块

```javascript
<script>
    let canvas = document.querySelector('#canvas')
    let context = canvas.getContext('2d')

    let x = 0
    let y = 0
    let speedX = 2
    setInterval(function () {
    	//清空画布
        context.clearRect(0,0,canvas.width,canvas.height)

        x += speedX
        y += speedX
        if(x > 350){
            speedX *= -1
        }else if(x <= 0){
            speedX *= -1
        }
		//绘制方块
        context.fillRect(x,y,50,50)
    },30)

</script>
```



