## js动画

js中实现动画的俩种形式:

1.利用js中的定时器setTimeout或者setInterval每隔一段时间执行一次对DOM元素的样式的改变,来达到动画效果.

2.利用requestAnimationFrame()方法



### 1.基本运动	

```javascript
例1:
把一个div要求在10s时间内,向右移动1000px

css布局:
div{
  	width:200px;
  	height:200px;
  	background:red;
  	transform:translate(200px,100px);	//相对于原来的位置水平和竖直方向分别移动200px和100px;
}

<div><div>

<script>
var startTime = new Date();//动画的开始时间(当前时间)
    var duration = 10000;//周期    
    var dis = 1000;//位移
    var div = document.querySelector('div');
    requestAnimationFrame(function step() {
        //首先计算时间已经用去的比例
        var p = Math.min(1,(new Date() - startTime)/duration);	//归一的时间	第一个参数表示周期值(就是走几次)
        div.style.transform = `translateX(${dis*p}px)`;	//匀速直线运动
        div.style.transform = `translateX(${dis*p*p}px)`;	//匀加速直线运动
      	div.style.transform = `translateX(${dis*p*(2-p)}px)`;	//匀减速直线运动
        div.style.transform = `translateX(${dis*p*(1-p)}px)`;	//执行一次的来回匀加速直线运动
        div.style.transform = `translate(${dis*p}px,${dis*p*p}px)`; 	//平抛运动
        if(p<1){
            requestAnimationFrame(step);
        }else{
            cancelAnimationFrame(step)
        }
    })
    </script>
```



### 2.循环动画

```javascript
在判断p的时候做另一个判断
if(p<1) {
            requestAnimationFrame(step);
 }else {
            startTime = new Date();		//初始化时间
            requestAnimationFrame(step)	//再次调用step函数
        }
```



### 3.正弦运动

```

div{
 		position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-top: 200px;
}

<div></div>

var startTime = new Date();//动画的开始时间(当前时间)
    var duration = 5000;//周期
    var dis = 400;//位移
    var pi = Math.PI;
    var div = document.querySelector('div');
    requestAnimationFrame(function step() {
        //首先计算时间已经用去的比例
        var p = Math.min(4,(new Date() - startTime)/duration);		//第一个参数表示周期,运动4次.
        div.style.transform = `translate(${dis*p}px,${200*Math.sin(2*pi*p)}px)`;
        if(p<4) {
            requestAnimationFrame(step);
        }
    })
```



### 4.旋转运动



#### 第一种旋转运动



圆周运动公式：

> ​		x = R.sin(2*π*p)	, y = R.cos(2*π*p)

```
div{
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 200px;
        margin-left: 600px;
    }
    
<div></div>

<script>
var startTime = new Date();//动画的开始时间(当前时间)
    var duration = 3000;//周期,即旋转一次多长时间
    var r = 100;
    var pi = Math.PI;
    var div = document.querySelector('div');
    requestAnimationFrame(function step() {
        //首先计算时间已经用去的比例
        var p = Math.min(1,(new Date() - startTime)/duration);
        div.style.transform = `translate(${r*Math.sin(2*pi*p)}px,${r-r*Math.cos(2*pi*p)}px)`;
        if(p<1) {
            requestAnimationFrame(step);
        }else {
            startTime = new Date();		//初始化时间
            requestAnimationFrame(step)	//再次调用step函数
        }
    })
</script>
```



#### 第二种旋转运动

> 通过改变元素的rotate属性



transform-origin

旋转的中心点

默认为transform-origin:50% 50%;			也就是元素的中心



表示一个元素的最左上角到旋转中心的距离:

```
//元素的最右下角
transform-origin:100% 100%;

//距离元素最左边300px,最上边300px
transform-origin:300px 300px;
```



```
例1:
原地旋转:
原地旋转的css:
	transform-origin:50% 50%;	(不用写,用默认的就行)
	var startTime = new Date();//动画的开始时间(当前时间)
    var duration = 3000;//周期
    var div = document.querySelector('div');
    requestAnimationFrame(function step() {
        //首先计算时间已经用去的比例
        var p = Math.min(1,(new Date() - startTime)/duration);
        div.style.transform = `rotateZ(${360*p}deg)`
        if(p<1) {
            requestAnimationFrame(step);
        }else {
            startTime = new Date();		//初始化时间
            requestAnimationFrame(step)	//再次调用step函数
        }
    })
    
 例2:
 绕着某一个中心点旋转
 只要改变旋转中心就行:
 	transform-origin:300% 300%;
 	
```



### 5.运动算子

当我们的动画涉及到一些比较复杂的变化时,就要用到运动算子了,动画算子是一个函数,

一些已经写好的运动方法,直接调用算子的方法就行了,

如:将动画算子全部封装到一个对象Easing中,我们要用到哪种运动的时候直接调用

