## 轮播图

### 1.无缝不停轮播

​	![img1](https://github.com/LinDaiDai/JavaScript/blob/master/CarouselFigureImg/img1.png?raw=true)

​	**1. body布局:**

```javascript
<div class="container">						//将ul和li包住,起显示图片的作用
       <ul>									
           <li><img src="img/img1.png"></li>
           <li><img src="img/img2.png"></li>
           <li><img src="img/img3.png"></li>
           <li><img src="img/img4.png"></li>
           <li><img src="img/img1.png"></li>
       </ul>
   </div>
```

​	**2. css样式:**

```javascript
 <style>
        *{
            margin: 0;
            padding: 0;
        }
        .container{
            position: relative;		//给要动的元素也就是ul 它的父级加上相对定位
            width: 600px;			//
            height: 400px;
            overflow: hidden;		//给要动的元素也就是ul 它的父级加上溢出隐藏
        }
        .container > ul{
            position: absolute;		//给要动的元素也就是ul 加上绝对定位,才能保证用left和top;
            width: 3000px;			//ul 的宽度为 li 的个数 * li 的宽度
            height:100%;
            list-style: none;
        }
        .container > ul >li{
            float: left;	
            width: 600px;
            height: 100%;

        }
        .container > ul >li img{
            width: 100%;
            height: 100%;
        }
    </style>
```

**3. JS代码:**

```javascript
var ul = document.querySelector(".container > ul");	 //获取ul
        setTimeout(function step(){					//设置定时器 
            if(ul.offsetLeft<=-2400){				//判断:若ul走到倒数第二张图的时候,让left从0开始运行
                ul.style.left=0+'px';
            }else{
                var left = ul.offsetLeft -3;		//给ul设置速度
                ul.style.left=left+'px';			
            }
            var time = 10;							//设定一个时间,以控制其轮播的速度
            setTimeout(step,time);					//定时器内部调用定时器
        },0)
```

### 2.无缝停顿轮播

> 停顿轮播在不停轮播的基础上加以改进,判断当ul走到li宽度的倍数时,让定时器的时间加大,就可以起到停顿的效果

​	body布局以及css样式不变

**JS代码:**



```javascript
   var ul = document.querySelector(".container > ul");	 //获取ul
   setTimeout(function step(){					//设置定时器 
        if(ul.offsetLeft<=-2400){				//判断:若ul走到倒数第二张图的时候,让left从0开始运行
            ul.style.left = 0 +'px';
        }else{
            speed = -3;		//给ul设置速度			
        }
        var time;				
        if(ul.offsetLeft%600==0){				//做判断:当ul走到li宽度的倍数时
          time = 3000;							//设定一个很大的时间,也就是很小的速度
        }else{									
          time = 10;
        }
     	ul.style.left=ul.offsetLeft+speed+'px'
        setTimeout(step,time);					//定时器内部调用定时器
    },0)
```
### 3.无缝停顿反向轮播

> 反向轮播在停顿轮播的基础上加以改进,判断当ul最左边和ul走到最右边,将速度反向;
>
> 将最后一张重复的li去掉并修改ul的宽度

```javascript
		var ul = document.querySelector(".container > ul");
        var speed = 3;
            setTimeout(function step(){
               if(ul.offsetLeft<=-1800||ul.offsetLeft>=0){		//判断当ul最左边和ul走到最右边,将速度反向;
                    speed*=-1;
               }
               var time = 0;
               if(ul.offsetLeft%600==0){					//做判断:当ul走到li宽度的倍数时
          		   time = 3000;							    //设定一个很大的时间,也就是很小的速度
               }else{
                    time=10;
               }
               ul.style.left=ul.offsetLeft+speed+'px';	
               setTimeout(step,time);						//定时器内部调用定时器
            },0)
```


### 4. 透明度普通轮播

​	**1.body布局上一样:**

​	**2.css样式**

​	将所有li 绝对定位,重叠在一起

​	**3.JS:**	

​		先获取到ul 和 li   并对 li的数组进行遍历	赋值每个的opacity		

​		**注:要在js中遍历li 再给它赋值opacity,而不是在css中直接设置属性**

​			**是为了在js中好获取到opacity并给它进行修改设置**				

```
var ul = document.querySelector(".container > ul");	 //获取ul
        var lis = document.querySelectorAll('.container > ul >li');
        var i = 0;
        for(var i=0;i<lis.length;i++){
            if(i==0){					//默认显示第一张图,让其透明度为1;
                lis[i].style.opacity=1;
            }else{						//其他图片透明度为0;
                lis[i].style.opacity=0;
            }
        }
        var i=0;						//重新赋值i 
        var time = 50;					//设置时间,控制图片转换的速度,时间越大,速度越慢
        setTimeout(function step(){					//设置定时器
            lis[i%4].style.opacity-=0.05;	
            lis[(i+1)%4].style.opacity=parseFloat(lis[(i+1)%4].style.opacity)+0.05;
            if(lis[i%4].style.opacity==0){
                i++;
                time = 1000;
            }else{
                time =50
            }

            setTimeout(step,time);
        },0)
```

​	

### 5.透明度指示器轮播

**1.body布局:**

```javascript
<body>
<div class="container">						
        <ul id="picture">							//轮播图片区
            <li><img src="img/img1.jpg"></li>
            <li><img src="img/img2.jpg"></li>
            <li><img src="img/img3.jpg"></li>
            <li><img src="img/img4.jpg"></li>
            <li><img src="img/img5.jpg"></li>
            <li><img src="img/img6.jpg"></li>
        </ul>
        <ul class="arrow">							//左右切换
            <li class="arrowLeft"></li>
            <li class="arrowRight"></li>
        </ul>
         <div class="bottom"> 						//指示器
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li style="margin:0">6</li>
            </ul>
          </div>
</div>
```



**2.css样式**

```javascript
<style>
        * {
            margin: 0;
            padding: 0;
        }
        .container {						//整体样式
            position: relative;
            width: 600px;
            height: 400px;
            overflow: hidden;
            margin: 20px auto;
        }
        .container > .picture {				//轮播图片区样式
            position: absolute;
            width: 600px;
            height: 100%;
            list-style: none;
        }
        .container > .picture > li {
            position: absolute;
            width: 600px;
            height: 100%;
        }
        .container > .picture > li img {
            width: 100%;
            height: 100%;
        }
        .container > .arrow{					//左右切换区样式
            position: absolute;
            height: 70px;
            width: 100%;
            top: 40%;
            left: 0;
            list-style: none;
        }
        .container > .arrow > li {
            width: 40px;
            height: 70px;
            padding: 0;
            margin: 0;
            cursor: pointer;
        }
        .container > .arrow > li:nth-child(1) {
            float: left;
            background: url("img/arrow_left1.png");
        }
        .container > .arrow > li:nth-child(2) {
            float: right;
            background: url("img/arrow_right1.png");
        }
        .container > .arrow > li:nth-child(1):hover {
            background: url("img/arrow_left2.png");
        }
        .container > .arrow > li:nth-child(2):hover {
            background: url("img/arrow_right2.png");
        }
        .container .bottom {							//指示器样式
            position: relative;
            margin: 0 auto;
            width: 215px;
            height: 40px;
            top: 350px;
            border-radius: 20px;
            background-color: grey;
        }
        .container > .bottom > ul{
            position: absolute;
            height: 30px;
            width: 205px;
            bottom: 20px;
            list-style: none;
            top: 5px;
            left: 5px;
        }
        .container > .bottom > ul > li{
            float: left;
            height: 100%;
            width: 30px;
            margin: 0 5px 0 0;
            padding: 0;
            border-radius: 50%;
            background-color: white;
            font-size: 20px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
        }
    </style>
```

**3.JS代码:**	

​	代码分析:		

​				1.先进行准备工作,	利用for循环将初始化的图片透明度已经指示器的背景色设定好

​				2.给整个container添加事件,当鼠标上来的时候,让自动播放停止

​				3.给左,右"按钮" 点击事件,用以切换上一张下一张图片;

​				4.给指示器onmouseenter事件,使得图片与你的指示器同步,达到随意切换图片的效果;

​				5.定义 图片切换的函数 ,使得以上事件都可以调用它

​				6.定义自动播放的函数

```javascript
<script>
    var container = document.querySelector('.container');
    var pictureLis = document.querySelectorAll('.container > .picture > li');
    var optionLis = document.querySelectorAll('.container > .bottom >ul > li');
    var arrowLeft = document.querySelector('.container .arrow  > .arrowLeft');
    var arrowRight = document.querySelector('.container .arrow > .arrowRight');
    var showIndex = 0;  //当前正在显示的图片的下标
    //初始化
    function init() {
        for (var j = 0; j < pictureLis.length; j++) {
            if (j == 0) {
                optionLis[j].style.backgroundColor='red';
                pictureLis[j].style.opacity = 1;
            } else {
                pictureLis[j].style.opacity = 0;
            }
        }
        //给整个container添加事件,当鼠标上来的时候,让自动播放停止
        container.onmouseenter = function () {
            clearTimeout(autoPlayId);

        };
        container.onmouseleave = function () {
            auto();
        };
        //给左按钮和右按钮添加点击事件
        arrowLeft.onclick=function(){
            optionLis[showIndex % optionLis.length].style.backgroundColor='white';
            var preIndex = showIndex-1+pictureLis.length;
            move(showIndex,preIndex);
            showIndex=preIndex;
            optionLis[showIndex%optionLis.length].style.backgroundColor='red';
        };
        arrowRight.onclick=function(){
            optionLis[showIndex % optionLis.length].style.backgroundColor='white';
            move(showIndex,showIndex+1);
            showIndex++;
            optionLis[showIndex%optionLis.length].style.backgroundColor='red';
        };
        //给指示器添加onmouseenter事件,使得图片与指示器同步
        for(let i=0;i<optionLis.length;i++){
            optionLis[i].onmouseenter=function(){

                move(showIndex,i);
                optionLis[showIndex%optionLis.length].style.backgroundColor='white';
                optionLis[i%optionLis.length].style.backgroundColor='red';
                showIndex=i;
            }
        }
    }
    init(); //调用初始化
    
    //图片移动
    function move(showIndex,nextIndex) {
        setTimeout(function step() {
            pictureLis[showIndex % pictureLis.length].style.opacity -= 0.05;
            pictureLis[nextIndex % pictureLis.length].style.opacity =
                +pictureLis[nextIndex % pictureLis.length].style.opacity + 0.05;
            if (pictureLis[showIndex % pictureLis.length].style.opacity <= 0||pictureLis[nextIndex%pictureLis.length].style.opacity>=1) return;
            setTimeout(step, 5)
        }, 0)
    }

    //自动播放
    var autoPlayId;     //自动播放定时器id
    function auto() {
        autoPlayId = setTimeout(function autoStep() {
            optionLis[showIndex].style.backgroundColor = "white";
            move(showIndex,showIndex+1);    //切换下一张图片
            showIndex++;
            if (showIndex == pictureLis.length) showIndex = 0;
            optionLis[showIndex%optionLis.length].style.backgroundColor = "red";
            autoPlayId = setTimeout(autoStep,2000);
        }, 2000)
    }
    auto();
</script>
```