```javascript
文件名:Easing.js

Easing = {
        // 匀速运动
        linear: function (t) {
            return t;
        },
		// 匀加速运动
        easeIn: function (t) {
            return t * t;
        },
		// 减速运动
        easeOut: function (t) {
            return (2 - t) * t;
        },
		//先加速后减速
        easeBoth: function (t) {
            return (t *= 2) < 1 ? .5 * t * t : .5 * (1 - (--t) * (t - 2));
        },
        // 4次方加速
        easeInStrong: function (t) {
            return t * t * t * t;
        },
        // 4次方法的减速
        easeOutStrong: function (t) {
            return 1 - (--t) * t * t * t;
        },
        // 先加速后减速，加速和减速的都比较剧烈
        easeBothStrong: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : .5 * (2 - (t -= 2) * t * t * t);
        },
        //	
        easeOutQuart: function (t) {
            return -(Math.pow((t - 1), 4) - 1)
        },
        // 指数变化 加减速
        easeInOutExpo: function (t) {
            if (t === 0) return 0;
            if (t === 1) return 1;
            if ((t /= 0.5) < 1) return 0.5 *Math.pow(2, 10 * (t - 1));
            return 0.5 * (-Math.pow(2, - 10 * --t) + 2);
        },
        //指数式减速
        easeOutExpo: function (t) {
            return (t === 1) ? 1 : -Math.pow(2, - 10 * t) + 1;
        },
		// 先回弹，再加速
        swingFrom: function (t) {
            return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
        },

		// 多走一段，再慢慢的回弹
        swingTo: function (t) {
            return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
        },

		//弹跳
        bounce: function (t) {
            var s = 7.5625,
                r;

            if (t < (1 / 2.75)) {
                r = s * t * t;
            } else if (t < (2 / 2.75)) {
                r = s * (t -= (1.5 / 2.75)) * t + .75;
            } else if (t < (2.5 / 2.75)) {
                r = s * (t -= (2.25 / 2.75)) * t + .9375;
            } else {
                r = s * (t -= (2.625 / 2.75)) * t + .984375;
            }

            return r;
        }
    };
```



```javascript
例1:
调用上面的js代码,来进行一个小球弹跳效果
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test3</title>
    <style>
        div{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: red;
            position: absolute;
        }
    </style>
</head>
<body>
    <div></div>
<script type="text/javascript" src = "Easing.js"></script>
<script>
    var div = document.querySelector('div');
    var startTime = new Date();
    var duration = 2000;
    var dis = 500;
    requestAnimationFrame(function step(){
        var p = Math.min(1,(new Date()-startTime)/duration);
        //调用Easing中的弹跳方法;
        var ease = Easing.bounce(p);
        div.style.transform = `translateY(${ease*dis}px)`;
        if(p<1){
            requestAnimationFrame(step)
        }
    })
</script>
</body>
</html>
```



### 6.封装animation函数



> 可以将animation函数和动画算子easing都封装到一个js代码中,要用的时候直接调用就行了



封装animation函数:

```javascript
文件名:my_animation.js

/**
 * 表示动画的构造函数
 * @param duration  周期
 * @param easing      动画算子
 * @param doSomething   执行的动画效果
 * @constructor
 */
function Animation(duration,easing,doSomething){
    this.duration = duration;
    this.easing = easing;
    this.doSomething = doSomething;
}
Animation.prototype = {
    /**
     * 开始动画的函数
     * @param count 动画播放的次数
     */
    start:function (count) {
        //如果传进来的doSomething不是一个函数,则直接返回;
        if(typeof this.doSomething != 'function') return;
        //如果传进来的easing不是一个动画算子,则当成普通的p来用
        if(typeof this.easing!='function'){
            this.easing=function (p) {
                return p;
            }
        }
        //设置动画开始的时间,为当前时间;
        var startTime = new Date();
        //获取this
        var that = this;
        //执行动画
        this.frameId=requestAnimationFrame(function step(){
            //如果动画次数小于等于0,直接返回
            if(count<=0) return;
            //计算时间已经用去的比例
            var p = Math.min(1,(new Date()-startTime)/that.duration);
            //调用doSomething()函数并传入动画算子计算的结果
            that.doSomething(that.easing(p));
            //判断若p<1则表示动画还没有结束则继续执行
            if(p<1){
                that.frameId=requestAnimationFrame(step)
            }else {
                //若p>1,则表示动画已经执行了一遍了,此时将count-1并继续执行动画
                    count--;
                    //当count还大于0时,则表示动画还要继续执行
                    if(count>0){
                        //重新更新动画的开始时间
                        startTime=new Date();
                        that.frameId=requestAnimationFrame(step);
                    }
                }
        });
    },
    /**
     * 定义动画结束的函数
     */
    stop:function () {
        cancelAnimationFrame(this.frameId)
    }
};
```



> 例1:	从左向右运动的div并呈现弹跳效果

```
<script type="text/javascript" src = "Easing.js"></script>
<script type="text/javascript" src="my_animation.js"></script>
<script>
    var div = document.querySelector('div');
    var dis = 1000;	//运动的位移
    var animator = new Animation(2000,Easing.bounce,function (e) {
        div.style.transform = `translate(${dis*e}px)`;
    });
    animator.start(Infinity);
</script>
```

例2:原地匀速旋转的div

```
<script type="text/javascript" src = "Easing.js"></script>
<script type="text/javascript" src="my_animation.js"></script>
<script>
    var div = document.querySelector('div');
    var animator = new Animation(2000,Easing.linear,function (e) {
        div.style.transform = `rotate(${360*e}deg)`;
    });
    animator.start(Infinity);
</script>
//注:旋转也可以控制它的旋转方式
//比如Easing.linear就是匀速旋转
//	Easing.easeIn就是匀加速旋转
//	Easing.bounce就是弹跳效果的旋转
```

例3:绕某一点旋转的div

```
和例2一样,只要修改div的transform-origin

//元素的最右下角
transform-origin:100% 100%;

//距离元素最左边300px,最上边300px
transform-origin:300px 300px;
```

